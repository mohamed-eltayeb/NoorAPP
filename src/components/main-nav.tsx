'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BookOpen, Bookmark, CalendarDays, HeartHandshake, LayoutDashboard, MessageSquareHeart, Repeat, ScrollText } from 'lucide-react';
import React from 'react';

import { cn } from '@/lib/utils';
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';

export function MainNav() {
  const pathname = usePathname();

  const menuItems = [
    { href: '/dashboard', label: 'Dashboard', icon: React.createElement(LayoutDashboard) },
    { href: '/quran', label: 'Quran', icon: React.createElement(BookOpen) },
    { href: '/hadith', label: 'Hadith', icon: React.createElement(ScrollText) },
    { href: '/athkar', label: 'Athkar', icon: React.createElement(HeartHandshake) },
    { href: '/tasbeeh', label: 'Tasbeeh', icon: React.createElement(Repeat) },
    { href: '/imam', label: 'AI Imam', icon: React.createElement(MessageSquareHeart) },
    { href: '/calendar', label: 'Calendar', icon: React.createElement(CalendarDays) },
    { href: '/bookmarks', label: 'Bookmarks', icon: React.createElement(Bookmark) },
  ];

  return (
    <SidebarMenu>
      {menuItems.map((item) => (
        <SidebarMenuItem key={item.href}>
            <SidebarMenuButton asChild isActive={pathname.startsWith(item.href)} tooltip={item.label}>
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
