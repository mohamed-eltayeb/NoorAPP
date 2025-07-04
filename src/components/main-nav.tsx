'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BookOpen, Bookmark, Calendar, LayoutDashboard, ScrollText, ShieldCheck, RotateCw, Bot } from 'lucide-react';
import React from 'react';

import { cn } from '@/lib/utils';
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';

export function MainNav() {
  const pathname = usePathname();

  const menuItems = [
    { href: '/dashboard', label: 'Dashboard', icon: React.createElement(LayoutDashboard) },
    { href: '/quran', label: 'Quran', icon: React.createElement(BookOpen) },
    { href: '/hadith', label: 'Hadith', icon: React.createElement(ScrollText) },
    { href: '/athkar', label: 'Athkar', icon: React.createElement(ShieldCheck) },
    { href: '/tasbeeh', label: 'Tasbeeh', icon: React.createElement(RotateCw) },
    { href: '/imam', label: 'AI Imam', icon: React.createElement(Bot) },
    { href: '/calendar', label: 'Calendar', icon: React.createElement(Calendar) },
    { href: '/bookmarks', label: 'Bookmarks', icon: React.createElement(Bookmark) },
  ];

  return (
    <SidebarMenu>
      {menuItems.map((item) => (
        <SidebarMenuItem key={item.href}>
          <Link href={item.href} passHref legacyBehavior>
            <SidebarMenuButton as="a" isActive={pathname.startsWith(item.href)} tooltip={item.label}>
              {item.icon}
              <span>{item.label}</span>
            </SidebarMenuButton>
          </Link>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
