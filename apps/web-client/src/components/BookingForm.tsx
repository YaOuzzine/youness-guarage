'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale } from '../i18n/LocaleContext';

export function BookingForm() {
  const router = useRouter();
  const { t } = useLocale();
  const [airport, setAirport] = useState('LAX');
  const [dropOff, setDropOff] = useState('');
  const [pickUp, setPickUp] = useState('');
  const [carWash, setCarWash] = useState(false);
  const [evCharging, setEvCharging] = useState(false);

  const basePrice = 45;
  const total = basePrice + (carWash ? 15 : 0) + (evCharging ? 10 : 0);

  function handleReserve() {
    const params = new URLSearchParams();
    if (dropOff) params.set('checkIn', dropOff);
    if (pickUp) params.set('checkOut', pickUp);
    params.set('airport', airport);
    if (carWash) params.set('carWash', '1');
    if (evCharging) params.set('evCharging', '1');
    router.push(`/book/confirm?${params.toString()}`);
  }

  return (
    <div className="w-full max-w-md lg:w-[460px] relative">
      <div className="glass-card rounded-2xl shadow-2xl shadow-black/50 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-32 h-32 bg-electric-teal/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

        <div className="p-6 sm:p-8 space-y-6 relative z-10">
          {/* Header */}
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-bold text-white tracking-wide">
              {t.bookingForm.title}
            </h2>
            <span className="text-xs font-bold text-black bg-fresh-mint px-2 py-1 rounded">
              {t.bookingForm.bestRate}
            </span>
          </div>

          {/* Airport Select */}
          <div className="relative group">
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wide mb-2">
              {t.bookingForm.airportLabel}
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-electric-teal">
                <span className="material-symbols-outlined">flight_takeoff</span>
              </div>
              <select
                value={airport}
                onChange={(e) => setAirport(e.target.value)}
                className="block w-full pl-10 pr-10 py-3.5 text-base bg-black/40 border border-white/10 hover:border-electric-teal focus:border-electric-teal focus:ring-1 focus:ring-electric-teal rounded-lg text-white font-medium shadow-sm appearance-none transition-colors cursor-pointer"
              >
                <option className="bg-charcoal" value="LAX">
                  {t.bookingForm.cdgLabel}
                </option>
                <option className="bg-charcoal" value="JFK">
                  {t.bookingForm.oryLabel}
                </option>
                <option className="bg-charcoal" value="LHR">
                  {t.bookingForm.lysLabel}
                </option>
              </select>
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400">
                <span className="material-symbols-outlined">expand_more</span>
              </div>
            </div>
          </div>

          {/* Date Inputs */}
          <div className="grid grid-cols-1 gap-5">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wide mb-2">
                {t.bookingForm.dropOff}
              </label>
              <div className="relative">
                <input
                  type="datetime-local"
                  value={dropOff}
                  onChange={(e) => setDropOff(e.target.value)}
                  className="block w-full px-4 py-3.5 text-base bg-black/40 border border-white/10 hover:border-electric-teal focus:border-electric-teal focus:ring-1 focus:ring-electric-teal rounded-lg text-white font-semibold shadow-sm placeholder-slate-500 transition-colors"
                  placeholder="Select drop-off"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wide mb-2">
                {t.bookingForm.pickUp}
              </label>
              <div className="relative">
                <input
                  type="datetime-local"
                  value={pickUp}
                  onChange={(e) => setPickUp(e.target.value)}
                  className="block w-full px-4 py-3.5 text-base bg-black/40 border border-white/10 hover:border-electric-teal focus:border-electric-teal focus:ring-1 focus:ring-electric-teal rounded-lg text-white font-semibold shadow-sm placeholder-slate-500 transition-colors"
                  placeholder="Select pick-up"
                />
              </div>
            </div>
          </div>

          {/* Add-ons */}
          <div className="space-y-3 pt-2">
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wide">
              {t.bookingForm.addonsLabel}
            </label>
            <div className="grid grid-cols-2 gap-4">
              <div className="relative h-full">
                <input
                  type="checkbox"
                  id="car-wash"
                  className="toggle-checkbox absolute opacity-0 w-0 h-0"
                  checked={carWash}
                  onChange={(e) => setCarWash(e.target.checked)}
                />
                <label
                  className="toggle-label cursor-pointer flex flex-col items-center justify-center p-4 rounded-xl border border-white/10 hover:border-electric-teal/50 bg-black/40 transition-all duration-300 h-full group"
                  htmlFor="car-wash"
                >
                  <div className="icon-box w-10 h-10 rounded-full bg-white/5 text-slate-400 flex items-center justify-center mb-2 transition-all duration-300 group-hover:text-electric-teal">
                    <span className="material-symbols-outlined">
                      local_car_wash
                    </span>
                  </div>
                  <span className="font-bold text-sm text-white">{t.bookingForm.carWash}</span>
                  <span className="text-xs text-slate-400 mt-1">{t.bookingForm.carWashPrice}</span>
                </label>
              </div>
              <div className="relative h-full">
                <input
                  type="checkbox"
                  id="ev-charging"
                  className="toggle-checkbox absolute opacity-0 w-0 h-0"
                  checked={evCharging}
                  onChange={(e) => setEvCharging(e.target.checked)}
                />
                <label
                  className="toggle-label cursor-pointer flex flex-col items-center justify-center p-4 rounded-xl border border-white/10 hover:border-electric-teal/50 bg-black/40 transition-all duration-300 h-full group"
                  htmlFor="ev-charging"
                >
                  <div className="icon-box w-10 h-10 rounded-full bg-white/5 text-slate-400 flex items-center justify-center mb-2 transition-all duration-300 group-hover:text-electric-teal">
                    <span className="material-symbols-outlined">bolt</span>
                  </div>
                  <span className="font-bold text-sm text-white">
                    {t.bookingForm.evCharging}
                  </span>
                  <span className="text-xs text-slate-400 mt-1">{t.bookingForm.evChargingPrice}</span>
                </label>
              </div>
            </div>
          </div>

          {/* Price + CTA */}
          <div className="pt-6 border-t border-white/10 mt-2">
            <div className="flex justify-between items-end mb-4">
              <div>
                <p className="text-xs text-slate-400 font-medium mb-1">
                  {t.bookingForm.estimatedTotal}
                </p>
                <p className="text-3xl font-black text-white">
                  ${total.toFixed(2)}
                </p>
              </div>
              <div className="text-right">
                <span className="text-xs text-fresh-mint flex items-center gap-1 justify-end">
                  <span className="material-symbols-outlined text-[14px]">
                    check_circle
                  </span>
                  {t.bookingForm.freeCancellation}
                </span>
              </div>
            </div>
            <button
              onClick={handleReserve}
              className="w-full group relative flex items-center justify-center gap-2 bg-fresh-mint hover:bg-white text-black text-lg font-bold py-4 px-6 rounded-xl shadow-[0_0_20px_rgba(102,255,204,0.3)] hover:shadow-[0_0_25px_rgba(255,255,255,0.4)] transition-all duration-300 transform active:scale-[0.98]"
            >
              <span className="relative z-10">
                {t.bookingForm.reserveButton}
              </span>
              <span className="material-symbols-outlined text-xl transition-transform group-hover:translate-x-1 relative z-10">
                arrow_forward
              </span>
            </button>
            <p className="text-center text-xs text-slate-500 mt-4 flex items-center justify-center gap-1.5 opacity-80">
              <span className="material-symbols-outlined text-[14px]">
                lock
              </span>
              {t.bookingForm.secureCheckout}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
