'use client';

import { useState, useEffect, useCallback } from 'react';
import { BookingStatus } from '@youness-garage/shared';
import type { BookingResponse, PaginatedResponse } from '@youness-garage/shared';
import { useLocale } from '@/i18n/LocaleContext';
import { getAllBookings, updateBookingStatus } from '@/app/actions/bookings';

export default function ArrivalsPage() {
  const [page, setPage] = useState(1);
  const { t } = useLocale();

  const [bookings, setBookings] = useState<PaginatedResponse<BookingResponse> | null>(null);
  const [checkedInCount, setCheckedInCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const [confirmedData, checkedInData] = await Promise.all([
        getAllBookings({ page, limit: 10, status: 'CONFIRMED' }),
        getAllBookings({ limit: 1, status: 'CHECKED_IN' }),
      ]);

      setBookings(confirmedData);
      setCheckedInCount(checkedInData.total);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load data');
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleCheckIn = useCallback(async (id: string) => {
    try {
      setActionLoading(id);
      await updateBookingStatus(id, BookingStatus.CHECKED_IN);
      await fetchData();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Check-in failed');
    } finally {
      setActionLoading(null);
    }
  }, [fetchData]);

  const formatTime = (isoString: string): string => {
    const date = new Date(isoString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (loading && !bookings) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex items-center gap-3 text-[#94a3b8]">
          <span className="material-symbols-outlined animate-spin">progress_activity</span>
          <span>Loading...</span>
        </div>
      </div>
    );
  }

  if (error && !bookings) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex items-center gap-3 text-rose-400">
          <span className="material-symbols-outlined">error</span>
          <span>{error}</span>
        </div>
      </div>
    );
  }

  const arrivals = bookings?.data ?? [];
  const totalScheduled = bookings?.total ?? 0;
  const totalPages = bookings?.totalPages ?? 1;
  const startIndex = ((bookings?.page ?? 1) - 1) * (bookings?.limit ?? 10) + 1;
  const endIndex = Math.min(startIndex + (bookings?.limit ?? 10) - 1, totalScheduled);
  const checkedInPercent = totalScheduled > 0
    ? Math.round((checkedInCount / (totalScheduled + checkedInCount)) * 100)
    : 0;

  return (
    <div className="flex flex-col gap-8">
      {error && (
        <div className="px-4 py-3 bg-rose-500/10 border border-rose-500/20 rounded-lg text-rose-400 text-sm">
          {error}
        </div>
      )}

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Total Scheduled */}
        <div className="glass-panel rounded-2xl p-6 flex flex-col justify-between h-32 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="flex justify-between items-start z-10">
            <h3 className="text-text-secondary font-medium text-sm uppercase tracking-wider">
              {t.admin.arrivals.totalScheduled}
            </h3>
            <div className="p-2 bg-primary/10 rounded-lg text-primary border border-primary/20 shadow-[0_0_10px_rgba(13,242,242,0.1)]">
              <span className="material-symbols-outlined text-[20px]">schedule</span>
            </div>
          </div>
          <div className="flex items-end gap-3 z-10 mt-1">
            <span className="text-4xl font-bold text-white drop-shadow-sm">{totalScheduled}</span>
            <span className="text-xs font-medium text-text-secondary mb-1.5">
              {t.admin.arrivals.vehiclesToday}
            </span>
          </div>
        </div>

        {/* Checked In */}
        <div className="glass-panel rounded-2xl p-6 flex flex-col justify-between h-32 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="flex justify-between items-start z-10">
            <h3 className="text-text-secondary font-medium text-sm uppercase tracking-wider">
              {t.admin.arrivals.checkedIn}
            </h3>
            <div className="p-2 bg-emerald-400/10 rounded-lg text-emerald-400 border border-emerald-400/20 shadow-[0_0_10px_rgba(52,211,153,0.1)]">
              <span className="material-symbols-outlined text-[20px]">
                check_circle
              </span>
            </div>
          </div>
          <div className="flex items-end gap-3 z-10 mt-1">
            <span className="text-4xl font-bold text-white drop-shadow-sm">{checkedInCount}</span>
            <div className="h-1.5 w-24 bg-gray-700 rounded-full mb-2 overflow-hidden">
              <div className="h-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.5)]" style={{ width: `${checkedInPercent}%` }} />
            </div>
            <span className="text-xs font-medium text-emerald-400 mb-1.5">{checkedInPercent}%</span>
          </div>
        </div>
      </div>

      {/* Arrivals Table */}
      <div className="glass-panel rounded-2xl overflow-hidden flex flex-col shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-black/20 border-b border-glass-border">
                <th className="px-6 py-4 text-xs font-bold text-text-secondary uppercase tracking-wider w-[20%]">
                  {t.admin.arrivals.guest}
                </th>
                <th className="px-6 py-4 text-xs font-bold text-text-secondary uppercase tracking-wider w-[15%]">
                  {t.admin.arrivals.vehicleCol}
                </th>
                <th className="px-6 py-4 text-xs font-bold text-text-secondary uppercase tracking-wider w-[15%]">
                  {t.admin.arrivals.terminalFlight}
                </th>
                <th className="px-6 py-4 text-xs font-bold text-text-secondary uppercase tracking-wider w-[15%]">
                  {t.admin.arrivals.eta}
                </th>
                <th className="px-6 py-4 text-xs font-bold text-text-secondary uppercase tracking-wider w-[15%]">
                  {t.admin.arrivals.statusCol}
                </th>
                <th className="px-6 py-4 text-xs font-bold text-text-secondary uppercase tracking-wider w-[20%] text-right">
                  {t.admin.arrivals.actionCol}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-glass-border text-sm">
              {arrivals.map((row, idx) => (
                <tr
                  key={row.id}
                  className={`group hover:bg-white/[0.03] transition-colors ${
                    idx % 2 === 1 ? 'bg-white/[0.01]' : ''
                  }`}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold border bg-indigo-500/20 text-indigo-300 border-indigo-500/30 text-xs">
                        {row.guestName.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <div className="font-semibold text-white group-hover:text-primary transition-colors">
                          {row.guestName}
                        </div>
                        <div className="text-xs text-gray-500">
                          {row.spotNumber ? `Spot #${row.spotNumber}` : 'N/A'}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-gray-300 font-medium">{row.vehicleMake} {row.vehicleModel}</span>
                      <span className="text-xs text-gray-500 font-mono mt-0.5">
                        {row.licensePlate}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-400">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[16px]">
                        flight
                      </span>
                      <span>N/A</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-mono font-medium text-white">
                      {formatTime(row.checkIn)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-[rgba(13,242,242,0.1)] text-[#0df2f2] border border-[rgba(13,242,242,0.2)] shadow-[0_0_10px_rgba(13,242,242,0.1)]">
                      {t.admin.arrivals.onTime}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      className="text-xs font-bold text-[#0f172a] bg-primary hover:bg-primary-dark transition-all px-6 py-2.5 rounded-lg shadow-[0_0_15px_rgba(13,242,242,0.15)] hover:shadow-[0_0_20px_rgba(13,242,242,0.3)] disabled:opacity-50"
                      disabled={actionLoading === row.id}
                      onClick={() => handleCheckIn(row.id)}
                    >
                      {actionLoading === row.id ? '...' : t.admin.arrivals.checkInBtn}
                    </button>
                  </td>
                </tr>
              ))}
              {arrivals.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                    No arrivals found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination footer */}
        <div className="bg-white/[0.02] px-6 py-4 border-t border-glass-border flex items-center justify-between">
          <span className="text-sm text-gray-400">
            {t.admin.arrivals.showing} <span className="font-medium text-white">{totalScheduled > 0 ? startIndex : 0}</span> {t.admin.arrivals.to}{' '}
            <span className="font-medium text-white">{endIndex}</span> {t.admin.arrivals.of}{' '}
            <span className="font-medium text-white">{totalScheduled}</span> {t.admin.arrivals.arrivalsLabel}
          </span>
          <div className="flex gap-2">
            <button
              className="px-3 py-1.5 border border-white/10 rounded-lg text-sm text-gray-400 disabled:opacity-50 hover:bg-white/5 transition-colors"
              disabled={page <= 1}
              onClick={() => setPage((p) => p - 1)}
            >
              {t.admin.arrivals.previous}
            </button>
            <button
              className="px-3 py-1.5 border border-white/10 rounded-lg text-sm text-white hover:bg-white/10 transition-colors"
              disabled={page >= totalPages}
              onClick={() => setPage((p) => p + 1)}
            >
              {t.admin.arrivals.next}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
