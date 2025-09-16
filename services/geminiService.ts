
import { GoogleGenAI, Type } from "@google/genai";
import type { BirthDetails, KundaliPrediction } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable is not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const predictionSchema = {
  type: Type.OBJECT,
  properties: {
    personality: {
      type: Type.STRING,
      description: "A detailed analysis of the person's personality traits based on their birth chart."
    },
    career: {
      type: Type.STRING,
      description: "Predictions and advice regarding the person's professional life, suitable career paths, and financial prospects."
    },
    relationships: {
      type: Type.STRING,
      description: "Insights into the person's romantic relationships, marriage, family life, and friendships."
    },
    health: {
      type: Type.STRING,
      description: "Astrological analysis of potential health concerns and advice for maintaining well-being."
    },
    remedies: {
      type: Type.STRING,
      description: "Suggestions for astrological remedies, such as gemstones, mantras, or rituals, to mitigate negative planetary influences."
    }
  },
  required: ["personality", "career", "relationships", "health", "remedies"]
};

export const getAstrologyPrediction = async (details: BirthDetails): Promise<KundaliPrediction> => {
  const prompt = `
    You are an expert Vedic Astrologer with profound knowledge of ancient Indian astrology.
    A user has provided their birth details for a Kundali (birth chart) reading.
    
    Birth Details:
    - Name: ${details.name}
    - Date of Birth: ${details.date}
    - Time of Birth: ${details.time}
    - Place of Birth: ${details.place}

    Task:
    Based on these details, generate a comprehensive and insightful Kundali analysis. 
    Provide a plausible astrological reading as if you had performed the complex astronomical calculations.
    The tone should be wise, encouraging, and insightful.
    
    Provide the output in a JSON format that adheres to the defined schema.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: predictionSchema,
        temperature: 0.7,
      },
    });

    const jsonText = response.text.trim();
    const predictionData: KundaliPrediction = JSON.parse(jsonText);
    return predictionData;

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to get prediction from AI service.");
  }
};
