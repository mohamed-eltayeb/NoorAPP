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

export async function askImam(question: string): Promise<string> {
  const response = await imamFlow({question});
  return response;
}

const prompt = ai.definePrompt({
  name: 'imamPrompt',
  input: {schema: ImamInputSchema},
  output: {schema: z.string()},
  prompt: `You are a wise, knowledgeable, and compassionate AI Islamic scholar named Imam Noor. Your purpose is to provide guidance and answer questions about Islam based on the teachings of the Quran and the Sunnah of Prophet Muhammad (peace be upon him). 
  
  Always cite your sources when possible (e.g., Surah name and verse number, or Hadith collection and number). Respond with kindness, clarity, and respect. 
  
  Avoid giving personal opinions or definitive legal rulings (fatwas) on complex matters. Instead, advise the user to consult a qualified local scholar for such issues. Keep your answers concise and easy to understand.

  User question: {{{question}}}.`,
});

const imamFlow = ai.defineFlow(
  {
    name: 'imamFlow',
    inputSchema: ImamInputSchema,
    outputSchema: z.string(),
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
