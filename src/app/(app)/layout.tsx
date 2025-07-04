
'use client';

import { MainNav } from '@/components/main-nav';
import { UserNav } from '@/components/user-nav';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarInset,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Moon as AppIcon } from 'lucide-react';
import { LanguageProvider, useLanguage } from '@/context/language-context';
import { LanguageSwitcher } from '@/components/language-switcher';
import { useEffect, ReactNode } from 'react';
import { ThemeSwitcher } from '@/components/theme-switcher';
import { BottomNav } from '@/components/bottom-nav';

function LayoutWithLang({ children }: { children: ReactNode }) {
  const { language, direction } = useLanguage();

  useEffect(() => {
    document.documentElement.dir = direction;
    document.documentElement.lang = language;
  }, [language, direction]);

  return (
    <SidebarProvider>
      <Sidebar side={direction === 'rtl' ? 'right' : 'left'}>
        <SidebarHeader>
          <div className="flex items-center gap-2">
            <AppIcon className="w-7 h-7 text-primary" />
            <h1 className="text-xl font-semibold font-headline">Noor</h1>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <MainNav />
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background/80 backdrop-blur-sm px-4 lg:h-[60px] lg:px-6">
          <SidebarTrigger className="hidden md:flex" />
          <div className="w-full flex-1">
            {/* Can add breadcrumbs or search here */}
          </div>
          <ThemeSwitcher />
          <LanguageSwitcher />
          <UserNav />
        </header>
        <main className="flex-1 p-4 lg:p-6 pb-20 md:pb-6">{children}</main>
        <BottomNav />
      </SidebarInset>
    </SidebarProvider>
  );
}

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <LayoutWithLang>{children}</LayoutWithLang>
    </LanguageProvider>
  );
}
