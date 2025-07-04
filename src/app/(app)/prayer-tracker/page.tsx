'use client';

import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { CheckSquare, Moon, Sun, SunMedium, Sunrise, Sunset } from 'lucide-react';

// Define types for prayer tracking state
type Prayer = 'Fajr' | 'Dhuhr' | 'Asr' | 'Maghrib' | 'Isha';
const PRAYERS: Prayer[] = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];

const prayerIcons: Record<Prayer, React.ReactElement> = {
    Fajr: <Sunrise className="w-5 h-5 text-muted-foreground" />,
    Dhuhr: <Sun className="w-5 h-5 text-muted-foreground" />,
    Asr: <SunMedium className="w-5 h-5 text-muted-foreground" />,
    Maghrib: <Sunset className="w-5 h-5 text-muted-foreground" />,
    Isha: <Moon className="w-5 h-5 text-muted-foreground" />,
};

type PrayerStatus = Record<Prayer, boolean>;
type PrayerLog = Record<string, PrayerStatus>; // Key is 'YYYY-MM-DD'

// Helper to format date to 'YYYY-MM-DD'
const formatDate = (date: Date): string => {
    return date.toISOString().split('T')[0];
};

export default function PrayerTrackerPage() {
    const [date, setDate] = useState<Date | undefined>(new Date());
    const [prayerLog, setPrayerLog] = useState<PrayerLog>({});

    const selectedDateKey = date ? formatDate(date) : '';

    const dailyStatus = useMemo((): PrayerStatus => {
        return prayerLog[selectedDateKey] || {
            Fajr: false,
            Dhuhr: false,
            Asr: false,
            Maghrib: false,
            Isha: false,
        };
    }, [prayerLog, selectedDateKey]);

    const handlePrayerToggle = (prayer: Prayer, checked: boolean) => {
        if (!date) return;
        
        const newLog = { ...prayerLog };
        const dayLog = newLog[selectedDateKey] || { Fajr: false, Dhuhr: false, Asr: false, Maghrib: false, Isha: false };
        dayLog[prayer] = checked;
        newLog[selectedDateKey] = dayLog;
        setPrayerLog(newLog);
    };

    const prayersCompleted = useMemo(() => {
        return Object.values(dailyStatus).filter(Boolean).length;
    }, [dailyStatus]);

    const progressPercentage = (prayersCompleted / PRAYERS.length) * 100;
    
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold font-headline tracking-tight">Prayer Tracker</h1>
                <p className="text-muted-foreground">Log your daily prayers to build a consistent habit.</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <Card className="lg:col-span-1">
                    <CardContent className="p-0">
                        <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        className="w-full"
                        />
                    </CardContent>
                </Card>

                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 font-headline">
                            <CheckSquare className="w-6 h-6 text-primary"/>
                            Daily Prayer Checklist
                        </CardTitle>
                        <CardDescription>
                            {date ? date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : 'Select a date'}
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        {PRAYERS.map((prayer, index) => (
                            <div key={prayer}>
                                <div className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50">
                                    <div className="flex items-center gap-4">
                                        {prayerIcons[prayer]}
                                        <Label htmlFor={prayer} className="text-lg font-medium cursor-pointer">
                                            {prayer}
                                        </Label>
                                    </div>
                                    <Checkbox
                                        id={prayer}
                                        checked={dailyStatus[prayer]}
                                        onCheckedChange={(checked) => handlePrayerToggle(prayer, !!checked)}
                                        className="h-6 w-6"
                                    />
                                </div>
                                {index < PRAYERS.length - 1 && <Separator />}
                            </div>
                        ))}
                    </CardContent>
                    <CardFooter className="flex-col items-start gap-2 pt-4">
                         <div className="w-full">
                            <div className="flex justify-between mb-1">
                                <p className="text-sm font-medium text-muted-foreground">Daily Progress</p>
                                <p className="text-sm font-bold text-primary">{prayersCompleted} / {PRAYERS.length}</p>
                            </div>
                            <Progress value={progressPercentage} className="h-2" />
                        </div>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
}
