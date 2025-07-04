'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { islamicEvents } from "@/lib/placeholder-data";
import { BellRing, CalendarCheck2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

// Helper function to check if two dates are the same day, ignoring time
const isSameDay = (d1: Date, d2: Date) => {
  if (!d1 || !d2) return false;
  return d1.getFullYear() === d2.getFullYear() &&
         d1.getMonth() === d2.getMonth() &&
         d1.getDate() === d2.getDate();
};

export default function CalendarPage() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const { toast } = useToast();

  // Memoize event dates, adjusting for timezone to prevent off-by-one day errors
  const eventDates = React.useMemo(() => islamicEvents.map(event => {
    const eventDate = new Date(event.date);
    eventDate.setMinutes(eventDate.getMinutes() + eventDate.getTimezoneOffset());
    return eventDate;
  }), []);
  
  const modifiers = {
    events: eventDates,
  };

  const modifiersStyles = {
    events: {
      color: 'hsl(var(--primary-foreground))',
      backgroundColor: 'hsl(var(--primary))',
    },
  };
  
  // Find events for the currently selected date
  const selectedEvents = React.useMemo(() => {
    if (!date) return [];
    return islamicEvents.filter(event => {
        const eventDate = new Date(event.date);
        eventDate.setMinutes(eventDate.getMinutes() + eventDate.getTimezoneOffset());
        return isSameDay(eventDate, date);
    });
  }, [date]);

  // Get a sorted list of all upcoming events
  const upcomingEvents = React.useMemo(() => {
    const today = new Date();
    today.setHours(0,0,0,0);
    return islamicEvents
        .map(event => ({...event, dateObj: new Date(event.date)}))
        .filter(event => event.dateObj >= today)
        .sort((a,b) => a.dateObj.getTime() - b.dateObj.getTime());
  }, []);

  const handleSetReminder = (eventName: string, eventDate: string) => {
    toast({
        title: "Reminder Set!",
        description: `We'll remind you about ${eventName} on ${new Date(eventDate).toLocaleDateString()}.`,
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold font-headline tracking-tight">Islamic Calendar</h1>
        <p className="text-muted-foreground">Hijri and Gregorian dates with important events.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardContent className="p-0">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="w-full"
              modifiers={modifiers}
              modifiersStyles={modifiersStyles}
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Events on Selected Date</CardTitle>
            <CardDescription>
                {date ? date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : 'Select a date'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {selectedEvents.length > 0 ? (
                <ul className="space-y-4">
                    {selectedEvents.map(event => (
                        <li key={event.name} className="flex items-center justify-between">
                            <p className="font-medium">{event.name}</p>
                            <Badge variant="secondary" style={{ borderLeft: `3px solid ${event.color}`}}>Important</Badge>
                        </li>
                    ))}
                </ul>
            ) : (
                <div className="text-center py-8">
                    <p className="text-sm text-muted-foreground">No events on this day.</p>
                </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
            <CardTitle className="font-headline flex items-center gap-2">
                <CalendarCheck2 />
                Major Islamic Events
            </CardTitle>
            <CardDescription>A list of significant dates in the Hijri calendar.</CardDescription>
        </CardHeader>
        <CardContent>
             <ul className="space-y-4">
              {upcomingEvents.map(event => (
                 <li key={event.name} className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50">
                    <div>
                        <p className="font-medium">{event.name}</p>
                        <p className="text-sm text-muted-foreground">{new Date(event.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => handleSetReminder(event.name, event.date)}>
                        <BellRing className="h-4 w-4 text-muted-foreground" />
                        <span className="sr-only">Set reminder</span>
                    </Button>
                 </li>
              ))}
            </ul>
        </CardContent>
      </Card>
    </div>
  );
}
