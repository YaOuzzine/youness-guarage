'use client';

import { useState, useEffect, useCallback } from 'react';
import { AddonType, AddonStatus, BookingStatus } from '@youness-garage/shared';
import type { BookingResponse, PaginatedResponse } from '@youness-garage/shared';
import { useLocale } from '@/i18n/LocaleContext';
import { getAllBookings, updateBookingStatus } from '@/app/actions/bookings';

function ServiceIcon({
  type,
  status,
  labels,
}: {
  type: AddonType;
  status: 'complete' | 'in_progress';
  labels: { washComplete: string; washInProgress: string; chargeComplete: string; chargingInProgress: string };
}) {
  const isWash = type === AddonType.CAR_WASH;
  const icon = isWash ? 'local_car_wash' : 'ev_station';
  const tooltip = isWash
    ? status === 'complete'
      ? labels.washComplete
      : labels.washInProgress
    : status === 'complete'
      ? labels.chargeComplete
      : labels.chargingInProgress;

  const colorClasses =
    status === 'in_progress'
      ? 'bg-amber-500/10 text-amber-400 border-amber-500/20 cursor-wait'
      : isWash
        ? 'bg-info-light text-info-text border-cyan-500/20 cursor-help'
        : 'bg-success-light text-success-text border-emerald-500/20 cursor-help';

  return (
    <div className="group/tooltip relative">
      <span
        className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium border ${colorClasses}`}
      >
        <span className="material-symbols-outlined text-[16px]">{icon}</span>
      </span>
      <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover/tooltip:opacity-100 transition-opacity whitespace-nowrap border border-gray-700 pointer-events-none">
        {tooltip}
      </span>
    </div>
  );
}

export default function DeparturesPage() {
  const [page, setPage] = useState(1);
  const { t } = useLocale();

  const [bookings, setBookings] = useState<PaginatedResponse<BookingResponse> | null>(null);
  const [checkedOutCount, setCheckedOutCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const [checkedInData, checkedOutData] = await Promise.all([
        getAllBookings({ page, limit: 10, status: 'CHECKED_IN' }),
        getAllBookings({ limit: 1, status: 'CHECKED_OUT' }),
      ]);

      setBookings(checkedInData);
      setCheckedOutCount(checkedOutData.total);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load data');
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleCheckOut = useCallback(async (id: string) => {
    try {
      setActionLoading(id);
      await updateBookingStatus(id, BookingStatus.CHECKED_OUT);
      await fetchData();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Check-out failed');
    } finally {
      setActionLoading(null);
    }
  }, [fetchData]);

  const formatTime = (isoString: string): string => {
    const date = new Date(isoString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const isOverdue = (checkOutIso: string): boolean => {
    return new Date(checkOutIso) < new Date();
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

  const departures = bookings?.data ?? [];
  const totalDepartures = bookings?.total ?? 0;
  const totalPages = bookings?.totalPages ?? 1;
  const startIndex = ((bookings?.page ?? 1) - 1) * (bookings?.limit ?? 10) + 1;
  const endIndex = Math.min(startIndex + (bookings?.limit ?? 10) - 1, totalDepartures);
  const revenuePending = departures.reduce((sum, b) => sum + b.totalPrice, 0);
  const overdueCount = departures.filter((b) => isOverdue(b.checkOut)).length;

  const mapAddonStatus = (addonStatus: string): 'complete' | 'in_progress' => {
    if (addonStatus === AddonStatus.DONE) return 'complete';
    return 'in_progress';
  };

  return (
    <div className="flex flex-col gap-8">
      {error && (
        <div className="px-4 py-3 bg-rose-500/10 border border-rose-500/20 rounded-lg text-rose-400 text-sm">
          {error}
        </div>
      )}

      {/* KPI Cards - 4 columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="glass-panel rounded-2xl p-6 flex flex-col justify-between h-32 relative overflow-hidden group transition-all duration-300">
          <div className="flex justify-between items-start z-10">
            <h3 className="text-text-secondary font-medium text-sm uppercase tracking-wider">
              {t.admin.departures.departuresToday}
            </h3>
            <div className="p-2 bg-primary/10 rounded-lg text-primary border border-primary/20">
              <span className="material-symbols-outlined text-[20px]">
                flight_takeoff
              </span>
            </div>
          </div>
          <div className="flex items-end gap-3 z-10">
            <span className="text-4xl font-bold text-white drop-shadow-sm">{totalDepartures}</span>
            <span className="text-xs text-text-secondary mb-1.5">{t.admin.departures.scheduled}</span>
          </div>
        </div>

        <div className="glass-panel rounded-2xl p-6 flex flex-col justify-between h-32 relative overflow-hidden group transition-all duration-300">
          <div className="flex justify-between items-start z-10">
            <h3 className="text-text-secondary font-medium text-sm uppercase tracking-wider">
              {t.admin.departures.checkedOut}
            </h3>
            <div className="p-2 bg-emerald-400/10 rounded-lg text-emerald-400 border border-emerald-400/20">
              <span className="material-symbols-outlined text-[20px]">
                check_circle
              </span>
            </div>
          </div>
          <div className="flex items-end gap-3 z-10">
            <span className="text-4xl font-bold text-white drop-shadow-sm">{checkedOutCount}</span>
            <span className="text-xs text-text-secondary mb-1.5">{t.admin.departures.vehicles}</span>
          </div>
        </div>

        <div className="glass-panel rounded-2xl p-6 flex flex-col justify-between h-32 relative overflow-hidden group transition-all duration-300">
          <div className="flex justify-between items-start z-10">
            <h3 className="text-text-secondary font-medium text-sm uppercase tracking-wider">
              {t.admin.departures.revenuePending}
            </h3>
            <div className="p-2 bg-amber-500/10 rounded-lg text-amber-400 border border-amber-500/20">
              <span className="material-symbols-outlined text-[20px]">payments</span>
            </div>
          </div>
          <div className="flex items-end gap-3 z-10">
            <span className="text-4xl font-bold text-white drop-shadow-sm">{revenuePending} &euro;</span>
            <span className="text-xs text-text-secondary mb-1.5">{t.admin.departures.estTotal}</span>
          </div>
        </div>

        <div className="glass-panel rounded-2xl p-6 flex flex-col justify-between h-32 relative overflow-hidden group transition-all duration-300">
          <div className="flex justify-between items-start z-10">
            <h3 className="text-text-secondary font-medium text-sm uppercase tracking-wider">
              {t.admin.departures.overdue}
            </h3>
            <div className="p-2 bg-rose-500/10 rounded-lg text-rose-400 border border-rose-500/20">
              <span className="material-symbols-outlined text-[20px]">warning</span>
            </div>
          </div>
          <div className="flex items-end gap-3 z-10">
            <span className="text-4xl font-bold text-white drop-shadow-sm">{overdueCount}</span>
            <span className="text-xs text-text-secondary mb-1.5">{t.admin.departures.lateCheckout}</span>
          </div>
        </div>
      </div>

      {/* Departures Table */}
      <div className="glass-panel rounded-2xl overflow-hidden flex flex-col">
        <div className="px-6 py-5 border-b border-glass-border flex justify-between items-center bg-white/5">
          <div className="flex gap-4 items-center">
            <h2 className="text-xl font-bold text-white tracking-tight">
              {t.admin.departures.scheduledDepartures}
            </h2>
            <span className="px-2.5 py-0.5 rounded-full bg-primary/20 text-primary text-xs font-bold border border-primary/20">
              {t.admin.departures.live}
            </span>
          </div>
          <div className="flex gap-3">
            <button
              className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-black/50 bg-primary/50 rounded-lg cursor-not-allowed opacity-50"
              disabled
              title="Coming soon"
            >
              <span className="material-symbols-outlined text-[20px]">print</span>
              {t.admin.departures.dailyReport}
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/5 border-b border-glass-border">
                <th className="px-6 py-5 text-xs font-semibold text-text-secondary uppercase tracking-wider w-[20%]">
                  {t.admin.departures.guestName}
                </th>
                <th className="px-6 py-5 text-xs font-semibold text-text-secondary uppercase tracking-wider w-[15%]">
                  {t.admin.departures.licensePlate}
                </th>
                <th className="px-6 py-5 text-xs font-semibold text-text-secondary uppercase tracking-wider w-[15%]">
                  {t.admin.departures.departureTime}
                </th>
                <th className="px-6 py-5 text-xs font-semibold text-text-secondary uppercase tracking-wider w-[15%]">
                  {t.admin.departures.paymentStatus}
                </th>
                <th className="px-6 py-5 text-xs font-semibold text-text-secondary uppercase tracking-wider w-[15%]">
                  {t.admin.departures.serviceStatus}
                </th>
                <th className="px-6 py-5 text-xs font-semibold text-text-secondary uppercase tracking-wider w-[20%] text-right">
                  {t.admin.departures.actions}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-glass-border text-sm">
              {departures.map((row) => {
                const overdue = isOverdue(row.checkOut);
                const hasPaid = !!row.stripePaymentIntentId;
                const addonServices = row.addons.map((a) => ({
                  type: a.type as AddonType,
                  status: mapAddonStatus(a.status),
                }));

                return (
                  <tr
                    key={row.id}
                    className="group hover:bg-white/5 transition-colors"
                  >
                    <td className="px-6 py-5 font-medium text-white group-hover:text-primary transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs border bg-indigo-500/20 text-indigo-300 border-indigo-500/30">
                          {row.guestName.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()}
                        </div>
                        {row.guestName}
                      </div>
                    </td>
                    <td className="px-6 py-5 text-text-secondary">
                      <span className="font-mono bg-white/5 px-2 py-1 rounded border border-white/10 text-white">
                        {row.licensePlate}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-text-secondary">
                      {overdue ? (
                        <div className="flex flex-col">
                          <span className="text-rose-400 font-medium flex items-center gap-1">
                            <span className="material-symbols-outlined text-[14px]">
                              warning
                            </span>
                            {formatTime(row.checkOut)}
                          </span>
                          <span className="text-xs text-rose-400/70">
                            Overdue
                          </span>
                        </div>
                      ) : (
                        <div className="flex flex-col">
                          <span className="text-white font-medium">
                            {formatTime(row.checkOut)}
                          </span>
                          <span className="text-xs text-gray-500">{t.admin.departures.todayLabel}</span>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-5">
                      {hasPaid ? (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-[0_0_8px_rgba(52,211,153,0.1)]">
                          <span className="material-symbols-outlined text-[14px] mr-1">
                            check
                          </span>
                          {t.admin.departures.paid}
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20 shadow-[0_0_8px_rgba(251,191,36,0.1)]">
                          <span className="material-symbols-outlined text-[14px] mr-1">
                            pending
                          </span>
                          {t.admin.departures.pending}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-5">
                      {addonServices.length > 0 ? (
                        <div className="flex gap-2">
                          {addonServices.map((svc, idx) => (
                            <ServiceIcon
                              key={idx}
                              type={svc.type}
                              status={svc.status}
                              labels={{
                                washComplete: t.admin.departures.washComplete,
                                washInProgress: t.admin.departures.washInProgress,
                                chargeComplete: t.admin.departures.chargeComplete,
                                chargingInProgress: t.admin.departures.chargingInProgress,
                              }}
                            />
                          ))}
                        </div>
                      ) : (
                        <span className="text-gray-600 text-xs italic">{t.admin.departures.none}</span>
                      )}
                    </td>
                    <td className="px-6 py-5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          className="text-gray-400/50 p-2 rounded-lg cursor-not-allowed opacity-50"
                          disabled
                          title="Coming soon"
                        >
                          <span className="material-symbols-outlined text-[20px]">
                            receipt
                          </span>
                        </button>
                        <button
                          className="text-xs font-bold text-black bg-primary hover:bg-primary-dark transition-colors px-4 py-2 rounded-lg shadow-[0_0_10px_rgba(13,242,242,0.2)] flex items-center gap-1 disabled:opacity-50"
                          disabled={actionLoading === row.id}
                          onClick={() => handleCheckOut(row.id)}
                        >
                          {actionLoading === row.id ? '...' : t.admin.departures.checkOutBtn}
                          <span className="material-symbols-outlined text-[16px]">
                            arrow_forward
                          </span>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {departures.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                    No departures found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination footer */}
        <div className="bg-white/5 px-6 py-4 border-t border-glass-border flex items-center justify-between">
          <span className="text-sm text-gray-400">
            {t.admin.departures.showing} <span className="font-medium text-white">{totalDepartures > 0 ? startIndex : 0}</span> {t.admin.departures.to}{' '}
            <span className="font-medium text-white">{endIndex}</span> {t.admin.departures.of}{' '}
            <span className="font-medium text-white">{totalDepartures}</span> {t.admin.departures.departuresLabel}
          </span>
          <div className="flex gap-2">
            <button
              className="px-3 py-1.5 border border-white/10 rounded-lg text-sm text-gray-400 disabled:opacity-50 hover:bg-white/5 transition-colors"
              disabled={page <= 1}
              onClick={() => setPage((p) => p - 1)}
            >
              {t.admin.departures.previous}
            </button>
            <button
              className="px-3 py-1.5 border border-white/10 rounded-lg text-sm text-white hover:bg-white/10 transition-colors"
              disabled={page >= totalPages}
              onClick={() => setPage((p) => p + 1)}
            >
              {t.admin.departures.next}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
