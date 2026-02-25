'use client';

import { useState, useEffect, useCallback } from 'react';
import { AddonType, AddonStatus } from '@youness-garage/shared';
import { useLocale } from '@/i18n/LocaleContext';
import { getAllAddons, updateAddonStatus } from '@/app/actions/addons';
import type { AddonWithBookingInfo } from '@/app/actions/addons';
import { getStaffUsers } from '@/app/actions/admin-settings';
import type { StaffUser } from '@/app/actions/admin-settings';

type FilterType = 'all' | 'car_wash' | 'ev_charging';

export default function ServicesPage() {
  const [filter, setFilter] = useState<FilterType>('all');
  const { t } = useLocale();

  const [addons, setAddons] = useState<AddonWithBookingInfo[]>([]);
  const [staffUsers, setStaffUsers] = useState<StaffUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const [addonData, staffData] = await Promise.all([
        getAllAddons(),
        getStaffUsers(),
      ]);
      setAddons(addonData);
      setStaffUsers(staffData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load services');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleToggle = useCallback(async (id: string, currentStatus: AddonStatus) => {
    const nextStatus: AddonStatus | null =
      currentStatus === AddonStatus.PENDING
        ? AddonStatus.IN_PROGRESS
        : currentStatus === AddonStatus.IN_PROGRESS
          ? AddonStatus.DONE
          : null;

    if (!nextStatus) return;

    try {
      setActionLoading(id);
      await updateAddonStatus(id, nextStatus);
      await fetchData();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Status update failed');
    } finally {
      setActionLoading(null);
    }
  }, [fetchData]);

  const filtered = addons.filter((s) => {
    if (s.status === AddonStatus.DONE) return true; // always show completed
    if (filter === 'car_wash') return s.type === AddonType.CAR_WASH;
    if (filter === 'ev_charging') return s.type === AddonType.EV_CHARGING;
    return true;
  });

  // Stats from real data
  const pendingCount = addons.filter((a) => a.status !== AddonStatus.DONE).length;
  const washCount = addons.filter((a) => a.type === AddonType.CAR_WASH && a.status !== AddonStatus.DONE).length;
  const evCount = addons.filter((a) => a.type === AddonType.EV_CHARGING && a.status !== AddonStatus.DONE).length;
  const totalActive = washCount + evCount;
  const washPercent = totalActive > 0 ? Math.round((washCount / totalActive) * 100) : 0;
  const evPercent = totalActive > 0 ? Math.round((evCount / totalActive) * 100) : 0;
  const circlePercent = addons.length > 0 ? Math.round((pendingCount / addons.length) * 100) : 0;

  if (loading && addons.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex items-center gap-3 text-[#94a3b8]">
          <span className="material-symbols-outlined animate-spin">progress_activity</span>
          <span>Loading...</span>
        </div>
      </div>
    );
  }

  if (error && addons.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex items-center gap-3 text-rose-400">
          <span className="material-symbols-outlined">error</span>
          <span>{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row gap-0 -m-8 h-[calc(100vh-5rem)]">
      {error && (
        <div className="absolute top-4 left-4 right-4 z-50 px-4 py-3 bg-rose-500/10 border border-rose-500/20 rounded-lg text-rose-400 text-sm">
          {error}
        </div>
      )}

      {/* Main content area */}
      <div className="flex-1 overflow-y-auto p-8">
        <div className="max-w-6xl mx-auto">
          {/* Filter buttons */}
          <div className="flex items-center space-x-4 mb-8">
            <button
              className={`px-5 py-2.5 rounded-full text-sm font-semibold backdrop-blur-sm transition-all ${
                filter === 'all'
                  ? 'bg-primary/10 text-primary border border-primary/30 shadow-[0_0_15px_rgba(13,242,242,0.15)]'
                  : 'bg-white/5 text-gray-400 border border-white/5 hover:bg-white/10 hover:text-white font-medium'
              }`}
              onClick={() => setFilter('all')}
            >
              {t.admin.services.allActive}
            </button>
            <button
              className={`px-5 py-2.5 rounded-full text-sm transition-all ${
                filter === 'car_wash'
                  ? 'bg-primary/10 text-primary border border-primary/30 shadow-[0_0_15px_rgba(13,242,242,0.15)] font-semibold'
                  : 'bg-white/5 text-gray-400 border border-white/5 hover:bg-white/10 hover:text-white font-medium'
              }`}
              onClick={() => setFilter('car_wash')}
            >
              {t.admin.services.carWash}
            </button>
            <button
              className={`px-5 py-2.5 rounded-full text-sm transition-all ${
                filter === 'ev_charging'
                  ? 'bg-primary/10 text-primary border border-primary/30 shadow-[0_0_15px_rgba(13,242,242,0.15)] font-semibold'
                  : 'bg-white/5 text-gray-400 border border-white/5 hover:bg-white/10 hover:text-white font-medium'
              }`}
              onClick={() => setFilter('ev_charging')}
            >
              {t.admin.services.evCharging}
            </button>
          </div>

          {/* Service cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((svc) => {
              const isCompleted = svc.status === AddonStatus.DONE;
              const isWash = svc.type === AddonType.CAR_WASH;
              const isToggled = svc.status === AddonStatus.IN_PROGRESS || svc.status === AddonStatus.DONE;
              const isActionLoading = actionLoading === svc.id;

              return (
                <div
                  key={svc.id}
                  className={`bg-white/5 backdrop-blur-sm border border-white/5 rounded-2xl p-5 hover:bg-white/10 transition-all duration-300 group relative overflow-hidden ${
                    isCompleted ? 'opacity-60' : ''
                  }`}
                >
                  {/* Completed overlay */}
                  {isCompleted && (
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px] z-10 flex items-center justify-center">
                      <div className="px-4 py-2 bg-success-text/20 backdrop-blur-md rounded-lg border border-success-text/40 text-success-text font-bold shadow-[0_0_15px_rgba(52,211,153,0.3)]">
                        {t.admin.services.completed}
                      </div>
                    </div>
                  )}

                  {/* Service header */}
                  <div className="flex items-start gap-4 mb-4">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center border ${
                        isWash
                          ? 'bg-info-light text-info-text border-cyan-500/20 shadow-[0_0_10px_rgba(34,211,238,0.15)]'
                          : 'bg-success-light text-success-text border-emerald-500/20 shadow-[0_0_10px_rgba(52,211,153,0.15)]'
                      }`}
                    >
                      <span className="material-symbols-outlined">
                        {isWash ? 'local_car_wash' : 'ev_station'}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-white font-semibold text-lg">
                        {isWash ? t.admin.services.carWash : t.admin.services.evCharging}
                      </h3>
                      <p className="text-gray-400 text-sm">
                        {svc.vehicleMake} {svc.vehicleModel} &bull;{' '}
                        <span className="font-mono text-gray-500">{svc.licensePlate}</span>
                      </p>
                    </div>
                  </div>

                  {/* Location / Guest grid */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-black/20 rounded-lg p-2.5 border border-white/5">
                      <p className="text-[10px] uppercase text-gray-500 font-bold tracking-wider mb-1">
                        {t.admin.services.location}
                      </p>
                      <p className="text-white text-sm font-medium flex items-center gap-1">
                        <span className="material-symbols-outlined text-xs text-primary">
                          pin_drop
                        </span>
                        {svc.spotNumber ? `Spot #${svc.spotNumber}` : 'N/A'}
                      </p>
                    </div>
                    <div className="bg-black/20 rounded-lg p-2.5 border border-white/5">
                      <p className="text-[10px] uppercase text-gray-500 font-bold tracking-wider mb-1">
                        Guest
                      </p>
                      <p className="text-white text-sm font-medium">{svc.guestName}</p>
                    </div>
                  </div>

                  {/* Toggle */}
                  <div className="flex items-center justify-between pt-4 border-t border-white/5">
                    <span className="text-sm font-medium text-gray-400">
                      {isCompleted
                        ? t.admin.services.statusLabel
                        : isToggled
                          ? t.admin.services.inProgress
                          : t.admin.services.markComplete}
                    </span>
                    <label className="relative inline-block w-[44px] h-[24px]">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={isToggled}
                        disabled={isCompleted || isActionLoading}
                        onChange={() => handleToggle(svc.id, svc.status as AddonStatus)}
                      />
                      <div className="absolute inset-0 bg-[#334155] rounded-full cursor-pointer transition-all peer-checked:bg-success-text peer-checked:shadow-[0_0_10px_rgba(52,211,153,0.4)] peer-focus:shadow-[0_0_1px_#34d399]" />
                      <div className="absolute top-[3px] left-[3px] w-[18px] h-[18px] bg-white rounded-full transition-transform peer-checked:translate-x-[20px]" />
                    </label>
                  </div>
                </div>
              );
            })}
            {filtered.length === 0 && (
              <div className="col-span-full text-center text-gray-500 py-12">
                No services found
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Daily Summary sidebar */}
      <div className="w-80 border-l border-glass-border bg-surface-dark backdrop-blur-md hidden lg:flex flex-col z-20 shadow-xl">
        <div className="p-6 border-b border-glass-border">
          <h2 className="text-lg font-bold text-white mb-1">{t.admin.services.dailySummary}</h2>
          <p className="text-xs text-gray-400">{t.admin.services.dailySummaryDesc}</p>
        </div>
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Circular progress */}
          <div className="flex flex-col items-center justify-center py-4">
            <div className="relative w-40 h-40 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-gray-700"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <path
                  className="text-primary drop-shadow-[0_0_4px_#0df2f2]"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="currentColor"
                  strokeDasharray={`${circlePercent}, 100`}
                  strokeWidth="2"
                />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="text-3xl font-bold text-white">{pendingCount}</span>
                <span className="text-xs text-gray-400 uppercase tracking-wide">
                  {t.admin.services.pending}
                </span>
              </div>
            </div>
          </div>

          {/* Breakdown */}
          <div className="space-y-4">
            <div className="bg-white/5 rounded-xl p-4 border border-white/5">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-300 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-info-text shadow-[0_0_5px_#22d3ee]" />
                  {t.admin.services.carWashes}
                </span>
                <span className="font-bold text-white">{washCount}</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-1.5">
                <div
                  className="bg-info-text h-1.5 rounded-full"
                  style={{ width: `${washPercent}%` }}
                />
              </div>
            </div>
            <div className="bg-white/5 rounded-xl p-4 border border-white/5">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-300 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-success-text shadow-[0_0_5px_#34d399]" />
                  {t.admin.services.evChargingLabel}
                </span>
                <span className="font-bold text-white">{evCount}</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-1.5">
                <div
                  className="bg-success-text h-1.5 rounded-full"
                  style={{ width: `${evPercent}%` }}
                />
              </div>
            </div>
          </div>

          {/* Staff On Duty */}
          <div className="pt-6 border-t border-glass-border">
            <h3 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">
              {t.admin.services.staffOnDuty}
            </h3>
            <div className="space-y-3">
              {staffUsers.length === 0 && (
                <p className="text-xs text-gray-500">No staff users found</p>
              )}
              {staffUsers.map((staff) => {
                const initials = `${staff.firstName[0] ?? ''}${staff.lastName[0] ?? ''}`.toUpperCase();
                return (
                  <div key={staff.id} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-600 border border-gray-500 flex items-center justify-center text-xs font-bold text-white">
                      {initials}
                    </div>
                    <div>
                      <p className="text-sm text-white font-medium">
                        {staff.firstName} {staff.lastName}
                      </p>
                      <p className="text-xs text-primary">{staff.role}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
