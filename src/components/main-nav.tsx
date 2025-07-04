'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BookOpen, Bookmark, Calendar, LayoutDashboard, ScrollText } from 'lucide-react';

import { cn } from '@/lib/utils';
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';

export function MainNav() {
  const pathname = usePathname();

  const menuItems = [
    { href: '/dashboard', label: 'Dashboard', icon: <LayoutDashboard /> },
    { href: '/quran', label: 'Quran', icon: <BookOpen /> },
    { href: '/hadith', label: 'Hadith', icon: <ScrollText /> },
    { href: '/calendar', label: 'Calendar', icon: <Calendar /> },
    { href: '/bookmarks', label: 'Bookmarks', icon: <Bookmark /> },
  ];

  return (
    <SidebarMenu>
      {menuItems.map((item) => (
        <SidebarMenuItem key={item.href}>
          <Link href={item.href} legacyBehavior passHref>
            <SidebarMenuButton isActive={pathname === item.href} tooltip={item.label}>
              {item.icon}
              <span>{item.label}</span>
            </SidebarMenuButton>
          </Link>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
