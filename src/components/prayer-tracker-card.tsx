
'use client';

import React, { useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckSquare } from 'lucide-react';
import Link from 'next/link';
import { usePrayerTracker, PRAYERS } from '@/context/prayer-tracker-context';

// Helper to format date to 'YYYY-MM-DD'
const formatDate = (date: Date): string => {
    return date.toISOString().split('T')[0];
};

export function PrayerTrackerCard() {
    const { prayerLog } = usePrayerTracker();
    const todayKey = formatDate(new Date());

    const dailyStatus = useMemo(() => {
        return prayerLog[todayKey] || {
            Fajr: 'unprayed', Dhuhr: 'unprayed', Asr: 'unprayed', Maghrib: 'unprayed', Isha: 'unprayed'
        };
    }, [prayerLog, todayKey]);

    const prayersCompleted = useMemo(() => {
        return Object.values(dailyStatus).filter(status => status === 'jamaah' || status === 'alone').length;
    }, [dailyStatus]);

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
                <div className="pt-2">
                    <Progress value={progressPercentage} className="h-2" />
                     <p className="text-xs font-medium text-muted-foreground text-center mt-2">{prayersCompleted} of {PRAYERS.length} prayers completed</p>
                </div>
            </CardContent>
        </Card>
    );
}
