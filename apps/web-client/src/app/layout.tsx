import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import 'material-symbols/outlined.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { LocaleProvider } from '../i18n/LocaleContext';
import { AuthProvider } from '@/contexts/AuthContext';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: {
    default: 'Youness Garage — Parking Aéroport Premium',
    template: '%s | Youness Garage',
  },
  description:
    'Parking aéroport sécurisé et couvert avec navette VIP, lavage auto et recharge VE.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={inter.variable}>
      <body>
        <AuthProvider>
          <LocaleProvider>
            <Header />
            {children}
            <Footer />
          </LocaleProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
