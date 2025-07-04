'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Compass, MapPin, Moon, Sun, SunMedium, Sunrise, Sunset, AlertCircle } from "lucide-react";
import React, { useEffect, useState } from "react";
import { getPrayerInfo, PrayerInfoOutput } from "@/ai/flows/prayer-flow";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertTitle, AlertDescription } from "./ui/alert";

const prayerIcons: { [key: string]: React.ReactElement } = {
    Fajr: <Sunrise className="w-5 h-5" />,
    Dhuhr: <Sun className="w-5 h-5" />,
    Asr: <SunMedium className="w-5 h-5" />,
    Maghrib: <Sunset className="w-5 h-5" />,
    Isha: <Moon className="w-5 h-5" />,
};

const prayersToShow = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];

export function PrayerTimesCard() {
    const [data, setData] = useState<PrayerInfoOutput | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!navigator.geolocation) {
            setError("Geolocation is not supported by your browser.");
            setLoading(false);
            return;
        }

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                try {
                    const { latitude, longitude } = position.coords;
                    const prayerData = await getPrayerInfo({ latitude, longitude });
                    setData(prayerData);
                } catch (apiError) {
                    console.error(apiError);
                    setError("Could not fetch prayer times. Please try again later.");
                } finally {
                    setLoading(false);
                }
            },
            () => {
                setError("Location access denied. Please enable it in your browser settings to see prayer times.");
                setLoading(false);
            }
        );
    }, []);

    if (loading) {
        return (
            <Card className="flex flex-col">
                <CardHeader>
                    <CardTitle className="font-headline">Prayer Times</CardTitle>
                    <Skeleton className="h-5 w-40 mt-1" />
                </CardHeader>
                <CardContent className="flex-grow space-y-3">
                    {prayersToShow.map(prayer => (
                        <div key={prayer} className="flex items-center justify-between text-lg">
                            <Skeleton className="h-6 w-24" />
                            <Skeleton className="h-6 w-20" />
                        </div>
                    ))}
                </CardContent>
                <CardHeader>
                    <Separator />
                </CardHeader>
                <CardContent>
                    <div className="flex items-center justify-between">
                        <Skeleton className="h-6 w-24" />
                        <Skeleton className="h-6 w-20" />
                    </div>
                </CardContent>
            </Card>
        );
    }
    
    if (error) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Prayer Times</CardTitle>
                </CardHeader>
                <CardContent>
                    <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                </CardContent>
            </Card>
        )
    }

    if (!data) return null;

    return (
        <Card className="flex flex-col">
            <CardHeader>
                <CardTitle className="font-headline">Prayer Times</CardTitle>
                <CardDescription className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4" /> {data.location}
                </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
                <ul className="space-y-3">
                    {prayersToShow.map((prayerName) => (
                        <li key={prayerName} className="flex items-center justify-between text-lg">
                            <div className="flex items-center gap-3 text-muted-foreground">
                                {prayerIcons[prayerName]}
                                <span className="font-medium">{prayerName}</span>
                            </div>
                            <span className="font-mono font-semibold">{data.timings[prayerName as keyof typeof data.timings]}</span>
                        </li>
                    ))}
                </ul>
            </CardContent>
            <CardHeader>
                <Separator />
            </CardHeader>
            <CardContent>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-muted-foreground">
                        <Compass className="w-5 h-5"/>
                        <span className="font-medium">Qibla</span>
                    </div>
                    <div className="flex items-center gap-2 font-semibold">
                        <span>{Math.round(data.qibla)}°</span>
                        <div 
                            className="w-5 h-5 flex items-center justify-center transition-transform"
                            style={{ transform: `rotate(${data.qibla}deg)`}}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="hsl(var(--primary))" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-navigation-2"><polygon points="12 2 19 21 12 17 5 21 12 2"/></svg>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
