'use client';

import { getDailyHadith, DailyHadithOutput } from "@/ai/flows/daily-hadith";
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ScrollText, Terminal, Quote } from "lucide-react";

export function HadithOfTheDay() {
  const [recommendation, setRecommendation] = useState<DailyHadithOutput | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getHadith = async () => {
      try {
        setLoading(true);
        const result = await getDailyHadith();
        setRecommendation(result);
      } catch (e) {
        console.error(e);
        setError("Failed to load today's hadith. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    getHadith();
  }, []);

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-7 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-5/6" />
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
      <Alert variant="destructive">
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
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle className="font-headline flex items-center gap-2">
          <ScrollText className="w-5 h-5 text-accent" />
          Hadith of the Day
        </CardTitle>
        <CardDescription>{recommendation.reference}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <blockquote className="space-y-2">
            <p className="text-muted-foreground italic">&ldquo;{recommendation.text}&rdquo;</p>
        </blockquote>
      </CardContent>
      <CardFooter>
        <div className="w-full text-sm bg-muted/50 p-4 rounded-lg flex items-start gap-3">
          <Quote className="w-5 h-5 text-accent shrink-0 mt-1" />
          <div>
            <h4 className="font-semibold mb-1 text-accent">Why this hadith?</h4>
            <p className="text-muted-foreground">{recommendation.reason}</p>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
