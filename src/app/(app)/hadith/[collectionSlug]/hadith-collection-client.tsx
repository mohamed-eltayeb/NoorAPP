'use client';

import { useState } from 'react';
import { Hadith } from '@/services/hadith-service';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Bookmark, Copy } from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';

interface Props {
  initialHadiths: Hadith[];
  collectionTitle: string;
  collectionSlug: string;
}

export function HadithCollectionClient({ initialHadiths, collectionTitle, collectionSlug }: Props) {
  const { toast } = useToast();
  const [hadiths] = useState<Hadith[]>(initialHadiths);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard!",
      description: "The hadith text has been copied.",
    });
  };

  const getHadithText = (hadith: Hadith) => {
    const hadithContent = hadith.hadith.find(h => h.lang === 'en');
    return hadithContent ? hadithContent.body : 'No English translation available.';
  };

  const getHadithReference = (hadith: Hadith) => {
    return `${collectionTitle}, Hadith ${hadith.hadithNumber}`;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/hadith">
            <ArrowLeft />
            <span className="sr-only">Back to collections</span>
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold font-headline tracking-tight">{collectionTitle}</h1>
          <p className="text-muted-foreground">Browse hadiths from this collection.</p>
        </div>
      </div>

      <div className="space-y-4">
        {hadiths.length > 0 ? (
          hadiths.map(hadith => (
            <Card key={hadith.urn}>
              <CardContent className="p-6 space-y-4">
                <p className="text-lg leading-relaxed">{getHadithText(hadith)}</p>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <p className="font-semibold">{getHadithReference(hadith)}</p>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleCopy(getHadithText(hadith))}>
                      <Copy className="h-4 w-4" />
                      <span className="sr-only">Copy</span>
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Bookmark className="h-4 w-4" />
                      <span className="sr-only">Bookmark</span>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card className="flex flex-col items-center justify-center p-12 text-center">
            <CardHeader>
              <CardTitle className="font-headline">No Hadiths Found</CardTitle>
              <p className="text-muted-foreground">No hadiths were found for this collection.</p>
            </CardHeader>
          </Card>
        )}
      </div>
    </div>
  );
}
