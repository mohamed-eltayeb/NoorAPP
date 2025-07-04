
'use client';

import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Progress } from "@/components/ui/progress";
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { CheckSquare, Moon, Sun, SunMedium, Sunrise, Sunset, User, Users, XCircle } from 'lucide-react';
import { usePrayerTracker, PRAYERS, Prayer, PrayerStatus } from '@/context/prayer-tracker-context';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { cn } from '@/lib/utils';

const prayerIcons: Record<Prayer, React.ReactElement> = {
    Fajr: <Sunrise className="w-5 h-5 text-muted-foreground" />,
    Dhuhr: <Sun className="w-5 h-5 text-muted-foreground" />,
    Asr: <SunMedium className="w-5 h-5 text-muted-foreground" />,
    Maghrib: <Sunset className="w-5 h-5 text-muted-foreground" />,
    Isha: <Moon className="w-5 h-5 text-muted-foreground" />,
};

const statusOptions: {value: PrayerStatus, label: string, icon: React.ReactElement}[] = [
    { value: 'jamaah', label: "Jama'ah", icon: <Users className="w-4 h-4" /> },
    { value: 'alone', label: "Alone", icon: <User className="w-4 h-4" /> },
    { value: 'missed', label: "Missed", icon: <XCircle className="w-4 h-4" /> },
];

// Helper to format date to 'YYYY-MM-DD'
const formatDate = (date: Date): string => {
    return date.toISOString().split('T')[0];
};

export default function PrayerTrackerPage() {
    const [date, setDate] = useState<Date | undefined>(new Date());
    const { prayerLog, updatePrayerStatus } = usePrayerTracker();

    const selectedDateKey = date ? formatDate(date) : '';
    
    const dailyStatus = useMemo(() => {
        return prayerLog[selectedDateKey] || {
            Fajr: 'unprayed', Dhuhr: 'unprayed', Asr: 'unprayed', Maghrib: 'unprayed', Isha: 'unprayed'
        };
    }, [prayerLog, selectedDateKey]);


    const handlePrayerStatusChange = (prayer: Prayer, status: PrayerStatus) => {
        if (!date) return;
        updatePrayerStatus(selectedDateKey, prayer, status);
    };

    const prayersCompleted = useMemo(() => {
        return Object.values(dailyStatus).filter(status => status === 'jamaah' || status === 'alone').length;
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
                    <CardContent className="space-y-4">
                        {PRAYERS.map((prayer, index) => (
                            <div key={prayer}>
                                <div className="flex flex-col gap-4 p-3 rounded-lg hover:bg-muted/50">
                                    <div className="flex items-center gap-4">
                                        {prayerIcons[prayer]}
                                        <Label htmlFor={prayer} className="text-lg font-medium">
                                            {prayer}
                                        </Label>
                                    </div>
                                    <RadioGroup
                                        id={prayer}
                                        value={dailyStatus[prayer]}
                                        onValueChange={(value) => handlePrayerStatusChange(prayer, value as PrayerStatus)}
                                        className="grid grid-cols-2 sm:grid-cols-4 gap-2"
                                    >
                                        {statusOptions.map(opt => (
                                             <div key={opt.value}>
                                                <RadioGroupItem value={opt.value} id={`${prayer}-${opt.value}`} className="peer sr-only" />
                                                <Label htmlFor={`${prayer}-${opt.value}`} className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-3 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                                                    {opt.icon}
                                                    {opt.label}
                                                </Label>
                                            </div>
                                        ))}
                                         <div>
                                            <RadioGroupItem value="unprayed" id={`${prayer}-unprayed`} className="peer sr-only" />
                                        </div>
                                    </RadioGroup>
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
