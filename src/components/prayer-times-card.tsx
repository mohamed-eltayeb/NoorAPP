import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { prayerTimes, qiblaDirection } from "@/lib/placeholder-data";
import { Separator } from "@/components/ui/separator";
import { Compass, MapPin } from "lucide-react";

export function PrayerTimesCard() {
    return (
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle className="font-headline">Prayer Times</CardTitle>
            <CardDescription className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4"/> New York, USA
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <ul className="space-y-3">
              {prayerTimes.map((prayer) => (
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
    )
}
