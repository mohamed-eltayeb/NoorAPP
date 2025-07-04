'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlayCircle, PauseCircle, Eye, EyeOff } from 'lucide-react';
import React, { useState, useEffect, useRef } from 'react';
import { Separator } from '@/components/ui/separator';
import { useLanguage } from '@/context/language-context';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import type { SurahDetails, Verse } from '@/services/quran-service';

const revelationPlaceTranslations = {
  Meccan: { en: 'Meccan', ar: 'مكية', fr: 'Mecquoise' },
  Medinan: { en: 'Medinan', ar: 'مدنية', fr: 'Médinoise' },
};

// This is the Client Component that handles all user interaction.
export function SurahView({ surahDetails }: { surahDetails: SurahDetails }) {
    const { language, direction } = useLanguage();
    
    const audioRef = useRef<HTMLAudioElement>(null);
    const [playingVerseId, setPlayingVerseId] = useState<number | null>(null);
    const [isAudioPlaying, setIsAudioPlaying] = useState(false);
    
    const [memorizationMode, setMemorizationMode] = useState(false);
    const [revealedVerses, setRevealedVerses] = useState<Set<number>>(new Set());

    const handlePlayPause = (verse: Verse) => {
        const audio = audioRef.current;
        if (!audio || !verse.audio) return;

        // If clicking the verse that is currently playing
        if (playingVerseId === verse.id) {
            if (isAudioPlaying) {
                audio.pause();
            } else {
                audio.play();
            }
        } else { // If clicking a new verse
            setPlayingVerseId(verse.id);
            audio.src = verse.audio;
            audio.play();
        }
    };
    
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;
        
        const onPlay = () => setIsAudioPlaying(true);
        const onPause = () => setIsAudioPlaying(false);
        const onEnded = () => {
            setIsAudioPlaying(false);
            setPlayingVerseId(null);
        };

        audio.addEventListener('play', onPlay);
        audio.addEventListener('pause', onPause);
        audio.addEventListener('ended', onEnded);
        
        return () => {
            audio.removeEventListener('play', onPlay);
            audio.removeEventListener('pause', onPause);
            audio.removeEventListener('ended', onEnded);
        }
    }, []);

    useEffect(() => {
        // Stop audio when switching surahs
        const audio = audioRef.current;
        if(audio) {
            audio.pause();
            audio.src = '';
        }
        setPlayingVerseId(null);
        setIsAudioPlaying(false);
    }, [surahDetails.number]);
    
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
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                        <div>
                            <CardTitle className="font-headline text-3xl">{getSurahName()} ({language === 'ar' ? surahDetails.englishName : surahDetails.name})</CardTitle>
                            <CardDescription>
                                {getRevelationPlace()} - {surahDetails.numberOfAyahs} verses
                            </CardDescription>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Switch
                                id="memorization-mode"
                                checked={memorizationMode}
                                onCheckedChange={setMemorizationMode}
                            />
                            <Label htmlFor="memorization-mode">Memorization</Label>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="space-y-8">
                        {surahDetails.verses.map((verse, index) => (
                            <div key={verse.id}>
                                <div className="flex flex-col gap-4">
                                     <div className="flex items-center gap-4">
                                        <Button 
                                            onClick={() => handlePlayPause(verse)} 
                                            size="icon" 
                                            variant="ghost" 
                                            className="text-primary w-8 h-8 shrink-0"
                                            disabled={!verse.audio}
                                        >
                                            {playingVerseId === verse.id && isAudioPlaying ? <PauseCircle /> : <PlayCircle />}
                                        </Button>
                                        <p className="text-sm text-muted-foreground font-semibold bg-muted/50 w-fit px-2 py-1 rounded-md">
                                            {surahDetails.number}:{verse.numberInSurah} &bull; Juz {verse.juz} &bull; Hizb {verse.hizbQuarter}
                                        </p>
                                     </div>
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
            <audio ref={audioRef} className="hidden" />
        </div>
    );
}
