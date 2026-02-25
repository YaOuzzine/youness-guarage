'use client';

import { usePathname } from 'next/navigation';
import { useLocale } from '@/i18n/LocaleContext';
import { LocaleToggle } from '@/i18n/LocaleToggle';

export function AdminTopBar() {
  const pathname = usePathname();
  const { t } = useLocale();
  const at = t.admin.topBar;
  const title = (at.pageTitles as Record<string, string>)[pathname] ?? at.defaultTitle;

  return (
    <header className="h-20 bg-[rgba(30,41,59,0.7)] backdrop-blur-md border-b border-[rgba(255,255,255,0.1)] flex items-center justify-between px-8 flex-shrink-0 z-10">
      <h1 className="text-2xl font-bold text-white tracking-tight">{title}</h1>
      <div className="flex items-center gap-5">
        <div className="relative hidden md:block group">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#0df2f2] transition-colors text-[20px]">search</span>
          <input
            className="pl-10 pr-4 py-2.5 bg-[#0f172a]/60 border border-gray-700 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[rgba(13,242,242,0.5)] focus:ring-1 focus:ring-[rgba(13,242,242,0.5)] w-72 transition-all"
            placeholder={at.searchPlaceholder}
            type="text"
          />
        </div>
        <LocaleToggle />
        <button className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/5 rounded-full relative transition-all">
          <span className="material-symbols-outlined">notifications</span>
          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-[#0df2f2] rounded-full shadow-[0_0_5px_#0df2f2]" />
        </button>
      </div>
    </header>
  );
}
