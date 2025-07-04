// Type for the list of Surahs
export interface SurahListItem {
  number: number;
  name: string; // Arabic name
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: 'Meccan' | 'Medinan';
}

// Type for a single verse with translations
export interface Verse {
  id: number; // This will be the unique number of the verse in the Quran
  numberInSurah: number;
  text: string; // Arabic text
  audio: string; // URL for the audio recitation
  juz: number;
  hizbQuarter: number;
  translations: {
    en: string;
    fr: string;
  };
}

// Type for the full Surah details
export interface SurahDetails {
  number: number;
  name: string; // Arabic name
  englishName: string;
  revelationType: 'Meccan' | 'Medinan';
  numberOfAyahs: number;
  verses: Verse[];
}

export async function getSurahs(): Promise<SurahListItem[]> {
  try {
    const response = await fetch('https://api.alquran.cloud/v1/surah');
    if (!response.ok) {
      throw new Error('Failed to fetch surahs');
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching surahs:', error);
    throw error;
  }
}

export async function getSurah(surahNumber: number): Promise<SurahDetails> {
  try {
    // Fetch multiple editions: Arabic text, English/French translations, and Arabic audio
    const response = await fetch(`https://api.alquran.cloud/v1/surah/${surahNumber}/editions/quran-uthmani,en.sahih,fr.hamidullah,ar.alafasy`);
    if (!response.ok) {
      throw new Error(`Failed to fetch surah ${surahNumber}`);
    }
    const data = await response.json();
    
    const arabicEdition = data.data.find((e: any) => e.identifier === 'quran-uthmani');
    const englishEdition = data.data.find((e: any) => e.identifier === 'en.sahih');
    const frenchEdition = data.data.find((e: any) => e.identifier === 'fr.hamidullah');
    const audioEdition = data.data.find((e: any) => e.identifier === 'ar.alafasy');

    // Make the french edition optional to prevent crashes if the API doesn't return it.
    if (!arabicEdition || !englishEdition || !audioEdition) {
        throw new Error(`One or more required editions (Arabic, English, Audio) not found for Surah ${surahNumber}`);
    }

    const verses: Verse[] = arabicEdition.ayahs.map((ayah: any, index: number) => ({
      id: ayah.number, // The unique number for the verse in the whole Quran
      numberInSurah: ayah.numberInSurah,
      text: ayah.text,
      juz: ayah.juz,
      hizbQuarter: ayah.hizbQuarter,
      audio: audioEdition.ayahs[index].audio,
      translations: {
        en: englishEdition.ayahs[index].text,
        // Fallback to English if the French translation is not available from the API for this surah
        fr: frenchEdition ? frenchEdition.ayahs[index].text : englishEdition.ayahs[index].text,
      }
    }));

    return {
      number: arabicEdition.number,
      name: arabicEdition.name,
      englishName: arabicEdition.englishName,
      revelationType: arabicEdition.revelationType,
      numberOfAyahs: arabicEdition.numberOfAyahs,
      verses,
    };

  } catch (error) {
    console.error(`Error fetching surah ${surahNumber}:`, error);
    throw error;
  }
}
