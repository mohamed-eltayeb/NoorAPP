'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { HeartHandshake, Quote } from "lucide-react";

export function DhikrOfTheDay() {
  // Static content for mobile build
  const staticDhikr = {
    dhikr: "SubhanAllah",
    arabic: "سُبْحَانَ ٱللَّٰهِ",
    reason: "Saying 'SubhanAllah' (Glory be to Allah) is a powerful dhikr that purifies the heart and reminds us of Allah's perfection. It's recommended to recite this 33 times after each prayer."
  };

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
            <p className="text-xl font-bold font-headline">{staticDhikr.dhikr}</p>
            <p className="font-serif text-2xl text-right text-primary">{staticDhikr.arabic}</p>
         </div>
         <div className="text-sm bg-muted/50 p-3 rounded-lg flex items-start gap-2.5">
          <Quote className="w-4 h-4 text-accent shrink-0 mt-1" />
          <p className="text-muted-foreground">{staticDhikr.reason}</p>
        </div>
      </CardContent>
    </Card>
  );
}
