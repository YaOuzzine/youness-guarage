'use client';

import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { useLocale } from '../i18n/LocaleContext';
import { LocaleToggle } from '../i18n/LocaleToggle';
import { useAuth } from '@/contexts/AuthContext';

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { t } = useLocale();
  const { user, loading } = useAuth();
  const pathname = usePathname();

  // Hide header on admin pages and auth pages (login/register)
  if (pathname.startsWith('/admin') || pathname === '/login' || pathname === '/register') {
    return null;
  }

  return (
    <header className="absolute top-0 z-50 w-full bg-transparent border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-electric-teal shadow-glow-teal text-black group-hover:scale-105 transition-transform duration-300">
              <span className="material-symbols-outlined text-2xl font-bold">
                local_parking
              </span>
            </div>
            <span className="font-bold text-2xl tracking-tight text-white group-hover:text-electric-teal transition-colors">
              Youness Garage
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/locations"
              className="text-sm font-medium text-slate-300 hover:text-electric-teal transition-colors"
            >
              {t.header.locations}
            </Link>
            <Link
              href="/pricing"
              className="text-sm font-medium text-slate-300 hover:text-electric-teal transition-colors"
            >
              {t.header.pricing}
            </Link>
            <Link
              href="/support"
              className="text-sm font-medium text-slate-300 hover:text-electric-teal transition-colors"
            >
              {t.header.support}
            </Link>
            <LocaleToggle />
            {!loading && user ? (
              <Link
                href={user.role === 'ADMIN' ? '/admin' : '/account/dashboard'}
                className="flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-black bg-fresh-mint hover:bg-white hover:shadow-glow-mint rounded-lg transition-all duration-300"
              >
                <span className="material-symbols-outlined text-[18px]">person</span>
                {user.firstName}
              </Link>
            ) : (
              <Link
                href="/login"
                className="px-5 py-2.5 text-sm font-bold text-black bg-fresh-mint hover:bg-white hover:shadow-glow-mint rounded-lg transition-all duration-300"
              >
                {t.header.login}
              </Link>
            )}
          </nav>

          <button
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg hover:bg-white/10 text-white transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <span className="material-symbols-outlined">
              {mobileOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>

        {mobileOpen && (
          <nav className="md:hidden pb-6 flex flex-col gap-4">
            <Link
              href="/locations"
              className="text-sm font-medium text-slate-300 hover:text-electric-teal transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              {t.header.locations}
            </Link>
            <Link
              href="/pricing"
              className="text-sm font-medium text-slate-300 hover:text-electric-teal transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              {t.header.pricing}
            </Link>
            <Link
              href="/support"
              className="text-sm font-medium text-slate-300 hover:text-electric-teal transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              {t.header.support}
            </Link>
            <LocaleToggle />
            {!loading && user ? (
              <Link
                href={user.role === 'ADMIN' ? '/admin' : '/account/dashboard'}
                className="flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-black bg-fresh-mint hover:bg-white rounded-lg transition-all duration-300 text-center"
                onClick={() => setMobileOpen(false)}
              >
                <span className="material-symbols-outlined text-[18px]">person</span>
                {user.firstName}
              </Link>
            ) : (
              <Link
                href="/login"
                className="px-5 py-2.5 text-sm font-bold text-black bg-fresh-mint hover:bg-white rounded-lg transition-all duration-300 text-center"
                onClick={() => setMobileOpen(false)}
              >
                {t.header.login}
              </Link>
            )}
          </nav>
        )}
      </div>
    </header>
  );
}
