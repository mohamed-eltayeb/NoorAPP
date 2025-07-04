
'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { HandCoins, ExternalLink, Calculator } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Link from "next/link";

const zakatFormSchema = z.object({
  cash: z.coerce.number().min(0, "Value must be positive").default(0),
  goldSilver: z.coerce.number().min(0, "Value must be positive").default(0),
  investments: z.coerce.number().min(0, "Value must be positive").default(0),
  businessAssets: z.coerce.number().min(0, "Value must be positive").default(0),
  liabilities: z.coerce.number().min(0, "Value must be positive").default(0),
});

type ZakatFormValues = z.infer<typeof zakatFormSchema>;

export default function ZakatCalculatorPage() {
  const [nisab] = useState(6375); // Based on 85g of gold at ~$75/g.
  const [calculationResult, setCalculationResult] = useState<{
    zakatDue: number;
    totalAssets: number;
    zakatableWealth: number;
    isAboveNisab: boolean;
  } | null>(null);

  const form = useForm<ZakatFormValues>({
    resolver: zodResolver(zakatFormSchema),
    defaultValues: {
      cash: 0,
      goldSilver: 0,
      investments: 0,
      businessAssets: 0,
      liabilities: 0,
    },
  });

  function onSubmit(data: ZakatFormValues) {
    const totalAssets = data.cash + data.goldSilver + data.investments + data.businessAssets;
    const zakatableWealth = totalAssets - data.liabilities;
    const isAboveNisab = zakatableWealth >= nisab;
    const zakatDue = isAboveNisab ? zakatableWealth * 0.025 : 0;
    
    setCalculationResult({
        totalAssets,
        zakatableWealth,
        isAboveNisab,
        zakatDue,
    });
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold font-headline tracking-tight">Zakat Calculator</h1>
        <p className="text-muted-foreground">Calculate your annual Zakat obligation.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-0">
              <CardHeader>
                <CardTitle className="font-headline">Your Assets & Liabilities</CardTitle>
                <CardDescription>
                  Enter the values of your assets held for over one lunar year.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-6 sm:grid-cols-2">
                    <FormField
                    control={form.control}
                    name="cash"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Cash on Hand & in Banks</FormLabel>
                        <FormControl>
                            <Input type="number" placeholder="e.g., 5000" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="goldSilver"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Gold & Silver Value</FormLabel>
                        <FormControl>
                             <Input type="number" placeholder="e.g., 10000" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                     <FormField
                    control={form.control}
                    name="investments"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Stocks & Investments</FormLabel>
                        <FormControl>
                            <Input type="number" placeholder="e.g., 25000" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                     <FormField
                    control={form.control}
                    name="businessAssets"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Business Assets (Inventory)</FormLabel>
                        <FormControl>
                            <Input type="number" placeholder="e.g., 15000" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                </div>
                <Separator />
                 <FormField
                    control={form.control}
                    name="liabilities"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Liabilities / Short-Term Debts</FormLabel>
                        <FormControl>
                             <Input type="number" placeholder="e.g., 3000" {...field} />
                        </FormControl>
                        <FormDescription>
                            Immediate debts you owe to others.
                        </FormDescription>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
              </CardContent>
              <CardFooter>
                <Button type="submit">
                  <Calculator className="mr-2 h-4 w-4" />
                  Calculate Zakat
                </Button>
              </CardFooter>
            </form>
          </Form>
        </Card>

        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Your Zakat Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {calculationResult ? (
                        <div className="space-y-4">
                             <div className="flex justify-between">
                                <span className="text-muted-foreground">Total Zakatable Wealth</span>
                                <span className="font-semibold">{formatCurrency(calculationResult.zakatableWealth)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Nisab Threshold</span>
                                <span className="font-semibold">{formatCurrency(nisab)}</span>
                            </div>
                            <Separator />
                            {calculationResult.isAboveNisab ? (
                                <div className="text-center pt-2">
                                    <p className="text-muted-foreground">Zakat Due (2.5%)</p>
                                    <p className="text-3xl font-bold text-primary">{formatCurrency(calculationResult.zakatDue)}</p>
                                </div>
                            ) : (
                                <Alert>
                                    <AlertTitle>No Zakat Due</AlertTitle>
                                    <AlertDescription>
                                        Your zakatable wealth is below the Nisab threshold.
                                    </AlertDescription>
                                </Alert>
                            )}
                        </div>
                    ) : (
                         <div className="text-center py-4 text-muted-foreground">
                            <p>Your results will appear here after calculation.</p>
                        </div>
                    )}
                </CardContent>
                <CardFooter className="flex-col items-start gap-2">
                     <p className="text-xs text-muted-foreground text-center w-full">
                        Nisab is estimated based on the value of 85 grams of gold. Please verify with a local scholar for precise values.
                    </p>
                </CardFooter>
            </Card>
             <Card>
                <CardHeader>
                    <CardTitle className="font-headline flex items-center gap-2">
                       <HandCoins />
                        Pay Your Zakat
                    </CardTitle>
                </CardHeader>
                 <CardContent>
                    <p className="text-muted-foreground text-sm">Fulfill your obligation by donating to trusted causes and making a difference.</p>
                 </CardContent>
                 <CardFooter>
                    <Button asChild className="w-full">
                        <Link href="#">
                            Visit Ihsan Charity Marketplace
                            <ExternalLink className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                 </CardFooter>
            </Card>
        </div>
      </div>
    </div>
  );
}
