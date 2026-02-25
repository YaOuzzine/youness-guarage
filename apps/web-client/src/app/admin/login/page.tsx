'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';

export default function AdminLoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      const u = await login({ email, password });
      if (u.role !== 'ADMIN') {
        setError('Access denied. Admin credentials required.');
        return;
      }
      router.push('/admin');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)' }}>
      <div className="w-full max-w-md px-4">
        <div className="bg-[#111827]/90 border border-gray-800 rounded-2xl shadow-2xl p-8 sm:p-10 backdrop-blur-xl">
          <div className="flex justify-center mb-8">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#0df2f2] to-[#0ab8b8] flex items-center justify-center text-[#111827] shadow-[0_0_25px_rgba(13,242,242,0.4)]">
              <span className="material-symbols-outlined text-[32px] font-bold">local_parking</span>
            </div>
          </div>
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-white mb-2">GarageOS Admin</h1>
            <p className="text-gray-400 text-sm">Sign in to the management dashboard</p>
          </div>
          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm text-center">{error}</div>
          )}
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wide mb-2" htmlFor="admin-email">Email</label>
              <input className="block w-full px-4 py-3 bg-[#0f172a] border border-gray-700 focus:border-[#0df2f2] focus:ring-1 focus:ring-[#0df2f2] rounded-lg text-white placeholder-gray-600 transition-colors" id="admin-email" type="email" required placeholder="admin@youness-garage.com" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wide mb-2" htmlFor="admin-password">Password</label>
              <input className="block w-full px-4 py-3 bg-[#0f172a] border border-gray-700 focus:border-[#0df2f2] focus:ring-1 focus:ring-[#0df2f2] rounded-lg text-white placeholder-gray-600 transition-colors" id="admin-password" type="password" required placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button className="w-full flex items-center justify-center bg-[#0df2f2] hover:bg-[#0ab8b8] text-[#111827] text-base font-bold py-3.5 px-4 rounded-xl shadow-[0_0_20px_rgba(13,242,242,0.3)] transition-all duration-300 disabled:opacity-50" type="submit" disabled={submitting}>
              {submitting ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
