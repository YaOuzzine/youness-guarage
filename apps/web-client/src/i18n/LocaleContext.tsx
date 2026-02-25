'use client';

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  useEffect,
  type ReactNode,
} from 'react';
import fr, { type Dictionary } from './fr';
import en from './en';

type Locale = 'fr' | 'en';

const dictionaries: Record<Locale, Dictionary> = { fr, en };

interface LocaleContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Dictionary;
}

const LocaleContext = createContext<LocaleContextValue>({
  locale: 'fr',
  setLocale: () => {},
  t: fr,
});

const STORAGE_KEY = 'youness-garage-locale';

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('fr');

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as Locale | null;
    if (stored === 'fr' || stored === 'en') {
      setLocaleState(stored);
      document.documentElement.lang = stored;
      return;
    }
    const detected: Locale = navigator.language.startsWith('fr') ? 'fr' : 'en';
    setLocaleState(detected);
    document.documentElement.lang = detected;
  }, []);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    localStorage.setItem(STORAGE_KEY, next);
    document.documentElement.lang = next;
  }, []);

  const value = useMemo(
    () => ({ locale, setLocale, t: dictionaries[locale] }),
    [locale, setLocale],
  );

  return (
    <LocaleContext.Provider value={value}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  return useContext(LocaleContext);
}
