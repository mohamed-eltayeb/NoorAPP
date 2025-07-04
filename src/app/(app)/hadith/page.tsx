
'use client';

import { useState } from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { hadithCollections } from "@/lib/placeholder-data";
import { Search } from "lucide-react";
import Link from "next/link";

export default function HadithPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCollections = hadithCollections.filter(collection => 
    collection.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold font-headline tracking-tight">Hadith Collections</h1>
        <p className="text-muted-foreground">Explore authentic traditions of the Prophet (ﷺ).</p>
      </div>
      
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input 
          placeholder="Search collections..." 
          className="pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {filteredCollections.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredCollections.map((collection) => (
            <Link href={`/hadith/${collection.slug}`} key={collection.name}>
                <Card className="hover:bg-muted/50 transition-colors cursor-pointer h-full">
                    <CardHeader className="flex-row items-center gap-4 space-y-0">
                    <div className="text-accent">
                        {collection.icon}
                    </div>
                    <div>
                        <CardTitle className="font-headline">{collection.name}</CardTitle>
                        <p className="text-sm text-muted-foreground">{collection.total.toLocaleString()} Hadiths</p>
                    </div>
                    </CardHeader>
                </Card>
            </Link>
          ))}
        </div>
      ) : (
        <Card className="flex flex-col items-center justify-center p-12 text-center">
            <CardHeader>
                <CardTitle className="font-headline">No Collections Found</CardTitle>
                <p className="text-muted-foreground">Your search for &quot;{searchTerm}&quot; did not match any collections.</p>
            </CardHeader>
        </Card>
      )}
    </div>
  );
}
