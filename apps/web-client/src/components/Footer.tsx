'use client';

import Link from 'next/link';
import { useLocale } from '../i18n/LocaleContext';

export function Footer() {
  const { t } = useLocale();

  return (
    <footer className="bg-charcoal-dark border-t border-white/10 py-8 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-slate-500 text-sm">
          &copy; {new Date().getFullYear()} Youness Garage. {t.footer.allRightsReserved}
        </p>
        <div className="flex gap-6">
          <Link
            href="/legal"
            className="text-slate-500 hover:text-white text-sm transition-colors"
          >
            {t.footer.privacy}
          </Link>
          <Link
            href="/legal"
            className="text-slate-500 hover:text-white text-sm transition-colors"
          >
            {t.footer.terms}
          </Link>
        </div>
      </div>
    </footer>
  );
}
