
import React from 'react';
import { BookOpen, Bookmark, Calendar, LayoutDashboard, Moon, ScrollText, Sun, SunMedium, Sunrise, Sunset } from "lucide-react";

export const hadithCollections = [
    { name: 'Sahih al-Bukhari', slug: 'sahih-al-bukhari', total: 7563, icon: React.createElement(ScrollText) },
    { name: 'Sahih Muslim', slug: 'sahih-muslim', total: 7563, icon: React.createElement(ScrollText) },
    { name: 'Jami` at-Tirmidhi', slug: 'jami-at-tirmidhi', total: 3956, icon: React.createElement(ScrollText) },
    { name: 'Sunan an-Nasa\'i', slug: 'sunan-an-nasai', total: 5758, icon: React.createElement(ScrollText) },
    { name: 'Sunan Abi Dawud', slug: 'sunan-abi-dawud', total: 5274, icon: React.createElement(ScrollText) },
    { name: 'Sunan Ibn Majah', slug: 'sunan-ibn-majah', total: 4341, icon: React.createElement(ScrollText) },
];

export const bookmarks = [
    { type: 'Verse', text: 'Al-Baqarah, 2:255 (Ayat al-Kursi)', icon: React.createElement(BookOpen, { className: "text-primary"}) },
    { type: 'Hadith', text: 'Bukhari, Hadith 1: On intentions', icon: React.createElement(ScrollText, { className: "text-primary"}) },
    { type: 'Verse', text: 'Ar-Rahman, 55:13', icon: React.createElement(BookOpen, { className: "text-primary"}) },
];

export const islamicEvents = [
    { date: '2024-07-07', name: 'Islamic New Year (1446 AH)', color: 'hsl(var(--primary))' },
    { date: '2024-07-16', name: 'Day of Ashura', color: 'hsl(var(--accent))' },
    { date: '2024-09-15', name: 'Mawlid al-Nabi', color: 'hsl(var(--primary))' },
    { date: '2025-01-27', name: 'Laylat al-Miraj', color: 'hsl(var(--accent))' },
    { date: '2025-02-14', name: 'Laylat al-Bara\'at', color: 'hsl(var(--primary))' },
    { date: '2025-03-01', name: 'Start of Ramadan', color: 'hsl(var(--accent))' },
    { date: '2025-03-27', name: 'Laylat al-Qadr', color: 'hsl(var(--primary))' },
    { date: '2025-03-31', name: 'Eid al-Fitr', color: 'hsl(var(--accent))' },
    { date: '2025-06-06', name: 'Day of Arafah', color: 'hsl(var(--primary))' },
    { date: '2025-06-07', name: 'Eid al-Adha', color: 'hsl(var(--accent))' },
];

export const athkar = {
    morning: [
        {
          title: 'Ayat al-Kursi',
          arabic: 'ٱللَّهُ لَآ إِلَٰهَ إِلَّا هُوَ ٱلْحَىُّ ٱلْقَيُّومُ ۚ لَا تَأْخُذُهُۥ سِنَةٌ وَلَا نَوْمٌ ۚ لَّهُۥ مَا فِى ٱلسَّمَٰوَٰتِ وَمَا فِى ٱلْأَرْضِ ۗ مَن ذَا ٱلَّذِى يَشْفَعُ عِندَهُۥٓ إِلَّا بِإِذْنِهِۦ ۚ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ ۖ وَلَا يُحِيطُونَ بِشَىْءٍ مِّنْ عِلْمِهِۦٓ إِلَّا بِمَا شَآءَ ۚ وَسِعَ كُرْسِيُّهُ ٱلسَّمَٰوَٰتِ وَٱلْأَرْضَ ۖ وَلَا يَـُٔودُهُۥ حِفْظُهُمَا ۚ وَهُوَ ٱلْعَلِىُّ ٱلْعَظِيمُ',
          translation: 'Allah - there is no deity except Him, the Ever-Living, the Sustainer of [all] existence. Neither drowsiness overtakes Him nor sleep. To Him belongs whatever is in the heavens and whatever is on the earth. Who is it that can intercede with Him except by His permission? He knows what is [presently] before them and what will be after them, and they encompass not a thing of His knowledge except for what He wills. His Kursi extends over the heavens and the earth, and their preservation tires Him not. And He is the Most High, the Most Great.',
          reference: 'Recite once. Al-Baqarah 2:255',
        },
        {
          title: 'Protection from Evil',
          arabic: 'أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ',
          translation: 'I seek refuge in the perfect words of Allah from the evil of that which He has created.',
          reference: 'Recite three times. Muslim',
        },
    ],
    evening: [
        {
          title: 'The Last Two Verses of Al-Baqarah',
          arabic: 'ءَامَنَ ٱلرَّسُولُ بِمَآ أُنزِلَ إِلَيْهِ مِن رَّبِّهِۦ وَٱلْمُؤْمِنُونَ ۚ كُلٌّ ءَامَنَ بِٱللَّهِ وَمَلَٰٓئِكَتِهِۦ وَكُتُبِهِۦ وَرُسُلِهِۦ لَا نُفَرِّقُ بَيْنَ أَحَدٍ مِّن رُّسُلِهِۦ ۚ وَقَالُوا۟ سَمِعْنَا وَأَطَعْنَا ۖ غُفْرَانَكَ رَبَّنَا وَإِلَيْكَ ٱلْمَصِيرُ...',
          translation: 'The Messenger has believed in what was revealed to him from his Lord, and [so have] the believers. All of them have believed in Allah and His angels and His books and His messengers, [saying], "We make no distinction between any of His messengers." And they say, "We hear and we obey. [We seek] Your forgiveness, our Lord, and to You is the [final] destination...',
          reference: 'Recite once. Al-Baqarah 2:285-286',
        },
        {
          title: 'Praise and Gratitude',
          arabic: 'اللَّهُمَّ مَا أَمْسَى بِي مِنْ نِعْمَةٍ أَوْ بِأَحَدٍ مِنْ خَلْقِكَ فَمِنْكَ وَحْدَكَ لَا شَرِيكَ لَكَ، فَلَكَ الْحَمْدُ وَلَكَ الشُّكْرُ',
          translation: 'O Allah, whatever blessing has been received by me or anyone of Your creation is from You alone, You have no partner. For You is all praise and for You is all thanks.',
          reference: 'Recite once. Abu Dawud',
        }
    ]
}

const hadithsByCollection = {
  'sahih-al-bukhari': {
    name: 'Sahih al-Bukhari',
    hadiths: [
      { id: 1, text: 'Narrated \'Umar bin Al-Khattab: I heard Allah\'s Messenger (ﷺ) saying, "The reward of deeds depends upon the intentions and every person will get the reward according to what he has intended. So whoever emigrated for worldly benefits or for a woman to marry, his emigration was for what he emigrated for."', reference: 'Book 1, Hadith 1' },
      { id: 2, text: 'Narrated Aisha: (the mother of the faithful believers) Al-Harith bin Hisham asked Allah\'s Messenger (ﷺ), "O Allah\'s Messenger (ﷺ)! How is the Divine Inspiration revealed to you?" Allah\'s Messenger (ﷺ) replied, "Sometimes it is (revealed) like the ringing of a bell, this form of Inspiration is the hardest of all and then this state passes off after I have grasped what is inspired. Sometimes the Angel comes in the form of a man and talks to me and I grasp whatever he says." \'Aisha added: Verification (of the Divine Inspiration) was never interrupted even on very cold days.', reference: 'Book 1, Hadith 2' },
      { id: 3, text: 'Narrated Ibn `Abbas: Allah\'s Messenger (ﷺ) was the most generous of all the people, and he used to reach the peak in generosity in the month of Ramadan when Gabriel met him. Gabriel used to meet him every night of Ramadan to teach him the Qur\'an. Allah\'s Messenger (ﷺ) was the most generous person, even more generous than the strong uncontrollable wind (in readiness and haste to do charitable deeds).', reference: 'Book 1, Hadith 5' },
      { id: 4, text: 'Narrated `Abdullah bin `Umar: Allah\'s Messenger (ﷺ) said: Islam is based on (the following) five (principles): 1. To testify that none has the right to be worshipped but Allah and Muhammad is Allah\'s Messenger (ﷺ). 2. To offer the (compulsory congregational) prayers dutifully and perfectly. 3. To pay Zakat (i.e. obligatory charity). 4. To perform Hajj. (i.e. Pilgrimage to Mecca) 5. To observe fast during the month of Ramadan.', reference: 'Book 2, Hadith 1' },
      { id: 5, text: 'Narrated Abu Huraira: The Prophet (ﷺ) said, "Faith (Belief) consists of more than sixty branches (i.e. parts). And Haya (This term "Haya" covers a large number of concepts which are to be taken together; amongst them are self respect, modesty, bashfulness, and scruple, etc.) is a part of faith."', reference: 'Book 2, Hadith 2' },
    ]
  }
};

export function getHadithsForCollection(slug: string) {
    if (slug in hadithsByCollection) {
        return hadithsByCollection[slug as keyof typeof hadithsByCollection];
    }
    
    const collectionInfo = hadithCollections.find(c => c.slug === slug);
    if (!collectionInfo) return null;

    // Generate placeholder hadiths for other collections
    return {
        name: collectionInfo.name,
        hadiths: Array.from({ length: 30 }, (_, i) => ({
            id: i + 1,
            text: `[Placeholder text for a hadith from ${collectionInfo.name}. This is hadith number ${i + 1}. In a real application, this would be the full text of the hadith, its chain of narration, and other relevant details.]`,
            reference: `Book ${Math.floor(i / 5) + 1}, Hadith ${i + 1}`
        }))
    }
}
