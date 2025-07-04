import { VerseOfTheDay } from "@/components/verse-of-the-day";
import { PrayerTimesCard } from "@/components/prayer-times-card";
import { DhikrOfTheDay } from "@/components/dhikr-of-the-day";

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
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="md:col-span-2">
          <VerseOfTheDay />
        </div>
        
        <div className="space-y-6">
          <PrayerTimesCard />
          <DhikrOfTheDay />
        </div>
      </div>
    </div>
  );
}
