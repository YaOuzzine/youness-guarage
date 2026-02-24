'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { createBooking } from '@/lib/api';
import type { CreateBookingDto } from '@youness-garage/shared';
import { useLocale } from '../../../i18n/LocaleContext';

function ConfirmBookingForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { t } = useLocale();

  const checkIn = searchParams.get('checkIn') ?? '';
  const checkOut = searchParams.get('checkOut') ?? '';
  const spotType = searchParams.get('spotType') ?? '';
  const carWash = searchParams.get('carWash') === '1';
  const evCharging = searchParams.get('evCharging') === '1';

  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [licensePlate, setLicensePlate] = useState('');
  const [vehicleMake, setVehicleMake] = useState('');
  const [vehicleModel, setVehicleModel] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!guestName || !guestEmail || !guestPhone || !licensePlate || !vehicleMake || !vehicleModel) {
      setError(t.bookConfirm.fillAllFields);
      return;
    }
    if (!checkIn || !checkOut) {
      setError(t.bookConfirm.missingDates);
      return;
    }

    setError('');
    setLoading(true);
    try {
      const dto: CreateBookingDto = {
        guestName,
        guestEmail,
        guestPhone,
        licensePlate,
        vehicleMake,
        vehicleModel,
        checkIn: new Date(checkIn).toISOString(),
        checkOut: new Date(checkOut).toISOString(),
        spotType: spotType === 'EV' ? 'EV' : 'STANDARD',
      };
      const booking = await createBooking(dto);
      router.push(`/book/checkout?bookingId=${booking.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Booking failed. Please try again.');
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

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-grow flex flex-col pt-12 pb-20">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
            {t.bookConfirm.title}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-fresh-mint to-electric-teal">
              {t.bookConfirm.titleHighlight}
            </span>
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            {t.bookConfirm.subtitle}
          </p>
        </div>

        {/* Booking Summary */}
        <div className="glass-card rounded-2xl p-6 mb-8">
          <h2 className="text-lg font-bold text-white mb-4">
            {t.bookConfirm.summaryTitle}
          </h2>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-slate-400">{t.bookConfirm.checkIn}</p>
              <p className="text-white font-medium">
                {checkIn ? new Date(checkIn).toLocaleString() : 'Not set'}
              </p>
            </div>
            <div>
              <p className="text-slate-400">{t.bookConfirm.checkOut}</p>
              <p className="text-white font-medium">
                {checkOut ? new Date(checkOut).toLocaleString() : 'Not set'}
              </p>
            </div>
            <div>
              <p className="text-slate-400">{t.bookConfirm.spotType}</p>
              <p className="text-white font-medium">
                {spotType || 'Standard'}
              </p>
            </div>
            <div>
              <p className="text-slate-400">{t.bookConfirm.addons}</p>
              <div className="flex gap-2 mt-1">
                {carWash && (
                  <span className="px-2 py-1 rounded bg-electric-teal/10 text-electric-teal text-xs font-bold">
                    {t.bookConfirm.carWash}
                  </span>
                )}
                {evCharging && (
                  <span className="px-2 py-1 rounded bg-fresh-mint/10 text-fresh-mint text-xs font-bold">
                    {t.bookConfirm.evCharging}
                  </span>
                )}
                {!carWash && !evCharging && (
                  <span className="text-slate-500">{t.bookConfirm.none}</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Guest Info Form */}
        <form
          onSubmit={handleSubmit}
          className="glass-card rounded-2xl p-6 sm:p-8"
        >
          <h2 className="text-lg font-bold text-white mb-6">
            {t.bookConfirm.guestInfo}
          </h2>
          <div className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wide mb-2">
                  {t.bookConfirm.fullName}
                </label>
                <input
                  type="text"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  placeholder="John Doe"
                  className="block w-full px-4 py-3 bg-black/40 border border-white/10 hover:border-electric-teal focus:border-electric-teal focus:ring-1 focus:ring-electric-teal rounded-lg text-white placeholder-slate-600 transition-colors"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wide mb-2">
                  {t.bookConfirm.email}
                </label>
                <input
                  type="email"
                  value={guestEmail}
                  onChange={(e) => setGuestEmail(e.target.value)}
                  placeholder="john@example.com"
                  className="block w-full px-4 py-3 bg-black/40 border border-white/10 hover:border-electric-teal focus:border-electric-teal focus:ring-1 focus:ring-electric-teal rounded-lg text-white placeholder-slate-600 transition-colors"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wide mb-2">
                {t.bookConfirm.phone}
              </label>
              <input
                type="tel"
                value={guestPhone}
                onChange={(e) => setGuestPhone(e.target.value)}
                placeholder="+1 (555) 000-0000"
                className="block w-full px-4 py-3 bg-black/40 border border-white/10 hover:border-electric-teal focus:border-electric-teal focus:ring-1 focus:ring-electric-teal rounded-lg text-white placeholder-slate-600 transition-colors"
                required
              />
            </div>

            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wide pt-4">
              {t.bookConfirm.vehicleDetails}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wide mb-2">
                  {t.bookConfirm.licensePlate}
                </label>
                <input
                  type="text"
                  value={licensePlate}
                  onChange={(e) => setLicensePlate(e.target.value)}
                  placeholder="ABC-1234"
                  className="block w-full px-4 py-3 bg-black/40 border border-white/10 hover:border-electric-teal focus:border-electric-teal focus:ring-1 focus:ring-electric-teal rounded-lg text-white placeholder-slate-600 transition-colors"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wide mb-2">
                  {t.bookConfirm.vehicleMake}
                </label>
                <input
                  type="text"
                  value={vehicleMake}
                  onChange={(e) => setVehicleMake(e.target.value)}
                  placeholder="Toyota"
                  className="block w-full px-4 py-3 bg-black/40 border border-white/10 hover:border-electric-teal focus:border-electric-teal focus:ring-1 focus:ring-electric-teal rounded-lg text-white placeholder-slate-600 transition-colors"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wide mb-2">
                  {t.bookConfirm.vehicleModel}
                </label>
                <input
                  type="text"
                  value={vehicleModel}
                  onChange={(e) => setVehicleModel(e.target.value)}
                  placeholder="Camry"
                  className="block w-full px-4 py-3 bg-black/40 border border-white/10 hover:border-electric-teal focus:border-electric-teal focus:ring-1 focus:ring-electric-teal rounded-lg text-white placeholder-slate-600 transition-colors"
                  required
                />
              </div>
            </div>
          </div>

          {error && (
            <p className="text-red-400 text-sm mt-4">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-8 w-full group relative flex items-center justify-center gap-2 bg-fresh-mint hover:bg-white text-black text-lg font-bold py-4 px-6 rounded-xl shadow-[0_0_20px_rgba(102,255,204,0.3)] hover:shadow-[0_0_25px_rgba(255,255,255,0.4)] transition-all duration-300 transform active:scale-[0.98] disabled:opacity-50"
          >
            <span className="relative z-10">
              {loading ? t.bookConfirm.processing : t.bookConfirm.confirmButton}
            </span>
            {!loading && (
              <span className="material-symbols-outlined text-xl transition-transform group-hover:translate-x-1 relative z-10">
                arrow_forward
              </span>
            )}
          </button>
          <p className="text-center text-xs text-slate-500 mt-4 flex items-center justify-center gap-1.5 opacity-80">
            <span className="material-symbols-outlined text-[14px]">lock</span>
            {t.bookConfirm.secureNote}
          </p>
        </form>
      </div>
    </main>
  );
}

export default function ConfirmPage() {
  return (
    <Suspense
      fallback={
        <main className="relative min-h-screen flex flex-col pt-20">
          <div className="relative z-10 max-w-3xl mx-auto px-4 w-full flex-grow flex items-center justify-center">
            <p className="text-slate-400 text-lg">Loading...</p>
          </div>
        </main>
      }
    >
      <ConfirmBookingForm />
    </Suspense>
  );
}
