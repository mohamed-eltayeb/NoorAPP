
'use client';

import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

// --- Type Definitions ---
export type Prayer = 'Fajr' | 'Dhuhr' | 'Asr' | 'Maghrib' | 'Isha';
export const PRAYERS: Prayer[] = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];

export type PrayerStatus = 'jamaah' | 'alone' | 'missed' | 'unprayed';
export type DailyPrayerStatus = Record<Prayer, PrayerStatus>;
export type PrayerLog = Record<string, DailyPrayerStatus>; // Key is 'YYYY-MM-DD'

interface PrayerTrackerContextType {
  prayerLog: PrayerLog;
  updatePrayerStatus: (dateKey: string, prayer: Prayer, status: PrayerStatus) => void;
}

const PrayerTrackerContext = createContext<PrayerTrackerContextType | undefined>(undefined);

// --- Provider Component ---
export function PrayerTrackerProvider({ children }: { children: ReactNode }) {
  const [prayerLog, setPrayerLog] = useState<PrayerLog>({});
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on initial mount
  useEffect(() => {
    try {
      const savedLog = localStorage.getItem('noor-prayer-log');
      if (savedLog) {
        setPrayerLog(JSON.parse(savedLog));
      }
    } catch (error) {
      console.error("Failed to load prayer log from localStorage", error);
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage whenever the log changes
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem('noor-prayer-log', JSON.stringify(prayerLog));
      } catch (error) {
        console.error("Failed to save prayer log to localStorage", error);
      }
    }
  }, [prayerLog, isLoaded]);

  const updatePrayerStatus = (dateKey: string, prayer: Prayer, status: PrayerStatus) => {
    setPrayerLog(prevLog => {
      const newLog = { ...prevLog };
      const dayLog = newLog[dateKey] || { Fajr: 'unprayed', Dhuhr: 'unprayed', Asr: 'unprayed', Maghrib: 'unprayed', Isha: 'unprayed' };
      
      const newDayLog = { ...dayLog, [prayer]: status };
      
      newLog[dateKey] = newDayLog;
      return newLog;
    });
  };

  const value = { prayerLog, updatePrayerStatus };

  return (
    <PrayerTrackerContext.Provider value={value}>
      {children}
    </PrayerTrackerContext.Provider>
  );
}

// --- Custom Hook ---
export function usePrayerTracker() {
  const context = useContext(PrayerTrackerContext);
  if (context === undefined) {
    throw new Error('usePrayerTracker must be used within a PrayerTrackerProvider');
  }
  return context;
}
