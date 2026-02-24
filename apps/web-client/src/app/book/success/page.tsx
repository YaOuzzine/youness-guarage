'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { getBooking } from '@/lib/api';
import type { BookingResponse } from '@youness-garage/shared';
import { useLocale } from '../../../i18n/LocaleContext';

function BookingSuccess() {
  const searchParams = useSearchParams();
  const bookingId = searchParams.get('bookingId');
  const [booking, setBooking] = useState<BookingResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { t } = useLocale();

  useEffect(() => {
    if (!bookingId) {
      setError(t.bookSuccess.noBookingId);
      setLoading(false);
      return;
    }
    getBooking(bookingId)
      .then((b) => setBooking(b))
      .catch((err) =>
        setError(err instanceof Error ? err.message : t.bookSuccess.loadFailed),
      )
      .finally(() => setLoading(false));
  }, [bookingId, t.bookSuccess.noBookingId, t.bookSuccess.loadFailed]);

  if (loading) {
    return (
      <main className="relative min-h-screen flex flex-col pt-20">
        <div className="relative z-10 max-w-3xl mx-auto px-4 w-full flex-grow flex items-center justify-center">
          <p className="text-slate-400 text-lg">{t.bookSuccess.loading}</p>
        </div>
      </main>
    );
  }

  if (error || !booking) {
    return (
      <main className="relative min-h-screen flex flex-col pt-20">
        <div className="fixed inset-0 z-0 bg-charcoal pointer-events-none">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-electric-teal/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto px-4 w-full flex-grow flex flex-col items-center justify-center gap-6">
          <span className="material-symbols-outlined text-6xl text-red-400">
            error
          </span>
          <h1 className="text-2xl font-bold text-white">
            {error || t.bookSuccess.errorTitle}
          </h1>
          <Link
            href="/book"
            className="px-6 py-3 bg-electric-teal text-black font-bold rounded-xl shadow-glow-teal transition-all"
          >
            {t.bookSuccess.tryAgain}
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen flex flex-col pt-20">
      <div className="fixed inset-0 z-0 bg-charcoal pointer-events-none">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-electric-teal/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-fresh-mint/5 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/4" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-grow flex flex-col pt-12 pb-20">
        {/* Success Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-fresh-mint/20 text-fresh-mint mb-6 shadow-glow-mint">
            <span className="material-symbols-outlined text-5xl">
              check_circle
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
            {t.bookSuccess.title}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-fresh-mint to-electric-teal">
              {t.bookSuccess.titleHighlight}
            </span>
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            {t.bookSuccess.subtitle}
          </p>
        </div>

        {/* Booking Details */}
        <div className="glass-card rounded-2xl p-6 sm:p-8 mb-8">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
            <h2 className="text-xl font-bold text-white">{t.bookSuccess.detailsTitle}</h2>
            <span className="px-3 py-1 rounded-full bg-fresh-mint/10 text-fresh-mint text-xs font-bold uppercase">
              {booking.status}
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-wide mb-1">
                  {t.bookSuccess.bookingId}
                </p>
                <p className="text-white font-mono font-bold">{booking.id}</p>
              </div>
              <div>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-wide mb-1">
                  {t.bookSuccess.guest}
                </p>
                <p className="text-white font-medium">{booking.guestName}</p>
              </div>
              <div>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-wide mb-1">
                  {t.bookSuccess.email}
                </p>
                <p className="text-white">{booking.guestEmail}</p>
              </div>
              <div>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-wide mb-1">
                  {t.bookSuccess.phone}
                </p>
                <p className="text-white">{booking.guestPhone}</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-wide mb-1">
                  {t.bookSuccess.checkIn}
                </p>
                <p className="text-white font-medium">
                  {new Date(booking.checkIn).toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-wide mb-1">
                  {t.bookSuccess.checkOut}
                </p>
                <p className="text-white font-medium">
                  {new Date(booking.checkOut).toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-wide mb-1">
                  {t.bookSuccess.vehicle}
                </p>
                <p className="text-white">
                  {booking.vehicleMake} {booking.vehicleModel}
                </p>
                <p className="text-slate-400 text-sm font-mono">
                  {booking.licensePlate}
                </p>
              </div>
              <div>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-wide mb-1">
                  {t.bookSuccess.spot}
                </p>
                <p className="text-white font-bold">
                  {booking.spotNumber ?? t.bookSuccess.toBeAssigned}
                </p>
              </div>
            </div>
          </div>

          {/* Add-ons */}
          {booking.addons.length > 0 && (
            <div className="mt-6 pt-6 border-t border-white/10">
              <p className="text-xs text-slate-400 font-bold uppercase tracking-wide mb-3">
                {t.bookSuccess.addons}
              </p>
              <div className="flex gap-3 flex-wrap">
                {booking.addons.map((addon) => (
                  <div
                    key={addon.id}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/10"
                  >
                    <span className="material-symbols-outlined text-electric-teal text-lg">
                      {addon.type === 'CAR_WASH' ? 'local_car_wash' : 'bolt'}
                    </span>
                    <span className="text-white text-sm font-medium">
                      {addon.type === 'CAR_WASH' ? t.bookSuccess.carWash : t.bookSuccess.evCharging}
                    </span>
                    <span className="text-slate-400 text-xs">
                      ${addon.price.toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Total */}
          <div className="mt-6 pt-6 border-t border-white/10 flex justify-between items-end">
            <p className="text-slate-400 text-sm">{t.bookSuccess.totalPrice}</p>
            <p className="text-3xl font-black text-white">
              ${booking.totalPrice.toFixed(2)}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl border border-white/20 transition-all text-center"
          >
            {t.bookSuccess.backHome}
          </Link>
          <Link
            href="/book"
            className="px-8 py-3 bg-electric-teal hover:bg-white text-black font-bold rounded-xl shadow-glow-teal transition-all text-center"
          >
            {t.bookSuccess.bookAnother}
          </Link>
        </div>
      </div>
    </main>
  );
}

export default function SuccessPage() {
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
      <BookingSuccess />
    </Suspense>
  );
}
