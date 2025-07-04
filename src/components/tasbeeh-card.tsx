'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from "@/components/ui/card";
import { Repeat, RotateCcw, Plus } from "lucide-react";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const tasbeehOptions = [
  { label: "Subhan'Allah", target: 33 },
  { label: "Alhamdulillah", target: 33 },
  { label: "Allahu Akbar", target: 34 },
];

export function TasbeehCard() {
  const [count, setCount] = useState(0);
  const [selectedTasbeehLabel, setSelectedTasbeehLabel] = useState(tasbeehOptions[0].label);

  const selectedTasbeeh = tasbeehOptions.find(t => t.label === selectedTasbeehLabel) || tasbeehOptions[0];

  const handleIncrement = () => {
    const newCount = count + 1;
    if (selectedTasbeeh.target > 0 && newCount >= selectedTasbeeh.target) {
        const currentIndex = tasbeehOptions.findIndex(t => t.label === selectedTasbeeh.label);
        const nextIndex = (currentIndex + 1) % tasbeehOptions.length;
        setSelectedTasbeehLabel(tasbeehOptions[nextIndex].label);
        setCount(0);
    } else {
        setCount(newCount);
    }
  };

  const handleReset = () => {
    setCount(0);
  };

  const handleSelectChange = (value: string) => {
    setSelectedTasbeehLabel(value);
    setCount(0);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline flex items-center gap-2">
            <Repeat className="w-5 h-5 text-accent"/>
            Tasbeeh Counter
        </CardTitle>
        <CardDescription>
            <Link href="/tasbeeh" className="text-sm text-muted-foreground hover:underline hover:text-primary">
                Go to full page counter &rarr;
            </Link>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-4 pt-2">
        <Select onValueChange={handleSelectChange} value={selectedTasbeeh.label}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Dhikr" />
            </SelectTrigger>
            <SelectContent>
                {tasbeehOptions.map(option => (
                    <SelectItem key={option.label} value={option.label}>{option.label}</SelectItem>
                ))}
            </SelectContent>
        </Select>
        <div className="text-6xl font-bold font-mono text-center">
            {count}
            <span className="text-2xl text-muted-foreground">/{selectedTasbeeh.target}</span>
        </div>
      </CardContent>
      <CardFooter className="flex justify-center gap-4">
        <Button onClick={handleIncrement} className="h-16 w-16 rounded-full flex-col shadow-md">
            <Plus className="w-6 h-6"/>
            <span className="sr-only">Increment</span>
        </Button>
        <Button onClick={handleReset} variant="outline" size="icon" className="h-10 w-10 rounded-full">
            <RotateCcw className="w-4 h-4"/>
            <span className="sr-only">Reset</span>
        </Button>
      </CardFooter>
    </Card>
  );
}
