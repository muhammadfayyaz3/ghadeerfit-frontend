'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import { VideoPlayerProvider } from '@/contexts/video-player-context';
import { I18nextProvider } from 'react-i18next';
import i18n from '@/lib/i18n';
import { usePathname } from 'next/navigation';

export function Providers({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  // Detect language from URL
  useEffect(() => {
    const langMatch = pathname?.match(/^\/(ar|en)/);
    const detectedLang = langMatch ? langMatch[1] : 'en';
    
    if (i18n.language !== detectedLang) {
      i18n.changeLanguage(detectedLang);
    }

    // Set document direction
    if (typeof document !== 'undefined') {
      document.documentElement.dir = detectedLang === 'ar' ? 'rtl' : 'ltr';
      document.documentElement.lang = detectedLang;
    }
  }, [pathname]);

  return (
    <I18nextProvider i18n={i18n}>
      <QueryClientProvider client={queryClient}>
        <VideoPlayerProvider>{children}</VideoPlayerProvider>
      </QueryClientProvider>
    </I18nextProvider>
  );
}
