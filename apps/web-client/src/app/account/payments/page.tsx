'use client';

import { useState, useEffect, useCallback } from 'react';
import { useLocale } from '../../../i18n/LocaleContext';
import { getMyBookings } from '@/app/actions/bookings';
import {
  getBillingInfo,
  updateBillingInfo,
  getPaymentMethods,
  addPaymentMethod,
  removePaymentMethod,
  setDefaultPaymentMethod,
} from '@/app/actions/payments';
import type {
  BookingResponse,
  PaymentMethodResponse,
} from '@youness-garage/shared';

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

function invoiceStatus(
  bookingStatus: string,
  t: ReturnType<typeof useLocale>['t'],
): { label: string; color: string } {
  if (['CONFIRMED', 'CHECKED_IN', 'CHECKED_OUT'].includes(bookingStatus)) {
    return { label: t.accountPayments.statusPaid, color: 'text-fresh-mint bg-fresh-mint/10 border-fresh-mint/20' };
  }
  if (bookingStatus === 'PENDING') {
    return { label: t.accountPayments.statusPending, color: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20' };
  }
  return { label: t.accountPayments.statusCancelled, color: 'text-red-400 bg-red-400/10 border-red-400/20' };
}

function brandIcon(brand: string): string {
  switch (brand.toLowerCase()) {
    case 'visa': return 'credit_card';
    case 'mastercard': return 'credit_card';
    case 'amex': return 'credit_card';
    default: return 'credit_card';
  }
}

export default function PaymentsPage() {
  const { t } = useLocale();

  // Invoices (from bookings)
  const [invoices, setInvoices] = useState<BookingResponse[]>([]);
  const [loadingInvoices, setLoadingInvoices] = useState(true);

  // Payment methods
  const [cards, setCards] = useState<PaymentMethodResponse[]>([]);
  const [loadingCards, setLoadingCards] = useState(true);
  const [showAddCard, setShowAddCard] = useState(false);
  const [addLast4, setAddLast4] = useState('');
  const [addBrand, setAddBrand] = useState('visa');
  const [addExpMonth, setAddExpMonth] = useState('');
  const [addExpYear, setAddExpYear] = useState('');
  const [addingCard, setAddingCard] = useState(false);
  const [cardMenuOpen, setCardMenuOpen] = useState<string | null>(null);

  // Billing info
  const [companyName, setCompanyName] = useState('');
  const [billingAddress, setBillingAddress] = useState('');
  const [billingCity, setBillingCity] = useState('');
  const [billingState, setBillingState] = useState('');
  const [billingZip, setBillingZip] = useState('');
  const [billingCountry, setBillingCountry] = useState('');
  const [taxId, setTaxId] = useState('');
  const [savingBilling, setSavingBilling] = useState(false);

  // Feedback
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const loadAll = useCallback(async () => {
    try {
      const [bookingsRes, cardsRes, billingRes] = await Promise.all([
        getMyBookings({ limit: 50 }),
        getPaymentMethods(),
        getBillingInfo(),
      ]);
      setInvoices(bookingsRes.data);
      setCards(cardsRes);
      setCompanyName(billingRes.companyName ?? '');
      setBillingAddress(billingRes.billingAddress ?? '');
      setBillingCity(billingRes.billingCity ?? '');
      setBillingState(billingRes.billingState ?? '');
      setBillingZip(billingRes.billingZip ?? '');
      setBillingCountry(billingRes.billingCountry ?? '');
      setTaxId(billingRes.taxId ?? '');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load data');
    } finally {
      setLoadingInvoices(false);
      setLoadingCards(false);
    }
  }, []);

  useEffect(() => {
    loadAll();
  }, [loadAll]);

  async function handleAddCard() {
    if (!addLast4 || !addExpMonth || !addExpYear) return;
    setAddingCard(true);
    try {
      await addPaymentMethod({
        last4: addLast4,
        brand: addBrand,
        expMonth: parseInt(addExpMonth, 10),
        expYear: parseInt(addExpYear, 10),
      });
      setCards(await getPaymentMethods());
      setShowAddCard(false);
      setAddLast4('');
      setAddBrand('visa');
      setAddExpMonth('');
      setAddExpYear('');
      setSuccess(t.accountPayments.cardAdded);
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add card');
    } finally {
      setAddingCard(false);
    }
  }

  async function handleRemoveCard(id: string) {
    try {
      await removePaymentMethod(id);
      setCards(await getPaymentMethods());
      setCardMenuOpen(null);
      setSuccess(t.accountPayments.cardRemoved);
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to remove card');
    }
  }

  async function handleSetDefault(id: string) {
    try {
      await setDefaultPaymentMethod(id);
      setCards(await getPaymentMethods());
      setCardMenuOpen(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to set default');
    }
  }

  async function handleSaveBilling() {
    setSavingBilling(true);
    try {
      await updateBillingInfo({
        companyName,
        billingAddress,
        billingCity,
        billingState,
        billingZip,
        billingCountry,
        taxId,
      });
      setSuccess(t.accountPayments.billingUpdated);
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save billing');
    } finally {
      setSavingBilling(false);
    }
  }

  const isLoading = loadingInvoices || loadingCards;

  if (isLoading) {
    return (
      <div className="p-6 lg:p-10 w-full max-w-7xl mx-auto flex flex-col items-center justify-center min-h-[60vh]">
        <div className="w-12 h-12 border-4 border-electric-teal/30 border-t-electric-teal rounded-full animate-spin" />
        <p className="text-slate-400 mt-4 text-sm">{t.accountPayments.title}...</p>
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-10 w-full max-w-7xl mx-auto flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-white mb-1">
            {t.accountPayments.title}
          </h1>
          <p className="text-slate-400">
            {t.accountPayments.subtitle}
          </p>
        </div>
        <div className="hidden md:flex gap-3">
          <button className="group flex items-center gap-2 py-2.5 px-5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-white font-medium transition-all duration-300">
            <span className="material-symbols-outlined text-lg">description</span>
            <span>{t.accountPayments.downloadInvoices}</span>
          </button>
        </div>
      </div>

      {/* Feedback */}
      {success && (
        <div className="mb-6 p-4 rounded-xl bg-fresh-mint/10 border border-fresh-mint/20 text-fresh-mint text-sm font-medium flex items-center gap-2">
          <span className="material-symbols-outlined text-lg">check_circle</span>
          {success}
        </div>
      )}
      {error && (
        <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium flex items-center gap-2">
          <span className="material-symbols-outlined text-lg">error</span>
          {error}
          <button onClick={() => setError(null)} className="ml-auto text-red-400 hover:text-red-300">
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 pb-10">
        {/* Left Column */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {/* Payment Methods */}
          <div className="glass-card rounded-[2rem] p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">
                {t.accountPayments.paymentMethods}
              </h2>
              <button
                onClick={() => setShowAddCard(!showAddCard)}
                className="text-sm text-electric-teal font-medium hover:text-fresh-mint transition-colors flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-base">add</span>
                {t.accountPayments.addNew}
              </button>
            </div>

            {/* Add card form */}
            {showAddCard && (
              <div className="mb-6 p-5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      {t.accountPayments.cardLast4}
                    </label>
                    <input
                      type="text"
                      maxLength={4}
                      value={addLast4}
                      onChange={(e) => setAddLast4(e.target.value.replace(/\D/g, ''))}
                      placeholder="4242"
                      className="w-full rounded-xl px-4 py-3 text-sm font-medium text-white"
                      style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      {t.accountPayments.cardBrand}
                    </label>
                    <select
                      value={addBrand}
                      onChange={(e) => setAddBrand(e.target.value)}
                      className="w-full rounded-xl px-4 py-3 text-sm font-medium text-white"
                      style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
                    >
                      <option value="visa">Visa</option>
                      <option value="mastercard">Mastercard</option>
                      <option value="amex">Amex</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Exp Month
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={12}
                      value={addExpMonth}
                      onChange={(e) => setAddExpMonth(e.target.value)}
                      placeholder="12"
                      className="w-full rounded-xl px-4 py-3 text-sm font-medium text-white"
                      style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Exp Year
                    </label>
                    <input
                      type="number"
                      min={2024}
                      max={2040}
                      value={addExpYear}
                      onChange={(e) => setAddExpYear(e.target.value)}
                      placeholder="2027"
                      className="w-full rounded-xl px-4 py-3 text-sm font-medium text-white"
                      style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
                    />
                  </div>
                </div>
                <button
                  onClick={handleAddCard}
                  disabled={addingCard || !addLast4 || !addExpMonth || !addExpYear}
                  className="w-full py-3 rounded-xl bg-electric-teal/10 border border-electric-teal/30 text-electric-teal font-bold text-sm hover:bg-electric-teal/20 transition-all disabled:opacity-50"
                >
                  {addingCard ? '...' : t.accountPayments.addCard}
                </button>
              </div>
            )}

            <div className="space-y-4">
              {cards.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-8 text-slate-400">
                  <span className="material-symbols-outlined text-4xl mb-3">credit_card_off</span>
                  <p className="text-sm">{t.accountPayments.noPaymentMethods}</p>
                </div>
              ) : (
                cards.map((card) => (
                  <div
                    key={card.id}
                    className={`relative rounded-2xl p-6 transition-all ${
                      card.isDefault
                        ? 'border border-electric-teal/30 shadow-glow-teal'
                        : 'border border-white/5 bg-white/[0.02] hover:bg-white/[0.04]'
                    }`}
                  >
                    {card.isDefault && (
                      <>
                        <div className="absolute inset-0 bg-gradient-to-br from-charcoal to-charcoal-dark opacity-90 z-0" />
                        <div className="absolute top-0 right-0 w-32 h-32 bg-electric-teal/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 z-0" />
                      </>
                    )}
                    <div className={`${card.isDefault ? 'relative z-10' : ''} flex justify-between items-center`}>
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-8 rounded flex items-center justify-center ${card.isDefault ? 'bg-electric-teal/20 text-electric-teal' : 'bg-slate-700/50 text-slate-400'}`}>
                          <span className="material-symbols-outlined">{brandIcon(card.brand)}</span>
                        </div>
                        <div>
                          <p className="font-medium text-white flex items-center gap-2">
                            {card.brand.charAt(0).toUpperCase() + card.brand.slice(1)} ····{card.last4}
                            {card.isDefault && (
                              <span className="px-2 py-0.5 rounded bg-electric-teal/10 text-electric-teal text-[10px] font-bold tracking-wider uppercase">
                                {t.accountPayments.defaultLabel}
                              </span>
                            )}
                          </p>
                          <p className="text-xs text-slate-400">
                            {t.accountPayments.expires} {String(card.expMonth).padStart(2, '0')}/{card.expYear}
                          </p>
                        </div>
                      </div>
                      <div className="relative">
                        <button
                          onClick={() => setCardMenuOpen(cardMenuOpen === card.id ? null : card.id)}
                          className="text-slate-400 hover:text-white transition-colors"
                        >
                          <span className="material-symbols-outlined">more_vert</span>
                        </button>
                        {cardMenuOpen === card.id && (
                          <div className="absolute right-0 top-8 z-20 w-48 rounded-xl bg-charcoal-dark border border-white/10 shadow-xl overflow-hidden">
                            {!card.isDefault && (
                              <button
                                onClick={() => handleSetDefault(card.id)}
                                className="w-full px-4 py-3 text-left text-sm text-white hover:bg-white/5 transition-colors flex items-center gap-2"
                              >
                                <span className="material-symbols-outlined text-base">star</span>
                                {t.accountPayments.setAsDefault}
                              </button>
                            )}
                            <button
                              onClick={() => handleRemoveCard(card.id)}
                              className="w-full px-4 py-3 text-left text-sm text-red-400 hover:bg-red-500/5 transition-colors flex items-center gap-2"
                            >
                              <span className="material-symbols-outlined text-base">delete</span>
                              {t.accountPayments.removeCard}
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Invoice History */}
          <div className="glass-card rounded-[2rem] p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">
                {t.accountPayments.recentInvoices}
              </h2>
            </div>
            {invoices.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 text-slate-400">
                <span className="material-symbols-outlined text-4xl mb-3">receipt_long</span>
                <p className="text-sm">{t.accountPayments.noInvoices}</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="text-slate-400 text-xs uppercase tracking-wider font-bold border-b border-white/5">
                      <th className="pb-3 pr-4">{t.accountPayments.invoiceDate}</th>
                      <th className="pb-3 pr-4">{t.accountPayments.invoiceDescription}</th>
                      <th className="pb-3 pr-4 text-right">{t.accountPayments.invoiceAmount}</th>
                      <th className="pb-3 text-center">{t.accountPayments.invoiceStatus}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-sm">
                    {invoices.map((bk) => {
                      const status = invoiceStatus(bk.status, t);
                      const addonLabels = bk.addons
                        .map((a) => a.type === 'CAR_WASH' ? 'Car Wash' : 'EV Charging')
                        .join(', ');
                      const description = `Parking - Spot #${bk.spotNumber ?? 'TBD'}${addonLabels ? ` + ${addonLabels}` : ''}`;

                      return (
                        <tr key={bk.id} className="hover:bg-white/[0.02] transition-colors">
                          <td className="py-4 pr-4">
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-slate-400">
                                <span className="material-symbols-outlined text-lg">receipt</span>
                              </div>
                              <span className="font-medium text-white text-sm">{formatDate(bk.createdAt)}</span>
                            </div>
                          </td>
                          <td className="py-4 pr-4">
                            <p className="font-medium text-white text-sm">{description}</p>
                          </td>
                          <td className="py-4 pr-4 text-right">
                            <span className="font-bold text-white">${bk.totalPrice.toFixed(2)}</span>
                          </td>
                          <td className="py-4 text-center">
                            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold border ${status.color}`}>
                              {status.label}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* Right Column - Billing Info */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="glass-card rounded-[2rem] p-8 h-full">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-bold text-white">
                {t.accountPayments.billingInfo}
              </h2>
            </div>
            <div className="space-y-5">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">
                  {t.accountPayments.companyName}
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 material-symbols-outlined text-lg">business</span>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="w-full rounded-xl pl-11 pr-4 py-3 text-sm font-medium text-white transition-all"
                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">
                  {t.accountPayments.address}
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-3.5 text-slate-500 material-symbols-outlined text-lg">home</span>
                  <input
                    type="text"
                    value={billingAddress}
                    onChange={(e) => setBillingAddress(e.target.value)}
                    className="w-full rounded-xl pl-11 pr-4 py-3 text-sm font-medium text-white transition-all"
                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">
                    {t.accountPayments.billingCity}
                  </label>
                  <input
                    type="text"
                    value={billingCity}
                    onChange={(e) => setBillingCity(e.target.value)}
                    className="w-full rounded-xl px-4 py-3 text-sm font-medium text-white transition-all"
                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">
                    {t.accountPayments.billingState}
                  </label>
                  <input
                    type="text"
                    value={billingState}
                    onChange={(e) => setBillingState(e.target.value)}
                    className="w-full rounded-xl px-4 py-3 text-sm font-medium text-white transition-all"
                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">
                    {t.accountPayments.billingZip}
                  </label>
                  <input
                    type="text"
                    value={billingZip}
                    onChange={(e) => setBillingZip(e.target.value)}
                    className="w-full rounded-xl px-4 py-3 text-sm font-medium text-white transition-all"
                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">
                    {t.accountPayments.country}
                  </label>
                  <input
                    type="text"
                    value={billingCountry}
                    onChange={(e) => setBillingCountry(e.target.value)}
                    className="w-full rounded-xl px-4 py-3 text-sm font-medium text-white transition-all"
                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">
                  {t.accountPayments.vatId}
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 material-symbols-outlined text-lg">tag</span>
                  <input
                    type="text"
                    value={taxId}
                    onChange={(e) => setTaxId(e.target.value)}
                    className="w-full rounded-xl pl-11 pr-4 py-3 text-sm font-medium text-white transition-all"
                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-white/5">
                <div className="flex items-start gap-4 p-4 rounded-xl bg-electric-teal/5 border border-electric-teal/10 mb-4">
                  <span className="material-symbols-outlined text-electric-teal">info</span>
                  <div>
                    <h4 className="text-sm font-bold text-white mb-1">{t.accountPayments.taxExemption}</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">{t.accountPayments.taxExemptionDesc}</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={handleSaveBilling}
                  disabled={savingBilling}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-electric-teal to-fresh-mint text-charcoal font-bold text-sm shadow-glow-mint hover:shadow-[0_0_20px_rgba(102,255,204,0.6)] transition-all transform hover:-translate-y-0.5 disabled:opacity-50"
                >
                  {savingBilling ? '...' : t.accountPayments.saveBilling}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
