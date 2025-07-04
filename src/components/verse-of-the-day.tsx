'use client';

import { dailyVerseRecommendation, DailyVerseRecommendationOutput } from "@/ai/flows/daily-verse";
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Sparkles, Terminal, Quote } from "lucide-react";

export function VerseOfTheDay() {
  const [recommendation, setRecommendation] = useState<DailyVerseRecommendationOutput | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getVerse = async () => {
      try {
        setLoading(true);
        const result = await dailyVerseRecommendation({
          userActivity: "The user has been reading about patience, reflecting on the beauty of nature, and seeking guidance in daily life.",
        });
        setRecommendation(result);
      } catch (e) {
        console.error(e);
        setError("Failed to load the verse of the day. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    getVerse();
  }, []);

  if (loading) {
    return (
      <Card className="lg:col-span-2 h-full">
        <CardHeader>
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-5/6" />
            <Skeleton className="h-6 w-full" />
          </div>
        </CardContent>
        <CardFooter>
            <Skeleton className="h-10 w-full" />
        </CardFooter>
      </Card>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive" className="lg:col-span-2">
        <Terminal className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  if (!recommendation) {
    return null;
  }

  return (
    <Card className="lg:col-span-2 h-full flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl font-bold font-headline">
          <Sparkles className="w-6 h-6 text-accent" />
          Verse of the Day
        </CardTitle>
        <CardDescription>
          Surah {recommendation.chapter}, Verse {recommendation.verse}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow space-y-6">
        <blockquote className="space-y-4">
          <p className="text-2xl md:text-3xl font-serif text-right leading-relaxed tracking-wide">
            {recommendation.textArabic}
          </p>
          <p className="text-lg text-muted-foreground italic">
            &ldquo;{recommendation.translation}&rdquo;
          </p>
        </blockquote>
      </CardContent>
      <CardFooter>
        <div className="w-full text-sm bg-muted/50 p-4 rounded-lg flex items-start gap-3">
          <Quote className="w-5 h-5 text-accent shrink-0 mt-1" />
          <div>
            <h4 className="font-semibold mb-1 text-accent">Why this verse?</h4>
            <p className="text-muted-foreground">{recommendation.reason}</p>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
