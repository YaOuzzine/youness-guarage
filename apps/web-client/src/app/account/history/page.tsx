'use client';

import { useState, useEffect, useCallback } from 'react';
import { useLocale } from '../../../i18n/LocaleContext';
import { getMyBookings } from '@/app/actions/bookings';
import type { BookingResponse, PaginatedResponse } from '@youness-garage/shared';

const LIMIT = 5;

function formatDuration(checkIn: string, checkOut: string): string {
  const diffMs = new Date(checkOut).getTime() - new Date(checkIn).getTime();
  const totalMinutes = Math.max(0, Math.round(diffMs / 60000));
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${hours}h ${String(minutes).padStart(2, '0')}m`;
}

function formatTime(iso: string): string {
  return new Date(iso).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export default function HistoryPage() {
  const { t } = useLocale();
  const [activeFilter, setActiveFilter] = useState<'30d' | '6m' | 'custom'>('30d');
  const [page, setPage] = useState(1);
  const [result, setResult] = useState<PaginatedResponse<BookingResponse> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBookings = useCallback(async (p: number) => {
    setLoading(true);
    setError(null);
    try {
      const res = await getMyBookings({ page: p, limit: LIMIT });
      setResult(res);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load bookings');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBookings(page);
  }, [page, fetchBookings]);

  const bookings = result?.data ?? [];
  const total = result?.total ?? 0;
  const totalPages = result?.totalPages ?? 1;
  const startIndex = (page - 1) * LIMIT + 1;
  const endIndex = Math.min(page * LIMIT, total);

  return (
    <div className="p-6 lg:p-10 w-full max-w-7xl mx-auto flex flex-col h-full">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-6">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-white mb-1">
            {t.accountHistory.title}
          </h1>
          <p className="text-slate-400">
            {t.accountHistory.subtitle}
          </p>
        </div>
        <div className="flex items-center gap-4 bg-white/5 p-1 rounded-xl border border-white/5 self-start md:self-auto">
          <button
            onClick={() => setActiveFilter('30d')}
            className={`px-4 py-2 rounded-lg font-bold text-sm transition-all ${
              activeFilter === '30d'
                ? 'bg-electric-teal text-charcoal shadow-glow-teal hover:bg-white'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            {t.accountHistory.last30}
          </button>
          <button
            onClick={() => setActiveFilter('6m')}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
              activeFilter === '6m'
                ? 'bg-electric-teal text-charcoal shadow-glow-teal hover:bg-white'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            {t.accountHistory.last6m}
          </button>
          <button
            onClick={() => setActiveFilter('custom')}
            className={`px-4 py-2 rounded-lg font-medium text-sm flex items-center gap-2 transition-all ${
              activeFilter === 'custom'
                ? 'bg-electric-teal text-charcoal shadow-glow-teal hover:bg-white'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <span>{t.accountHistory.customRange}</span>
            <span className="material-symbols-outlined text-sm">
              calendar_today
            </span>
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="glass-card rounded-2xl overflow-hidden border border-white/10 flex-grow flex flex-col shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]">
        {loading ? (
          <div className="flex-grow flex items-center justify-center py-20">
            <div className="w-10 h-10 border-4 border-electric-teal/30 border-t-electric-teal rounded-full animate-spin" />
          </div>
        ) : error ? (
          <div className="flex-grow flex flex-col items-center justify-center py-20">
            <span className="material-symbols-outlined text-4xl text-red-400 mb-3">error</span>
            <p className="text-red-400 font-bold mb-1">Failed to load history</p>
            <p className="text-slate-400 text-sm">{error}</p>
          </div>
        ) : bookings.length === 0 ? (
          <div className="flex-grow flex flex-col items-center justify-center py-20">
            <span className="material-symbols-outlined text-5xl text-slate-600 mb-4">history</span>
            <p className="text-white font-bold text-lg mb-1">No bookings yet</p>
            <p className="text-slate-400 text-sm">Your parking sessions will appear here.</p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-slate-400 text-xs uppercase tracking-wider font-bold" style={{ background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <th className="p-6">{t.accountHistory.date}</th>
                    <th className="p-6">{t.accountHistory.location}</th>
                    <th className="p-6">{t.accountHistory.duration}</th>
                    <th className="p-6">{t.accountHistory.vehicle}</th>
                    <th className="p-6 text-right">{t.accountHistory.totalCost}</th>
                    <th className="p-6 text-center">{t.accountHistory.receipt}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-sm">
                  {bookings.map((entry) => {
                    const firstAddon = entry.addons.length > 0 ? entry.addons[0] : null;
                    return (
                      <tr
                        key={entry.id}
                        className="hover:bg-white/[0.02] transition-colors"
                      >
                        <td className="p-6">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400">
                              <span className="material-symbols-outlined text-xl">
                                event
                              </span>
                            </div>
                            <div>
                              <div className="font-bold text-white">
                                {formatDate(entry.checkIn)}
                              </div>
                              <div className="text-slate-500 text-xs">
                                {formatTime(entry.checkIn)} - {formatTime(entry.checkOut)}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="p-6">
                          <div className="font-medium text-white">
                            Spot #{entry.spotNumber ?? 'TBD'}
                          </div>
                        </td>
                        <td className="p-6">
                          <div className="font-medium text-slate-300">
                            {formatDuration(entry.checkIn, entry.checkOut)}
                          </div>
                          {firstAddon && (
                            <div
                              className={`inline-flex items-center gap-1 text-xs mt-1 ${
                                firstAddon.type === 'EV_CHARGING'
                                  ? 'text-fresh-mint'
                                  : 'text-electric-teal'
                              }`}
                            >
                              <span className="material-symbols-outlined text-[10px]">
                                {firstAddon.type === 'EV_CHARGING'
                                  ? 'bolt'
                                  : 'local_car_wash'}
                              </span>
                              {firstAddon.type === 'EV_CHARGING'
                                ? t.accountHistory.chargingIncluded
                                : t.accountHistory.premiumWash}
                            </div>
                          )}
                        </td>
                        <td className="p-6">
                          <div className="font-medium text-slate-300">
                            {entry.vehicleMake} {entry.vehicleModel}
                          </div>
                          <div className="text-slate-500 text-xs">{entry.licensePlate}</div>
                        </td>
                        <td className="p-6 text-right">
                          <div className="font-bold text-white text-lg">
                            ${entry.totalPrice.toFixed(2)}
                          </div>
                          <div className="text-slate-500 text-xs">
                            {entry.status}
                          </div>
                        </td>
                        <td className="p-6 text-center">
                          <button
                            className="group p-2 rounded-lg hover:bg-electric-teal/10 text-slate-400 hover:text-electric-teal transition-all"
                            title="Download Receipt"
                          >
                            <span className="material-symbols-outlined">
                              download
                            </span>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="p-6 border-t border-white/5 flex items-center justify-between bg-white/[0.02]">
              <p className="text-slate-400 text-sm">
                {t.accountHistory.showing}{' '}
                <span className="text-white font-bold">{startIndex}-{endIndex}</span>{' '}
                {t.accountHistory.of}{' '}
                <span className="text-white font-bold">{total}</span>{' '}
                {t.accountHistory.sessions}
              </p>
              <div className="flex gap-2">
                <button
                  disabled={page <= 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  className="px-4 py-2 rounded-lg border border-white/10 text-slate-400 text-sm hover:bg-white/5 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {t.accountHistory.previous}
                </button>
                <button
                  disabled={page >= totalPages}
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  className="px-4 py-2 rounded-lg border border-white/10 text-white text-sm bg-white/5 hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {t.accountHistory.next}
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
