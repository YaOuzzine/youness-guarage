'use client';

import Link from 'next/link';
import { useLocale } from '../../i18n/LocaleContext';

export default function ServicesContent() {
  const { t } = useLocale();

  return (
    <main className="relative min-h-screen flex flex-col pt-20">
      {/* Background gradients */}
      <div className="fixed inset-0 z-0 bg-charcoal pointer-events-none">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-electric-teal/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-fresh-mint/5 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/4" />
      </div>

      {/* Hero */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-16 lg:py-24 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-electric-teal/10 border border-electric-teal/20 text-electric-teal text-xs font-bold uppercase tracking-wider mb-6 shadow-glow-teal mx-auto">
          <span className="material-symbols-outlined text-sm">diamond</span>
          {t.services.badge}
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black text-white leading-[1.1] tracking-tight mb-6">
          {t.services.title}{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-fresh-mint to-electric-teal">
            {t.services.titleHighlight}
          </span>
        </h1>
        <p className="text-lg text-slate-400 mb-8 max-w-2xl mx-auto leading-relaxed">
          {t.services.subtitle}
        </p>
      </div>

      {/* VIP Valet */}
      <section className="relative z-10 py-16 border-t border-white/5 bg-charcoal-dark/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            <div className="w-full lg:w-1/2">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 group">
                <div className="absolute inset-0 bg-electric-teal/20 mix-blend-overlay z-10" />
                <div className="w-full h-[400px] bg-gradient-to-br from-electric-teal/30 via-charcoal to-charcoal-dark transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute bottom-0 left-0 p-6 z-20">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-electric-teal text-black mb-4 shadow-glow-teal">
                    <span className="material-symbols-outlined text-2xl">
                      airport_shuttle
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2">
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                {t.services.valet.title}
              </h2>
              <p className="text-slate-400 mb-8 text-lg leading-relaxed">
                {t.services.valet.desc}
              </p>
              <ul className="space-y-4 mb-8">
                {t.services.valet.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-electric-teal mt-0.5">
                      check_circle
                    </span>
                    <span className="text-slate-300">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="flex items-center gap-4">
                <Link
                  href="/book"
                  className="px-6 py-3 bg-white/5 hover:bg-electric-teal hover:text-black border border-electric-teal/50 text-electric-teal rounded-lg font-bold transition-all duration-300 flex items-center gap-2 group"
                >
                  {t.services.valet.ctaButton}
                  <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">
                    add
                  </span>
                </Link>
                <span className="text-sm text-slate-500">{t.services.valet.price}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EV Charging */}
      <section className="relative z-10 py-16 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row-reverse items-center gap-12 lg:gap-20">
            <div className="w-full lg:w-1/2">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 group">
                <div className="absolute inset-0 bg-fresh-mint/20 mix-blend-overlay z-10" />
                <div className="w-full h-[400px] bg-gradient-to-br from-fresh-mint/30 via-charcoal to-charcoal-dark transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute bottom-0 left-0 p-6 z-20">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-fresh-mint text-black mb-4 shadow-glow-mint">
                    <span className="material-symbols-outlined text-2xl">
                      bolt
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2">
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                {t.services.ev.title}
              </h2>
              <p className="text-slate-400 mb-8 text-lg leading-relaxed">
                {t.services.ev.desc}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-fresh-mint font-bold mb-1">
                    {t.services.ev.level2Title}
                  </div>
                  <div className="text-slate-400 text-sm">
                    {t.services.ev.level2Desc}
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-electric-teal font-bold mb-1">
                    {t.services.ev.dcTitle}
                  </div>
                  <div className="text-slate-400 text-sm">
                    {t.services.ev.dcDesc}
                  </div>
                </div>
              </div>
              <ul className="space-y-4 mb-8">
                {t.services.ev.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-fresh-mint mt-0.5">
                      check_circle
                    </span>
                    <span className="text-slate-300">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="flex items-center gap-4">
                <Link
                  href="/book"
                  className="px-6 py-3 bg-white/5 hover:bg-fresh-mint hover:text-black border border-fresh-mint/50 text-fresh-mint rounded-lg font-bold transition-all duration-300 flex items-center gap-2 group"
                >
                  {t.services.ev.ctaButton}
                  <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">
                    add
                  </span>
                </Link>
                <span className="text-sm text-slate-500">
                  {t.services.ev.price}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Professional Detailing */}
      <section className="relative z-10 py-16 border-t border-white/5 bg-charcoal-dark/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            <div className="w-full lg:w-1/2">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 group">
                <div className="absolute inset-0 bg-purple-500/20 mix-blend-overlay z-10" />
                <div className="w-full h-[400px] bg-gradient-to-br from-purple-500/30 via-charcoal to-charcoal-dark transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute bottom-0 left-0 p-6 z-20">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-purple-500 text-white mb-4 shadow-[0_0_15px_rgba(168,85,247,0.4)]">
                    <span className="material-symbols-outlined text-2xl">
                      local_car_wash
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2">
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                {t.services.detailing.title}
              </h2>
              <p className="text-slate-400 mb-8 text-lg leading-relaxed">
                {t.services.detailing.desc}
              </p>
              <div className="space-y-6 mb-8">
                {t.services.detailing.items.map((item, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0 text-purple-400">
                      <span className="material-symbols-outlined text-sm">
                        {index === 0 ? 'water_drop' : 'chair'}
                      </span>
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-sm">
                        {item.title}
                      </h4>
                      <p className="text-slate-500 text-sm mt-1">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-4">
                <Link
                  href="/book"
                  className="px-6 py-3 bg-white/5 hover:bg-purple-500 hover:text-white border border-purple-500/50 text-purple-400 rounded-lg font-bold transition-all duration-300 flex items-center gap-2 group"
                >
                  {t.services.detailing.ctaButton}
                  <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">
                    add
                  </span>
                </Link>
                <span className="text-sm text-slate-500">
                  {t.services.detailing.price}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 py-24 border-t border-white/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            {t.services.cta.title}
          </h2>
          <p className="text-slate-400 mb-10 text-lg">
            {t.services.cta.subtitle}
          </p>
          <Link
            href="/book"
            className="group relative inline-flex items-center justify-center gap-3 bg-gradient-to-r from-fresh-mint to-electric-teal hover:from-white hover:to-white text-black text-lg font-bold py-4 px-10 rounded-xl shadow-[0_0_30px_rgba(0,240,255,0.3)] hover:shadow-[0_0_40px_rgba(255,255,255,0.5)] transition-all duration-300 transform hover:-translate-y-1"
          >
            <span className="relative z-10">{t.services.cta.button}</span>
            <span className="material-symbols-outlined text-xl transition-transform group-hover:translate-x-1 relative z-10">
              arrow_forward
            </span>
          </Link>
        </div>
      </section>
    </main>
  );
}
