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
const API_KEY = process.env.SUNNAH_API_KEY;

async function fetchFromSunnahAPI(endpoint: string) {
    if (!API_KEY) {
        throw new Error("Sunnah.com API key is missing. Please add it to your .env file.");
    }
    const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
        headers: { 'X-API-Key': API_KEY }
    });
    if (!response.ok) {
        throw new Error(`Failed to fetch from Sunnah.com API: ${response.statusText}`);
    }
    return response.json();
}

export async function getHadithCollections(): Promise<HadithCollection[]> {
    try {
        const data = await fetchFromSunnahAPI('collections');
        return data.data;
    } catch (error) {
        console.error("Error fetching Hadith collections:", error);
        return [];
    }
}

export async function getHadithsByCollection(collectionSlug: string, page = 1, limit = 25): Promise<Hadith[]> {
    try {
        const data = await fetchFromSunnahAPI(`collections/${collectionSlug}/hadiths?limit=${limit}&page=${page}`);
        return data.data;
    } catch (error) {
        console.error(`Error fetching Hadiths for ${collectionSlug}:`, error);
        return [];
    }
}
