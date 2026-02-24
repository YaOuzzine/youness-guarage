'use client';

import { BookingForm } from '@/components/BookingForm';
import { useLocale } from '../i18n/LocaleContext';

export default function HomeContent() {
  const { t } = useLocale();

  return (
    <main className="relative min-h-screen flex flex-col pt-20">
      {/* Background gradients */}
      <div className="fixed inset-0 z-0 bg-charcoal pointer-events-none">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-electric-teal/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-fresh-mint/5 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/4" />
      </div>

      {/* Hero Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-grow flex flex-col lg:flex-row gap-12 lg:gap-20 items-center lg:items-start pt-8 pb-16 lg:pt-16">
        {/* Left Column */}
        <div className="flex-1 text-center lg:text-left pt-4 lg:pt-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-electric-teal/10 border border-electric-teal/20 text-electric-teal text-xs font-bold uppercase tracking-wider mb-6 shadow-glow-teal">
            <span className="w-2 h-2 rounded-full bg-electric-teal animate-pulse" />
            {t.home.badge}
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-[1.1] tracking-tight mb-6">
            {t.home.heroTitle1} <br className="hidden lg:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-fresh-mint to-electric-teal">
              {t.home.heroTitle2}
            </span>
          </h1>
          <p className="text-lg text-slate-400 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
            {t.home.heroSubtitle.replace('{minutes}', '')}
            <span className="font-bold text-white">{t.home.fiveMinutes}</span>
            {' '}
          </p>
          <div className="flex flex-wrap justify-center lg:justify-start gap-6 lg:gap-10 mb-12">
            <div className="flex items-center gap-3 text-slate-300 font-medium">
              <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-electric-teal">
                <span className="material-symbols-outlined text-xl">
                  security
                </span>
              </div>
              <span>{t.home.security}</span>
            </div>
            <div className="flex items-center gap-3 text-slate-300 font-medium">
              <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-fresh-mint">
                <span className="material-symbols-outlined text-xl">
                  airport_shuttle
                </span>
              </div>
              <span>{t.home.shuttle}</span>
            </div>
            <div className="flex items-center gap-3 text-slate-300 font-medium">
              <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-electric-teal">
                <span className="material-symbols-outlined text-xl">
                  electric_car
                </span>
              </div>
              <span>{t.home.evReady}</span>
            </div>
          </div>
        </div>

        {/* Right Column - Booking Form */}
        <BookingForm />
      </div>

      {/* Why Travelers Choose Us */}
      <section className="relative z-10 bg-charcoal-dark/50 border-t border-white/5 py-20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">
              {t.home.whyTitle}
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              {t.home.whySubtitle}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group p-8 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-electric-teal/30 transition-all duration-300">
              <div className="w-14 h-14 rounded-full bg-electric-teal/10 text-electric-teal flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-glow-teal">
                <span className="material-symbols-outlined text-3xl">
                  near_me
                </span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                {t.home.proximityTitle}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                {t.home.proximityDesc}
              </p>
            </div>
            <div className="group p-8 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-fresh-mint/30 transition-all duration-300">
              <div className="w-14 h-14 rounded-full bg-fresh-mint/10 text-fresh-mint flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-glow-mint">
                <span className="material-symbols-outlined text-3xl">
                  verified_user
                </span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                {t.home.securityTitle}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                {t.home.securityDesc}
              </p>
            </div>
            <div className="group p-8 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-electric-teal/30 transition-all duration-300">
              <div className="w-14 h-14 rounded-full bg-purple-500/10 text-purple-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="material-symbols-outlined text-3xl">
                  diamond
                </span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                {t.home.conciergeTitle}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                {t.home.conciergeDesc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Photo Gallery */}
      <section className="relative z-10 bg-charcoal py-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 h-[500px] md:h-96 lg:h-[450px]">
            {/* Large Card */}
            <div className="relative overflow-hidden rounded-2xl col-span-1 md:col-span-2 lg:col-span-2 group border border-white/10">
              <div className="absolute inset-0 bg-gradient-to-br from-electric-teal/20 to-charcoal-dark transition-transform duration-700 group-hover:scale-105 opacity-60 group-hover:opacity-80" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent flex flex-col justify-end p-8">
                <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <h4 className="text-white text-2xl font-bold mb-1">
                    {t.home.galleryIndoorTitle}
                  </h4>
                  <p className="text-slate-300 text-sm">
                    {t.home.galleryIndoorDesc}
                  </p>
                </div>
              </div>
            </div>
            {/* Small Card */}
            <div className="relative overflow-hidden rounded-2xl col-span-1 md:col-span-1 group border border-white/10">
              <div className="absolute inset-0 bg-gradient-to-br from-fresh-mint/20 to-charcoal-dark transition-transform duration-700 group-hover:scale-105 opacity-60 group-hover:opacity-80" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent flex flex-col justify-end p-8">
                <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <h4 className="text-white text-2xl font-bold mb-1">
                    {t.home.galleryEvTitle}
                  </h4>
                  <p className="text-slate-300 text-sm">
                    {t.home.galleryEvDesc}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
