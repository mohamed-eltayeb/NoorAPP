'use server';

interface PrayerTimings {
  Fajr: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
  [key: string]: string;
}

interface PrayerAPIResponse {
  data: {
    timings: PrayerTimings;
    meta: {
      timezone: string;
    };
  };
}

interface QiblaAPIResponse {
    data: {
        direction: number;
    }
}


export async function getPrayerData(latitude: number, longitude: number) {
  try {
    const timingsResponse = await fetch(`https://api.aladhan.com/v1/timings?latitude=${latitude}&longitude=${longitude}&method=2`);
    if (!timingsResponse.ok) {
        throw new Error('Failed to fetch prayer times');
    }
    const timingsData: PrayerAPIResponse = await timingsResponse.json();

    const qiblaResponse = await fetch(`https://api.aladhan.com/v1/qibla/${latitude}/${longitude}`);
    if(!qiblaResponse.ok) {
        throw new Error('Failed to fetch Qibla direction');
    }
    const qiblaData: QiblaAPIResponse = await qiblaResponse.json();

    const { Fajr, Dhuhr, Asr, Maghrib, Isha } = timingsData.data.timings;

    return {
      timings: { Fajr, Dhuhr, Asr, Maghrib, Isha },
      qibla: qiblaData.data.direction,
      location: timingsData.data.meta.timezone.replace(/_/g, ' '),
    };
  } catch (error) {
    console.error("Error fetching prayer data:", error);
    throw new Error("Could not retrieve prayer and Qibla information.");
  }
}
