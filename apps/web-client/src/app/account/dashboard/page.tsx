'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useLocale } from '../../../i18n/LocaleContext';
import { getMyBookings } from '@/app/actions/bookings';
import { createAddon } from '@/app/actions/addons';
import { AddonType } from '@youness-garage/shared';
import type { BookingResponse } from '@youness-garage/shared';

interface TimelineStep {
  label: string;
  description: string;
  icon: string;
  status: 'completed' | 'in-progress' | 'pending';
}

function buildTimeline(
  booking: BookingResponse,
  t: ReturnType<typeof useLocale>['t'],
): TimelineStep[] {
  const steps: TimelineStep[] = [];

  const isCheckedIn =
    booking.status === 'CHECKED_IN' || booking.status === 'CHECKED_OUT';
  steps.push({
    label: t.accountDashboard.checkedIn,
    description: t.accountDashboard.checkedInDesc,
    icon: 'check',
    status: isCheckedIn ? 'completed' : 'pending',
  });

  for (const addon of booking.addons) {
    const addonLabel =
      addon.type === 'CAR_WASH'
        ? t.accountDashboard.carWash
        : t.accountDashboard.evCharging;
    const addonIcon = addon.type === 'CAR_WASH' ? 'local_car_wash' : 'bolt';
    const addonDesc =
      addon.type === 'CAR_WASH'
        ? t.accountDashboard.carWashDesc
        : '';

    let addonStatus: 'completed' | 'in-progress' | 'pending';
    if (addon.status === 'DONE') {
      addonStatus = 'completed';
    } else if (addon.status === 'IN_PROGRESS') {
      addonStatus = 'in-progress';
    } else {
      addonStatus = 'pending';
    }

    steps.push({
      label: addonLabel,
      description: addonDesc,
      icon: addonIcon,
      status: addonStatus,
    });
  }

  steps.push({
    label: t.accountDashboard.readyForPickup,
    description: t.accountDashboard.readyDesc,
    icon: 'directions_car',
    status: booking.status === 'CHECKED_OUT' ? 'completed' : 'pending',
  });

  return steps;
}

function shortenBookingId(id: string): string {
  return `P-${id.slice(0, 4).toUpperCase()}`;
}

function statusBadge(status: string) {
  const active = ['CONFIRMED', 'CHECKED_IN'].includes(status);
  if (active) {
    return { label: status.replace('_', ' '), color: 'fresh-mint' };
  }
  if (status === 'CHECKED_OUT') {
    return { label: 'CHECKED OUT', color: 'slate-400' };
  }
  if (status === 'CANCELLED') {
    return { label: 'CANCELLED', color: 'red-400' };
  }
  return { label: status, color: 'yellow-400' };
}

export default function DashboardPage() {
  const { t } = useLocale();
  const [booking, setBooking] = useState<BookingResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [addingAddon, setAddingAddon] = useState<string | null>(null);
  const [addonSuccess, setAddonSuccess] = useState<string | null>(null);

  const loadBooking = useCallback(async () => {
    try {
      const res = await getMyBookings({ limit: 1 });
      setBooking(res.data.length > 0 ? res.data[0]! : null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load booking');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadBooking();
  }, [loadBooking]);

  async function handleAddAddon(type: AddonType) {
    if (!booking || addingAddon) return;
    setAddingAddon(type);
    setAddonSuccess(null);
    try {
      await createAddon(booking.id, { type });
      setAddonSuccess(t.accountDashboard.addonAdded);
      await loadBooking();
      setTimeout(() => setAddonSuccess(null), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add service');
    } finally {
      setAddingAddon(null);
    }
  }

  if (loading) {
    return (
      <div className="p-6 lg:p-10 w-full max-w-7xl mx-auto flex flex-col items-center justify-center min-h-[60vh]">
        <div className="w-12 h-12 border-4 border-electric-teal/30 border-t-electric-teal rounded-full animate-spin" />
        <p className="text-slate-400 mt-4 text-sm">{t.accountDashboard.title}...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 lg:p-10 w-full max-w-7xl mx-auto flex flex-col items-center justify-center min-h-[60vh]">
        <span className="material-symbols-outlined text-5xl text-red-400 mb-4">error</span>
        <p className="text-red-400 font-bold mb-2">Something went wrong</p>
        <p className="text-slate-400 text-sm">{error}</p>
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="p-6 lg:p-10 w-full max-w-7xl mx-auto flex flex-col items-center justify-center min-h-[60vh]">
        <span className="material-symbols-outlined text-7xl text-slate-600 mb-6">local_parking</span>
        <h2 className="text-2xl font-black text-white mb-2">No Active Sessions</h2>
        <p className="text-slate-400 mb-8 text-center max-w-md">
          You don&apos;t have any bookings yet. Reserve a parking spot and add services to get started.
        </p>
        <Link
          href="/book"
          className="flex items-center gap-2 py-3 px-8 rounded-xl bg-electric-teal text-charcoal font-bold hover:bg-white transition-all duration-300 shadow-glow-teal"
        >
          <span className="material-symbols-outlined text-lg">add</span>
          Book Now
        </Link>
      </div>
    );
  }

  const badge = statusBadge(booking.status);
  const timeline = buildTimeline(booking, t);
  const spotLabel = booking.spotNumber != null ? `Spot #${booking.spotNumber}` : 'TBD';
  const isActive = ['CONFIRMED', 'CHECKED_IN'].includes(booking.status);

  return (
    <div className="p-6 lg:p-10 w-full max-w-7xl mx-auto flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-white mb-1">
            {t.accountDashboard.title}
          </h1>
          <p className="text-slate-400">
            {t.accountDashboard.subtitle}
          </p>
        </div>
        <div className="hidden md:flex gap-3">
          <button className="group flex items-center gap-2 py-2.5 px-5 rounded-xl border border-electric-teal/30 bg-electric-teal/5 hover:bg-electric-teal/10 text-electric-teal font-bold transition-all duration-300">
            <span className="material-symbols-outlined text-lg">near_me</span>
            <span>{t.accountDashboard.getDirections}</span>
          </button>
          <button className="group flex items-center gap-2 py-2.5 px-5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-white font-medium transition-all duration-300">
            <span className="material-symbols-outlined text-lg">call</span>
            <span>{t.accountDashboard.supportButton}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 pb-10">
        {/* Digital Pass Card */}
        <div className="lg:col-span-5 xl:col-span-4 flex flex-col gap-6">
          <div className="glass-card rounded-[2rem] p-8 lg:p-10 relative overflow-hidden border border-electric-teal/20 flex flex-col justify-center items-center shadow-[0_0_50px_rgba(0,240,255,0.15)]">
            <div className="absolute top-0 right-0 w-64 h-64 bg-electric-teal/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-fresh-mint/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

            <div className="flex flex-col items-center w-full space-y-8 relative z-10">
              <div className="w-full flex justify-between items-center border-b border-white/10 pb-4 mb-2">
                <span className="text-xs font-bold text-electric-teal uppercase tracking-widest">
                  {t.accountDashboard.passLabel}
                </span>
                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${isActive ? 'bg-fresh-mint/10 border border-fresh-mint/20' : 'bg-slate-500/10 border border-slate-500/20'}`}>
                  {isActive && <span className="w-2 h-2 rounded-full bg-fresh-mint animate-pulse" />}
                  <span className={`text-xs font-bold uppercase tracking-wide ${isActive ? 'text-fresh-mint' : `text-${badge.color}`}`}>
                    {isActive ? t.accountDashboard.active : badge.label}
                  </span>
                </div>
              </div>

              {/* QR placeholder */}
              <div className="p-6 bg-white rounded-3xl shadow-glow-teal">
                <div className="w-56 h-56 lg:w-64 lg:h-64 bg-gradient-to-br from-charcoal to-charcoal-dark rounded-2xl flex items-center justify-center">
                  <span className="material-symbols-outlined text-8xl text-electric-teal/30">
                    qr_code_2
                  </span>
                </div>
              </div>

              <div className="text-center space-y-2">
                <h2 className="text-4xl font-black text-white tracking-tight">
                  {shortenBookingId(booking.id)}
                </h2>
                <p className="text-slate-400 text-sm font-mono tracking-widest uppercase">
                  {t.accountDashboard.bookingRef}
                </p>
              </div>

              <div className="w-full bg-white/5 rounded-xl p-4 flex items-center justify-between border border-white/5 mt-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-charcoal flex items-center justify-center text-electric-teal">
                    <span className="material-symbols-outlined">
                      directions_car
                    </span>
                  </div>
                  <div>
                    <p className="text-white font-bold text-sm">
                      {booking.vehicleMake} {booking.vehicleModel}
                    </p>
                    <p className="text-slate-400 text-xs font-mono">
                      {booking.licensePlate}
                    </p>
                  </div>
                </div>
                <span className="text-xs text-electric-teal font-bold px-2 py-1 bg-electric-teal/10 rounded">
                  {t.accountDashboard.owner}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-6">
          {/* Stat Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass-card rounded-3xl p-6 flex flex-col justify-between relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="flex justify-between items-start mb-4 relative z-10">
                <div>
                  <h3 className="text-slate-400 text-xs font-bold uppercase tracking-wide mb-1">
                    {t.accountDashboard.vehicleLocation}
                  </h3>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-black text-white">
                      {spotLabel}
                    </span>
                  </div>
                </div>
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-electric-teal">
                  <span className="material-symbols-outlined">
                    location_on
                  </span>
                </div>
              </div>
              <div className="mt-2 pt-4 border-t border-white/5 relative z-10">
                <p className="text-xs text-slate-400 flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm">
                    info
                  </span>
                  {t.accountDashboard.nearInfo}
                </p>
              </div>
            </div>
            <div className="glass-card rounded-3xl p-6 flex flex-col justify-between relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="flex justify-between items-start mb-4 relative z-10">
                <div>
                  <h3 className="text-slate-400 text-xs font-bold uppercase tracking-wide mb-1">
                    {t.accountDashboard.currentTotal}
                  </h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-black text-white">
                      ${booking.totalPrice.toFixed(2)}
                    </span>
                    <span className="text-sm text-slate-500 font-medium">
                      USD
                    </span>
                  </div>
                </div>
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-fresh-mint">
                  <span className="material-symbols-outlined">
                    receipt_long
                  </span>
                </div>
              </div>
              <div className="mt-2 pt-4 border-t border-white/5 relative z-10">
                <p className="text-xs text-slate-400 flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm">
                    schedule
                  </span>
                  {t.accountDashboard.rate}
                </p>
              </div>
            </div>
          </div>

          {/* Service Progress Timeline */}
          <div className="glass-card rounded-3xl p-8 flex-grow">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-lg font-bold text-white tracking-wide">
                {t.accountDashboard.serviceProgress}
              </h3>
              <span className="px-3 py-1 rounded-full bg-white/5 text-xs text-slate-400 font-mono">
                {t.accountDashboard.serviceId}: #{booking.id.slice(0, 8).toUpperCase()}
              </span>
            </div>
            <div className="relative pl-8 md:pl-16 space-y-10 lg:space-y-12 max-w-3xl">
              {/* Timeline line */}
              <div className="absolute left-4 md:left-[3.5rem] top-6 bottom-6 w-0.5 bg-gradient-to-b from-electric-teal via-fresh-mint to-slate-800" />

              {timeline.map((step, i) => {
                if (step.status === 'completed') {
                  return (
                    <div key={i} className="relative flex items-start group">
                      <div className="absolute -left-12 md:-left-[4.5rem] top-0 w-10 h-10 md:w-12 md:h-12 rounded-full bg-electric-teal/20 border border-electric-teal text-electric-teal flex items-center justify-center shadow-glow-teal z-10">
                        <span className="material-symbols-outlined text-lg font-bold">
                          check
                        </span>
                      </div>
                      <div className="flex-grow pl-4">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline">
                          <h4 className="text-white font-bold text-lg">
                            {step.label}
                          </h4>
                        </div>
                        {step.description && (
                          <p className="text-slate-400 text-sm mt-1">
                            {step.description}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                }

                if (step.status === 'in-progress') {
                  return (
                    <div key={i} className="relative flex items-start">
                      <div className="absolute -left-12 md:-left-[4.5rem] top-0 w-10 h-10 md:w-12 md:h-12 rounded-full bg-fresh-mint text-charcoal-dark flex items-center justify-center shadow-glow-mint animate-pulse z-10 border-4 border-charcoal">
                        <span className="material-symbols-outlined text-2xl">
                          {step.icon}
                        </span>
                      </div>
                      <div className="flex-grow pl-4">
                        <div className="bg-white/5 rounded-xl p-4 border border-fresh-mint/30">
                          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
                            <h4 className="text-white font-bold text-lg flex items-center gap-3">
                              {step.label}
                              <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] bg-fresh-mint text-charcoal font-bold tracking-wider uppercase">
                                {t.accountDashboard.inProgress}
                              </span>
                            </h4>
                            <span className="text-fresh-mint text-xs font-mono mt-1 sm:mt-0">
                              {t.accountDashboard.estRemaining}
                            </span>
                          </div>
                          <div className="w-full bg-charcoal rounded-full h-2 mb-2 overflow-hidden">
                            <div
                              className="bg-gradient-to-r from-electric-teal to-fresh-mint h-2 rounded-full shadow-[0_0_10px_rgba(102,255,204,0.5)]"
                              style={{ width: '50%' }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                }

                // pending
                return (
                  <div key={i} className="relative flex items-start opacity-40">
                    <div className="absolute -left-12 md:-left-[4.5rem] top-0 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center z-10">
                      <span className="material-symbols-outlined text-lg">
                        {step.icon}
                      </span>
                    </div>
                    <div className="flex-grow pl-4">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline">
                        <h4 className="text-white font-bold text-lg">
                          {step.label}
                        </h4>
                        <span className="text-slate-500 text-xs font-mono">
                          --:--
                        </span>
                      </div>
                      {step.description && (
                        <p className="text-slate-400 text-sm mt-1">
                          {step.description}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Add-on Upsells */}
      {isActive && (() => {
        const hasCarWash = booking.addons.some(a => a.type === 'CAR_WASH');
        const hasEvCharging = booking.addons.some(a => a.type === 'EV_CHARGING');
        const allAdded = hasCarWash && hasEvCharging;

        return (
          <div className="mt-6">
            <div className="flex items-center justify-between mb-4 px-1">
              <div>
                <h3 className="text-lg font-bold text-white">{t.accountDashboard.addonUpsells}</h3>
                <p className="text-slate-400 text-sm">{t.accountDashboard.addonUpsellsDesc}</p>
              </div>
            </div>

            {addonSuccess && (
              <div className="mb-4 p-3 rounded-xl bg-fresh-mint/10 border border-fresh-mint/20 text-fresh-mint text-sm font-medium flex items-center gap-2">
                <span className="material-symbols-outlined text-lg">check_circle</span>
                {addonSuccess}
              </div>
            )}

            {allAdded ? (
              <div className="glass-card rounded-2xl p-6 flex items-center gap-4 border border-fresh-mint/20">
                <div className="w-12 h-12 rounded-full bg-fresh-mint/10 flex items-center justify-center text-fresh-mint">
                  <span className="material-symbols-outlined text-2xl">verified</span>
                </div>
                <div>
                  <h4 className="text-white font-bold">{t.accountDashboard.allServicesAdded}</h4>
                  <p className="text-slate-400 text-sm">{t.accountDashboard.allServicesAddedDesc}</p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {!hasCarWash && (
                  <div className="glass-card rounded-2xl p-6 border border-white/10 hover:border-electric-teal/30 transition-all group">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-electric-teal/10 flex items-center justify-center text-electric-teal">
                        <span className="material-symbols-outlined text-2xl">local_car_wash</span>
                      </div>
                      <div className="flex-grow">
                        <h4 className="text-white font-bold mb-1">{t.accountDashboard.carWash}</h4>
                        <p className="text-slate-400 text-sm mb-3">{t.accountDashboard.carWashDesc}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-electric-teal font-bold text-sm">{t.accountDashboard.addCarWashPrice}</span>
                          <button
                            onClick={() => handleAddAddon(AddonType.CAR_WASH)}
                            disabled={addingAddon !== null}
                            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-electric-teal/10 border border-electric-teal/30 text-electric-teal text-sm font-bold hover:bg-electric-teal/20 transition-all disabled:opacity-50"
                          >
                            <span className="material-symbols-outlined text-base">add</span>
                            {addingAddon === AddonType.CAR_WASH ? t.accountDashboard.adding : t.accountDashboard.addCarWash}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {!hasEvCharging && (
                  <div className="glass-card rounded-2xl p-6 border border-white/10 hover:border-fresh-mint/30 transition-all group">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-fresh-mint/10 flex items-center justify-center text-fresh-mint">
                        <span className="material-symbols-outlined text-2xl">bolt</span>
                      </div>
                      <div className="flex-grow">
                        <h4 className="text-white font-bold mb-1">{t.accountDashboard.evCharging}</h4>
                        <p className="text-slate-400 text-sm mb-3">{t.accountDashboard.estRemaining}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-fresh-mint font-bold text-sm">{t.accountDashboard.addEvChargingPrice}</span>
                          <button
                            onClick={() => handleAddAddon(AddonType.EV_CHARGING)}
                            disabled={addingAddon !== null}
                            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-fresh-mint/10 border border-fresh-mint/30 text-fresh-mint text-sm font-bold hover:bg-fresh-mint/20 transition-all disabled:opacity-50"
                          >
                            <span className="material-symbols-outlined text-base">add</span>
                            {addingAddon === AddonType.EV_CHARGING ? t.accountDashboard.adding : t.accountDashboard.addEvCharging}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })()}

      {/* Nearby Places */}
      <div className="mt-6 pb-10">
        <div className="flex items-center justify-between mb-4 px-1">
          <div>
            <h3 className="text-lg font-bold text-white">{t.accountDashboard.nearbyPlaces}</h3>
            <p className="text-slate-400 text-sm">{t.accountDashboard.nearbyPlacesDesc}</p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {[
            { name: 'Terminal Bistro', icon: 'restaurant', distance: '2 min walk' },
            { name: 'Skyline Lounge', icon: 'local_bar', distance: '4 min walk' },
            { name: 'Duty Free Shop', icon: 'shopping_bag', distance: '3 min walk' },
            { name: 'Travel Pharmacy', icon: 'local_pharmacy', distance: '5 min walk' },
            { name: 'Business Center', icon: 'business_center', distance: '6 min walk' },
          ].map((place) => (
            <div
              key={place.name}
              className="glass-card rounded-2xl p-5 border border-white/10 hover:border-white/20 transition-all group cursor-pointer"
            >
              <div className="w-10 h-10 rounded-full bg-white/5 group-hover:bg-electric-teal/10 flex items-center justify-center text-slate-400 group-hover:text-electric-teal transition-colors mb-3">
                <span className="material-symbols-outlined">{place.icon}</span>
              </div>
              <h4 className="text-white font-bold text-sm mb-1">{place.name}</h4>
              <p className="text-slate-400 text-xs flex items-center gap-1">
                <span className="material-symbols-outlined text-xs">directions_walk</span>
                {place.distance}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
