'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Sparkles, Quote } from "lucide-react";

export function VerseOfTheDay() {
  // Static content for mobile build
  const staticVerse = {
    chapter: 2,
    verse: 286,
    textArabic: "لَا يُكَلِّفُ اللَّهُ نَفْسًا إِلَّا وُسْعَهَا",
    translation: "Allah does not burden a soul beyond that it can bear.",
    reason: "This verse reminds us that Allah is merciful and understanding of our capabilities. It provides comfort during difficult times and encourages us to trust in Allah's wisdom."
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl font-bold font-headline">
          <Sparkles className="w-6 h-6 text-accent" />
          Verse of the Day
        </CardTitle>
        <CardDescription>
          Surah {staticVerse.chapter}, Verse {staticVerse.verse}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow space-y-6">
        <blockquote className="space-y-4">
          <p className="text-2xl md:text-3xl font-serif text-right leading-relaxed tracking-wide">
            {staticVerse.textArabic}
          </p>
          <p className="text-lg text-muted-foreground italic">
            &ldquo;{staticVerse.translation}&rdquo;
          </p>
        </blockquote>
      </CardContent>
      <CardFooter>
        <div className="w-full text-sm bg-muted/50 p-4 rounded-lg flex items-start gap-3">
          <Quote className="w-5 h-5 text-accent shrink-0 mt-1" />
          <div>
            <h4 className="font-semibold mb-1 text-accent">Why this verse?</h4>
            <p className="text-muted-foreground">{staticVerse.reason}</p>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
