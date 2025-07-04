'use client';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Terminal } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/context/language-context";
import { useEffect, useState } from "react";
import { getSurahs, SurahListItem } from "@/services/quran-service";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const revelationPlaceTranslations = {
  makkah: { en: 'Meccan', ar: 'مكية', fr: 'Mecquoise' },
  madinah: { en: 'Medinan', ar: 'مدنية', fr: 'Médinoise' },
};

export default function QuranPage() {
  const { language } = useLanguage();
  const [surahs, setSurahs] = useState<SurahListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSurahs = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getSurahs();
        setSurahs(data);
      } catch (e) {
        setError("Failed to load Surahs. Please check your internet connection and try again.");
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchSurahs();
  }, []);

  const getSurahName = (surah: SurahListItem) => {
    if (language === 'ar') return surah.name;
    return surah.englishName;
  }
  
  const getRevelationPlace = (surah: SurahListItem) => {
    return revelationPlaceTranslations[surah.revelationType][language];
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold font-headline tracking-tight">The Holy Quran</h1>
          <p className="text-muted-foreground">Browse and read all 114 Surahs.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 12 }).map((_, i) => (
            <Card key={i} className="flex flex-col">
              <CardHeader className="flex flex-row items-center justify-between">
                <Skeleton className="h-10 w-10 rounded-lg" />
                <div className="text-right space-y-2">
                  <Skeleton className="h-6 w-24" />
                  <Skeleton className="h-5 w-20" />
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-24" />
                </div>
              </CardContent>
              <CardFooter>
                <Skeleton className="h-10 w-full" />
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold font-headline tracking-tight">The Holy Quran</h1>
          <p className="text-muted-foreground">Browse and read all 114 Surahs.</p>
        </div>
        <Alert variant="destructive">
          <Terminal className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold font-headline tracking-tight">The Holy Quran</h1>
        <p className="text-muted-foreground">Browse and read all 114 Surahs.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {surahs.map((surah) => (
          <Card key={surah.number} className="flex flex-col">
            <CardHeader className="flex flex-row items-center justify-between">
              <div className="bg-primary/10 text-primary h-10 w-10 flex items-center justify-center rounded-lg font-bold">
                {surah.number}
              </div>
              <div className="text-right">
                <CardTitle className="font-headline">{getSurahName(surah)}</CardTitle>
                <CardDescription className="font-serif text-lg">{language === 'ar' ? surah.englishName : surah.name}</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="text-sm text-muted-foreground">
                <p>Verses: {surah.numberOfAyahs}</p>
                <p>Revelation: {getRevelationPlace(surah)}</p>
              </div>
            </CardContent>
            <CardFooter>
              <Link href={`/quran/${surah.number}`} passHref className="w-full">
                <Button className="w-full">
                  <BookOpen className="mr-2 h-4 w-4"/>
                  Read Surah
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
