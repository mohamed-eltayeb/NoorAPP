import { getHadithsByCollection, getHadithCollectionDetails, getHadithCollections } from '@/services/hadith-service';
import { HadithCollectionClient } from './hadith-collection-client';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';

// Generate static params for known collections
export async function generateStaticParams() {
  try {
    const collections = await getHadithCollections();
    if (Array.isArray(collections)) {
      return collections.map((collection) => ({
        collectionSlug: collection.name,
      }));
    }
  } catch (error) {
    console.warn('Could not fetch hadith collections for static generation:', error);
  }
  
  // Fallback to common hadith collections
  return [
    { collectionSlug: 'bukhari' },
    { collectionSlug: 'muslim' },
    { collectionSlug: 'tirmidhi' },
    { collectionSlug: 'abudawud' },
    { collectionSlug: 'nasai' },
    { collectionSlug: 'ibnmajah' },
  ];
}

export default async function HadithCollectionPage({ params }: { params: { collectionSlug: string } }) {
  const { collectionSlug } = params;

  // Fetch initial data on the server
  const [hadithResult, collectionResult] = await Promise.all([
    getHadithsByCollection(collectionSlug),
    getHadithCollectionDetails(collectionSlug)
  ]);

  // Handle errors
  if ('error' in hadithResult || 'error' in collectionResult) {
    const errorMessage = 'error' in hadithResult ? hadithResult.error : collectionResult.error;
    return (
      <Alert variant="destructive">
        <Terminal className="h-4 w-4" />
        <AlertTitle>Error Loading Hadiths</AlertTitle>
        <AlertDescription>{errorMessage}</AlertDescription>
      </Alert>
    );
  }

  // Pass data to client component
  return (
    <HadithCollectionClient 
      initialHadiths={hadithResult}
      collectionTitle={collectionResult.title}
      collectionSlug={collectionSlug}
    />
  );
}
