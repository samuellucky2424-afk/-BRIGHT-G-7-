
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getLogisticsAdvice = async (query: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: query,
      config: {
        systemInstruction: "You are a senior logistics consultant for BRIGHT G-7 LTD. Help customers with shipping regulations, cargo types, and freight optimization. Keep it professional, helpful, and concise.",
      },
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "I'm currently unable to process your request. Please try again later or contact our 24/7 support desk.";
  }
};
