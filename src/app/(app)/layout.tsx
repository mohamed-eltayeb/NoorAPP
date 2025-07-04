
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
import { Moon } from 'lucide-react';
import { LanguageProvider, useLanguage } from '@/context/language-context';
import { LanguageSwitcher } from '@/components/language-switcher';
import { useEffect, ReactNode } from 'react';

function LayoutWithLang({ children }: { children: ReactNode }) {
  const { direction } = useLanguage();

  useEffect(() => {
    document.documentElement.dir = direction;
  }, [direction]);

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2">
            <Moon className="w-7 h-7 text-primary" />
            <h1 className="text-xl font-semibold font-headline">Noor</h1>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <MainNav />
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background/80 backdrop-blur-sm px-4 lg:h-[60px] lg:px-6">
          <SidebarTrigger className="md:hidden" />
          <div className="w-full flex-1">
            {/* Can add breadcrumbs or search here */}
          </div>
          <LanguageSwitcher />
          <UserNav />
        </header>
        <main className="flex-1 p-4 lg:p-6">{children}</main>
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
