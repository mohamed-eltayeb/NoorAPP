import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { bookmarks } from "@/lib/placeholder-data";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

export default function BookmarksPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold font-headline tracking-tight">Bookmarks</h1>
        <p className="text-muted-foreground">Your saved verses and hadiths for quick access.</p>
      </div>

      {bookmarks.length > 0 ? (
        <div className="space-y-4">
          {bookmarks.map((bookmark, index) => (
            <Card key={index}>
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="text-primary">
                    {bookmark.icon}
                  </div>
                  <div>
                    <p className="font-semibold">{bookmark.text}</p>
                    <p className="text-sm text-muted-foreground">{bookmark.type}</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive">
                  <Trash2 className="h-4 w-4"/>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="flex flex-col items-center justify-center p-12 text-center">
            <CardHeader>
                <CardTitle className="font-headline">No Bookmarks Yet</CardTitle>
                <p className="text-muted-foreground">You can bookmark verses and hadiths as you read them.</p>
            </CardHeader>
        </Card>
      )}
    </div>
  );
}
