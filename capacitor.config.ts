import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.noor.app',
  appName: 'Noor',
  webDir: 'out',
  server: {
    androidScheme: 'https'
  }
};

export default config;
