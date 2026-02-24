'use client';

import { useLocale } from './LocaleContext';

export function LocaleToggle() {
  const { locale, setLocale } = useLocale();

  return (
    <button
      onClick={() => setLocale(locale === 'fr' ? 'en' : 'fr')}
      className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded-lg border border-white/10 hover:border-electric-teal/50 bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-all"
      aria-label="Toggle language"
    >
      <span className="material-symbols-outlined text-sm">translate</span>
      {locale === 'fr' ? 'EN' : 'FR'}
    </button>
  );
}
