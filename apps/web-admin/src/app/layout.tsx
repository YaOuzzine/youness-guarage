import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import 'material-symbols/outlined.css';
import { LocaleProvider } from '../i18n/LocaleContext';
import { AuthProvider } from '@/contexts/AuthContext';
import { AdminShell } from '@/components/AdminShell';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'GarageOS — Tableau de bord',
  description: 'Tableau de bord des opérations du garage Youness',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={inter.variable}>
      <body className="h-screen flex overflow-hidden">
        <AuthProvider>
          <LocaleProvider>
            <AdminShell>{children}</AdminShell>
          </LocaleProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
