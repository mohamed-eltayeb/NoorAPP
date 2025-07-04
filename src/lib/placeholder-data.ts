import React from 'react';
import { BookOpen, Bookmark, Calendar, LayoutDashboard, Moon, ScrollText, Sun, SunMedium, Sunrise, Sunset } from "lucide-react";

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

const revelationPlaces = {
    Mecca: { en: 'Meccan', ar: 'مكية', fr: 'Mecquoise' },
    Medina: { en: 'Medinan', ar: 'مدنية', fr: 'Médinoise' },
}

export const surahs = [
    { number: 1, name: { en: 'Al-Fatiha', ar: 'الفاتحة', fr: 'Al-Fatiha' }, nameArabic: 'الفاتحة', versesCount: 7, revelationPlace: revelationPlaces.Mecca },
    { number: 2, name: { en: 'Al-Baqarah', ar: 'البقرة', fr: 'Al-Baqarah' }, nameArabic: 'البقرة', versesCount: 286, revelationPlace: revelationPlaces.Medina },
    { number: 3, name: { en: 'Aal-E-Imran', ar: 'آل عمران', fr: 'Aal-E-Imran' }, nameArabic: 'آل عمران', versesCount: 200, revelationPlace: revelationPlaces.Medina },
    { number: 4, name: { en: 'An-Nisa', ar: 'النساء', fr: 'An-Nisa' }, nameArabic: 'النساء', versesCount: 176, revelationPlace: revelationPlaces.Medina },
    { number: 5, name: { en: 'Al-Maidah', ar: 'المائدة', fr: 'Al-Maidah' }, nameArabic: 'المائدة', versesCount: 120, revelationPlace: revelationPlaces.Medina },
    { number: 6, name: { en: 'Al-Anam', ar: 'الأنعام', fr: 'Al-Anam' }, nameArabic: 'الأنعام', versesCount: 165, revelationPlace: revelationPlaces.Mecca },
    { number: 7, name: { en: 'Al-Araf', ar: 'الأعراف', fr: 'Al-Araf' }, nameArabic: 'الأعراف', versesCount: 206, revelationPlace: revelationPlaces.Mecca },
    { number: 8, name: { en: 'Al-Anfal', ar: 'الأنفال', fr: 'Al-Anfal' }, nameArabic: 'الأنفال', versesCount: 75, revelationPlace: revelationPlaces.Medina },
    { number: 9, name: { en: 'At-Tawbah', ar: 'التوبة', fr: 'At-Tawbah' }, nameArabic: 'التوبة', versesCount: 129, revelationPlace: revelationPlaces.Medina },
    { number: 10, name: { en: 'Yunus', ar: 'يونس', fr: 'Yunus' }, nameArabic: 'يونس', versesCount: 109, revelationPlace: revelationPlaces.Mecca },
    { number: 11, name: { en: 'Hud', ar: 'هود', fr: 'Hud' }, nameArabic: 'هود', versesCount: 123, revelationPlace: revelationPlaces.Mecca },
    { number: 12, name: { en: 'Yusuf', ar: 'يوسف', fr: 'Yusuf' }, nameArabic: 'يوسف', versesCount: 111, revelationPlace: revelationPlaces.Mecca },
    { number: 13, name: { en: 'Ar-Rad', ar: 'الرعد', fr: 'Ar-Rad' }, nameArabic: 'الرعد', versesCount: 43, revelationPlace: revelationPlaces.Mecca },
    { number: 14, name: { en: 'Ibrahim', ar: 'ابراهيم', fr: 'Ibrahim' }, nameArabic: 'ابراهيم', versesCount: 52, revelationPlace: revelationPlaces.Mecca },
    { number: 15, name: { en: 'Al-Hijr', ar: 'الحجر', fr: 'Al-Hijr' }, nameArabic: 'الحجر', versesCount: 99, revelationPlace: revelationPlaces.Mecca },
    { number: 16, name: { en: 'An-Nahl', ar: 'النحل', fr: 'An-Nahl' }, nameArabic: 'النحل', versesCount: 128, revelationPlace: revelationPlaces.Mecca },
    { number: 17, name: { en: 'Al-Isra', ar: 'الإسراء', fr: 'Al-Isra' }, nameArabic: 'الإسراء', versesCount: 111, revelationPlace: revelationPlaces.Mecca },
    { number: 18, name: { en: 'Al-Kahf', ar: 'الكهف', fr: 'Al-Kahf' }, nameArabic: 'الكهف', versesCount: 110, revelationPlace: revelationPlaces.Mecca },
    { number: 19, name: { en: 'Maryam', ar: 'مريم', fr: 'Maryam' }, nameArabic: 'مريم', versesCount: 98, revelationPlace: revelationPlaces.Mecca },
    { number: 20, name: { en: 'Taha', ar: 'طه', fr: 'Taha' }, nameArabic: 'طه', versesCount: 135, revelationPlace: revelationPlaces.Mecca },
    { number: 21, name: { en: 'Al-Anbiya', ar: 'الأنبياء', fr: 'Al-Anbiya' }, nameArabic: 'الأنبياء', versesCount: 112, revelationPlace: revelationPlaces.Mecca },
    { number: 22, name: { en: 'Al-Hajj', ar: 'الحج', fr: 'Al-Hajj' }, nameArabic: 'الحج', versesCount: 78, revelationPlace: revelationPlaces.Medina },
    { number: 23, name: { en: 'Al-Muminun', ar: 'المؤمنون', fr: 'Al-Muminun' }, nameArabic: 'المؤمنون', versesCount: 118, revelationPlace: revelationPlaces.Mecca },
    { number: 24, name: { en: 'An-Nur', ar: 'النور', fr: 'An-Nur' }, nameArabic: 'النور', versesCount: 64, revelationPlace: revelationPlaces.Medina },
    { number: 25, name: { en: 'Al-Furqan', ar: 'الفرقان', fr: 'Al-Furqan' }, nameArabic: 'الفرقان', versesCount: 77, revelationPlace: revelationPlaces.Mecca },
    { number: 26, name: { en: 'Ash-Shuara', ar: 'الشعراء', fr: 'Ash-Shuara' }, nameArabic: 'الشعراء', versesCount: 227, revelationPlace: revelationPlaces.Mecca },
    { number: 27, name: { en: 'An-Naml', ar: 'النمل', fr: 'An-Naml' }, nameArabic: 'النمل', versesCount: 93, revelationPlace: revelationPlaces.Mecca },
    { number: 28, name: { en: 'Al-Qasas', ar: 'القصص', fr: 'Al-Qasas' }, nameArabic: 'القصص', versesCount: 88, revelationPlace: revelationPlaces.Mecca },
    { number: 29, name: { en: 'Al-Ankabut', ar: 'العنكبوت', fr: 'Al-Ankabut' }, nameArabic: 'العنكبوت', versesCount: 69, revelationPlace: revelationPlaces.Mecca },
    { number: 30, name: { en: 'Ar-Rum', ar: 'الروم', fr: 'Ar-Rum' }, nameArabic: 'الروم', versesCount: 60, revelationPlace: revelationPlaces.Mecca },
    { number: 31, name: { en: 'Luqman', ar: 'لقمان', fr: 'Luqman' }, nameArabic: 'لقمان', versesCount: 34, revelationPlace: revelationPlaces.Mecca },
    { number: 32, name: { en: 'As-Sajdah', ar: 'السجدة', fr: 'As-Sajdah' }, nameArabic: 'السجدة', versesCount: 30, revelationPlace: revelationPlaces.Mecca },
    { number: 33, name: { en: 'Al-Ahzab', ar: 'الأحزاب', fr: 'Al-Ahzab' }, nameArabic: 'الأحزاب', versesCount: 73, revelationPlace: revelationPlaces.Medina },
    { number: 34, name: { en: 'Saba', ar: 'سبإ', fr: 'Saba' }, nameArabic: 'سبإ', versesCount: 54, revelationPlace: revelationPlaces.Mecca },
    { number: 35, name: { en: 'Fatir', ar: 'فاطر', fr: 'Fatir' }, nameArabic: 'فاطر', versesCount: 45, revelationPlace: revelationPlaces.Mecca },
    { number: 36, name: { en: 'Ya-Sin', ar: 'يس', fr: 'Ya-Sin' }, nameArabic: 'يس', versesCount: 83, revelationPlace: revelationPlaces.Mecca },
    { number: 37, name: { en: 'As-Saffat', ar: 'الصافات', fr: 'As-Saffat' }, nameArabic: 'الصافات', versesCount: 182, revelationPlace: revelationPlaces.Mecca },
    { number: 38, name: { en: 'Sad', ar: 'ص', fr: 'Sad' }, nameArabic: 'ص', versesCount: 88, revelationPlace: revelationPlaces.Mecca },
    { number: 39, name: { en: 'Az-Zumar', ar: 'الزمر', fr: 'Az-Zumar' }, nameArabic: 'الزمر', versesCount: 75, revelationPlace: revelationPlaces.Mecca },
    { number: 40, name: { en: 'Ghafir', ar: 'غافر', fr: 'Ghafir' }, nameArabic: 'غافر', versesCount: 85, revelationPlace: revelationPlaces.Mecca },
    { number: 41, name: { en: 'Fussilat', ar: 'فصلت', fr: 'Fussilat' }, nameArabic: 'فصلت', versesCount: 54, revelationPlace: revelationPlaces.Mecca },
    { number: 42, name: { en: 'Ash-Shuraa', ar: 'الشورى', fr: 'Ash-Shuraa' }, nameArabic: 'الشورى', versesCount: 53, revelationPlace: revelationPlaces.Mecca },
    { number: 43, name: { en: 'Az-Zukhruf', ar: 'الزخرف', fr: 'Az-Zukhruf' }, nameArabic: 'الزخرف', versesCount: 89, revelationPlace: revelationPlaces.Mecca },
    { number: 44, name: { en: 'Ad-Dukhan', ar: 'الدخان', fr: 'Ad-Dukhan' }, nameArabic: 'الدخان', versesCount: 59, revelationPlace: revelationPlaces.Mecca },
    { number: 45, name: { en: 'Al-Jathiyah', ar: 'الجاثية', fr: 'Al-Jathiyah' }, nameArabic: 'الجاثية', versesCount: 37, revelationPlace: revelationPlaces.Mecca },
    { number: 46, name: { en: 'Al-Ahqaf', ar: 'الأحقاف', fr: 'Al-Ahqaf' }, nameArabic: 'الأحقاف', versesCount: 35, revelationPlace: revelationPlaces.Mecca },
    { number: 47, name: { en: 'Muhammad', ar: 'محمد', fr: 'Muhammad' }, nameArabic: 'محمد', versesCount: 38, revelationPlace: revelationPlaces.Medina },
    { number: 48, name: { en: 'Al-Fath', ar: 'الفتح', fr: 'Al-Fath' }, nameArabic: 'الفتح', versesCount: 29, revelationPlace: revelationPlaces.Medina },
    { number: 49, name: { en: 'Al-Hujurat', ar: 'الحجرات', fr: 'Al-Hujurat' }, nameArabic: 'الحجرات', versesCount: 18, revelationPlace: revelationPlaces.Medina },
    { number: 50, name: { en: 'Qaf', ar: 'ق', fr: 'Qaf' }, nameArabic: 'ق', versesCount: 45, revelationPlace: revelationPlaces.Mecca },
    { number: 51, name: { en: 'Adh-Dhariyat', ar: 'الذاريات', fr: 'Adh-Dhariyat' }, nameArabic: 'الذاريات', versesCount: 60, revelationPlace: revelationPlaces.Mecca },
    { number: 52, name: { en: 'At-Tur', ar: 'الطور', fr: 'At-Tur' }, nameArabic: 'الطور', versesCount: 49, revelationPlace: revelationPlaces.Mecca },
    { number: 53, name: { en: 'An-Najm', ar: 'النجم', fr: 'An-Najm' }, nameArabic: 'النجم', versesCount: 62, revelationPlace: revelationPlaces.Mecca },
    { number: 54, name: { en: 'Al-Qamar', ar: 'القمر', fr: 'Al-Qamar' }, nameArabic: 'القمر', versesCount: 55, revelationPlace: revelationPlaces.Mecca },
    { number: 55, name: { en: 'Ar-Rahman', ar: 'الرحمن', fr: 'Ar-Rahman' }, nameArabic: 'الرحمن', versesCount: 78, revelationPlace: revelationPlaces.Medina },
    { number: 56, name: { en: 'Al-Waqiah', ar: 'الواقعة', fr: 'Al-Waqiah' }, nameArabic: 'الواقعة', versesCount: 96, revelationPlace: revelationPlaces.Mecca },
    { number: 57, name: { en: 'Al-Hadid', ar: 'الحديد', fr: 'Al-Hadid' }, nameArabic: 'الحديد', versesCount: 29, revelationPlace: revelationPlaces.Medina },
    { number: 58, name: { en: 'Al-Mujadila', ar: 'المجادلة', fr: 'Al-Mujadila' }, nameArabic: 'المجادلة', versesCount: 22, revelationPlace: revelationPlaces.Medina },
    { number: 59, name: { en: 'Al-Hashr', ar: 'الحشر', fr: 'Al-Hashr' }, nameArabic: 'الحشر', versesCount: 24, revelationPlace: revelationPlaces.Medina },
    { number: 60, name: { en: 'Al-Mumtahanah', ar: 'الممتحنة', fr: 'Al-Mumtahanah' }, nameArabic: 'الممتحنة', versesCount: 13, revelationPlace: revelationPlaces.Medina },
    { number: 61, name: { en: 'As-Saf', ar: 'الصف', fr: 'As-Saf' }, nameArabic: 'الصف', versesCount: 14, revelationPlace: revelationPlaces.Medina },
    { number: 62, name: { en: 'Al-Jumuah', ar: 'الجمعة', fr: 'Al-Jumuah' }, nameArabic: 'الجمعة', versesCount: 11, revelationPlace: revelationPlaces.Medina },
    { number: 63, name: { en: 'Al-Munafiqun', ar: 'المنافقون', fr: 'Al-Munafiqun' }, nameArabic: 'المنافقون', versesCount: 11, revelationPlace: revelationPlaces.Medina },
    { number: 64, name: { en: 'At-Taghabun', ar: 'التغابن', fr: 'At-Taghabun' }, nameArabic: 'التغابن', versesCount: 18, revelationPlace: revelationPlaces.Medina },
    { number: 65, name: { en: 'At-Talaq', ar: 'الطلاق', fr: 'At-Talaq' }, nameArabic: 'الطلاق', versesCount: 12, revelationPlace: revelationPlaces.Medina },
    { number: 66, name: { en: 'At-Tahrim', ar: 'التحريم', fr: 'At-Tahrim' }, nameArabic: 'التحريم', versesCount: 12, revelationPlace: revelationPlaces.Medina },
    { number: 67, name: { en: 'Al-Mulk', ar: 'الملك', fr: 'Al-Mulk' }, nameArabic: 'الملك', versesCount: 30, revelationPlace: revelationPlaces.Mecca },
    { number: 68, name: { en: 'Al-Qalam', ar: 'القلم', fr: 'Al-Qalam' }, nameArabic: 'القلم', versesCount: 52, revelationPlace: revelationPlaces.Mecca },
    { number: 69, name: { en: 'Al-Haqqah', ar: 'الحاقة', fr: 'Al-Haqqah' }, nameArabic: 'الحاقة', versesCount: 52, revelationPlace: revelationPlaces.Mecca },
    { number: 70, name: { en: 'Al-Maarij', ar: 'المعارج', fr: 'Al-Maarij' }, nameArabic: 'المعارج', versesCount: 44, revelationPlace: revelationPlaces.Mecca },
    { number: 71, name: { en: 'Nuh', ar: 'نوح', fr: 'Nuh' }, nameArabic: 'نوح', versesCount: 28, revelationPlace: revelationPlaces.Mecca },
    { number: 72, name: { en: 'Al-Jinn', ar: 'الجن', fr: 'Al-Jinn' }, nameArabic: 'الجن', versesCount: 28, revelationPlace: revelationPlaces.Mecca },
    { number: 73, name: { en: 'Al-Muzzammil', ar: 'المزمل', fr: 'Al-Muzzammil' }, nameArabic: 'المزمل', versesCount: 20, revelationPlace: revelationPlaces.Mecca },
    { number: 74, name: { en: 'Al-Muddaththir', ar: 'المدثر', fr: 'Al-Muddaththir' }, nameArabic: 'المدثر', versesCount: 56, revelationPlace: revelationPlaces.Mecca },
    { number: 75, name: { en: 'Al-Qiyamah', ar: 'القيامة', fr: 'Al-Qiyamah' }, nameArabic: 'القيامة', versesCount: 40, revelationPlace: revelationPlaces.Mecca },
    { number: 76, name: { en: 'Al-Insan', ar: 'الانسان', fr: 'Al-Insan' }, nameArabic: 'الانسان', versesCount: 31, revelationPlace: revelationPlaces.Medina },
    { number: 77, name: { en: 'Al-Mursalat', ar: 'المرسلات', fr: 'Al-Mursalat' }, nameArabic: 'المرسلات', versesCount: 50, revelationPlace: revelationPlaces.Mecca },
    { number: 78, name: { en: 'An-Naba', ar: 'النبإ', fr: 'An-Naba' }, nameArabic: 'النبإ', versesCount: 40, revelationPlace: revelationPlaces.Mecca },
    { number: 79, name: { en: 'An-Naziat', ar: 'النازعات', fr: 'An-Naziat' }, nameArabic: 'النازعات', versesCount: 46, revelationPlace: revelationPlaces.Mecca },
    { number: 80, name: { en: 'Abasa', ar: 'عبس', fr: 'Abasa' }, nameArabic: 'عبس', versesCount: 42, revelationPlace: revelationPlaces.Mecca },
    { number: 81, name: { en: 'At-Takwir', ar: 'التكوير', fr: 'At-Takwir' }, nameArabic: 'التكوير', versesCount: 29, revelationPlace: revelationPlaces.Mecca },
    { number: 82, name: { en: 'Al-Infitar', ar: 'الإنفطار', fr: 'Al-Infitar' }, nameArabic: 'الإنفطار', versesCount: 19, revelationPlace: revelationPlaces.Mecca },
    { number: 83, name: { en: 'Al-Mutaffifin', ar: 'المطففين', fr: 'Al-Mutaffifin' }, nameArabic: 'المطففين', versesCount: 36, revelationPlace: revelationPlaces.Mecca },
    { number: 84, name: { en: 'Al-Inshiqaq', ar: 'الإنشقاق', fr: 'Al-Inshiqaq' }, nameArabic: 'الإنشقاق', versesCount: 25, revelationPlace: revelationPlaces.Mecca },
    { number: 85, name: { en: 'Al-Buruj', ar: 'البروج', fr: 'Al-Buruj' }, nameArabic: 'البروج', versesCount: 22, revelationPlace: revelationPlaces.Mecca },
    { number: 86, name: { en: 'At-Tariq', ar: 'الطارق', fr: 'At-Tariq' }, nameArabic: 'الطارق', versesCount: 17, revelationPlace: revelationPlaces.Mecca },
    { number: 87, name: { en: 'Al-Ala', ar: 'الأعلى', fr: 'Al-Ala' }, nameArabic: 'الأعلى', versesCount: 19, revelationPlace: revelationPlaces.Mecca },
    { number: 88, name: { en: 'Al-Ghashiyah', ar: 'الغاشية', fr: 'Al-Ghashiyah' }, nameArabic: 'الغاشية', versesCount: 26, revelationPlace: revelationPlaces.Mecca },
    { number: 89, name: { en: 'Al-Fajr', ar: 'الفجر', fr: 'Al-Fajr' }, nameArabic: 'الفجر', versesCount: 30, revelationPlace: revelationPlaces.Mecca },
    { number: 90, name: { en: 'Al-Balad', ar: 'البلد', fr: 'Al-Balad' }, nameArabic: 'البلد', versesCount: 20, revelationPlace: revelationPlaces.Mecca },
    { number: 91, name: { en: 'Ash-Shams', ar: 'الشمس', fr: 'Ash-Shams' }, nameArabic: 'الشمس', versesCount: 15, revelationPlace: revelationPlaces.Mecca },
    { number: 92, name: { en: 'Al-Lail', ar: 'الليل', fr: 'Al-Lail' }, nameArabic: 'الليل', versesCount: 21, revelationPlace: revelationPlaces.Mecca },
    { number: 93, name: { en: 'Ad-Duhaa', ar: 'الضحى', fr: 'Ad-Duhaa' }, nameArabic: 'الضحى', versesCount: 11, revelationPlace: revelationPlaces.Mecca },
    { number: 94, name: { en: 'Ash-Sharh', ar: 'الشرح', fr: 'Ash-Sharh' }, nameArabic: 'الشرح', versesCount: 8, revelationPlace: revelationPlaces.Mecca },
    { number: 95, name: { en: 'At-Tin', ar: 'التين', fr: 'At-Tin' }, nameArabic: 'التين', versesCount: 8, revelationPlace: revelationPlaces.Mecca },
    { number: 96, name: { en: 'Al-Alaq', ar: 'العلق', fr: 'Al-Alaq' }, nameArabic: 'العلق', versesCount: 19, revelationPlace: revelationPlaces.Mecca },
    { number: 97, name: { en: 'Al-Qadr', ar: 'القدر', fr: 'Al-Qadr' }, nameArabic: 'القدر', versesCount: 5, revelationPlace: revelationPlaces.Mecca },
    { number: 98, name: { en: 'Al-Bayyinah', ar: 'البينة', fr: 'Al-Bayyinah' }, nameArabic: 'البينة', versesCount: 8, revelationPlace: revelationPlaces.Medina },
    { number: 99, name: { en: 'Az-Zalzalah', ar: 'الزلزلة', fr: 'Az-Zalzalah' }, nameArabic: 'الزلزلة', versesCount: 8, revelationPlace: revelationPlaces.Medina },
    { number: 100, name: { en: 'Al-Adiyat', ar: 'العاديات', fr: 'Al-Adiyat' }, nameArabic: 'العاديات', versesCount: 11, revelationPlace: revelationPlaces.Mecca },
    { number: 101, name: { en: 'Al-Qariah', ar: 'القارعة', fr: 'Al-Qariah' }, nameArabic: 'القارعة', versesCount: 11, revelationPlace: revelationPlaces.Mecca },
    { number: 102, name: { en: 'At-Takathur', ar: 'التكاثر', fr: 'At-Takathur' }, nameArabic: 'التكاثر', versesCount: 8, revelationPlace: revelationPlaces.Mecca },
    { number: 103, name: { en: 'Al-Asr', ar: 'العصر', fr: 'Al-Asr' }, nameArabic: 'العصر', versesCount: 3, revelationPlace: revelationPlaces.Mecca },
    { number: 104, name: { en: 'Al-Humazah', ar: 'الهمزة', fr: 'Al-Humazah' }, nameArabic: 'الهمزة', versesCount: 9, revelationPlace: revelationPlaces.Mecca },
    { number: 105, name: { en: 'Al-Fil', ar: 'الفيل', fr: 'Al-Fil' }, nameArabic: 'الفيل', versesCount: 5, revelationPlace: revelationPlaces.Mecca },
    { number: 106, name: { en: 'Quraysh', ar: 'قريش', fr: 'Quraysh' }, nameArabic: 'قريش', versesCount: 4, revelationPlace: revelationPlaces.Mecca },
    { number: 107, name: { en: 'Al-Maun', ar: 'الماعون', fr: 'Al-Maun' }, nameArabic: 'الماعون', versesCount: 7, revelationPlace: revelationPlaces.Mecca },
    { number: 108, name: { en: 'Al-Kawthar', ar: 'الكوثر', fr: 'Al-Kawthar' }, nameArabic: 'الكوثر', versesCount: 3, revelationPlace: revelationPlaces.Mecca },
    { number: 109, name: { en: 'Al-Kafirun', ar: 'الكافرون', fr: 'Al-Kafirun' }, nameArabic: 'الكافرون', versesCount: 6, revelationPlace: revelationPlaces.Mecca },
    { number: 110, name: { en: 'An-Nasr', ar: 'النصر', fr: 'An-Nasr' }, nameArabic: 'النصر', versesCount: 3, revelationPlace: revelationPlaces.Medina },
    { number: 111, name: { en: 'Al-Masad', ar: 'المسد', fr: 'Al-Masad' }, nameArabic: 'المسد', versesCount: 5, revelationPlace: revelationPlaces.Mecca },
    { number: 112, name: { en: 'Al-Ikhlas', ar: 'الإخلاص', fr: 'Al-Ikhlas' }, nameArabic: 'الإخلاص', versesCount: 4, revelationPlace: revelationPlaces.Mecca },
    { number: 113, name: { en: 'Al-Falaq', ar: 'الفلق', fr: 'Al-Falaq' }, nameArabic: 'الفلق', versesCount: 5, revelationPlace: revelationPlaces.Mecca },
    { number: 114, name: { en: 'An-Nas', ar: 'الناس', fr: 'An-Nas' }, nameArabic: 'الناس', versesCount: 6, revelationPlace: revelationPlaces.Mecca }
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

const quranDetails = [
  {
    "id": 1,
    "name": "Al-Fatiha",
    "verses": [
      {
        "id": 1,
        "text": "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
        "translations": {
          "en": "In the name of Allah, the Entirely Merciful, the Especially Merciful.",
          "fr": "Au nom d'Allah, le Tout Miséricordieux, le Très Miséricordieux."
        }
      },
      {
        "id": 2,
        "text": "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ",
        "translations": {
          "en": "All praise is due to Allah, Lord of the worlds -",
          "fr": "Louange à Allah, Seigneur de l'univers."
        }
      },
      {
        "id": 3,
        "text": "الرَّحْمَٰنِ الرَّحِيمِ",
        "translations": {
          "en": "The Entirely Merciful, the Especially Merciful,",
          "fr": "Le Tout Miséricordieux, le Très Miséricordieux,"
        }
      },
      {
        "id": 4,
        "text": "مَالِكِ يَوْمِ الدِّينِ",
        "translations": {
          "en": "Sovereign of the Day of Recompense.",
          "fr": "Maître du Jour de la rétribution."
        }
      },
      {
        "id": 5,
        "text": "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ",
        "translations": {
          "en": "It is You we worship and You we ask for help.",
          "fr": "C'est Toi [Seul] que nous adorons, et c'est de Toi [Seul] que nous implorons secours."
        }
      },
      {
        "id": 6,
        "text": "اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ",
        "translations": {
          "en": "Guide us to the straight path -",
          "fr": "Guide-nous dans le droit chemin,"
        }
      },
      {
        "id": 7,
        "text": "صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ",
        "translations": {
          "en": "The path of those upon whom You have bestowed favor, not of those who have evoked [Your] anger or of those who are astray.",
          "fr": "le chemin de ceux que Tu as comblés de faveurs, non pas de ceux qui ont encouru Ta colère, ni des égarés."
        }
      }
    ]
  }
];

export function getSurahDetails(surahNumber: number) {
  if (surahNumber === 1) {
    return quranDetails[0];
  }
  
  const surahInfo = surahs.find(s => s.number === surahNumber);
  if (!surahInfo) return null;

  // In a real app, this data would come from a database or a large JSON file.
  // We are generating placeholders here to avoid bloating the initial app bundle.
  return {
    id: surahInfo.number,
    name: surahInfo.name.en,
    verses: Array.from({ length: surahInfo.versesCount }, (_, i) => ({
      id: i + 1,
      text: `[الآية ${i + 1} من سورة ${surahInfo.name.ar}]`,
      translations: {
        en: `[English translation for ${surahInfo.name.en}, verse ${i + 1}]`,
        fr: `[Traduction française pour ${surahInfo.name.fr}, verset ${i + 1}]`
      }
    }))
  }
}
