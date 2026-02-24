'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLocale } from '../i18n/LocaleContext';
import { useAuth } from '@/contexts/AuthContext';

export function Sidebar() {
  const pathname = usePathname();
  const { t } = useLocale();
  const { user, logout } = useAuth();

  const navItems = [
    { href: '/', icon: 'dashboard', label: t.sidebar.dashboard },
    { href: '/arrivals', icon: 'directions_car', label: t.sidebar.arrivals },
    { href: '/departures', icon: 'flight_takeoff', label: t.sidebar.departures },
    { href: '/services', icon: 'car_repair', label: t.sidebar.services },
    { href: '/settings', icon: 'settings', label: t.sidebar.settings },
  ];

  return (
    <aside className="w-20 lg:w-64 flex flex-col justify-between bg-[#111827] border-r border-gray-800 text-white transition-all duration-300 flex-shrink-0 z-20">
      <div className="flex flex-col h-full">
        <div className="h-20 flex items-center justify-center lg:justify-start lg:px-6 border-b border-gray-800">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center text-[#111827] shadow-[0_0_15px_rgba(13,242,242,0.4)]">
            <span className="material-symbols-outlined text-[24px] font-bold">
              local_parking
            </span>
          </div>
          <span className="ml-3 font-bold text-xl hidden lg:block tracking-tight text-white drop-shadow-md">
            {t.sidebar.appName}
          </span>
        </div>

        <nav className="flex-1 py-8 space-y-2 px-4">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={
                  isActive
                    ? 'flex items-center px-4 py-3.5 text-primary bg-[#1f2937]/80 rounded-xl group transition-all relative border border-primary/20 shadow-[0_0_10px_rgba(13,242,242,0.1)]'
                    : 'flex items-center px-4 py-3.5 text-gray-400 hover:text-white hover:bg-[#1f2937]/50 rounded-xl group transition-colors'
                }
              >
                <span className="material-symbols-outlined">{item.icon}</span>
                <span className="ml-3 font-medium hidden lg:block">
                  {item.label}
                </span>
                {isActive && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-primary rounded-r-full shadow-[0_0_8px_#0df2f2]" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-800 bg-[#0f172a]/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/20 border-2 border-primary/30 shadow-[0_0_8px_rgba(13,242,242,0.2)] flex items-center justify-center flex-shrink-0">
              <span className="material-symbols-outlined text-primary text-[20px]">
                person
              </span>
            </div>
            <div className="hidden lg:flex flex-col overflow-hidden">
              <p className="text-sm font-semibold text-white truncate">
                {user ? `${user.firstName} ${user.lastName}` : t.sidebar.admin}
              </p>
              <p className="text-xs text-primary/80 truncate">{t.sidebar.manager}</p>
            </div>
            <button
              onClick={() => { void logout(); }}
              className="ml-auto text-gray-400 hover:text-primary transition-colors hidden lg:block"
            >
              <span className="material-symbols-outlined text-[20px]">
                logout
              </span>
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
