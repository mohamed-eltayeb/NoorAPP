import { getSurah, getSurahs } from '@/services/quran-service';
import { SurahView } from '@/components/surah-view';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';

// This function runs at build time to tell Next.js which pages to pre-render.
// It can only be used in a Server Component.
export async function generateStaticParams() {
  const surahs = await getSurahs();
  return surahs.map((surah) => ({
    surahNumber: String(surah.number),
  }));
}

// This is the Server Component for the page.
// It fetches data and passes it to the Client Component.
export default async function SurahPage({ params }: { params: { surahNumber: string } }) {
  const surahNumber = Number(params.surahNumber);

  if (isNaN(surahNumber) || surahNumber < 1 || surahNumber > 114) {
    return (
      <Alert variant="destructive">
        <Terminal className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>Invalid Surah number provided.</AlertDescription>
      </Alert>
    );
  }

  try {
    const surahDetails = await getSurah(surahNumber);
    if (!surahDetails) {
        throw new Error("Surah details not found.");
    }
    // We render the interactive client component and pass the fetched data to it.
    return <SurahView surahDetails={surahDetails} />;
  } catch (error) {
    console.error(error);
    return (
      <Alert variant="destructive">
        <Terminal className="h-4 w-4" />
        <AlertTitle>Error Loading Surah</AlertTitle>
        <AlertDescription>Failed to load the details for this Surah. Please try again later.</AlertDescription>
      </Alert>
    );
  }
}
