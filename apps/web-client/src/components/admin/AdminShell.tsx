'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { UserRole } from '@youness-garage/shared';
import { AdminSidebar } from './Sidebar';
import { AdminTopBar } from './TopBar';

export function AdminShell({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { user, loading } = useAuth();
  useEffect(() => {
    if (loading) return;
    if (!user) {
      router.replace('/login');
    } else if (user.role !== UserRole.ADMIN) {
      router.replace('/account/dashboard');
    }
  }, [loading, user, router]);

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)' }}>
        <p className="text-gray-400">Loading...</p>
      </div>
    );
  }

  if (!user || user.role !== UserRole.ADMIN) {
    return null;
  }

  return (
    <>
      <AdminSidebar />
      <main className="flex-1 flex flex-col h-full overflow-hidden relative" style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)' }}>
        <AdminTopBar />
        <div className="flex-1 overflow-y-auto p-8 relative">
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
            <div className="absolute top-[-10%] right-[10%] w-96 h-96 bg-[rgba(13,242,242,0.05)] rounded-full blur-[100px]" />
            <div className="absolute bottom-[-10%] left-[20%] w-96 h-96 bg-[rgba(13,242,242,0.05)] rounded-full blur-[100px]" />
          </div>
          <div className="max-w-[1400px] mx-auto relative z-10">
            {children}
          </div>
        </div>
      </main>
    </>
  );
}
