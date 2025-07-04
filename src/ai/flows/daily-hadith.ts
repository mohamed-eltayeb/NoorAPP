'use server';
/**
 * @fileOverview An AI flow to recommend a daily hadith.
 * - getDailyHadith - A function that returns a daily hadith recommendation.
 * - DailyHadithOutput - The return type for the getDailyHadith function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DailyHadithOutputSchema = z.object({
  text: z.string().describe("The text of the recommended hadith."),
  reference: z.string().describe("The reference for the hadith (e.g., 'Sahih al-Bukhari, Hadith 1')."),
  collection: z.string().describe("The name of the hadith collection (e.g., 'Sahih al-Bukhari')."),
  reason: z.string().describe("A short, uplifting reason why this hadith was chosen for the day."),
});
export type DailyHadithOutput = z.infer<typeof DailyHadithOutputSchema>;

export async function getDailyHadith(): Promise<DailyHadithOutput> {
  return dailyHadithFlow();
}

const prompt = ai.definePrompt({
  name: 'dailyHadithPrompt',
  output: {schema: DailyHadithOutputSchema},
  prompt: `You are an AI Islamic guide. Your task is to select one authentic, short, and impactful hadith for the user's "Hadith of the Day".
  
  The hadith should be from a well-known collection like Sahih al-Bukhari or Sahih Muslim.
  Focus on topics like good character (akhlaq), kindness, prayer, charity, or remembrance of Allah.
  
  Provide the hadith text, its reference, the collection name, and a brief, inspiring sentence about why this hadith is a valuable reminder for the day.`,
});

const dailyHadithFlow = ai.defineFlow(
  {
    name: 'dailyHadithFlow',
    outputSchema: DailyHadithOutputSchema,
  },
  async () => {
    const {output} = await prompt({});
    return output!;
  }
);
