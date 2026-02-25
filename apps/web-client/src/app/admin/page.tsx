'use client';

import { useState, useEffect, useCallback } from 'react';
import { AddonType, BookingStatus } from '@youness-garage/shared';
import type { BookingResponse, PaginatedResponse } from '@youness-garage/shared';
import { StatsCard } from '@/components/admin/StatsCard';
import { StatusBadge } from '@/components/admin/StatusBadge';
import { AddonIcon } from '@/components/admin/AddonIcon';
import { useLocale } from '@/i18n/LocaleContext';
import { getAllBookings, updateBookingStatus } from '@/app/actions/bookings';
import { getAllAddons } from '@/app/actions/addons';

export default function AdminDashboard() {
  const [page, setPage] = useState(1);
  const { t } = useLocale();
  const d = t.admin.dashboard;

  const [bookings, setBookings] = useState<PaginatedResponse<BookingResponse> | null>(null);
  const [arrivalsCount, setArrivalsCount] = useState(0);
  const [departuresCount, setDeparturesCount] = useState(0);
  const [pendingWashesCount, setPendingWashesCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const [pageData, allData, addonsData] = await Promise.all([
        getAllBookings({ page, limit: 10 }),
        getAllBookings({ limit: 999 }),
        getAllAddons(),
      ]);

      setBookings(pageData);

      const arrivals = allData.data.filter(
        (b) => b.status === BookingStatus.CONFIRMED,
      ).length;
      const departures = allData.data.filter(
        (b) => b.status === BookingStatus.CHECKED_IN || b.status === BookingStatus.CHECKED_OUT,
      ).length;
      const pendingWashes = addonsData.filter(
        (a) => a.type === AddonType.CAR_WASH && a.status === 'PENDING',
      ).length;

      setArrivalsCount(arrivals);
      setDeparturesCount(departures);
      setPendingWashesCount(pendingWashes);
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
      setError(err instanceof Error ? err.message : 'Action failed');
    } finally {
      setActionLoading(null);
    }
  }, [fetchData]);

  const handleCheckOut = useCallback(async (id: string) => {
    try {
      setActionLoading(id);
      await updateBookingStatus(id, BookingStatus.CHECKED_OUT);
      await fetchData();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Action failed');
    } finally {
      setActionLoading(null);
    }
  }, [fetchData]);

  const getAction = (status: BookingStatus): 'check-in' | 'check-out' | 'view' => {
    if (status === BookingStatus.CONFIRMED) return 'check-in';
    if (status === BookingStatus.CHECKED_IN) return 'check-out';
    return 'view';
  };

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

  const vehicles = bookings?.data ?? [];
  const total = bookings?.total ?? 0;
  const totalPages = bookings?.totalPages ?? 1;
  const startIndex = ((bookings?.page ?? 1) - 1) * (bookings?.limit ?? 10) + 1;
  const endIndex = Math.min(startIndex + (bookings?.limit ?? 10) - 1, total);

  return (
    <div className="flex flex-col gap-8">
      {error && (
        <div className="px-4 py-3 bg-rose-500/10 border border-rose-500/20 rounded-lg text-rose-400 text-sm">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatsCard icon="input" label={d.expectedArrivals} value={arrivalsCount} bgIcon="directions_car" />
        <StatsCard icon="output" label={d.departures} value={departuresCount} bgIcon="flight_takeoff" />
        <StatsCard icon="local_car_wash" label={d.pendingWashes} value={pendingWashesCount} bgIcon="water_drop" />
      </div>

      <div className="glass-panel rounded-2xl overflow-hidden flex flex-col">
        <div className="px-6 py-5 border-b border-[rgba(255,255,255,0.1)] flex justify-between items-center bg-white/5">
          <h2 className="text-xl font-bold text-white tracking-tight">{d.vehicleManagement}</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/5 border-b border-[rgba(255,255,255,0.1)]">
                <th className="px-6 py-5 text-xs font-semibold text-[#94a3b8] uppercase tracking-wider w-[20%]">{d.guestName}</th>
                <th className="px-6 py-5 text-xs font-semibold text-[#94a3b8] uppercase tracking-wider w-[20%]">{d.vehicle}</th>
                <th className="px-6 py-5 text-xs font-semibold text-[#94a3b8] uppercase tracking-wider w-[15%]">{d.time}</th>
                <th className="px-6 py-5 text-xs font-semibold text-[#94a3b8] uppercase tracking-wider w-[15%]">{d.status}</th>
                <th className="px-6 py-5 text-xs font-semibold text-[#94a3b8] uppercase tracking-wider w-[20%]">{d.services}</th>
                <th className="px-6 py-5 text-xs font-semibold text-[#94a3b8] uppercase tracking-wider w-[10%] text-right">{d.action}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[rgba(255,255,255,0.1)] text-sm">
              {vehicles.map((v) => {
                const action = getAction(v.status);
                const addonTypes = v.addons.map((a) => a.type as AddonType);
                return (
                  <tr key={v.id} className="group hover:bg-white/5 transition-colors">
                    <td className="px-6 py-5 font-medium text-white group-hover:text-[#0df2f2] transition-colors">{v.guestName}</td>
                    <td className="px-6 py-5 text-[#94a3b8]">
                      <div className="flex flex-col">
                        <span className="text-white font-medium">{v.vehicleMake} {v.vehicleModel}</span>
                        <span className="text-xs text-gray-500 font-mono mt-0.5">{v.licensePlate}</span>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-[#94a3b8] font-mono">{formatTime(v.checkIn)}</td>
                    <td className="px-6 py-5"><StatusBadge status={v.status} /></td>
                    <td className="px-6 py-5">
                      {addonTypes.length > 0 ? (
                        <div className="flex flex-wrap gap-2">{addonTypes.map((a) => <AddonIcon key={a} type={a} />)}</div>
                      ) : (
                        <span className="text-gray-600 text-xs italic">{d.none}</span>
                      )}
                    </td>
                    <td className="px-6 py-5 text-right">
                      {action === 'view' ? (
                        <button className="text-xs font-bold text-gray-400 hover:text-white transition-colors bg-white/5 border border-white/10 hover:bg-white/10 px-4 py-2 rounded-lg">{d.view}</button>
                      ) : (
                        <button
                          className="text-xs font-bold text-black bg-[#0df2f2] hover:bg-[#0ab8b8] transition-colors px-4 py-2 rounded-lg shadow-[0_0_10px_rgba(13,242,242,0.2)] disabled:opacity-50"
                          disabled={actionLoading === v.id}
                          onClick={() => action === 'check-in' ? handleCheckIn(v.id) : handleCheckOut(v.id)}
                        >
                          {actionLoading === v.id ? '...' : action === 'check-in' ? d.checkIn : d.checkOut}
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="bg-white/5 px-6 py-4 border-t border-[rgba(255,255,255,0.1)] flex items-center justify-between">
          <span className="text-sm text-gray-400">
            {d.showing} <span className="font-medium text-white">{startIndex}</span> {d.to}{' '}
            <span className="font-medium text-white">{endIndex}</span> {d.of}{' '}
            <span className="font-medium text-white">{total}</span> {d.results}
          </span>
          <div className="flex gap-2">
            <button className="px-3 py-1.5 border border-white/10 rounded-lg text-sm text-gray-400 disabled:opacity-50 hover:bg-white/5 transition-colors" disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>{d.previous}</button>
            <button className="px-3 py-1.5 border border-white/10 rounded-lg text-sm text-white hover:bg-white/10 transition-colors" disabled={page >= totalPages} onClick={() => setPage((p) => p + 1)}>{d.next}</button>
          </div>
        </div>
      </div>
    </div>
  );
}
