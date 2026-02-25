'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useLocale } from '../../i18n/LocaleContext';
import { useAuth } from '@/contexts/AuthContext';

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { t } = useLocale();
  const { user, loading, logout } = useAuth();

  useEffect(() => {
    if (loading) return;
    if (!user) {
      router.replace('/login');
    } else if (user.role === 'ADMIN') {
      router.replace('/admin');
    }
  }, [loading, user, router]);

  const sidebarLinks = [
    { href: '/account/dashboard', label: t.account.nav.dashboard, icon: 'dashboard' },
    { href: '/account/history', label: t.account.nav.history, icon: 'history' },
    { href: '/account/payments', label: t.account.nav.payments, icon: 'credit_card' },
    { href: '/account/settings', label: t.account.nav.settings, icon: 'settings' },
  ];

  const bottomLinks = [
    { href: '/account/support', label: t.account.nav.support, icon: 'help' },
  ];

  // Show nothing while loading or redirecting
  if (loading || !user) {
    return (
      <main className="relative min-h-screen flex items-center justify-center pt-20">
        <div className="fixed inset-0 z-0 bg-charcoal pointer-events-none" />
        <div className="relative z-10 text-slate-400">Loading...</div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen flex flex-col pt-20">
      {/* Background gradients */}
      <div className="fixed inset-0 z-0 bg-charcoal pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-electric-teal/5 rounded-full blur-[150px] -translate-y-1/3 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-fresh-mint/5 rounded-full blur-[120px] translate-y-1/3 -translate-x-1/4" />
      </div>

      <div className="relative z-10 flex flex-grow">
        {/* Sidebar */}
        <aside className="hidden md:flex w-24 lg:w-64 flex-col justify-between p-6 shrink-0 transition-all duration-300 border-r border-white/5" style={{ background: 'rgba(20, 20, 20, 0.85)', backdropFilter: 'blur(20px)' }}>
          <div>
            <div className="flex items-center gap-3 mb-10 px-2">
              <div className="w-8 h-8 bg-gradient-to-tr from-electric-teal to-fresh-mint rounded-lg flex items-center justify-center">
                <span className="material-symbols-outlined text-black font-bold text-lg">
                  local_parking
                </span>
              </div>
              <span className="text-lg font-bold tracking-wide hidden lg:block">
                Youness Garage
              </span>
            </div>
            <nav className="space-y-2">
              {sidebarLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${
                      isActive
                        ? 'bg-white/10 text-white'
                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <span
                      className={`material-symbols-outlined ${
                        isActive ? 'text-electric-teal' : ''
                      }`}
                    >
                      {link.icon}
                    </span>
                    <span className="font-medium hidden lg:block">
                      {link.label}
                    </span>
                  </Link>
                );
              })}
            </nav>
          </div>
          <div className="space-y-2">
            {bottomLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${
                    isActive
                      ? 'bg-white/10 text-white'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span
                    className={`material-symbols-outlined ${
                      isActive ? 'text-electric-teal' : ''
                    }`}
                  >
                    {link.icon}
                  </span>
                  <span className="font-medium hidden lg:block">
                    {link.label}
                  </span>
                </Link>
              );
            })}
            <button
              onClick={() => { void logout(); }}
              className="w-full flex items-center gap-4 px-4 py-3 text-slate-400 hover:text-white hover:bg-white/5 rounded-xl transition-all"
            >
              <span className="material-symbols-outlined">logout</span>
              <span className="font-medium hidden lg:block">{t.account.nav.logout}</span>
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-grow overflow-auto flex flex-col">
          {children}
        </div>
      </div>
    </main>
  );
}
