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
  id: number;
  numberInSurah: number;
  text: string; // Arabic text
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
    const response = await fetch(`https://api.alquran.cloud/v1/surah/${surahNumber}/editions/quran-uthmani,en.sahih,fr.hamidullah`);
    if (!response.ok) {
      throw new Error(`Failed to fetch surah ${surahNumber}`);
    }
    const data = await response.json();
    
    const arabicEdition = data.data[0];
    const englishEdition = data.data[1];
    const frenchEdition = data.data[2];

    const verses: Verse[] = arabicEdition.ayahs.map((ayah: any, index: number) => ({
      id: ayah.numberInSurah,
      numberInSurah: ayah.numberInSurah,
      text: ayah.text,
      translations: {
        en: englishEdition.ayahs[index].text,
        fr: frenchEdition.ayahs[index].text,
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
