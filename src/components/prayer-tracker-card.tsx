'use client';

import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from '@/components/ui/checkbox';
import { CheckSquare } from 'lucide-react';
import Link from 'next/link';

type Prayer = 'Fajr' | 'Dhuhr' | 'Asr' | 'Maghrib' | 'Isha';
const PRAYERS: Prayer[] = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];
type PrayerStatus = Record<Prayer, boolean>;

export function PrayerTrackerCard() {
    const [prayerStatus, setPrayerStatus] = useState<PrayerStatus>({
        Fajr: false,
        Dhuhr: false,
        Asr: false,
        Maghrib: false,
        Isha: false,
    });

    const handlePrayerToggle = (prayer: Prayer, checked: boolean) => {
        setPrayerStatus(prev => ({ ...prev, [prayer]: checked }));
    };

    const prayersCompleted = useMemo(() => {
        return Object.values(prayerStatus).filter(Boolean).length;
    }, [prayerStatus]);

    const progressPercentage = (prayersCompleted / PRAYERS.length) * 100;

    return (
        <Card>
            <CardHeader>
                <CardTitle className="font-headline flex items-center gap-2">
                    <CheckSquare className="w-5 h-5 text-accent"/>
                    Today's Prayers
                </CardTitle>
                 <CardDescription>
                    <Link href="/prayer-tracker" className="text-sm text-muted-foreground hover:underline hover:text-primary">
                        Go to full tracker page &rarr;
                    </Link>
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex justify-around">
                    {PRAYERS.map(prayer => (
                        <div key={prayer} className="flex flex-col items-center gap-2">
                            <span className="text-xs font-semibold text-muted-foreground">{prayer}</span>
                            <Checkbox
                                id={`card-${prayer}`}
                                checked={prayerStatus[prayer]}
                                onCheckedChange={(checked) => handlePrayerToggle(prayer, !!checked)}
                                className="h-5 w-5"
                            />
                        </div>
                    ))}
                </div>
                <div className="pt-2">
                    <Progress value={progressPercentage} className="h-2" />
                     <p className="text-xs font-medium text-muted-foreground text-center mt-2">{prayersCompleted} of {PRAYERS.length} prayers completed</p>
                </div>
            </CardContent>
        </Card>
    );
}
