import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { surahs } from "@/lib/placeholder-data";
import { Button } from "@/components/ui/button";
import { BookOpen } from "lucide-react";

export default function QuranPage() {
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
                <CardTitle className="font-headline">{surah.name}</CardTitle>
                <CardDescription className="font-serif text-lg">{surah.nameArabic}</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="text-sm text-muted-foreground">
                <p>Verses: {surah.versesCount}</p>
                <p>Revelation: {surah.revelationPlace}</p>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">
                <BookOpen className="mr-2 h-4 w-4"/>
                Read Surah
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
