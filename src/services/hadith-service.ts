export interface HadithCollection {
    name: string; // e.g. "bukhari"
    title: string; // e.g. "Sahih al-Bukhari"
    totalHadiths: number;
}

interface HadithText {
    lang: 'en';
    body: string;
}

export interface Hadith {
    urn: number; // Will use 'id' from API
    collection: string; // The collection slug
    hadithNumber: string;
    hadith: HadithText[];
}

const API_BASE_URL = 'https://hadithapi.com/api';

async function fetchFromHadithAPI(endpoint: string): Promise<{ data: any } | { error: string }> {
    const API_KEY = process.env.NEXT_PUBLIC_HADITH_API_KEY;

    if (!API_KEY) {
        return { error: "Hadith API key is missing. Please add the NEXT_PUBLIC_HADITH_API_KEY to your .env file and restart the server." };
    }

    try {
        const url = `${API_BASE_URL}/${endpoint}${endpoint.includes('?') ? '&' : '?'}api_key=${API_KEY}`;
        const response = await fetch(url);

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            return { error: errorData.message || `API request to hadithapi.com failed with status: ${response.statusText}` };
        }
        return response.json();
    } catch (e: any) {
        return { error: "A network error occurred while fetching Hadith data. Please check your connection." };
    }
}


export async function getHadithCollections(): Promise<HadithCollection[] | { error: string }> {
    const result = await fetchFromHadithAPI('books');
    if ('error' in result) {
        return result;
    }
    
    if (!result.data || !Array.isArray(result.data)) {
         return { error: "Unexpected response structure from Hadith API for collections." };
    }

    return result.data.map((collection: any) => ({
        name: collection.slug,
        title: collection.name,
        totalHadiths: collection.hadiths_count
    }));
}

export async function getHadithCollectionDetails(collectionSlug: string): Promise<HadithCollection | { error: string }> {
    const result = await fetchFromHadithAPI(`books/${collectionSlug}`);
    if ('error' in result) {
        return result;
    }
    
    if (!result.data) {
        return { error: `Could not find details for collection: ${collectionSlug}` };
    }
    
    const collection = result.data;
    return {
        name: collection.slug,
        title: collection.name,
        totalHadiths: collection.hadiths_count
    };
}

export async function getHadithsByCollection(collectionSlug: string, page = 1, limit = 25): Promise<Hadith[] | { error: string }> {
    const result = await fetchFromHadithAPI(`books/${collectionSlug}/hadiths?limit=${limit}&page=${page}`);
    if ('error' in result) {
        return result;
    }
    
    if (!result.data || !result.data.hadiths || !result.data.hadiths.data) {
        return { error: "Unexpected response structure from Hadith API for hadiths." };
    }

    return result.data.hadiths.data.map((hadith: any): Hadith => ({
        urn: hadith.id,
        collection: collectionSlug,
        hadithNumber: hadith.hadith_number,
        hadith: [{
            body: hadith.hadith_english,
            lang: 'en'
        }],
    }));
}
