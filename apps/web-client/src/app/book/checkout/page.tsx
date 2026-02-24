'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { getBooking, checkoutBooking } from '@/lib/api';
import type { BookingResponse } from '@youness-garage/shared';

function CheckoutForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const bookingId = searchParams.get('bookingId');

  const [booking, setBooking] = useState<BookingResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [processing, setProcessing] = useState(false);
  const [payOnArrival, setPayOnArrival] = useState(false);

  // Card form fields (visual only — no real payment processing)
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'wallet'>('card');

  useEffect(() => {
    if (!bookingId) {
      setError('No booking ID provided.');
      setLoading(false);
      return;
    }
    getBooking(bookingId)
      .then((b) => setBooking(b))
      .catch((err) =>
        setError(err instanceof Error ? err.message : 'Failed to load booking.'),
      )
      .finally(() => setLoading(false));
  }, [bookingId]);

  function formatCardNumber(value: string) {
    const digits = value.replace(/\D/g, '').slice(0, 16);
    return digits.replace(/(\d{4})(?=\d)/g, '$1 ');
  }

  function formatExpiry(value: string) {
    const digits = value.replace(/\D/g, '').slice(0, 4);
    if (digits.length > 2) return `${digits.slice(0, 2)} / ${digits.slice(2)}`;
    return digits;
  }

  async function handlePayment() {
    if (!booking) return;
    setProcessing(true);
    try {
      await checkoutBooking(booking.id);
      router.push(`/book/success?bookingId=${booking.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Payment failed');
      setProcessing(false);
    }
  }

  // Compute price breakdown
  const days = booking
    ? Math.max(1, Math.ceil((new Date(booking.checkOut).getTime() - new Date(booking.checkIn).getTime()) / 86_400_000))
    : 0;
  const dailyRate = booking ? Math.round((booking.totalPrice / days) * 100) / 100 : 0;
  const parkingSubtotal = days * dailyRate;
  // Placeholder add-on amounts
  const addonTotal = booking ? booking.addons.reduce((sum, a) => sum + a.price, 0) : 0;
  const taxRate = 0.08;
  const subtotal = parkingSubtotal + addonTotal;
  const taxes = Math.round(subtotal * taxRate * 100) / 100;
  const total = subtotal + taxes;

  if (loading) {
    return (
      <main className="relative min-h-screen flex flex-col pt-20">
        <div className="relative z-10 max-w-3xl mx-auto px-4 w-full flex-grow flex items-center justify-center">
          <p className="text-slate-400 text-lg">Loading checkout...</p>
        </div>
      </main>
    );
  }

  if (error && !booking) {
    return (
      <main className="relative min-h-screen flex flex-col pt-20">
        <div className="fixed inset-0 z-0 bg-charcoal pointer-events-none">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-electric-teal/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto px-4 w-full flex-grow flex flex-col items-center justify-center gap-6">
          <span className="material-symbols-outlined text-6xl text-red-400">error</span>
          <h1 className="text-2xl font-bold text-white">{error}</h1>
          <Link href="/book" className="px-6 py-3 bg-electric-teal text-black font-bold rounded-xl shadow-glow-teal transition-all">
            Try Again
          </Link>
        </div>
      </main>
    );
  }

  if (!booking) return null;

  return (
    <main className="relative min-h-screen flex flex-col pt-20">
      {/* Background */}
      <div className="fixed inset-0 z-0 bg-charcoal pointer-events-none">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-electric-teal/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-fresh-mint/5 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/4" />
      </div>

      {/* Processing Overlay */}
      {processing && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center gap-6">
          <div className="w-16 h-16 border-4 border-electric-teal/30 border-t-electric-teal rounded-full animate-spin" />
          <p className="text-white text-xl font-bold">Processing payment...</p>
          <p className="text-slate-400 text-sm">Please do not close this page</p>
        </div>
      )}

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-grow flex flex-col pt-8 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">

          {/* ── Left Column: Booking Summary ── */}
          <div className="lg:col-span-5 flex flex-col gap-6 order-2 lg:order-1">
            <div className="flex flex-col gap-2 mb-2">
              <h1 className="text-3xl lg:text-4xl font-black leading-tight tracking-tight text-white">
                Secure Checkout
              </h1>
              <p className="text-slate-400 text-base">
                Complete your reservation for Youness Garage &mdash; Airport Parking
              </p>
            </div>

            {/* Summary Card */}
            <div className="glass-card rounded-2xl overflow-hidden flex flex-col">
              {/* Card Header */}
              <div className="p-6 border-b border-white/10 bg-white/5">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <span className="material-symbols-outlined text-electric-teal">receipt_long</span>
                  Booking Summary
                </h2>
              </div>

              {/* Dates & Location */}
              <div className="p-6 grid grid-cols-2 gap-y-6 gap-x-4 border-b border-white/10 border-dashed">
                <div className="flex flex-col gap-1">
                  <p className="text-slate-400 text-xs uppercase tracking-wider font-semibold">Check-in</p>
                  <p className="text-white text-sm font-medium">
                    {new Date(booking.checkIn).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })},{' '}
                    {new Date(booking.checkIn).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
                <div className="flex flex-col gap-1 text-right">
                  <p className="text-slate-400 text-xs uppercase tracking-wider font-semibold">Check-out</p>
                  <p className="text-white text-sm font-medium">
                    {new Date(booking.checkOut).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })},{' '}
                    {new Date(booking.checkOut).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
                <div className="flex flex-col gap-1 col-span-2">
                  <p className="text-slate-400 text-xs uppercase tracking-wider font-semibold">Location</p>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-electric-teal text-sm">location_on</span>
                    <p className="text-white text-sm font-medium">Terminal 1 Premium &mdash; Covered</p>
                  </div>
                </div>
                <div className="flex flex-col gap-1 col-span-2">
                  <p className="text-slate-400 text-xs uppercase tracking-wider font-semibold">Vehicle</p>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-electric-teal text-sm">directions_car</span>
                    <p className="text-white text-sm font-medium">
                      {booking.vehicleMake} {booking.vehicleModel} &bull; {booking.licensePlate}
                    </p>
                  </div>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="p-6 flex flex-col gap-3 bg-white/[0.02]">
                <div className="flex justify-between items-center text-sm text-slate-300">
                  <span className="flex items-center gap-2">
                    {days} {days === 1 ? 'Day' : 'Days'} Parking
                    <span className="text-xs px-2 py-0.5 rounded bg-white/10 text-slate-400">
                      ${dailyRate.toFixed(0)}/day
                    </span>
                  </span>
                  <span>${parkingSubtotal.toFixed(2)}</span>
                </div>

                {booking.addons.map((addon) => (
                  <div key={addon.id} className="flex justify-between items-center text-sm text-fresh-mint">
                    <span className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-base">
                        {addon.type === 'CAR_WASH' ? 'local_car_wash' : 'ev_station'}
                      </span>
                      {addon.type === 'CAR_WASH' ? 'Premium Car Wash' : 'EV Charging'}
                    </span>
                    <span>${addon.price.toFixed(2)}</span>
                  </div>
                ))}

                <div className="flex justify-between items-center text-sm text-slate-300 border-b border-white/10 pb-3">
                  <span>Taxes &amp; Fees</span>
                  <span>${taxes.toFixed(2)}</span>
                </div>

                <div className="flex justify-between items-baseline pt-2">
                  <span className="text-white font-bold text-lg">Total Due Now</span>
                  <div className="text-right">
                    <span className="block text-3xl font-black text-electric-teal tracking-tight">
                      ${total.toFixed(2)}
                    </span>
                    <span className="text-xs text-slate-400">Includes all taxes</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="flex items-center justify-center gap-6 opacity-60 hover:opacity-100 transition-all duration-300 py-4">
              <div className="flex items-center gap-1">
                <span className="material-symbols-outlined text-2xl text-white">lock</span>
                <span className="text-xs font-medium text-white">SSL Secure</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="material-symbols-outlined text-2xl text-white">verified_user</span>
                <span className="text-xs font-medium text-white">Verified Garage</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="material-symbols-outlined text-2xl text-white">savings</span>
                <span className="text-xs font-medium text-white">Best Price</span>
              </div>
            </div>
          </div>

          {/* ── Right Column: Payment Form ── */}
          <div className="lg:col-span-7 flex flex-col gap-6 order-1 lg:order-2">
            <div className="glass-card rounded-2xl p-6 lg:p-10">
              <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-electric-teal text-charcoal text-sm font-bold">1</span>
                Payment Method
              </h2>

              {/* Payment Method Tabs */}
              <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
                <label className="cursor-pointer relative group">
                  <input
                    type="radio"
                    name="payment_type"
                    className="peer sr-only"
                    checked={paymentMethod === 'card'}
                    onChange={() => setPaymentMethod('card')}
                  />
                  <div className="min-w-[140px] p-4 rounded-xl border-2 border-white/10 peer-checked:border-electric-teal peer-checked:bg-electric-teal/5 hover:border-electric-teal/50 transition-all flex flex-col items-center gap-2">
                    <span className="material-symbols-outlined text-3xl text-slate-300 peer-checked:text-electric-teal">credit_card</span>
                    <span className="text-sm font-semibold text-white">Credit Card</span>
                  </div>
                  <div className="absolute top-2 right-2 opacity-0 peer-checked:opacity-100 text-electric-teal">
                    <span className="material-symbols-outlined text-lg">check_circle</span>
                  </div>
                </label>
                <label className="cursor-pointer relative group">
                  <input
                    type="radio"
                    name="payment_type"
                    className="peer sr-only"
                    checked={paymentMethod === 'wallet'}
                    onChange={() => setPaymentMethod('wallet')}
                  />
                  <div className="min-w-[140px] p-4 rounded-xl border-2 border-white/10 peer-checked:border-electric-teal peer-checked:bg-electric-teal/5 hover:border-electric-teal/50 transition-all flex flex-col items-center gap-2">
                    <span className="material-symbols-outlined text-3xl text-slate-300 peer-checked:text-electric-teal">account_balance_wallet</span>
                    <span className="text-sm font-semibold text-white">Digital Wallet</span>
                  </div>
                  <div className="absolute top-2 right-2 opacity-0 peer-checked:opacity-100 text-electric-teal">
                    <span className="material-symbols-outlined text-lg">check_circle</span>
                  </div>
                </label>
              </div>

              {/* Credit Card Form */}
              <form
                className="flex flex-col gap-5"
                onSubmit={(e) => {
                  e.preventDefault();
                  void handlePayment();
                }}
              >
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-slate-300" htmlFor="cardholder">
                    Cardholder Name
                  </label>
                  <div className="relative">
                    <input
                      className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-electric-teal focus:border-transparent transition-shadow pl-11 placeholder-slate-600"
                      id="cardholder"
                      placeholder="John Doe"
                      type="text"
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                    />
                    <div className="absolute left-3 top-3 text-slate-500">
                      <span className="material-symbols-outlined">person</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-slate-300" htmlFor="cardnumber">
                    Card Number
                  </label>
                  <div className="relative">
                    <input
                      className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-electric-teal focus:border-transparent transition-shadow pl-11 font-mono placeholder-slate-600"
                      id="cardnumber"
                      placeholder="0000 0000 0000 0000"
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                      maxLength={19}
                    />
                    <div className="absolute left-3 top-3 text-slate-500">
                      <span className="material-symbols-outlined">credit_card</span>
                    </div>
                    <div className="absolute right-3 top-3 flex gap-2 opacity-50">
                      <div className="w-8 h-5 bg-slate-600 rounded-sm" title="Visa" />
                      <div className="w-8 h-5 bg-slate-600 rounded-sm" title="Mastercard" />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-5">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-slate-300" htmlFor="expiry">
                      Expiry Date
                    </label>
                    <div className="relative">
                      <input
                        className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-electric-teal focus:border-transparent transition-shadow pl-11 font-mono placeholder-slate-600"
                        id="expiry"
                        placeholder="MM / YY"
                        type="text"
                        value={expiry}
                        onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                        maxLength={7}
                      />
                      <div className="absolute left-3 top-3 text-slate-500">
                        <span className="material-symbols-outlined">calendar_month</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-slate-300 flex items-center gap-1" htmlFor="cvv">
                      CVV
                      <span className="material-symbols-outlined text-slate-500 text-sm cursor-help" title="3 digits on back of card">
                        help
                      </span>
                    </label>
                    <div className="relative">
                      <input
                        className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-electric-teal focus:border-transparent transition-shadow pl-11 font-mono placeholder-slate-600"
                        id="cvv"
                        placeholder="123"
                        type="text"
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').slice(0, 4))}
                        maxLength={4}
                      />
                      <div className="absolute left-3 top-3 text-slate-500">
                        <span className="material-symbols-outlined">lock</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Pay on Arrival Toggle */}
                <div className="mt-4 p-4 rounded-lg bg-white/5 border border-white/10 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-white">Reserve now, pay on arrival</span>
                    <span className="text-xs text-slate-400">You may lose the online discount rate.</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={payOnArrival}
                      onChange={() => setPayOnArrival(!payOnArrival)}
                    />
                    <div className="w-11 h-6 bg-slate-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-electric-teal/20 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-electric-teal" />
                  </label>
                </div>

                {error && (
                  <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm text-center">
                    {error}
                  </div>
                )}

                <div className="mt-6 flex flex-col gap-4">
                  <button
                    type="submit"
                    disabled={processing}
                    className="w-full bg-electric-teal hover:bg-electric-teal/90 text-charcoal font-bold text-lg py-4 rounded-full shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-all hover:shadow-[0_0_30px_rgba(0,240,255,0.6)] flex items-center justify-center gap-2 group disabled:opacity-50"
                  >
                    Pay &amp; Confirm Reservation
                    <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">
                      arrow_forward
                    </span>
                  </button>
                  <p className="text-center text-xs text-slate-400">
                    By clicking &quot;Pay &amp; Confirm&quot;, you agree to our{' '}
                    <Link className="text-electric-teal hover:underline" href="/legal">
                      Terms of Service
                    </Link>{' '}
                    and{' '}
                    <Link className="text-electric-teal hover:underline" href="/legal">
                      Privacy Policy
                    </Link>
                    .
                  </p>
                </div>
              </form>
            </div>

            {/* Additional Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl border border-white/10 bg-white/5 flex items-start gap-3">
                <span className="material-symbols-outlined text-fresh-mint mt-1">support_agent</span>
                <div>
                  <h3 className="font-bold text-white text-sm">24/7 Support</h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Need help? Call +33 1 48 62 00 00 anytime.
                  </p>
                </div>
              </div>
              <div className="p-4 rounded-xl border border-white/10 bg-white/5 flex items-start gap-3">
                <span className="material-symbols-outlined text-fresh-mint mt-1">cancel</span>
                <div>
                  <h3 className="font-bold text-white text-sm">Free Cancellation</h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Cancel up to 24 hours before check-in for a full refund.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense
      fallback={
        <main className="relative min-h-screen flex flex-col pt-20">
          <div className="relative z-10 max-w-3xl mx-auto px-4 w-full flex-grow flex items-center justify-center">
            <p className="text-slate-400 text-lg">Loading checkout...</p>
          </div>
        </main>
      }
    >
      <CheckoutForm />
    </Suspense>
  );
}
