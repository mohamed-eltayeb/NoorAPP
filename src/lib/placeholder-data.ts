import React from 'react';
import { BookOpen, Moon, ScrollText, Sun, SunMedium, Sunrise, Sunset } from "lucide-react";

export const prayerTimes = [
    { name: 'Fajr', time: '04:30', icon: React.createElement(Sunrise, { className: "w-5 h-5" }) },
    { name: 'Dhuhr', time: '12:45', icon: React.createElement(Sun, { className: "w-5 h-5" }) },
    { name: 'Asr', time: '16:15', icon: React.createElement(SunMedium, { className: "w-5 h-5" }) },
    { name: 'Maghrib', time: '19:00', icon: React.createElement(Sunset, { className: "w-5 h-5" }) },
    { name: 'Isha', time: '20:30', icon: React.createElement(Moon, { className: "w-5 h-5" }) },
];

export const qiblaDirection = {
    degrees: 128,
    direction: 'SE'
};

export const surahs = [
    { number: 1, name: 'Al-Fatiha', nameArabic: 'الفاتحة', versesCount: 7, revelationPlace: 'Mecca' },
    { number: 2, name: 'Al-Baqarah', nameArabic: 'البقرة', versesCount: 286, revelationPlace: 'Medina' },
    { number: 18, name: 'Al-Kahf', nameArabic: 'الكهف', versesCount: 110, revelationPlace: 'Mecca' },
    { number: 36, name: 'Ya-Sin', nameArabic: 'يس', versesCount: 83, revelationPlace: 'Mecca' },
    { number: 55, name: 'Ar-Rahman', nameArabic: 'الرحمن', versesCount: 78, revelationPlace: 'Medina' },
    { number: 67, name: 'Al-Mulk', nameArabic: 'الملك', versesCount: 30, revelationPlace: 'Mecca' },
    { number: 112, name: 'Al-Ikhlas', nameArabic: 'الإخلاص', versesCount: 4, revelationPlace: 'Mecca' },
    { number: 113, name: 'Al-Falaq', nameArabic: 'الفلق', versesCount: 5, revelationPlace: 'Mecca' },
    { number: 114, name: 'An-Nas', nameArabic: 'الناس', versesCount: 6, revelationPlace: 'Mecca' },
];

export const hadithCollections = [
    { name: 'Sahih al-Bukhari', total: 7563, icon: React.createElement(ScrollText) },
    { name: 'Sahih Muslim', total: 7563, icon: React.createElement(ScrollText) },
    { name: 'Jami` at-Tirmidhi', total: 3956, icon: React.createElement(ScrollText) },
    { name: 'Sunan an-Nasa\'i', total: 5758, icon: React.createElement(ScrollText) },
    { name: 'Sunan Abi Dawud', total: 5274, icon: React.createElement(ScrollText) },
    { name: 'Sunan Ibn Majah', total: 4341, icon: React.createElement(ScrollText) },
];

export const bookmarks = [
    { type: 'Verse', text: 'Al-Baqarah, 2:255 (Ayat al-Kursi)', icon: React.createElement(BookOpen, { className: "text-primary"}) },
    { type: 'Hadith', text: 'Bukhari, Hadith 1: On intentions', icon: React.createElement(ScrollText, { className: "text-primary"}) },
    { type: 'Verse', text: 'Ar-Rahman, 55:13', icon: React.createElement(BookOpen, { className: "text-primary"}) },
];

export const islamicEvents = [
    { date: '2024-06-16', name: 'Eid al-Adha', color: 'hsl(var(--accent))' },
    { date: '2024-07-07', name: 'Islamic New Year', color: 'hsl(var(--primary))' },
    { date: '2024-07-16', name: 'Day of Ashura', color: 'hsl(var(--secondary-foreground))' },
];
