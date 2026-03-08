import { configManager } from '../config/config';
import { Chapter, Course } from '../types';

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
const MODEL = "llama-3.3-70b-versatile";

/**
 * Groq AI Client Wrapper
 * Handles initialization, error handling, and retry logic for Groq API
 */
class GroqClientWrapper {
  private apiKey: string;
  private maxRetries: number = 3;
  private baseDelay: number = 1000;

  constructor() {
    this.apiKey = configManager.getRequired('GROQ_API_KEY') as string;
  }

  /**
   * Invoke the Groq model with retry logic
   */
  async invokeModel(prompt: string, expectJson: boolean = false): Promise<string> {
    let lastError: Error | null = null;

    for (let attempt = 1; attempt <= this.maxRetries; attempt++) {
      try {
        const payload: any = {
          model: MODEL,
          messages: [{ role: 'user', content: prompt }],
          temperature: 0.7,
        };

        if (expectJson) {
          payload.response_format = { type: "json_object" };
        }

        const response = await fetch(GROQ_API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.apiKey}`,
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          const errorBody = await response.text();
          throw new Error(`Groq API error ${response.status}: ${errorBody}`);
        }

        const data = await response.json();
        const rawContent = data.choices?.[0]?.message?.content;

        if (!rawContent) {
          throw new Error('Empty response from Groq');
        }

        return rawContent;
      } catch (error) {
        lastError = error as Error;
        console.error(`Groq invocation attempt ${attempt} failed:`, error);
        if (attempt < this.maxRetries) {
          const delay = this.baseDelay * Math.pow(2, attempt - 1);
          console.log(`Retrying in ${delay}ms...`);
          await new Promise((resolve) => setTimeout(resolve, delay));
        }
      }
    }

    throw new Error(`Groq invocation failed after ${this.maxRetries} attempts: ${lastError?.message}`);
  }

  /**
   * Generate a course using AI based on topic and language
   * @param topic - The course topic
   * @param language - The language for the course content
   * @returns Course content (title, overview, learning_outcomes, chapters)
   * @throws Error if course generation fails or JSON is malformed
   */
  async generateCourse(topic: string, language: string): Promise<CourseContent> {
    const prompt = this.buildCoursePrompt(topic, language);

    try {
      const response = await this.invokeModel(prompt, true);
      return this.parseCourseResponse(response);
    } catch (error) {
      console.error('Groq course generation failed, using fallback template:', error);
      return this.buildFallbackCourseContent(topic, language);
    }
  }

  /**
   * Build a local fallback course template when Groq is unavailable.
   */
  private buildFallbackCourseContent(topic: string, language: string): CourseContent {
    const safeTopic = topic.trim() || 'General Topic';
    const chapterTitles = [
      `Introduction to ${safeTopic}`,
      `Core Concepts of ${safeTopic}`,
      'Practical Applications',
      'Common Mistakes',
      'Hands-on Exercises',
      'Advanced Concepts',
      'Mini Project',
      'Summary and Next Steps',
    ];

    return {
      title: `Course on ${safeTopic}`,
      overview: `This is an introductory course about ${safeTopic}.`,
      learning_outcomes: [
        `Understand the fundamentals of ${safeTopic}`,
        `Explain core concepts of ${safeTopic} with confidence`,
        `Apply ${safeTopic} concepts in practical scenarios`,
        `Build a small project and plan next learning steps`,
      ],
      chapters: chapterTitles.map((chapterTitle) => ({
        title: chapterTitle,
        content: `This chapter covers ${chapterTitle.toLowerCase()} for ${safeTopic}. It is provided as fallback content while the AI service is temporarily unavailable. Continue learning in ${language}.`,
      })),
    };
  }

  /**
   * Build the prompt template for course generation
   */
  private buildCoursePrompt(topic: string, language: string): string {
    return `Generate a beginner-friendly course about "${topic}".

Language: ${language}

Return ONLY valid JSON in this exact format:
{
  "title": "Course title",
  "overview": "Brief course overview",
  "learning_outcomes": ["outcome1", "outcome2", "outcome3"],
  "chapters": [
    {
      "title": "Chapter title",
      "content": "Detailed chapter content"
    }
  ]
}

Requirements:
- Include 3-5 learning outcomes
- Create 4-6 chapters
- Each chapter should have substantial content (200-400 words)
- Content should be educational and beginner-friendly
- Use ${language} language for all content`;
  }

  /**
   * Parse and validate the JSON response from Groq
   */
  private parseCourseResponse(response: string): CourseContent {
    try {
      const jsonMatch = response.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('No JSON object found in response');
      }

      const parsed = JSON.parse(jsonMatch[0]);

      if (!parsed.title || typeof parsed.title !== 'string') {
        throw new Error('Missing or invalid "title" field');
      }
      if (!parsed.overview || typeof parsed.overview !== 'string') {
        throw new Error('Missing or invalid "overview" field');
      }
      if (!Array.isArray(parsed.learning_outcomes) || parsed.learning_outcomes.length === 0) {
        throw new Error('Missing or invalid "learning_outcomes" field');
      }
      if (!Array.isArray(parsed.chapters) || parsed.chapters.length === 0) {
        throw new Error('Missing or invalid "chapters" field');
      }

      for (const chapter of parsed.chapters) {
        if (!chapter.title || typeof chapter.title !== 'string') {
          throw new Error('Chapter missing or invalid "title" field');
        }
        if (!chapter.content || typeof chapter.content !== 'string') {
          throw new Error('Chapter missing or invalid "content" field');
        }
      }

      return {
        title: parsed.title,
        overview: parsed.overview,
        learning_outcomes: parsed.learning_outcomes,
        chapters: parsed.chapters,
      };
    } catch (error) {
      if (error instanceof SyntaxError) {
        throw new Error('Malformed JSON response from AI service');
      }
      throw error;
    }
  }

  /**
   * Generate a tutor response using AI based on user message and course context
   */
  async generateTutorResponse(message: string, courseContext: Course): Promise<string> {
    const prompt = this.buildTutorPrompt(message, courseContext);

    try {
      const response = await this.invokeModel(prompt, false);
      return response.trim();
    } catch (error) {
      console.error('Tutor response generation failed:', error);
      throw new Error('Chat service failed');
    }
  }

  /**
   * Build the prompt template for tutor responses
   */
  private buildTutorPrompt(message: string, courseContext: Course): string {
    const learningOutcomes = courseContext.learning_outcomes
      .map((outcome, index) => `${index + 1}. ${outcome}`)
      .join('\n');

    return `You are an AI tutor helping a student learn about: ${courseContext.title}

  Course Overview: ${courseContext.overview}

  Learning Outcomes:
  ${learningOutcomes}

  Student Question: ${message}

  Provide a helpful, educational response that:
  - Directly answers the question
  - Relates to the course content
  - Is encouraging and supportive
  - Uses ${courseContext.language} language
  
  Your answers MUST always be formatted using Markdown.

  Formatting rules:
  - Use headings (#, ##, ###) for sections
  - Use bullet points for explanations
  - Use numbered lists for steps
  - Use tables when helpful
  - Wrap all code in triple backticks with the correct language
  - Highlight important words in **bold**
  - Separate sections with blank lines

  Never return plain text responses.
  Always structure answers clearly like professional documentation.`;
  }
}

/**
 * Course content structure returned by AI service
 */
export interface CourseContent {
  title: string;
  overview: string;
  learning_outcomes: string[];
  chapters: Chapter[];
}

export const groqClient = new GroqClientWrapper();
export { GroqClientWrapper };

