
'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { getHadithsForCollection } from '@/lib/placeholder-data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Search, Bookmark, Copy, Terminal } from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function HadithCollectionPage() {
    const params = useParams();
    const { toast } = useToast();
    const collectionSlug = params.collectionSlug as string;
    
    const collectionData = getHadithsForCollection(collectionSlug);
    
    const [searchTerm, setSearchTerm] = useState('');

    if (!collectionData) {
        return (
             <Alert variant="destructive">
                <Terminal className="h-4 w-4" />
                <AlertTitle>Collection Not Found</AlertTitle>
                <AlertDescription>The requested Hadith collection could not be found.</AlertDescription>
            </Alert>
        )
    }

    const filteredHadiths = collectionData.hadiths.filter(hadith =>
        hadith.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
        hadith.reference.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text);
        toast({
            title: "Copied to clipboard!",
            description: "The hadith text has been copied.",
        });
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Button variant="outline" size="icon" asChild>
                    <Link href="/hadith">
                        <ArrowLeft />
                        <span className="sr-only">Back to collections</span>
                    </Link>
                </Button>
                <div>
                    <h1 className="text-3xl font-bold font-headline tracking-tight">{collectionData.name}</h1>
                    <p className="text-muted-foreground">Browse and search hadiths from this collection.</p>
                </div>
            </div>

            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                    placeholder={`Search in ${collectionData.name}...`}
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="space-y-4">
                {filteredHadiths.length > 0 ? (
                    filteredHadiths.map(hadith => (
                        <Card key={hadith.id}>
                            <CardContent className="p-6 space-y-4">
                                <p className="text-lg leading-relaxed">{hadith.text}</p>
                                <div className="flex items-center justify-between text-sm text-muted-foreground">
                                    <p className="font-semibold">{hadith.reference}</p>
                                    <div className="flex items-center gap-2">
                                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleCopy(hadith.text)}>
                                            <Copy className="h-4 w-4" />
                                            <span className="sr-only">Copy</span>
                                        </Button>
                                        <Button variant="ghost" size="icon" className="h-8 w-8">
                                            <Bookmark className="h-4 w-4" />
                                            <span className="sr-only">Bookmark</span>
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))
                ) : (
                     <Card className="flex flex-col items-center justify-center p-12 text-center">
                        <CardHeader>
                            <CardTitle className="font-headline">No Hadiths Found</CardTitle>
                            <p className="text-muted-foreground">Your search for &quot;{searchTerm}&quot; did not match any hadiths in this collection.</p>
                        </CardHeader>
                    </Card>
                )}
            </div>
        </div>
    );
}
