'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BookOpen, Bookmark, Calendar, LayoutDashboard, ScrollText } from 'lucide-react';
import React from 'react';

import { cn } from '@/lib/utils';
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';

export function MainNav() {
  const pathname = usePathname();

  const menuItems = [
    { href: '/dashboard', label: 'Dashboard', icon: React.createElement(LayoutDashboard) },
    { href: '/quran', label: 'Quran', icon: React.createElement(BookOpen) },
    { href: '/hadith', label: 'Hadith', icon: React.createElement(ScrollText) },
    { href: '/calendar', label: 'Calendar', icon: React.createElement(Calendar) },
    { href: '/bookmarks', label: 'Bookmarks', icon: React.createElement(Bookmark) },
  ];

  return (
    <SidebarMenu>
      {menuItems.map((item) => (
        <SidebarMenuItem key={item.href}>
          <SidebarMenuButton isActive={pathname === item.href} tooltip={item.label} asChild>
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
