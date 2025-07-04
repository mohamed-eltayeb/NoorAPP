import React from 'react';
import { BookOpen, ScrollText } from "lucide-react";

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
          arabic: 'ٱللَّهُ لَآ إِلَٰهَ إِلَّا هُوَ ٱلْحَىُّ ٱلْقَيُّومُ ۚ لَا تَأْخُذُهُۥ سِنَةٌ وَلَا نَوْمٌ ۚ لَّهُۥ مَا فِى ٱلسَّمَٰوَٰتِ وَمَا فِى ٱلْأَرْضِ ۗ مَن ذَا ٱلَّذِى يَشْفَعُ cِندَهُۥٓ إِلَّا بِإِذْنِهِۦ ۚ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ ۖ وَلَا يُحِيطُونَ بِشَىْءٍ مِّنْ عِلْمِهِۦٓ إِلَّا بِمَا شَآءَ ۚ وَسِعَ كُرْسِيُّهُ ٱلسَّمَٰوَٰتِ وَٱلْأَرْضَ ۖ وَلَا يَـُٔودُهُۥ حِفْظُهُمَا ۚ وَهُوَ ٱلْعَلِىُّ ٱلْعَظِيمُ',
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
