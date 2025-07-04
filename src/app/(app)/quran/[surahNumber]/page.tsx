'use client';

import { useParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlayCircle, PauseCircle, Loader, Eye, EyeOff, Terminal } from 'lucide-react';
import React, { useState, useEffect, useRef } from 'react';
import { textToSpeech } from '@/ai/flows/tts';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useLanguage } from '@/context/language-context';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { getSurah, SurahDetails } from '@/services/quran-service';
import { Skeleton } from '@/components/ui/skeleton';

const revelationPlaceTranslations = {
  Meccan: { en: 'Meccan', ar: 'مكية', fr: 'Mecquoise' },
  Medinan: { en: 'Medinan', ar: 'مدنية', fr: 'Médinoise' },
};

export default function SurahPage() {
    const params = useParams();
    const { toast } = useToast();
    const { language, direction } = useLanguage();
    const surahNumber = Number(params.surahNumber);
    
    const [surahDetails, setSurahDetails] = useState<SurahDetails | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [audioUrl, setAudioUrl] = useState<string | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLoadingAudio, setIsLoadingAudio] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);

    const [memorizationMode, setMemorizationMode] = useState(false);
    const [revealedVerses, setRevealedVerses] = useState<Set<number>>(new Set());

    useEffect(() => {
        if (isNaN(surahNumber)) {
            setError("Invalid Surah number.");
            setLoading(false);
            return;
        }

        const fetchSurah = async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await getSurah(surahNumber);
                setSurahDetails(data);
            } catch (e) {
                setError("Failed to load Surah details. Please try again later.");
                console.error(e);
            } finally {
                setLoading(false);
            }
        };
        fetchSurah();
    }, [surahNumber]);

    const handlePlayPause = async () => {
        if (isPlaying) {
            audioRef.current?.pause();
            setIsPlaying(false);
        } else {
            if (!audioUrl) {
                if (!surahDetails) return;
                setIsLoadingAudio(true);
                try {
                    const fullSurahText = surahDetails.verses.map(v => v.translations[language]).join(' ');
                    const response = await textToSpeech(fullSurahText);
                    setAudioUrl(response.media);
                } catch (error) {
                    console.error("Failed to generate audio:", error);
                    toast({
                        variant: "destructive",
                        title: "Audio Error",
                        description: "Failed to generate audio for this Surah.",
                    });
                } finally {
                    setIsLoadingAudio(false);
                }
            } else {
                audioRef.current?.play();
                setIsPlaying(true);
            }
        }
    };
    
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.src = "";
        }
        setAudioUrl(null);
        setIsPlaying(false);
        setIsLoadingAudio(false);
    }, [language, surahNumber]);

    useEffect(() => {
        if (audioUrl && audioRef.current && !isPlaying) {
            audioRef.current.play().then(() => {
                setIsPlaying(true);
            }).catch(e => {
                console.error("Audio play failed", e);
                setIsPlaying(false);
            });
        }
    }, [audioUrl, isPlaying]);
    
    useEffect(() => {
        setRevealedVerses(new Set());
    }, [memorizationMode]);

    const toggleVerseReveal = (verseId: number) => {
        setRevealedVerses(prev => {
            const newSet = new Set(prev);
            if (newSet.has(verseId)) {
                newSet.delete(verseId);
            } else {
                newSet.add(verseId);
            }
            return newSet;
        });
    };

    if (loading) {
         return (
            <div className="space-y-6">
                <Card>
                    <CardHeader>
                        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                            <div>
                                <Skeleton className="h-9 w-48 mb-2" />
                                <Skeleton className="h-5 w-32" />
                            </div>
                            <div className="flex items-center gap-4">
                                <Skeleton className="h-6 w-32" />
                                <Skeleton className="h-12 w-12 rounded-full" />
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-8">
                            {Array.from({ length: 5 }).map((_, index) => (
                                <div key={index}>
                                    <div className="flex flex-col gap-4">
                                        <Skeleton className="h-6 w-20 rounded-md" />
                                        <Skeleton className="h-8 w-full" />
                                        <Skeleton className="h-8 w-5/6" />
                                        <Skeleton className="h-6 w-full mt-2" />
                                        <Skeleton className="h-6 w-3/4" />
                                    </div>
                                    {index < 4 && <Separator className="my-8"/>}
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }

    if (error || !surahDetails) {
        return (
             <Alert variant="destructive">
                <Terminal className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error || "The requested Surah could not be found."}</AlertDescription>
            </Alert>
        )
    }

    const getSurahName = () => {
        if (language === 'ar') return surahDetails.name;
        return surahDetails.englishName;
    }

    const getRevelationPlace = () => {
        return revelationPlaceTranslations[surahDetails.revelationType][language];
    }

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                        <div>
                            <CardTitle className="font-headline text-3xl">{getSurahName()} ({language === 'ar' ? surahDetails.englishName : surahDetails.name})</CardTitle>
                            <CardDescription>
                                {getRevelationPlace()} - {surahDetails.numberOfAyahs} verses
                            </CardDescription>
                        </div>
                        <div className="flex items-center gap-4">
                             <div className="flex items-center space-x-2">
                                <Switch
                                    id="memorization-mode"
                                    checked={memorizationMode}
                                    onCheckedChange={setMemorizationMode}
                                />
                                <Label htmlFor="memorization-mode">Memorization</Label>
                            </div>
                            <Button onClick={handlePlayPause} disabled={isLoadingAudio} size="icon" variant="ghost" className="text-primary h-12 w-12 shrink-0">
                                {isLoadingAudio ? <Loader className="animate-spin" /> : isPlaying ? <PauseCircle size={32} /> : <PlayCircle size={32} />}
                            </Button>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="space-y-8">
                        {surahDetails.verses.map((verse, index) => (
                            <div key={verse.id}>
                                <div className="flex flex-col gap-4">
                                     <p className="text-sm text-muted-foreground font-semibold bg-muted/50 w-fit px-2 py-1 rounded-md">Verse {verse.numberInSurah}</p>
                                     <p className="text-2xl md:text-3xl font-serif text-right leading-loose tracking-wide">{verse.text}</p>
                                     <div
                                        className={cn(
                                            "text-lg text-muted-foreground italic rounded-md transition-all",
                                            memorizationMode && "cursor-pointer hover:bg-muted/50 p-4",
                                            memorizationMode && !revealedVerses.has(verse.id) && "blur-md select-none"
                                        )}
                                        onClick={() => memorizationMode && toggleVerseReveal(verse.id)}
                                     >
                                        <div className="flex items-center gap-2">
                                            {memorizationMode && (
                                                revealedVerses.has(verse.id) ? 
                                                <EyeOff className="h-4 w-4 text-primary shrink-0"/> : 
                                                <Eye className="h-4 w-4 text-primary shrink-0"/>
                                            )}
                                            <p lang={language} dir={direction}>&ldquo;{verse.translations[language]}&rdquo;</p>
                                        </div>
                                     </div>
                                </div>
                                {index < surahDetails.verses.length - 1 && <Separator className="my-8"/>}
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
            {audioUrl && <audio ref={audioRef} src={audioUrl} onEnded={() => setIsPlaying(false)} className="hidden" />}
        </div>
    );
}
