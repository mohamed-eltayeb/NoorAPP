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
    urn: number; 
    collection: string; 
    hadithNumber: string;
    hadith: HadithText[];
}

const API_BASE_URL = 'https://api.sunnah.com/v1';
const API_KEY = process.env.NEXT_PUBLIC_SUNNAH_API_KEY;

async function fetchFromSunnahAPI(endpoint: string): Promise<{ data: any } | { error: string }> {
    if (!API_KEY) {
        return { error: "Sunnah.com API key is missing. Please add NEXT_PUBLIC_SUNNAH_API_KEY to your .env file and restart the server." };
    }

    try {
        const url = `${API_BASE_URL}/${endpoint}`;
        const response = await fetch(url, {
            headers: { 'X-API-Key': API_KEY }
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            return { error: errorData.error || `API request to sunnah.com failed with status: ${response.statusText}` };
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
    
    if (!result.data || !Array.isArray(result.data.data)) {
         return { error: "Unexpected response structure from Sunnah.com API for collections." };
    }

    return result.data.data.map((collection: any) => ({
        name: collection.name,
        title: collection.title,
        totalHadiths: collection.totalHadiths
    }));
}

export async function getHadithCollectionDetails(collectionSlug: string): Promise<HadithCollection | { error: string }> {
    const result = await fetchFromSunnahAPI(`collections/${collectionSlug}`);
    if ('error' in result) {
        return result;
    }
    
    if (!result.data) {
        return { error: `Could not find details for collection: ${collectionSlug}` };
    }
    
    const collection = result.data;
    return {
        name: collection.name,
        title: collection.title,
        totalHadiths: collection.totalHadiths
    };
}

export async function getHadithsByCollection(collectionSlug: string, page = 1, limit = 25): Promise<Hadith[] | { error: string }> {
    const result = await fetchFromSunnahAPI(`collections/${collectionSlug}/hadiths?limit=${limit}&page=${page}`);
    if ('error' in result) {
        return result;
    }
    
    if (!result.data || !result.data.data) {
        return { error: "Unexpected response structure from Sunnah.com API for hadiths." };
    }

    // The sunnah.com API returns hadith objects that match our Hadith interface quite well.
    // The hadith text is nested inside the 'hadith' array property.
    return result.data.data;
}
