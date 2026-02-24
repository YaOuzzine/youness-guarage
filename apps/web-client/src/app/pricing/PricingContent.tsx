'use client';

import Link from 'next/link';
import { useLocale } from '../../i18n/LocaleContext';

export default function PricingContent() {
  const { t } = useLocale();

  return (
    <main className="relative min-h-screen flex flex-col pt-20">
      {/* Background gradients */}
      <div className="fixed inset-0 z-0 bg-charcoal pointer-events-none">
        <div className="absolute top-0 left-1/2 w-[800px] h-[800px] bg-electric-teal/5 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-fresh-mint/5 rounded-full blur-[100px] translate-y-1/3 translate-x-1/4" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-grow flex flex-col pt-16 pb-20">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-electric-teal/10 border border-electric-teal/20 text-electric-teal text-xs font-bold uppercase tracking-wider mb-6 shadow-glow-teal">
            {t.pricing.badge}
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight mb-6">
            {t.pricing.title}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-fresh-mint to-electric-teal">
              {t.pricing.titleHighlight}
            </span>
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            {t.pricing.subtitle}
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24 items-start">
          {/* Standard */}
          <div className="glass-card rounded-3xl p-8 relative group hover:bg-white/5 transition-all duration-300">
            <div className="mb-6">
              <h3 className="text-xl font-bold text-white mb-2">{t.pricing.standard.name}</h3>
              <p className="text-slate-400 text-sm h-10">
                {t.pricing.standard.desc}
              </p>
            </div>
            <div className="mb-8">
              <span className="text-4xl font-black text-white">{t.pricing.standard.price}</span>
              <span className="text-slate-500 font-medium">{t.pricing.standard.perDay}</span>
            </div>
            <Link
              href="/book"
              className="block w-full py-3 px-4 rounded-xl border border-white/20 text-white font-bold hover:bg-white hover:text-black transition-all duration-300 mb-8 text-center"
            >
              {t.pricing.standard.cta}
            </Link>
            <ul className="space-y-4 text-sm text-slate-300">
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-fresh-mint text-[20px]">
                  check_circle
                </span>
                <span>{t.pricing.standard.feature1}</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-fresh-mint text-[20px]">
                  check_circle
                </span>
                <span>{t.pricing.standard.feature2}</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-fresh-mint text-[20px]">
                  check_circle
                </span>
                <span>{t.pricing.standard.feature3}</span>
              </li>
              <li className="flex items-start gap-3 opacity-40">
                <span className="material-symbols-outlined text-slate-500 text-[20px]">
                  cancel
                </span>
                <span>{t.pricing.standard.feature4}</span>
              </li>
              <li className="flex items-start gap-3 opacity-40">
                <span className="material-symbols-outlined text-slate-500 text-[20px]">
                  cancel
                </span>
                <span>{t.pricing.standard.feature5}</span>
              </li>
            </ul>
          </div>

          {/* VIP */}
          <div className="rounded-3xl p-8 relative transform md:-translate-y-4 shadow-glow-mint" style={{ background: 'rgba(30, 30, 30, 0.6)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', border: '1px solid rgba(102, 255, 204, 0.3)', boxShadow: '0 0 40px rgba(102, 255, 204, 0.1)' }}>
            <div className="absolute top-0 right-0 bg-fresh-mint text-black text-xs font-black uppercase px-3 py-1 rounded-bl-xl rounded-tr-2xl">
              {t.pricing.mostPopular}
            </div>
            <div className="mb-6">
              <h3 className="text-xl font-bold text-fresh-mint mb-2 flex items-center gap-2">
                {t.pricing.vip.name}
                <span className="material-symbols-outlined text-lg">
                  diamond
                </span>
              </h3>
              <p className="text-slate-300 text-sm h-10">
                {t.pricing.vip.desc}
              </p>
            </div>
            <div className="mb-8">
              <span className="text-4xl font-black text-white">{t.pricing.vip.price}</span>
              <span className="text-slate-400 font-medium">{t.pricing.vip.perDay}</span>
            </div>
            <Link
              href="/book"
              className="block w-full py-3 px-4 rounded-xl bg-fresh-mint text-black font-bold hover:shadow-[0_0_20px_rgba(102,255,204,0.4)] transition-all duration-300 mb-8 text-center"
            >
              {t.pricing.vip.cta}
            </Link>
            <ul className="space-y-4 text-sm text-white font-medium">
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-fresh-mint text-[20px]">
                  verified
                </span>
                <span>{t.pricing.vip.feature1}</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-fresh-mint text-[20px]">
                  verified
                </span>
                <span>{t.pricing.vip.feature2}</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-fresh-mint text-[20px]">
                  verified
                </span>
                <span>{t.pricing.vip.feature3}</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-fresh-mint text-[20px]">
                  verified
                </span>
                <span>{t.pricing.vip.feature4}</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-fresh-mint text-[20px]">
                  verified
                </span>
                <span>{t.pricing.vip.feature5}</span>
              </li>
            </ul>
          </div>

          {/* Premium */}
          <div className="glass-card rounded-3xl p-8 relative group hover:bg-white/5 transition-all duration-300">
            <div className="mb-6">
              <h3 className="text-xl font-bold text-white mb-2">{t.pricing.premium.name}</h3>
              <p className="text-slate-400 text-sm h-10">
                {t.pricing.premium.desc}
              </p>
            </div>
            <div className="mb-8">
              <span className="text-4xl font-black text-white">{t.pricing.premium.price}</span>
              <span className="text-slate-500 font-medium">{t.pricing.premium.perDay}</span>
            </div>
            <Link
              href="/book"
              className="block w-full py-3 px-4 rounded-xl border border-white/20 text-white font-bold hover:bg-white hover:text-black transition-all duration-300 mb-8 text-center"
            >
              {t.pricing.premium.cta}
            </Link>
            <ul className="space-y-4 text-sm text-slate-300">
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-fresh-mint text-[20px]">
                  check_circle
                </span>
                <span>{t.pricing.premium.feature1}</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-fresh-mint text-[20px]">
                  check_circle
                </span>
                <span>{t.pricing.premium.feature2}</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-fresh-mint text-[20px]">
                  check_circle
                </span>
                <span>{t.pricing.premium.feature3}</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-fresh-mint text-[20px]">
                  check_circle
                </span>
                <span>{t.pricing.premium.feature4}</span>
              </li>
              <li className="flex items-start gap-3 opacity-40">
                <span className="material-symbols-outlined text-slate-500 text-[20px]">
                  cancel
                </span>
                <span>{t.pricing.premium.feature5}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Loyalty Program Banner */}
        <div className="mb-24 relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-charcoal-dark to-charcoal shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-electric-teal/10 rounded-full blur-[80px] translate-x-1/2 -translate-y-1/2" />
          <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center p-8 lg:p-12">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="material-symbols-outlined text-electric-teal text-3xl">
                  flight_takeoff
                </span>
                <span className="text-electric-teal font-bold tracking-wider uppercase text-sm">
                  {t.pricing.loyalty.badge}
                </span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-black text-white mb-6">
                {t.pricing.loyalty.title}{' '}
                <span className="text-white border-b-4 border-electric-teal">
                  {t.pricing.loyalty.titleHighlight}
                </span>
              </h2>
              <p className="text-slate-400 mb-8 leading-relaxed">
                {t.pricing.loyalty.subtitle}
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="bg-white/5 rounded-xl p-4 border border-white/10 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-fresh-mint/20 text-fresh-mint flex items-center justify-center">
                    <span className="material-symbols-outlined">stars</span>
                  </div>
                  <div>
                    <div className="text-white font-bold">{t.pricing.loyalty.bonusLabel}</div>
                    <div className="text-xs text-slate-500">{t.pricing.loyalty.bonusDesc}</div>
                  </div>
                </div>
                <div className="bg-white/5 rounded-xl p-4 border border-white/10 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-electric-teal/20 text-electric-teal flex items-center justify-center">
                    <span className="material-symbols-outlined">redeem</span>
                  </div>
                  <div>
                    <div className="text-white font-bold">{t.pricing.loyalty.freeDaysLabel}</div>
                    <div className="text-xs text-slate-500">{t.pricing.loyalty.freeDaysDesc}</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative h-full min-h-[300px] rounded-2xl overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-electric-teal/20 to-charcoal-dark transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="glass-card p-6 rounded-xl border border-white/10">
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-xs text-slate-400 uppercase font-bold mb-1">
                        {t.pricing.loyalty.statusLabel}
                      </p>
                      <p className="text-xl font-bold text-white">
                        Platinum Member
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-3xl font-black text-electric-teal">
                        2,450
                      </p>
                      <p className="text-xs text-slate-400 font-medium">
                        {t.pricing.loyalty.pointsLabel}
                      </p>
                    </div>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-1.5 mt-4">
                    <div
                      className="bg-gradient-to-r from-fresh-mint to-electric-teal h-1.5 rounded-full"
                      style={{ width: '75%' }}
                    />
                  </div>
                  <p className="text-xs text-slate-500 mt-2 text-right">
                    550 {t.pricing.loyalty.pointsToNext}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQs */}
        <div className="max-w-3xl mx-auto w-full">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {t.pricing.faqs.map((faq, index) => (
              <div key={index} className="glass-card rounded-xl p-6 hover:border-electric-teal/30 transition-colors cursor-pointer group">
                <div className="flex justify-between items-center font-bold text-white">
                  <span>{faq.q}</span>
                  <span className="material-symbols-outlined text-slate-500 group-hover:text-electric-teal transition-colors">
                    add_circle
                  </span>
                </div>
                <p className="text-slate-400 mt-3 text-sm leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
