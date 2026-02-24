'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useLocale } from '../../i18n/LocaleContext';
import { useAuth } from '@/contexts/AuthContext';

export default function LoginPage() {
  const { t } = useLocale();
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await login({ email, password });
      router.push('/account/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="relative min-h-screen flex items-center justify-center pt-20 pb-10">
      {/* Background gradients */}
      <div className="fixed inset-0 z-0 bg-charcoal pointer-events-none">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-electric-teal/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-fresh-mint/5 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/4" />
      </div>

      <div className="relative z-10 w-full max-w-md px-4 sm:px-6">
        <div className="glass-card rounded-2xl shadow-2xl shadow-black/50 overflow-hidden relative p-8 sm:p-10">
          <div className="absolute top-0 left-0 w-32 h-32 bg-electric-teal/10 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2 pointer-events-none" />

          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-black text-white mb-2 tracking-tight">
              {t.login.title}
            </h1>
            <p className="text-slate-400 text-sm">
              {t.login.subtitle}
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm text-center">
              {error}
            </div>
          )}

          {/* Form */}
          <form className="space-y-5" onSubmit={handleLogin}>
            <div>
              <label
                className="block text-xs font-bold text-slate-400 uppercase tracking-wide mb-2"
                htmlFor="email"
              >
                {t.login.emailLabel}
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500 group-focus-within:text-electric-teal transition-colors">
                  <span className="material-symbols-outlined text-[20px]">
                    mail
                  </span>
                </div>
                <input
                  className="block w-full pl-10 pr-4 py-3 bg-black/40 border border-white/10 hover:border-electric-teal focus:border-electric-teal focus:ring-1 focus:ring-electric-teal rounded-lg text-white placeholder-slate-600 transition-colors"
                  id="email"
                  placeholder={t.login.emailPlaceholder}
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <label
                  className="block text-xs font-bold text-slate-400 uppercase tracking-wide"
                  htmlFor="password"
                >
                  {t.login.passwordLabel}
                </label>
                <Link
                  className="text-xs text-electric-teal hover:text-white transition-colors"
                  href="#"
                >
                  {t.login.forgotPassword}
                </Link>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500 group-focus-within:text-electric-teal transition-colors">
                  <span className="material-symbols-outlined text-[20px]">
                    lock
                  </span>
                </div>
                <input
                  className="block w-full pl-10 pr-4 py-3 bg-black/40 border border-white/10 hover:border-electric-teal focus:border-electric-teal focus:ring-1 focus:ring-electric-teal rounded-lg text-white placeholder-slate-600 transition-colors"
                  id="password"
                  placeholder="••••••••"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <div className="flex items-center">
              <input
                className="h-4 w-4 rounded border-white/20 bg-white/5 text-electric-teal focus:ring-offset-gray-900 focus:ring-electric-teal cursor-pointer"
                id="remember-me"
                name="remember-me"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <label
                className="ml-2 block text-sm text-slate-400 cursor-pointer select-none"
                htmlFor="remember-me"
              >
                {t.login.rememberMe}
              </label>
            </div>
            <div className="space-y-3 pt-2">
              <button
                className="w-full flex items-center justify-center bg-electric-teal hover:bg-white text-black text-base font-bold py-3.5 px-4 rounded-xl shadow-[0_0_20px_rgba(0,240,255,0.2)] hover:shadow-[0_0_25px_rgba(255,255,255,0.4)] transition-all duration-300 transform active:scale-[0.98] disabled:opacity-50"
                type="submit"
                disabled={submitting}
              >
                {submitting ? 'Logging in...' : t.login.loginButton}
              </button>
              <Link
                href="/register"
                className="w-full flex items-center justify-center bg-transparent border border-white/20 hover:border-white text-white hover:text-black hover:bg-white text-base font-bold py-3.5 px-4 rounded-xl transition-all duration-300 transform active:scale-[0.98]"
              >
                {t.login.signUpButton}
              </Link>
            </div>
          </form>

          {/* Divider */}
          <div className="mt-8 relative">
            <div aria-hidden="true" className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span
                className="px-2 text-slate-500 text-xs uppercase tracking-wider font-semibold"
                style={{ backgroundColor: 'rgba(30, 30, 30, 0.9)' }}
              >
                {t.login.orContinueWith}
              </span>
            </div>
          </div>

          {/* Social Buttons (disabled for MVP) */}
          <div className="mt-6 grid grid-cols-2 gap-3">
            <button
              className="flex items-center justify-center w-full px-4 py-2.5 border border-white/10 rounded-lg shadow-sm bg-white/5 text-sm font-medium text-white/40 cursor-not-allowed"
              type="button"
              disabled
            >
              <svg
                aria-hidden="true"
                className="h-5 w-5 mr-2"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
              </svg>
              Google
            </button>
            <button
              className="flex items-center justify-center w-full px-4 py-2.5 border border-white/10 rounded-lg shadow-sm bg-white/5 text-sm font-medium text-white/40 cursor-not-allowed"
              type="button"
              disabled
            >
              <svg
                aria-hidden="true"
                className="h-5 w-5 mr-2"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  clipRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  fillRule="evenodd"
                />
              </svg>
              GitHub
            </button>
          </div>
        </div>

        <p className="text-center text-xs text-slate-500 mt-6">
          {t.login.privacyNote
            .replace('{privacyPolicy}', '')
            .replace('{termsOfService}', '')
            .split('  ')
            .filter(Boolean)[0]}
          <Link
            className="text-slate-400 hover:text-white underline"
            href="/legal"
          >
            {t.login.privacyPolicy}
          </Link>{' '}
          {t.login.privacyNote.includes('{termsOfService}') ? '' : ''}
          <Link
            className="text-slate-400 hover:text-white underline"
            href="/legal"
          >
            {t.login.termsOfService}
          </Link>
          .
        </p>
      </div>
    </main>
  );
}
