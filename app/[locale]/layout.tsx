'use client';

import Header from '@/components/header';
import { Providers } from '../providers';

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  return (
    <Providers>
      <Header />
      <main className="pt-16">{children}</main>
    </Providers>
  );
}
