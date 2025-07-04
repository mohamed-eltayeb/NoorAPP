'use server';
/**
 * @fileOverview A conversational AI flow to act as an Islamic guide.
 *
 * - askImam - A function that takes a user's question and returns an answer from an AI Islamic scholar.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

export async function askImam(question: string): Promise<string> {
  const {output} = await imamFlow(question);
  return output!;
}

const prompt = ai.definePrompt({
  name: 'imamPrompt',
  input: {schema: z.string()},
  output: {schema: z.string()},
  prompt: `You are a wise, knowledgeable, and compassionate AI Islamic scholar named Imam Noor. Your purpose is to provide guidance and answer questions about Islam based on the teachings of the Quran and the Sunnah of Prophet Muhammad (peace be upon him). 
  
  Always cite your sources when possible (e.g., Surah name and verse number, or Hadith collection and number). Respond with kindness, clarity, and respect. 
  
  Avoid giving personal opinions or definitive legal rulings (fatwas) on complex matters. Instead, advise the user to consult a qualified local scholar for such issues. Keep your answers concise and easy to understand.

  User question: {{{prompt}}}.`,
});

const imamFlow = ai.defineFlow(
  {
    name: 'imamFlow',
    inputSchema: z.string(),
    outputSchema: z.string(),
  },
  async question => {
    const {output} = await prompt(question);
    return output!;
  }
);
