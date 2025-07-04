// src/ai/flows/daily-verse.ts
'use server';

/**
 * @fileOverview A daily verse recommendation AI agent.
 *
 * - dailyVerseRecommendation - A function that generates a daily Quran verse recommendation tailored to the user's past activity and preferences.
 * - DailyVerseRecommendationInput - The input type for the dailyVerseRecommendation function.
 * - DailyVerseRecommendationOutput - The return type for the dailyVerseRecommendation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DailyVerseRecommendationInputSchema = z.object({
  userActivity: z
    .string()
    .describe(
      'A summary of the user past activity and preferences, including bookmarks, reading history, and prayer logs.'
    ),
});
export type DailyVerseRecommendationInput = z.infer<
  typeof DailyVerseRecommendationInputSchema
>;

const DailyVerseRecommendationOutputSchema = z.object({
  chapter: z.number().describe('The chapter number of the recommended verse.'),
  verse: z.number().describe('The verse number of the recommended verse.'),
  textArabic: z.string().describe('The Arabic text of the recommended verse.'),
  translation: z.string().describe('The translation of the recommended verse.'),
  reason: z.string().describe('The reason why this verse was recommended.'),
});
export type DailyVerseRecommendationOutput = z.infer<
  typeof DailyVerseRecommendationOutputSchema
>;

export async function dailyVerseRecommendation(
  input: DailyVerseRecommendationInput
): Promise<DailyVerseRecommendationOutput> {
  return dailyVerseRecommendationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'dailyVerseRecommendationPrompt',
  input: {schema: DailyVerseRecommendationInputSchema},
  output: {schema: DailyVerseRecommendationOutputSchema},
  prompt: `You are an AI assistant that recommends a Quran verse to the user based on their past activity and preferences.

  Here is the user activity and preferences:
  {{userActivity}}

  Recommend a verse from the Quran that is relevant to the user's activity and preferences. Explain why you recommended this verse.
  The output should contain chapter, verse, textArabic, translation, and reason.
  `,
});

const dailyVerseRecommendationFlow = ai.defineFlow(
  {
    name: 'dailyVerseRecommendationFlow',
    inputSchema: DailyVerseRecommendationInputSchema,
    outputSchema: DailyVerseRecommendationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
