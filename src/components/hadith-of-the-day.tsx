'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { ScrollText, Quote } from "lucide-react";

export function HadithOfTheDay() {
  // Static content for mobile build
  const staticHadith = {
    text: "The best of people are those who benefit others.",
    reference: "Sahih al-Bukhari",
    reason: "This hadith reminds us that our value comes from how we help and serve others. It encourages us to be beneficial members of our community and to always seek ways to help those around us."
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle className="font-headline flex items-center gap-2">
          <ScrollText className="w-5 h-5 text-accent" />
          Hadith of the Day
        </CardTitle>
        <CardDescription>{staticHadith.reference}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <blockquote className="space-y-2">
            <p className="text-muted-foreground italic">&ldquo;{staticHadith.text}&rdquo;</p>
        </blockquote>
      </CardContent>
      <CardFooter>
        <div className="w-full text-sm bg-muted/50 p-4 rounded-lg flex items-start gap-3">
          <Quote className="w-5 h-5 text-accent shrink-0 mt-1" />
          <div>
            <h4 className="font-semibold mb-1 text-accent">Why this hadith?</h4>
            <p className="text-muted-foreground">{staticHadith.reason}</p>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
