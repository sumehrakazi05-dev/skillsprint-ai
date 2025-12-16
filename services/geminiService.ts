import { GoogleGenAI, Type } from "@google/genai";
import { SprintPlan } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const modelName = "gemini-2.5-flash";

export const generateSkillSprint = async (
  jobDescription: string,
  currentSkills: string
): Promise<SprintPlan> => {
  
  const systemInstruction = `
    You are an AI career mentor and curriculum designer.
    Your task is to:
    1. Analyze job descriptions and identify core skills.
    2. Compare them with a user's current skill set.
    3. Identify skill gaps.
    4. Create a practical 30-day learning roadmap.
    5. Break the roadmap into daily actionable tasks.
    Be concise, structured, and motivational.

    Ensure the roadmap:
    - Covers exactly 4 weeks (30 days).
    - Focuses on practical application (projects, coding, building) rather than just theory.
    - Provides specific, actionable daily tasks.
  `;

  const prompt = `
    JOB DESCRIPTION:
    ${jobDescription}

    USER'S CURRENT SKILLS:
    ${currentSkills}

    Generate a JSON response representing the analysis and the 30-day plan.
  `;

  const response = await ai.models.generateContent({
    model: modelName,
    contents: prompt,
    config: {
      systemInstruction: systemInstruction,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          role: { type: Type.STRING, description: "The inferred job title from the JD" },
          analysis: {
            type: Type.OBJECT,
            properties: {
              matchPercentage: { type: Type.NUMBER, description: "0 to 100 integer representing fit" },
              missingSkills: { type: Type.ARRAY, items: { type: Type.STRING } },
              presentSkills: { type: Type.ARRAY, items: { type: Type.STRING } },
              roleSummary: { type: Type.STRING, description: "A 1-sentence summary of what this role entails" },
              recommendation: { type: Type.STRING, description: "A motivational advice sentence" },
            },
            required: ["matchPercentage", "missingSkills", "presentSkills", "roleSummary", "recommendation"]
          },
          roadmap: {
            type: Type.ARRAY,
            description: "Array of 4 weeks",
            items: {
              type: Type.OBJECT,
              properties: {
                weekNumber: { type: Type.INTEGER },
                theme: { type: Type.STRING, description: "Main focus of the week" },
                goal: { type: Type.STRING, description: "What the user will have achieved by end of week" },
                days: {
                  type: Type.ARRAY,
                  description: "Array of 7 days",
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      day: { type: Type.INTEGER },
                      title: { type: Type.STRING },
                      description: { type: Type.STRING, description: "Short actionable instruction" },
                      focus: { type: Type.STRING, enum: ["Theory", "Practice", "Project"] },
                      estimatedHours: { type: Type.NUMBER },
                      resources: { type: Type.ARRAY, items: { type: Type.STRING }, description: "3-4 search keywords or topics to Google" }
                    },
                    required: ["day", "title", "description", "focus", "estimatedHours", "resources"]
                  }
                }
              },
              required: ["weekNumber", "theme", "goal", "days"]
            }
          }
        },
        required: ["role", "analysis", "roadmap"]
      }
    }
  });

  if (!response.text) {
    throw new Error("No response from AI");
  }

  return JSON.parse(response.text) as SprintPlan;
};