import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { hadithCollections } from "@/lib/placeholder-data";
import { Search } from "lucide-react";

export default function HadithPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold font-headline tracking-tight">Hadith Collections</h1>
        <p className="text-muted-foreground">Explore authentic traditions of the Prophet (ﷺ).</p>
      </div>
      
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input placeholder="Search Hadith..." className="pl-10" />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {hadithCollections.map((collection) => (
          <Card key={collection.name} className="hover:bg-muted/50 transition-colors cursor-pointer">
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
        ))}
      </div>
    </div>
  );
}
