// Type for the list of Surahs
export interface SurahListItem {
  number: number;
  name: string; // Arabic name
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: 'makkah' | 'madinah';
}

// Type for a single verse with translations
export interface Verse {
  id: number; // This will be the unique number of the verse in the Quran
  numberInSurah: number;
  text: string; // Arabic text
  audio: string | null; // URL for the audio recitation
  juz: number;
  hizb: number;
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
  revelationType: 'makkah' | 'madinah';
  numberOfAyahs: number;
  verses: Verse[];
}


export async function getSurahs(): Promise<SurahListItem[]> {
  try {
    const response = await fetch('https://api.quran.com/api/v4/chapters');
    if (!response.ok) {
      console.error('Failed to fetch surahs list from API.Quran.com');
      return [];
    }
    const data = await response.json();
    return data.chapters.map((surah: any) => ({
      number: surah.id,
      name: surah.name_arabic,
      englishName: surah.name_simple,
      englishNameTranslation: surah.translated_name.name,
      numberOfAyahs: surah.verses_count,
      revelationType: surah.revelation_place,
    }));
  } catch (error) {
    console.error('Error fetching surahs from Quran.com:', error);
    return [];
  }
}

export async function getSurah(surahNumber: number): Promise<SurahDetails | null> {
  try {
    const [chapterInfoRes, versesRes, translationEnRes, translationFrRes, audioRes] = await Promise.all([
      fetch(`https://api.quran.com/api/v4/chapters/${surahNumber}`),
      fetch(`https://api.quran.com/api/v4/verses/by_chapter/${surahNumber}?language=en&fields=text_uthmani,juz_number,hizb_number&per_page=300`),
      fetch(`https://api.quran.com/api/v4/quran/translations/131?chapter_number=${surahNumber}`), // 131: Saheeh International
      fetch(`https://api.quran.com/api/v4/quran/translations/20?chapter_number=${surahNumber}`),  // 20: Hamidullah
      fetch(`https://api.quran.com/api/v4/chapter_recitations/7/${surahNumber}`) // 7: Mishary Rashid Alafasy
    ]);

    if (!chapterInfoRes.ok || !versesRes.ok) {
        console.error(`Essential data (chapter/verse) not found for Surah ${surahNumber}`);
        return null;
    }

    const chapterInfo = await chapterInfoRes.json();
    const versesData = await versesRes.json();
    const translationEnData = translationEnRes.ok ? await translationEnRes.json() : { translations: [] };
    const translationFrData = translationFrRes.ok ? await translationFrRes.json() : { translations: [] };
    const audioData = audioRes.ok ? await audioRes.json() : { audio_files: [] };

    const translationsEnMap = new Map(translationEnData.translations.map((t: any) => [t.verse_key, t.text]));
    const translationsFrMap = new Map(translationFrData.translations.map((t: any) => [t.verse_key, t.text]));
    const audioMap = new Map(audioData.audio_files.map((a: any) => [a.verse_key, a.audio_url]));

    const verses: Verse[] = versesData.verses.map((verse: any) => {
      const verseNum = verse.verse_key.split(':')[1];
      const enText = translationsEnMap.get(verse.verse_key) || "Translation not available.";

      return {
        id: verse.id,
        numberInSurah: parseInt(verseNum, 10),
        text: verse.text_uthmani,
        juz: verse.juz_number,
        hizb: verse.hizb_number,
        audio: audioMap.get(verse.verse_key) || null,
        translations: {
          en: enText,
          fr: translationsFrMap.get(verse.verse_key) || enText, // Fallback French to English
        },
      };
    });

    return {
      number: chapterInfo.chapter.id,
      name: chapterInfo.chapter.name_arabic,
      englishName: chapterInfo.chapter.name_simple,
      revelationType: chapterInfo.chapter.revelation_place,
      numberOfAyahs: chapterInfo.chapter.verses_count,
      verses,
    };

  } catch (error) {
    console.error(`Failed to process data for surah ${surahNumber}:`, error);
    return null;
  }
}
