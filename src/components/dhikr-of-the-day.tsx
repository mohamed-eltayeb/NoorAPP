'use client';

import { getDhikrRecommendation, DhikrRecommendationOutput } from "@/ai/flows/dhikr-recommendation";
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { HeartHandshake, Terminal, Quote } from "lucide-react";

export function DhikrOfTheDay() {
  const [recommendation, setRecommendation] = useState<DhikrRecommendationOutput | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getDhikr = async () => {
      try {
        setLoading(true);
        const result = await getDhikrRecommendation();
        setRecommendation(result);
      } catch (e) {
        console.error(e);
        setError("Failed to load today's dhikr. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    getDhikr();
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
    <Card>
      <CardHeader>
        <CardTitle className="font-headline flex items-center gap-2">
          <HeartHandshake className="w-5 h-5 text-accent" />
          Dhikr of the Day
        </CardTitle>
        <CardDescription>A moment for remembrance.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
         <div>
            <p className="text-xl font-bold font-headline">{recommendation.dhikr}</p>
            <p className="font-serif text-2xl text-right text-primary">{recommendation.arabic}</p>
         </div>
         <div className="text-sm bg-muted/50 p-3 rounded-lg flex items-start gap-2.5">
          <Quote className="w-4 h-4 text-accent shrink-0 mt-1" />
          <p className="text-muted-foreground">{recommendation.reason}</p>
        </div>
      </CardContent>
    </Card>
  );
}
