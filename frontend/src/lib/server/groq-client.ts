import type { StoredCourse, StoredChapter } from "./schema";

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
const MODEL = "llama-3.3-70b-versatile";

export async function generateCourseContent(
    topic: string,
    language: string,
): Promise<{
    overview: string;
    learningOutcomes: string[];
    chapters: StoredChapter[];
}> {
    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) {
        throw new Error("GROQ_API_KEY is not defined");
    }

    const prompt = `You are an expert educator. Create a comprehensive, beginner-friendly course on the topic: "${topic}".
The entire content must be written in this language: ${language}. If the language is a regional language like Hindi, Tamil, Telugu, Malayalam, or Kannada, ensure the translation is natural and accurate.

Provide the response in raw JSON format with the following structure (do NOT wrap it in markdown block quotes like \`\`\`json, just output the raw JSON object directly):
{
  "overview": "A 2-3 sentence engaging overview of what the course covers.",
  "learningOutcomes": [
    "Outcome 1",
    "Outcome 2",
    "Outcome 3",
    "Outcome 4"
  ],
  "chapters": [
    {
      "title": "Title of Chapter 1",
      "content": "Detailed content for Chapter 1 (at least 3-4 paragraphs), explaining concepts clearly with simple examples where applicable."
    },
    {
      "title": "Title of Chapter 2",
      "content": "Detailed content for Chapter 2."
    },
    {
      "title": "Title of Chapter 3",
      "content": "Detailed content for Chapter 3."
    },
    {
      "title": "Title of Chapter 4",
      "content": "Detailed content for Chapter 4."
    }
  ]
}

Ensure the JSON is strictly valid.`;

    const response = await fetch(GROQ_API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
            model: MODEL,
            messages: [{ role: "user", content: prompt }],
            temperature: 0.7,
            response_format: { type: "json_object" },
        }),
    });

    if (!response.ok) {
        const errorBody = await response.text();
        console.error(`Groq API error: ${response.status}`, errorBody);
        throw new Error(`Failed to generate course from Groq API: ${response.statusText}`);
    }

    const data = await response.json();
    const rawContent = data.choices[0]?.message?.content;

    if (!rawContent) {
        throw new Error("Empty response from Groq API");
    }

    try {
        const parsed = JSON.parse(rawContent);

        // Validate the response shape
        if (!parsed.overview || !Array.isArray(parsed.learningOutcomes) || !Array.isArray(parsed.chapters)) {
            throw new Error("Invalid response format from Groq");
        }

        return {
            overview: parsed.overview,
            learningOutcomes: parsed.learningOutcomes,
            chapters: parsed.chapters.map((ch: any, i: number) => ({
                id: `chapter-${i + 1}`,
                title: ch.title || `Chapter ${i + 1}`,
                content: ch.content || "Content missing.",
            })),
        };
    } catch (error) {
        console.error("Failed to parse Groq response:", rawContent);
        throw new Error("Failed to parse JSON response from Groq");
    }
}
