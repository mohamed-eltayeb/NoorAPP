'use client';

import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { getHadithCollections, HadithCollection } from "@/services/hadith-service";
import { Search, ScrollText, Terminal } from "lucide-react";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

export default function HadithPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [collections, setCollections] = useState<HadithCollection[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getHadithCollections();
        setCollections(data);
      } catch (e: any) {
        setError(e.message || "Failed to load Hadith collections. The API might be down or your API key may be missing.");
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchCollections();
  }, []);

  const filteredCollections = collections.filter(collection => 
    collection.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold font-headline tracking-tight">Hadith Collections</h1>
          <p className="text-muted-foreground">Explore authentic traditions of the Prophet (ﷺ).</p>
        </div>
        <Skeleton className="h-10 w-full" />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i}>
              <CardHeader className="flex-row items-center gap-4 space-y-0">
                <Skeleton className="h-8 w-8" />
                <div>
                  <Skeleton className="h-5 w-32" />
                  <Skeleton className="h-4 w-24 mt-1" />
                </div>
              </CardHeader>
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
          <h1 className="text-3xl font-bold font-headline tracking-tight">Hadith Collections</h1>
          <p className="text-muted-foreground">Explore authentic traditions of the Prophet (ﷺ).</p>
        </div>
        <Alert variant="destructive">
          <Terminal className="h-4 w-4" />
          <AlertTitle>Error Loading Collections</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold font-headline tracking-tight">Hadith Collections</h1>
        <p className="text-muted-foreground">Explore authentic traditions of the Prophet (ﷺ).</p>
      </div>
      
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input 
          placeholder="Search collections..." 
          className="pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {filteredCollections.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredCollections.map((collection) => (
            <Link href={`/hadith/${collection.name}`} key={collection.name}>
                <Card className="hover:bg-muted/50 transition-colors cursor-pointer h-full">
                    <CardHeader className="flex-row items-center gap-4 space-y-0">
                    <div className="text-accent">
                        <ScrollText />
                    </div>
                    <div>
                        <CardTitle className="font-headline">{collection.title}</CardTitle>
                        <p className="text-sm text-muted-foreground">{collection.totalHadiths.toLocaleString()} Hadiths</p>
                    </div>
                    </CardHeader>
                </Card>
            </Link>
          ))}
        </div>
      ) : (
        <Card className="flex flex-col items-center justify-center p-12 text-center">
            <CardHeader>
                <CardTitle className="font-headline">No Collections Found</CardTitle>
                <p className="text-muted-foreground">Your search for &quot;{searchTerm}&quot; did not match any collections.</p>
            </CardHeader>
        </Card>
      )}
    </div>
  );
}
