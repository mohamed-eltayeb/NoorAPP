'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { BellRing } from "lucide-react";

const settingsFormSchema = z.object({
  prayerNotifications: z.boolean().default(false).describe("Enable or disable prayer time notifications."),
});

type SettingsFormValues = z.infer<typeof settingsFormSchema>;

const defaultValues: Partial<SettingsFormValues> = {
  prayerNotifications: true,
};

export default function SettingsPage() {
    const { toast } = useToast();
    const form = useForm<SettingsFormValues>({
        resolver: zodResolver(settingsFormSchema),
        defaultValues,
    });

    function onSubmit(data: SettingsFormValues) {
        toast({
            title: "Settings Saved",
            description: "Your notification preferences have been updated.",
        });
    }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold font-headline tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Manage your app preferences and notifications.</p>
      </div>

       <Card>
        <CardHeader>
            <CardTitle className="font-headline">Notifications</CardTitle>
            <CardDescription>Configure how you receive alerts from the app.</CardDescription>
        </CardHeader>
        <CardContent>
             <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                    control={form.control}
                    name="prayerNotifications"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                                <FormLabel className="text-base">Prayer Time Alerts</FormLabel>
                                <FormDescription>
                                Receive notifications for Fajr, Dhuhr, Asr, Maghrib, and Isha.
                                </FormDescription>
                            </div>
                            <FormControl>
                                <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                    />
                    <Button type="submit">
                        <BellRing />
                        Save Settings
                    </Button>
                </form>
            </Form>
        </CardContent>
       </Card>
    </div>
  );
}
