'use server';
/**
 * @fileOverview An AI flow to recommend a daily dhikr.
 * - getDhikrRecommendation - A function that returns a daily dhikr recommendation.
 * - DhikrRecommendationOutput - The return type for the getDhikrRecommendation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DhikrRecommendationOutputSchema = z.object({
  dhikr: z
    .string()
    .describe(
      "The recommended dhikr in English transliteration (e.g., 'Subhan'Allah')."
    ),
  arabic: z
    .string()
    .describe(
      "The Arabic script for the recommended dhikr (e.g., 'سُبْحَانَ اللَّهِ')."
    ),
  reason: z
    .string()
    .describe(
      'A short, uplifting, one-sentence reason for reciting this dhikr.'
    ),
});
export type DhikrRecommendationOutput = z.infer<
  typeof DhikrRecommendationOutputSchema
>;

export async function getDhikrRecommendation(): Promise<DhikrRecommendationOutput> {
  return dhikrRecommendationFlow();
}

const prompt = ai.definePrompt({
  name: 'dhikrRecommendationPrompt',
  output: {schema: DhikrRecommendationOutputSchema},
  prompt: `You are an AI spiritual guide for Muslims. Your task is to recommend a single, simple, yet powerful dhikr (remembrance of Allah) for the user to focus on today. 
  
  Choose one from the following list:
  - Subhan'Allah (Glory be to Allah)
  - Alhamdulillah (All praise is for Allah)
  - Allahu Akbar (Allah is the Greatest)
  - Astaghfirullah (I seek forgiveness from Allah)
  - La ilaha illallah (There is no god but Allah)
  - La hawla wa la quwwata illa billah (There is no power and no strength except with Allah)

  Provide the dhikr's transliteration, its Arabic script, and a concise, inspiring one-sentence reason explaining its benefit. The reason should be encouraging and easy to understand.
  `,
});

const dhikrRecommendationFlow = ai.defineFlow(
  {
    name: 'dhikrRecommendationFlow',
    outputSchema: DhikrRecommendationOutputSchema,
  },
  async () => {
    const {output} = await prompt({});
    return output!;
  }
);
