'use server';
/**
 * @fileOverview A flow to get prayer times and qibla direction.
 * - getPrayerInfo: Gets prayer times based on user location.
 * - PrayerInfoInput: Input for the flow.
 * - PrayerInfoOutput: Output for the flow.
 */
import { ai } from '@/ai/genkit';
import { getPrayerData } from '@/services/location-service';
import { z } from 'zod';

const PrayerInfoInputSchema = z.object({
  latitude: z.number(),
  longitude: z.number(),
});
export type PrayerInfoInput = z.infer<typeof PrayerInfoInputSchema>;

const PrayerInfoOutputSchema = z.object({
  timings: z.object({
    Fajr: z.string(),
    Dhuhr: z.string(),
    Asr: z.string(),
    Maghrib: z.string(),
    Isha: z.string(),
  }),
  qibla: z.number(),
  location: z.string(),
});
export type PrayerInfoOutput = z.infer<typeof PrayerInfoOutputSchema>;

export async function getPrayerInfo(input: PrayerInfoInput): Promise<PrayerInfoOutput> {
  return prayerInfoFlow(input);
}

const prayerInfoFlow = ai.defineFlow(
  {
    name: 'prayerInfoFlow',
    inputSchema: PrayerInfoInputSchema,
    outputSchema: PrayerInfoOutputSchema,
  },
  async ({ latitude, longitude }) => {
    return await getPrayerData(latitude, longitude);
  }
);
