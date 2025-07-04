import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { islamicEvents } from "@/lib/placeholder-data";
import { Calendar } from "lucide-react";

export function UpcomingEvents() {
    const today = new Date();
    today.setHours(0,0,0,0);
    
    const upcoming = islamicEvents
        .map(event => ({...event, dateObj: new Date(event.date)}))
        .filter(event => event.dateObj >= today)
        .sort((a,b) => a.dateObj.getTime() - b.dateObj.getTime())
        .slice(0, 3);

    return (
        <Card>
            <CardHeader>
                <CardTitle className="font-headline flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-accent" />
                    Upcoming Events
                </CardTitle>
                <CardDescription>Key dates in the Islamic calendar.</CardDescription>
            </CardHeader>
            <CardContent>
                {upcoming.length > 0 ? (
                    <ul className="space-y-4">
                        {upcoming.map(event => (
                            <li key={event.name} className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium">{event.name}</p>
                                    <p className="text-sm text-muted-foreground">{event.dateObj.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}</p>
                                </div>
                                <Badge variant="secondary">Hijri Date</Badge>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-sm text-muted-foreground text-center py-4">No upcoming events found.</p>
                )}
            </CardContent>
        </Card>
    )
}
