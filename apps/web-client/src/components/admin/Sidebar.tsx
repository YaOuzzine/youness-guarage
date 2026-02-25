'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLocale } from '@/i18n/LocaleContext';
import { useAuth } from '@/contexts/AuthContext';

export function AdminSidebar() {
  const pathname = usePathname();
  const { t } = useLocale();
  const { user, logout } = useAuth();
  const at = t.admin.sidebar;

  const navItems = [
    { href: '/admin', icon: 'dashboard', label: at.dashboard },
    { href: '/admin/arrivals', icon: 'directions_car', label: at.arrivals },
    { href: '/admin/departures', icon: 'flight_takeoff', label: at.departures },
    { href: '/admin/services', icon: 'car_repair', label: at.services },
    { href: '/admin/settings', icon: 'settings', label: at.settings },
  ];

  return (
    <aside className="w-20 lg:w-64 flex flex-col justify-between bg-[#111827] border-r border-gray-800 text-white transition-all duration-300 flex-shrink-0 z-20">
      <div className="flex flex-col h-full">
        <div className="h-20 flex items-center justify-center lg:justify-start lg:px-6 border-b border-gray-800">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0df2f2] to-[#0ab8b8] flex items-center justify-center text-[#111827] shadow-[0_0_15px_rgba(13,242,242,0.4)]">
            <span className="material-symbols-outlined text-[24px] font-bold">local_parking</span>
          </div>
          <span className="ml-3 font-bold text-xl hidden lg:block tracking-tight text-white drop-shadow-md">
            {at.appName}
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
                    ? 'flex items-center px-4 py-3.5 text-[#0df2f2] bg-[#1f2937]/80 rounded-xl group transition-all relative border border-[rgba(13,242,242,0.2)] shadow-[0_0_10px_rgba(13,242,242,0.1)]'
                    : 'flex items-center px-4 py-3.5 text-gray-400 hover:text-white hover:bg-[#1f2937]/50 rounded-xl group transition-colors'
                }
              >
                <span className="material-symbols-outlined">{item.icon}</span>
                <span className="ml-3 font-medium hidden lg:block">{item.label}</span>
                {isActive && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-[#0df2f2] rounded-r-full shadow-[0_0_8px_#0df2f2]" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-800 bg-[#0f172a]/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[rgba(13,242,242,0.2)] border-2 border-[rgba(13,242,242,0.3)] shadow-[0_0_8px_rgba(13,242,242,0.2)] flex items-center justify-center flex-shrink-0">
              <span className="material-symbols-outlined text-[#0df2f2] text-[20px]">person</span>
            </div>
            <div className="hidden lg:flex flex-col overflow-hidden">
              <p className="text-sm font-semibold text-white truncate">
                {user ? `${user.firstName} ${user.lastName}` : at.admin}
              </p>
              <p className="text-xs text-[rgba(13,242,242,0.8)] truncate">{at.manager}</p>
            </div>
            <button
              onClick={() => { void logout(); }}
              className="ml-auto text-gray-400 hover:text-[#0df2f2] transition-colors hidden lg:block"
            >
              <span className="material-symbols-outlined text-[20px]">logout</span>
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
