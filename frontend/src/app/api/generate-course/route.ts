import { NextResponse } from "next/server";
import { buildGeneratedCourse } from "@/lib/server/course-generator";
import { insertCourse } from "@/lib/server/course-db";
import { generateCourseContent } from "@/lib/server/groq-client";

type GenerateCourseBody = {
  topic?: string;
  language?: string;
};

function toClientCourse(storedCourse: ReturnType<typeof buildGeneratedCourse>) {
  return {
    id: storedCourse.id,
    title: storedCourse.title,
    topic: storedCourse.topic,
    language: storedCourse.language,
    overview: storedCourse.overview,
    learning_outcomes: storedCourse.learning_outcomes,
    chapters: storedCourse.chapters.map((chapter) => ({
      id: chapter.id,
      title: chapter.title,
      content: chapter.content,
      explanation: chapter.content,
    })),
    createdAt: storedCourse.created_at,
  };
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as GenerateCourseBody;
    const topic = body.topic?.trim() ?? "";
    const language = body.language?.trim() ?? "en";

    if (!topic) {
      return NextResponse.json({ error: "Topic is required" }, { status: 400 });
    }

    let storedCourse: ReturnType<typeof buildGeneratedCourse>;

    try {
      // Try to generate course content using Groq AI
      const aiContent = await generateCourseContent(topic, language);

      // Use the helper to generate basic template/IDs
      storedCourse = buildGeneratedCourse({ topic, language });

      // Override static content with AI generated content
      storedCourse.overview = aiContent.overview;
      storedCourse.learning_outcomes = aiContent.learningOutcomes;

      // Link the generated chapters while preserving the IDs needed by the application
      storedCourse.chapters = aiContent.chapters.map((ch, idx) => ({
        id: `${storedCourse.id}-chapter-${idx + 1}`,
        title: ch.title,
        content: ch.content,
      }));

      storedCourse.generated_content = JSON.stringify({
        overview: aiContent.overview,
        learning_outcomes: aiContent.learningOutcomes,
        chapters: storedCourse.chapters,
      });

    } catch (aiError) {
      console.error("AI Generation failed, falling back to static template", aiError);
      storedCourse = buildGeneratedCourse({ topic, language });
    }

    await insertCourse(storedCourse);

    return NextResponse.json({
      id: storedCourse.id,
      course: toClientCourse(storedCourse),
    });
  } catch (error) {
    console.error("Course generation route error:", error);
    return NextResponse.json({ error: "Failed to generate course" }, { status: 500 });
  }
}
