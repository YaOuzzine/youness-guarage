'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { UserRole } from '@youness-garage/shared';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading } = useAuth();
  const isLoginPage = pathname === '/login';

  useEffect(() => {
    if (loading) return;
    if (!user && !isLoginPage) {
      router.replace('/login');
    }
    if (user && user.role !== UserRole.ADMIN && !isLoginPage) {
      router.replace('/login');
    }
  }, [loading, user, isLoginPage, router]);

  // Login page — render without shell
  if (isLoginPage) {
    return <>{children}</>;
  }

  // Loading state
  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center bg-page-gradient">
        <p className="text-gray-400">Loading...</p>
      </div>
    );
  }

  // Not authenticated — show nothing while redirecting
  if (!user || user.role !== UserRole.ADMIN) {
    return null;
  }

  return (
    <>
      <Sidebar />
      <main className="flex-1 flex flex-col h-full overflow-hidden relative bg-page-gradient">
        <TopBar />
        <div className="flex-1 overflow-y-auto p-8 relative">
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
            <div className="absolute top-[-10%] right-[10%] w-96 h-96 bg-primary/5 rounded-full blur-[100px]" />
            <div className="absolute bottom-[-10%] left-[20%] w-96 h-96 bg-primary/5 rounded-full blur-[100px]" />
          </div>
          <div className="max-w-[1400px] mx-auto relative z-10">
            {children}
          </div>
        </div>
      </main>
    </>
  );
}
