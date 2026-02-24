'use client';

import { useLocale } from '../../../i18n/LocaleContext';

export default function PaymentsPage() {
  const { t } = useLocale();

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
            <span className="material-symbols-outlined text-lg">
              description
            </span>
            <span>{t.accountPayments.downloadInvoices}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 pb-10">
        {/* Left Column */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {/* Payment Methods */}
          <div className="glass-card rounded-[2rem] p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">
                {t.accountPayments.paymentMethods}
              </h2>
              <button className="text-sm text-electric-teal font-medium hover:text-fresh-mint transition-colors flex items-center gap-1">
                <span className="material-symbols-outlined text-base">
                  add
                </span>
                {t.accountPayments.addNew}
              </button>
            </div>
            <div className="space-y-4">
              {/* Primary Card */}
              <div className="group relative rounded-2xl overflow-hidden p-6 border border-electric-teal/30 shadow-glow-teal transition-all hover:scale-[1.01]">
                <div className="absolute inset-0 bg-gradient-to-br from-charcoal to-charcoal-dark opacity-90 z-0" />
                <div className="absolute top-0 right-0 w-32 h-32 bg-electric-teal/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 z-0" />
                <div className="relative z-10 flex justify-between items-start mb-8">
                  <div className="h-8 flex items-center text-2xl font-black text-white/80 tracking-wider">
                    VISA
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-1 rounded bg-electric-teal/10 text-electric-teal text-[10px] font-bold tracking-wider uppercase">
                      {t.accountPayments.defaultLabel}
                    </span>
                    <button className="text-slate-400 hover:text-white">
                      <span className="material-symbols-outlined text-xl">
                        more_vert
                      </span>
                    </button>
                  </div>
                </div>
                <div className="relative z-10">
                  <p className="font-mono text-slate-300 text-lg tracking-widest mb-1">
                    &bull;&bull;&bull;&bull; &bull;&bull;&bull;&bull;
                    &bull;&bull;&bull;&bull; 4242
                  </p>
                  <div className="flex justify-between items-end mt-4">
                    <div>
                      <p className="text-[10px] uppercase text-slate-500 font-bold tracking-wider mb-0.5">
                        {t.accountPayments.cardHolder}
                      </p>
                      <p className="text-sm font-medium text-white">
                        Alex Morgan
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase text-slate-500 font-bold tracking-wider mb-0.5">
                        {t.accountPayments.expires}
                      </p>
                      <p className="text-sm font-medium text-white">12/25</p>
                    </div>
                  </div>
                </div>
              </div>
              {/* Secondary Card */}
              <div className="relative rounded-2xl overflow-hidden p-6 border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-all">
                <div className="relative z-10 flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-8 bg-slate-700/50 rounded flex items-center justify-center">
                      <span className="material-symbols-outlined text-slate-400">
                        credit_card
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-white">
                        Mastercard ending in 8892
                      </p>
                      <p className="text-xs text-slate-400">{t.accountPayments.expires} 09/24</p>
                    </div>
                  </div>
                  <button className="text-slate-500 hover:text-white transition-colors">
                    <span className="material-symbols-outlined">
                      more_vert
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Invoices */}
          <div className="glass-card rounded-[2rem] p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">
                {t.accountPayments.recentInvoices}
              </h2>
              <button className="text-sm text-slate-400 hover:text-white transition-colors">
                {t.accountPayments.viewAll}
              </button>
            </div>
            <div className="space-y-1">
              {[
                {
                  label: 'Parking - Zone B',
                  date: 'Oct 24, 2023',
                  inv: 'INV-0092',
                  amount: '$42.50',
                  highlight: true,
                },
                {
                  label: 'EV Charging',
                  date: 'Oct 12, 2023',
                  inv: 'INV-0089',
                  amount: '$15.00',
                  highlight: false,
                },
                {
                  label: 'Monthly Pass',
                  date: 'Sep 01, 2023',
                  inv: 'INV-0074',
                  amount: '$250.00',
                  highlight: false,
                },
              ].map((invoice) => (
                <div
                  key={invoice.inv}
                  className="flex items-center justify-between p-4 rounded-xl hover:bg-white/5 transition-colors group cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        invoice.highlight
                          ? 'bg-electric-teal/10 text-electric-teal'
                          : 'bg-white/5 text-slate-400 group-hover:text-white transition-colors'
                      }`}
                    >
                      <span className="material-symbols-outlined">
                        receipt
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-white">
                        {invoice.label}
                      </p>
                      <p className="text-xs text-slate-400">
                        {invoice.date} &bull; {invoice.inv}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <span className="text-white font-medium">
                      {invoice.amount}
                    </span>
                    <button className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 text-slate-400 group-hover:bg-electric-teal group-hover:text-black transition-all">
                      <span className="material-symbols-outlined text-lg">
                        download
                      </span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Billing Info */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="glass-card rounded-[2rem] p-8 h-full">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-bold text-white">
                {t.accountPayments.billingInfo}
              </h2>
              <button className="text-sm text-electric-teal font-medium hover:text-fresh-mint transition-colors">
                {t.accountPayments.editDetails}
              </button>
            </div>
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2 col-span-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">
                    {t.accountPayments.companyName}
                  </label>
                  <div className="flex items-center gap-3 rounded-xl px-4 py-3" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)' }}>
                    <span className="material-symbols-outlined text-slate-500 text-lg">
                      business
                    </span>
                    <span className="text-sm text-white">
                      Acme Corp Design Ltd.
                    </span>
                  </div>
                </div>
                <div className="space-y-2 col-span-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">
                    {t.accountPayments.billingEmail}
                  </label>
                  <div className="flex items-center gap-3 rounded-xl px-4 py-3" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)' }}>
                    <span className="material-symbols-outlined text-slate-500 text-lg">
                      mail
                    </span>
                    <span className="text-sm text-white">
                      billing@acmecorp.com
                    </span>
                  </div>
                </div>
                <div className="space-y-2 col-span-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">
                    {t.accountPayments.address}
                  </label>
                  <div className="flex items-start gap-3 rounded-xl px-4 py-3 h-24" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)' }}>
                    <span className="material-symbols-outlined text-slate-500 text-lg mt-0.5">
                      home
                    </span>
                    <span className="text-sm text-white whitespace-pre-line">
                      1200 Park Avenue, Suite 404{'\n'}San Francisco, CA 94103
                    </span>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">
                    {t.accountPayments.vatId}
                  </label>
                  <div className="flex items-center gap-3 rounded-xl px-4 py-3" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)' }}>
                    <span className="material-symbols-outlined text-slate-500 text-lg">
                      tag
                    </span>
                    <span className="text-sm text-white">US882910</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">
                    {t.accountPayments.country}
                  </label>
                  <div className="flex items-center gap-3 rounded-xl px-4 py-3" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)' }}>
                    <span className="material-symbols-outlined text-slate-500 text-lg">
                      public
                    </span>
                    <span className="text-sm text-white">United States</span>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-white/5 mt-4">
                <div className="flex items-start gap-4 p-4 rounded-xl bg-electric-teal/5 border border-electric-teal/10">
                  <span className="material-symbols-outlined text-electric-teal">
                    info
                  </span>
                  <div>
                    <h4 className="text-sm font-bold text-white mb-1">
                      {t.accountPayments.taxExemption}
                    </h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {t.accountPayments.taxExemptionDesc}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex justify-end pt-2">
                <button
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-electric-teal to-fresh-mint text-charcoal font-bold text-sm shadow-glow-mint hover:shadow-[0_0_20px_rgba(102,255,204,0.6)] transition-all transform hover:-translate-y-0.5"
                  type="button"
                >
                  {t.accountPayments.saveChanges}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
