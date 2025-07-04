'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { islamicEvents } from "@/lib/placeholder-data";

export default function CalendarPage() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  const eventDates = islamicEvents.map(event => new Date(event.date));
  
  const modifiers = {
    events: eventDates,
  };

  const modifiersStyles = {
    events: {
      color: 'hsl(var(--accent-foreground))',
      backgroundColor: 'hsl(var(--accent))',
    },
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
            <CardTitle className="font-headline">Upcoming Events</CardTitle>
            <CardDescription>Key dates in the Islamic calendar.</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {islamicEvents.map(event => (
                 <li key={event.name} className="flex items-center justify-between">
                    <div>
                        <p className="font-medium">{event.name}</p>
                        <p className="text-sm text-muted-foreground">{new Date(event.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}</p>
                    </div>
                    <Badge variant="secondary" style={{ borderLeft: `3px solid ${event.color}`}}>Hijri Date</Badge>
                 </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
