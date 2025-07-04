'use client';

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RotateCcw, Plus } from "lucide-react";

const tasbeehOptions = [
  { label: "Subhan'Allah", target: 33 },
  { label: "Alhamdulillah", target: 33 },
  { label: "Allahu Akbar", target: 34 },
  { label: "La ilaha illallah", target: 0 },
  { label: "Custom", target: 0 },
];

const advancingTasbeehs = tasbeehOptions.filter(t => t.target > 0);

export default function TasbeehPage() {
  const [count, setCount] = useState(0);
  const [selectedTasbeehLabel, setSelectedTasbeehLabel] = useState(tasbeehOptions[0].label);

  const selectedTasbeeh = tasbeehOptions.find(t => t.label === selectedTasbeehLabel) || tasbeehOptions[0];

  useEffect(() => {
    if (selectedTasbeeh.target > 0 && count >= selectedTasbeeh.target) {
        const currentIndex = advancingTasbeehs.findIndex(t => t.label === selectedTasbeeh.label);
        if (currentIndex !== -1) {
            const nextIndex = (currentIndex + 1) % advancingTasbeehs.length;
            const nextTasbeeh = advancingTasbeehs[nextIndex];
            
            const timer = setTimeout(() => {
                setSelectedTasbeehLabel(nextTasbeeh.label);
                setCount(0);
            }, 500);

            return () => clearTimeout(timer);
        }
    }
  }, [count, selectedTasbeeh, selectedTasbeehLabel]);


  const handleIncrement = () => {
    setCount(prevCount => prevCount + 1);
  };

  const handleReset = () => {
    setCount(0);
  };

  const handleSelectChange = (value: string) => {
    setSelectedTasbeehLabel(value);
    setCount(0);
  };

  const progress = selectedTasbeeh.target > 0 ? (count / selectedTasbeeh.target) * 100 : 0;

  return (
    <div className="space-y-6">
       <div>
        <h1 className="text-3xl font-bold font-headline tracking-tight">Tasbeeh</h1>
        <p className="text-muted-foreground">Your digital counter for dhikr.</p>
      </div>
      <Card className="max-w-md mx-auto">
        <CardHeader className="text-center">
            <Select onValueChange={handleSelectChange} value={selectedTasbeeh.label}>
                <SelectTrigger className="w-[200px] mx-auto font-semibold">
                    <SelectValue placeholder="Select Tasbeeh" />
                </SelectTrigger>
                <SelectContent>
                    {tasbeehOptions.map(option => (
                        <SelectItem key={option.label} value={option.label}>{option.label}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <CardDescription className="mt-2 font-medium">
                {selectedTasbeeh.target > 0 ? `Recite ${selectedTasbeeh.target} times` : 'Recite freely'}
            </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center space-y-4">
            <div className="relative w-56 h-56 flex items-center justify-center">
                <svg className="absolute w-full h-full" viewBox="0 0 100 100">
                    <circle
                        className="text-muted/20"
                        stroke="currentColor"
                        strokeWidth="8"
                        cx="50"
                        cy="50"
                        r="42"
                        fill="transparent"
                    />
                    <circle
                        className="text-primary"
                        stroke="currentColor"
                        strokeWidth="8"
                        cx="50"
                        cy="50"
                        r="42"
                        fill="transparent"
                        strokeDasharray={2 * Math.PI * 42}
                        strokeDashoffset={(2 * Math.PI * 42) * (1 - progress / 100)}
                        transform="rotate(-90 50 50)"
                        style={{ transition: 'stroke-dashoffset 0.3s' }}
                    />
                </svg>
                <h2 className="text-7xl font-bold font-mono">{count}</h2>
            </div>
          <p className="text-2xl text-muted-foreground font-headline font-semibold">{selectedTasbeeh.label}</p>
        </CardContent>
        <CardFooter className="flex justify-center gap-4 pt-4">
            <Button onClick={handleIncrement} className="w-24 h-24 rounded-full flex-col gap-1 shadow-lg">
                <Plus className="w-8 h-8"/>
                <span className="text-xs font-semibold tracking-wider">COUNT</span>
            </Button>
            <Button onClick={handleReset} variant="outline" size="icon" className="w-12 h-12 rounded-full absolute bottom-6 right-6">
                <RotateCcw className="w-5 h-5"/>
                <span className="sr-only">Reset</span>
            </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
