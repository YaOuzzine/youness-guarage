'use client';

import { useState } from 'react';
import Link from 'next/link';
import { getAvailableSpots } from '@/lib/api';
import type { ParkingSpotResponse } from '@youness-garage/shared';
import { useLocale } from '../../i18n/LocaleContext';

export default function BookPage() {
  const { t } = useLocale();
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [spotType, setSpotType] = useState('');
  const [spots, setSpots] = useState<ParkingSpotResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searched, setSearched] = useState(false);

  async function handleSearch() {
    if (!checkIn || !checkOut) {
      setError('Please select both check-in and check-out dates.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      const results = await getAvailableSpots(checkIn, checkOut, spotType || undefined);
      setSpots(results);
      setSearched(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch spots.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="relative min-h-screen flex flex-col pt-20">
      <div className="fixed inset-0 z-0 bg-charcoal pointer-events-none">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-electric-teal/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-fresh-mint/5 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/4" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-grow flex flex-col pt-12 pb-20">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
            {t.book.title}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-teal to-fresh-mint">
              {t.book.titleHighlight}
            </span>
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            {t.book.subtitle}
          </p>
        </div>

        {/* Search Form */}
        <div className="glass-card rounded-2xl p-6 sm:p-8 mb-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wide mb-2">
                {t.book.checkInLabel}
              </label>
              <input
                type="datetime-local"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="block w-full px-4 py-3.5 text-base bg-black/40 border border-white/10 hover:border-electric-teal focus:border-electric-teal focus:ring-1 focus:ring-electric-teal rounded-lg text-white font-semibold shadow-sm placeholder-slate-500 transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wide mb-2">
                {t.book.checkOutLabel}
              </label>
              <input
                type="datetime-local"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="block w-full px-4 py-3.5 text-base bg-black/40 border border-white/10 hover:border-electric-teal focus:border-electric-teal focus:ring-1 focus:ring-electric-teal rounded-lg text-white font-semibold shadow-sm placeholder-slate-500 transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wide mb-2">
                {t.book.spotTypeLabel}
              </label>
              <select
                value={spotType}
                onChange={(e) => setSpotType(e.target.value)}
                className="block w-full px-4 py-3.5 text-base bg-black/40 border border-white/10 hover:border-electric-teal focus:border-electric-teal focus:ring-1 focus:ring-electric-teal rounded-lg text-white font-medium shadow-sm appearance-none transition-colors cursor-pointer"
              >
                <option className="bg-charcoal" value="">{t.book.allTypes}</option>
                <option className="bg-charcoal" value="STANDARD">{t.book.standard}</option>
                <option className="bg-charcoal" value="EV">{t.book.evCharging}</option>
              </select>
            </div>
          </div>
          {error && (
            <p className="text-red-400 text-sm mt-4">{error}</p>
          )}
          <button
            onClick={handleSearch}
            disabled={loading}
            className="mt-6 w-full md:w-auto px-8 py-3.5 bg-electric-teal hover:bg-white text-black font-bold rounded-xl shadow-glow-teal transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? (
              t.book.searching
            ) : (
              <>
                <span className="material-symbols-outlined text-xl">
                  search
                </span>
                {t.book.searchButton}
              </>
            )}
          </button>
        </div>

        {/* Results */}
        {searched && (
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">
              {spots.length > 0
                ? t.book.spotsAvailable.replace('{count}', String(spots.length))
                : t.book.noSpots}
            </h2>
            {spots.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {spots.map((spot) => (
                  <div
                    key={spot.id}
                    className="glass-card rounded-2xl p-6 hover:border-electric-teal/50 transition-all duration-300 group"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold text-white">
                        {spot.label}
                      </h3>
                      <span
                        className={`px-2 py-1 rounded text-xs font-bold uppercase ${
                          spot.type === 'EV'
                            ? 'bg-fresh-mint/10 text-fresh-mint'
                            : 'bg-white/10 text-slate-300'
                        }`}
                      >
                        {spot.type}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mb-6">
                      {spot.type === 'EV' && (
                        <span className="material-symbols-outlined text-fresh-mint">
                          bolt
                        </span>
                      )}
                      <span className="material-symbols-outlined text-electric-teal">
                        local_parking
                      </span>
                      <span className="text-slate-400 text-sm">
                        {spot.isAvailable ? t.book.available : t.book.unavailable}
                      </span>
                    </div>
                    <Link
                      href={`/book/confirm?checkIn=${encodeURIComponent(checkIn)}&checkOut=${encodeURIComponent(checkOut)}&spotType=${spot.type}`}
                      className="w-full py-3 px-4 bg-electric-teal hover:bg-white text-black font-bold rounded-xl transition-all shadow-glow-teal flex items-center justify-center gap-2"
                    >
                      {t.book.selectSpot}
                      <span className="material-symbols-outlined text-sm">
                        arrow_forward
                      </span>
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
