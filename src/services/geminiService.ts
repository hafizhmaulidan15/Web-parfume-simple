import { GoogleGenAI, Chat } from "@google/genai";
import { Product } from "../types";

const apiKey = process.env.API_KEY || ''; 
const ai = new GoogleGenAI({ apiKey });

export const generateProductDescription = async (name: string, notes: string): Promise<string> => {
  try {
    const prompt = `Write a luxurious, elegant, and sensory-rich product description (max 50 words) for a high-end perfume named "${name}". The key fragrance notes are: ${notes}. The tone should be mysterious, sophisticated, and expensive.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "Description unavailable.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Could not generate description at this time. Please try again.";
  }
};

export const createScentSommelierChat = (): Chat => {
  return ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: `You are the "Scent Sommelier" for Noir Essence, a luxury perfume brand. 
      Your goal is to help customers find their perfect fragrance based on their preferences (woody, floral, fresh, etc.), occasion, or personality.
      Keep your responses elegant, concise (under 80 words), and polite. 
      If you recommend a scent, try to describe its vibe.
      Do not mention competitors. Focus on general scent families or imagine fictional products if specific ones aren't provided in context, but ideally guide them to types of scents like 'Oud', 'Rose', 'Citrus'.`,
    },
  });
};
