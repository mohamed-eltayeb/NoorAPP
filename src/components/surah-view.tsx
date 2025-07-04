'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlayCircle, PauseCircle, Loader, Eye, EyeOff } from 'lucide-react';
import React, { useState, useEffect, useRef } from 'react';
import { textToSpeech } from '@/ai/flows/tts';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/context/language-context';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import type { SurahDetails } from '@/services/quran-service';

const revelationPlaceTranslations = {
  Meccan: { en: 'Meccan', ar: 'مكية', fr: 'Mecquoise' },
  Medinan: { en: 'Medinan', ar: 'مدنية', fr: 'Médinoise' },
};

// This is the Client Component that handles all user interaction.
export function SurahView({ surahDetails }: { surahDetails: SurahDetails }) {
    const { toast } = useToast();
    const { language, direction } = useLanguage();
    
    const [audioUrl, setAudioUrl] = useState<string | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLoadingAudio, setIsLoadingAudio] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);

    const [memorizationMode, setMemorizationMode] = useState(false);
    const [revealedVerses, setRevealedVerses] = useState<Set<number>>(new Set());

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
    }, [language, surahDetails.number]);

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
