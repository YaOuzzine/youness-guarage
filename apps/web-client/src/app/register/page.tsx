'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';

export default function RegisterPage() {
  const { register } = useAuth();
  const router = useRouter();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await register({ firstName, lastName, email, password, phone: phone || undefined });
      router.push('/account/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="relative min-h-screen flex items-center justify-center pt-20 pb-10">
      <div className="fixed inset-0 z-0 bg-charcoal pointer-events-none">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-electric-teal/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-fresh-mint/5 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/4" />
      </div>

      <div className="relative z-10 w-full max-w-md px-4 sm:px-6">
        <div className="glass-card rounded-2xl shadow-2xl shadow-black/50 overflow-hidden relative p-8 sm:p-10">
          <div className="absolute top-0 left-0 w-32 h-32 bg-electric-teal/10 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2 pointer-events-none" />

          <div className="text-center mb-8">
            <h1 className="text-3xl font-black text-white mb-2 tracking-tight">
              Create Account
            </h1>
            <p className="text-slate-400 text-sm">
              Sign up to manage your bookings and vehicles.
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm text-center">
              {error}
            </div>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wide mb-2" htmlFor="firstName">
                  First Name
                </label>
                <input
                  className="block w-full px-4 py-3 bg-black/40 border border-white/10 hover:border-electric-teal focus:border-electric-teal focus:ring-1 focus:ring-electric-teal rounded-lg text-white placeholder-slate-600 transition-colors"
                  id="firstName"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wide mb-2" htmlFor="lastName">
                  Last Name
                </label>
                <input
                  className="block w-full px-4 py-3 bg-black/40 border border-white/10 hover:border-electric-teal focus:border-electric-teal focus:ring-1 focus:ring-electric-teal rounded-lg text-white placeholder-slate-600 transition-colors"
                  id="lastName"
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wide mb-2" htmlFor="reg-email">
                Email Address
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500 group-focus-within:text-electric-teal transition-colors">
                  <span className="material-symbols-outlined text-[20px]">mail</span>
                </div>
                <input
                  className="block w-full pl-10 pr-4 py-3 bg-black/40 border border-white/10 hover:border-electric-teal focus:border-electric-teal focus:ring-1 focus:ring-electric-teal rounded-lg text-white placeholder-slate-600 transition-colors"
                  id="reg-email"
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wide mb-2" htmlFor="reg-password">
                Password
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500 group-focus-within:text-electric-teal transition-colors">
                  <span className="material-symbols-outlined text-[20px]">lock</span>
                </div>
                <input
                  className="block w-full pl-10 pr-4 py-3 bg-black/40 border border-white/10 hover:border-electric-teal focus:border-electric-teal focus:ring-1 focus:ring-electric-teal rounded-lg text-white placeholder-slate-600 transition-colors"
                  id="reg-password"
                  type="password"
                  required
                  minLength={8}
                  placeholder="Min. 8 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wide mb-2" htmlFor="reg-phone">
                Phone (optional)
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500 group-focus-within:text-electric-teal transition-colors">
                  <span className="material-symbols-outlined text-[20px]">phone</span>
                </div>
                <input
                  className="block w-full pl-10 pr-4 py-3 bg-black/40 border border-white/10 hover:border-electric-teal focus:border-electric-teal focus:ring-1 focus:ring-electric-teal rounded-lg text-white placeholder-slate-600 transition-colors"
                  id="reg-phone"
                  type="tel"
                  placeholder="+33 6 12 34 56 78"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                className="w-full flex items-center justify-center bg-electric-teal hover:bg-white text-black text-base font-bold py-3.5 px-4 rounded-xl shadow-[0_0_20px_rgba(0,240,255,0.2)] hover:shadow-[0_0_25px_rgba(255,255,255,0.4)] transition-all duration-300 transform active:scale-[0.98] disabled:opacity-50"
                type="submit"
                disabled={submitting}
              >
                {submitting ? 'Creating account...' : 'Create Account'}
              </button>
            </div>
          </form>

          <p className="text-center text-sm text-slate-400 mt-6">
            Already have an account?{' '}
            <Link href="/login" className="text-electric-teal hover:text-white transition-colors font-semibold">
              Log In
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
