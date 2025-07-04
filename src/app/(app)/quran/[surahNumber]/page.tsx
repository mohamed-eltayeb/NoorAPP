'use client';

import { surahs, getSurahDetails } from '@/lib/placeholder-data';
import { useParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlayCircle, PauseCircle, Loader } from 'lucide-react';
import React, { useState, useEffect, useRef } from 'react';
import { textToSpeech } from '@/ai/flows/tts';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';

export default function SurahPage() {
    const params = useParams();
    const { toast } = useToast();
    const surahNumber = Number(params.surahNumber);
    const surahInfo = surahs.find(s => s.number === surahNumber);
    const surahDetails = getSurahDetails(surahNumber);

    const [audioUrl, setAudioUrl] = useState<string | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLoadingAudio, setIsLoadingAudio] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);

    const handlePlayPause = async () => {
        if (isPlaying) {
            audioRef.current?.pause();
            setIsPlaying(false);
        } else {
            if (!audioUrl) {
                setIsLoadingAudio(true);
                try {
                    const fullSurahText = surahDetails.verses.map(v => v.text).join('\n\n');
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
        if (audioUrl && audioRef.current && !isPlaying) {
            audioRef.current.play().then(() => {
                setIsPlaying(true);
            }).catch(e => {
                console.error("Audio play failed", e);
                setIsPlaying(false); // Reset state if autoplay fails
            });
        }
    }, [audioUrl]);

    if (!surahInfo || !surahDetails) {
        return (
             <Alert variant="destructive">
                <Terminal className="h-4 w-4" />
                <AlertTitle>Surah Not Found</AlertTitle>
                <AlertDescription>The requested Surah could not be found.</AlertDescription>
            </Alert>
        )
    }

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <div>
                            <CardTitle className="font-headline text-3xl">{surahInfo.name} ({surahInfo.nameArabic})</CardTitle>
                            <CardDescription>
                                {surahInfo.revelationPlace} - {surahInfo.versesCount} verses
                            </CardDescription>
                        </div>
                        <Button onClick={handlePlayPause} disabled={isLoadingAudio} size="icon" variant="ghost" className="text-primary h-12 w-12 shrink-0">
                            {isLoadingAudio ? <Loader className="animate-spin" /> : isPlaying ? <PauseCircle size={32} /> : <PlayCircle size={32} />}
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="space-y-8">
                        {surahDetails.verses.map((verse, index) => (
                            <div key={verse.id}>
                                <div className="flex flex-col gap-4">
                                     <p className="text-sm text-muted-foreground font-semibold bg-muted/50 w-fit px-2 py-1 rounded-md">Verse {verse.id}</p>
                                     <p className="text-2xl md:text-3xl font-serif text-right leading-loose tracking-wide">{verse.text}</p>
                                     <p className="text-lg text-muted-foreground italic">&ldquo;{verse.translation}&rdquo;</p>
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
