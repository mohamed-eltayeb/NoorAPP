'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { getHadithsByCollection, getHadithCollectionDetails, Hadith } from '@/services/hadith-service';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Bookmark, Copy, Terminal } from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';

export default function HadithCollectionPage() {
    const params = useParams();
    const { toast } = useToast();
    const collectionSlug = params.collectionSlug as string;
    
    const [hadiths, setHadiths] = useState<Hadith[]>([]);
    const [collectionTitle, setCollectionTitle] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            if (!collectionSlug) return;
            
            setLoading(true);
            setError(null);

            const [hadithResult, collectionResult] = await Promise.all([
                getHadithsByCollection(collectionSlug),
                getHadithCollectionDetails(collectionSlug)
            ]);

            let hasError = false;
            if ('error' in hadithResult) {
                setError(hadithResult.error);
                hasError = true;
            } else {
                setHadiths(hadithResult);
            }

            if ('error' in collectionResult) {
                // If hadiths loaded but title failed, we can still proceed.
                // If hadiths failed, we already set the error.
                if (!hasError) {
                    console.error("Failed to load collection title:", collectionResult.error);
                }
            } else {
                setCollectionTitle(collectionResult.title);
            }
            
            setLoading(false);
        };
        fetchData();
    }, [collectionSlug]);

    if (loading) {
        return (
            <div className="space-y-6">
                <div className="flex items-center gap-4">
                    <Skeleton className="h-10 w-10" />
                    <div>
                        <Skeleton className="h-8 w-48" />
                        <Skeleton className="h-5 w-64 mt-1" />
                    </div>
                </div>
                <div className="space-y-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <Card key={i}>
                            <CardContent className="p-6 space-y-4">
                                <Skeleton className="h-5 w-full" />
                                <Skeleton className="h-5 w-5/6" />
                                <div className="flex items-center justify-between mt-4">
                                    <Skeleton className="h-6 w-24" />
                                    <div className="flex gap-2">
                                        <Skeleton className="h-8 w-8" />
                                        <Skeleton className="h-8 w-8" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        );
    }
    
    if (error) {
        return (
             <Alert variant="destructive">
                <Terminal className="h-4 w-4" />
                <AlertTitle>Error Loading Hadiths</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
            </Alert>
        )
    }

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text);
        toast({
            title: "Copied to clipboard!",
            description: "The hadith text has been copied.",
        });
    }

    const getHadithText = (hadith: Hadith) => {
      const hadithContent = hadith.hadith.find(h => h.lang === 'en');
      return hadithContent ? hadithContent.body : 'No English translation available.';
    }

    const getHadithReference = (hadith: Hadith) => {
      return `${collectionTitle}, Hadith ${hadith.hadithNumber}`;
    }

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
                    <h1 className="text-3xl font-bold font-headline tracking-tight">{collectionTitle || 'Loading...'}</h1>
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
