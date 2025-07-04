import { VerseOfTheDay } from "@/components/verse-of-the-day";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { prayerTimes, qiblaDirection } from "@/lib/placeholder-data";
import { Separator } from "@/components/ui/separator";
import { Compass, MapPin } from "lucide-react";
import Link from 'next/link';

export default function DashboardPage() {
  const now = new Date();
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(now);

  return (
    <div className="flex-1 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-headline tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">{formattedDate}</p>
        </div>
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        <VerseOfTheDay />
        
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle className="font-headline">Prayer Times</CardTitle>
            <CardDescription className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4"/> New York, USA
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <ul className="space-y-3">
              {prayerTimes.map((prayer, index) => (
                <li key={prayer.name} className="flex items-center justify-between text-lg">
                  <div className="flex items-center gap-3 text-muted-foreground">
                    {prayer.icon}
                    <span className="font-medium">{prayer.name}</span>
                  </div>
                  <span className="font-mono font-semibold">{prayer.time}</span>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardHeader>
            <Separator />
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Compass className="w-5 h-5"/>
                <span className="font-medium">Qibla</span>
              </div>
              <div className="flex items-center gap-2 font-semibold">
                <span>{qiblaDirection.degrees}°</span>
                <div 
                  className="w-5 h-5 flex items-center justify-center transition-transform"
                  style={{ transform: `rotate(${qiblaDirection.degrees}deg)`}}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="hsl(var(--primary))" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-navigation"><polygon points="3 11 22 2 13 21 11 13 3 11"/></svg>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
