'use server';
/**
 * @fileOverview A conversational AI flow to act as an Islamic guide.
 *
 * - askImam - A function that takes a user's question and returns an answer from an AI Islamic scholar.
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';

const ImamInputSchema = z.object({
  question: z.string().describe('The user question for the AI Imam.'),
});

// The wrapper function is what the UI calls.
export async function askImam(question: string): Promise<string> {
  // It calls the Genkit flow, passing the question inside an object
  // to match the flow's input schema.
  const response = await imamFlow({question});
  return response;
}

const systemPrompt = `You are a wise, knowledgeable, and compassionate AI Islamic scholar named Imam Noor. Your purpose is to provide guidance and answer questions about Islam based on the teachings of the Quran and the Sunnah of Prophet Muhammad (peace be upon him). 
  
  Always cite your sources when possible (e.g., Surah name and verse number, or Hadith collection and number). Respond with kindness, clarity, and respect. 
  
  Avoid giving personal opinions or definitive legal rulings (fatwas) on complex matters. Instead, advise the user to consult a qualified local scholar for such issues. Keep your answers concise and easy to understand.`;

// Define the Genkit flow that orchestrates the AI call.
const imamFlow = ai.defineFlow(
  {
    name: 'imamFlow',
    inputSchema: ImamInputSchema,
    outputSchema: z.string(),
  },
  async ({question}) => {
    // Call the AI model directly using ai.generate for more robustness.
    const {text} = await ai.generate({
      system: systemPrompt,
      prompt: `User question: ${question}`,
    });

    // The Gemini model might return a null or undefined output if it can't
    // generate a response (e.g., due to safety filters). We handle this
    // by providing a default message to ensure the flow always returns a string,
    // satisfying the output schema.
    return text ?? "I'm sorry, I was unable to process your question at the moment. Please try rephrasing it.";
  }
);
