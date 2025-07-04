
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  BookOpen,
  CalendarDays,
  LayoutDashboard,
  MessageSquareHeart,
  ScrollText,
} from 'lucide-react';
import React from 'react';

import { cn } from '@/lib/utils';
import { useLanguage } from '@/context/language-context';
import { menuTranslations } from '@/lib/i18n';

export function BottomNav() {
  const pathname = usePathname();
  const { language } = useLanguage();

  const menuItems = [
    {
      href: '/dashboard',
      label: menuTranslations.dashboard[language],
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      href: '/quran',
      label: menuTranslations.quran[language],
      icon: <BookOpen className="h-5 w-5" />,
    },
    {
      href: '/hadith',
      label: menuTranslations.hadith[language],
      icon: <ScrollText className="h-5 w-5" />,
    },
    {
      href: '/imam',
      label: menuTranslations.imam[language],
      icon: <MessageSquareHeart className="h-5 w-5" />,
    },
    {
      href: '/calendar',
      label: menuTranslations.calendar[language],
      icon: <CalendarDays className="h-5 w-5" />,
    },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-background border-t z-20 flex items-center justify-around">
      {menuItems.map((item) => {
        const isActive = pathname.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex flex-col items-center justify-center gap-1 w-full text-xs font-medium",
              isActive ? "text-primary" : "text-muted-foreground"
            )}
          >
            {item.icon}
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
