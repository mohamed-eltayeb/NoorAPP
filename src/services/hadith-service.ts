export interface HadithCollection {
    name: string;
    title: string;
    totalHadiths: number;
}

interface HadithText {
    lang: 'en' | 'ar';
    chapterId: string | null;
    chapterTitle: string | null;
    urn: number;
    body: string;
    bookId: string | null;
    bookTitle: string | null;
}

export interface Hadith {
    urn: number;
    collection: string;
    book: {
        id: string;
        name: string;
        arabic_name: string;
    },
    hadithNumber: string;
    hadith: HadithText[];
}

const API_BASE_URL = 'https://api.sunnah.com/v1';

async function fetchFromSunnahAPI(endpoint: string): Promise<{ data: any } | { error: string }> {
    const API_KEY = process.env.NEXT_PUBLIC_SUNNAH_API_KEY;

    if (!API_KEY) {
        return { error: "Sunnah.com API key is missing. Please add the NEXT_PUBLIC_SUNNAH_API_KEY to your .env file and restart the server." };
    }

    try {
        const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
            headers: { 'X-API-Key': API_KEY }
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            return { error: errorData.message || `API request failed: ${response.statusText}` };
        }
        return response.json();
    } catch (e: any) {
        return { error: "A network error occurred while fetching Hadith data. Please check your connection." };
    }
}

export async function getHadithCollections(): Promise<HadithCollection[] | { error: string }> {
    const result = await fetchFromSunnahAPI('collections');
    if ('error' in result) {
        return result;
    }
    return result.data;
}

export async function getHadithCollectionDetails(collectionSlug: string): Promise<HadithCollection | { error: string }> {
    const result = await fetchFromSunnahAPI(`collections/${collectionSlug}`);
    if ('error' in result) {
        return result;
    }
    return result.data;
}

export async function getHadithsByCollection(collectionSlug: string, page = 1, limit = 25): Promise<Hadith[] | { error: string }> {
    const result = await fetchFromSunnahAPI(`collections/${collectionSlug}/hadiths?limit=${limit}&page=${page}`);
    if ('error' in result) {
        return result;
    }
    return result.data;
}
