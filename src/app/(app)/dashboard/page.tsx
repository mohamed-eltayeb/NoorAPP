import { VerseOfTheDay } from "@/components/verse-of-the-day";
import { PrayerTimesCard } from "@/components/prayer-times-card";
import { DhikrOfTheDay } from "@/components/dhikr-of-the-day";
import { HadithOfTheDay } from "@/components/hadith-of-the-day";
import { UpcomingEvents } from "@/components/upcoming-events";
import { TasbeehCard } from "@/components/tasbeeh-card";
import { PrayerTrackerCard } from "@/components/prayer-tracker-card";

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
          <h1 className="text-3xl font-bold font-headline tracking-tight">Home</h1>
          <p className="text-muted-foreground">{formattedDate}</p>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 flex flex-col gap-6">
          <VerseOfTheDay />
          <HadithOfTheDay />
        </div>
        
        <div className="space-y-6">
          <PrayerTimesCard />
          <PrayerTrackerCard />
          <TasbeehCard />
          <DhikrOfTheDay />
          <UpcomingEvents />
        </div>
      </div>
    </div>
  );
}
