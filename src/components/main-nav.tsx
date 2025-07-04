'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  BookOpen,
  Bookmark,
  CalendarDays,
  CheckSquare,
  HeartHandshake,
  LayoutDashboard,
  MessageSquareHeart,
  Repeat,
  ScrollText,
} from 'lucide-react';
import React from 'react';

import { cn } from '@/lib/utils';
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import { useLanguage } from '@/context/language-context';
import { menuTranslations } from '@/lib/i18n';

export function MainNav() {
  const pathname = usePathname();
  const { language } = useLanguage();

  const menuItems = [
    {
      href: '/dashboard',
      label: menuTranslations.dashboard[language],
      icon: React.createElement(LayoutDashboard),
    },
    {
      href: '/quran',
      label: menuTranslations.quran[language],
      icon: React.createElement(BookOpen),
    },
    {
      href: '/hadith',
      label: menuTranslations.hadith[language],
      icon: React.createElement(ScrollText),
    },
    {
      href: '/athkar',
      label: menuTranslations.athkar[language],
      icon: React.createElement(HeartHandshake),
    },
    {
      href: '/tasbeeh',
      label: menuTranslations.tasbeeh[language],
      icon: React.createElement(Repeat),
    },
    {
      href: '/prayer-tracker',
      label: menuTranslations.prayerTracker[language],
      icon: React.createElement(CheckSquare),
    },
    {
      href: '/imam',
      label: menuTranslations.imam[language],
      icon: React.createElement(MessageSquareHeart),
    },
    {
      href: '/calendar',
      label: menuTranslations.calendar[language],
      icon: React.createElement(CalendarDays),
    },
    {
      href: '/bookmarks',
      label: menuTranslations.bookmarks[language],
      icon: React.createElement(Bookmark),
    },
  ];

  return (
    <SidebarMenu>
      {menuItems.map((item) => (
        <SidebarMenuItem key={item.href}>
          <SidebarMenuButton
            asChild
            isActive={pathname.startsWith(item.href)}
            tooltip={item.label}
          >
            <Link href={item.href}>
              {item.icon}
              <span>{item.label}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
