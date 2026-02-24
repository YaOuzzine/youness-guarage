'use client';

import Link from 'next/link';
import { useLocale } from '../../i18n/LocaleContext';

export default function LocationsContent() {
  const { t } = useLocale();

  return (
    <main className="relative min-h-screen flex flex-col pt-20">
      {/* Background gradients */}
      <div className="fixed inset-0 z-0 bg-charcoal pointer-events-none">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-electric-teal/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-fresh-mint/5 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/4" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-grow flex flex-col pt-8 pb-16 lg:pt-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
            {t.locations.title}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-teal to-fresh-mint">
              {t.locations.titleHighlight}
            </span>
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            {t.locations.subtitle}
          </p>
        </div>

        {/* Map Area */}
        <div className="w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden glass-card shadow-2xl relative mb-16 border border-white/10 group">
          <div className="absolute inset-0 bg-charcoal-dark opacity-80">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />
          </div>

          {/* CDG Pin */}
          <div className="absolute top-[45%] left-[20%] -translate-x-1/2 -translate-y-full cursor-pointer hover:scale-110 transition-transform duration-300 group/pin z-10">
            <div className="relative flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-electric-teal/20 backdrop-blur-sm border border-electric-teal text-electric-teal flex items-center justify-center shadow-glow-teal animate-bounce">
                <span className="material-symbols-outlined text-2xl">
                  flight_takeoff
                </span>
              </div>
              <div className="absolute top-14 bg-black/80 backdrop-blur px-3 py-1 rounded text-xs font-bold text-white whitespace-nowrap opacity-0 group-hover/pin:opacity-100 transition-opacity">
                CDG - Paris Charles de Gaulle
              </div>
            </div>
          </div>

          {/* ORY Pin */}
          <div className="absolute top-[35%] left-[18%] -translate-x-1/2 -translate-y-full cursor-pointer hover:scale-110 transition-transform duration-300 group/pin z-10">
            <div className="relative flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-charcoal/80 border border-white/20 hover:border-electric-teal hover:bg-electric-teal/20 text-slate-300 hover:text-electric-teal flex items-center justify-center transition-all duration-300">
                <span className="material-symbols-outlined text-xl">
                  local_parking
                </span>
              </div>
              <div className="absolute top-12 bg-black/80 backdrop-blur px-3 py-1 rounded text-xs font-bold text-white whitespace-nowrap opacity-0 group-hover/pin:opacity-100 transition-opacity">
                ORY - Paris Orly
              </div>
            </div>
          </div>

          {/* LYS Pin */}
          <div className="absolute top-[40%] left-[75%] -translate-x-1/2 -translate-y-full cursor-pointer hover:scale-110 transition-transform duration-300 group/pin z-10">
            <div className="relative flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-charcoal/80 border border-white/20 hover:border-electric-teal hover:bg-electric-teal/20 text-slate-300 hover:text-electric-teal flex items-center justify-center transition-all duration-300">
                <span className="material-symbols-outlined text-xl">
                  local_parking
                </span>
              </div>
              <div className="absolute top-12 bg-black/80 backdrop-blur px-3 py-1 rounded text-xs font-bold text-white whitespace-nowrap opacity-0 group-hover/pin:opacity-100 transition-opacity">
                LYS - Lyon Saint-Exupery
              </div>
            </div>
          </div>
        </div>

        {/* Location Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* CDG */}
          <div className="glass-card rounded-2xl p-6 hover:border-electric-teal/50 transition-all duration-300 group flex flex-col h-full">
            <div className="flex justify-between items-start mb-6">
              <div>
                <div className="text-xs font-bold text-electric-teal mb-1 uppercase tracking-wider">
                  {t.locations.cdg.badge}
                </div>
                <h3 className="text-2xl font-bold text-white">{t.locations.cdg.name}</h3>
                <p className="text-slate-400 text-sm">
                  {t.locations.cdg.fullName}
                </p>
              </div>
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-white border border-white/10 group-hover:border-electric-teal group-hover:text-electric-teal transition-colors">
                <span className="material-symbols-outlined">location_on</span>
              </div>
            </div>
            <div className="space-y-4 mb-8 flex-grow">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-fresh-mint">
                  timer
                </span>
                <span className="text-slate-300 text-sm">
                  {t.locations.cdg.time}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-electric-teal">
                  airport_shuttle
                </span>
                <span className="text-slate-300 text-sm">
                  {t.locations.cdg.shuttle}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-purple-400">
                  confirmation_number
                </span>
                <span className="text-slate-300 text-sm">
                  {t.locations.cdg.price}{' '}
                  {t.locations.cdg.perDay}
                </span>
              </div>
              <div className="pt-4 flex gap-2 flex-wrap">
                <span className="px-2 py-1 rounded bg-white/5 border border-white/10 text-xs text-slate-300 flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px] text-electric-teal">
                    bolt
                  </span>{' '}
                  {t.locations.cdg.featureEv}
                </span>
                <span className="px-2 py-1 rounded bg-white/5 border border-white/10 text-xs text-slate-300 flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px] text-electric-teal">
                    local_car_wash
                  </span>{' '}
                  {t.locations.cdg.featureWash}
                </span>
                <span className="px-2 py-1 rounded bg-white/5 border border-white/10 text-xs text-slate-300 flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px] text-electric-teal">
                    roofing
                  </span>{' '}
                  {t.locations.cdg.featureCovered}
                </span>
              </div>
            </div>
            <Link
              href="/book"
              className="w-full py-3 px-4 bg-electric-teal hover:bg-white text-black font-bold rounded-xl transition-all shadow-glow-teal hover:shadow-lg flex items-center justify-center gap-2 group-hover:translate-y-[-2px]"
            >
              {t.locations.cdg.bookNow}
              <span className="material-symbols-outlined text-sm">
                arrow_forward
              </span>
            </Link>
          </div>

          {/* ORY */}
          <div className="glass-card rounded-2xl p-6 hover:border-fresh-mint/50 transition-all duration-300 group flex flex-col h-full">
            <div className="flex justify-between items-start mb-6">
              <div>
                <div className="text-xs font-bold text-fresh-mint mb-1 uppercase tracking-wider">
                  {t.locations.ory.badge}
                </div>
                <h3 className="text-2xl font-bold text-white">{t.locations.ory.name}</h3>
                <p className="text-slate-400 text-sm">
                  {t.locations.ory.fullName}
                </p>
              </div>
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-white border border-white/10 group-hover:border-fresh-mint group-hover:text-fresh-mint transition-colors">
                <span className="material-symbols-outlined">location_on</span>
              </div>
            </div>
            <div className="space-y-4 mb-8 flex-grow">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-fresh-mint">
                  timer
                </span>
                <span className="text-slate-300 text-sm">
                  {t.locations.ory.time}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-electric-teal">
                  airport_shuttle
                </span>
                <span className="text-slate-300 text-sm">
                  {t.locations.ory.shuttle}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-purple-400">
                  confirmation_number
                </span>
                <span className="text-slate-300 text-sm">
                  {t.locations.ory.price}{' '}
                  {t.locations.ory.perDay}
                </span>
              </div>
              <div className="pt-4 flex gap-2 flex-wrap">
                <span className="px-2 py-1 rounded bg-white/5 border border-white/10 text-xs text-slate-300 flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px] text-electric-teal">
                    bolt
                  </span>{' '}
                  {t.locations.ory.featureEv}
                </span>
                <span className="px-2 py-1 rounded bg-white/5 border border-white/10 text-xs text-slate-300 flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px] text-electric-teal">
                    videocam
                  </span>{' '}
                  {t.locations.ory.featureCam}
                </span>
              </div>
            </div>
            <Link
              href="/book"
              className="w-full py-3 px-4 bg-white/10 hover:bg-fresh-mint text-white hover:text-black border border-white/20 hover:border-fresh-mint font-bold rounded-xl transition-all flex items-center justify-center gap-2 group-hover:translate-y-[-2px]"
            >
              {t.locations.ory.bookNow}
              <span className="material-symbols-outlined text-sm">
                arrow_forward
              </span>
            </Link>
          </div>

          {/* LYS */}
          <div className="glass-card rounded-2xl p-6 hover:border-purple-400/50 transition-all duration-300 group flex flex-col h-full">
            <div className="flex justify-between items-start mb-6">
              <div>
                <div className="text-xs font-bold text-purple-400 mb-1 uppercase tracking-wider">
                  {t.locations.lys.badge}
                </div>
                <h3 className="text-2xl font-bold text-white">{t.locations.lys.name}</h3>
                <p className="text-slate-400 text-sm">
                  {t.locations.lys.fullName}
                </p>
              </div>
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-white border border-white/10 group-hover:border-purple-400 group-hover:text-purple-400 transition-colors">
                <span className="material-symbols-outlined">location_on</span>
              </div>
            </div>
            <div className="space-y-4 mb-8 flex-grow">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-fresh-mint">
                  timer
                </span>
                <span className="text-slate-300 text-sm">
                  {t.locations.lys.time}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-electric-teal">
                  airport_shuttle
                </span>
                <span className="text-slate-300 text-sm">
                  {t.locations.lys.shuttle}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-purple-400">
                  confirmation_number
                </span>
                <span className="text-slate-300 text-sm">
                  {t.locations.lys.price}{' '}
                  {t.locations.lys.perDay}
                </span>
              </div>
              <div className="pt-4 flex gap-2 flex-wrap">
                <span className="px-2 py-1 rounded bg-white/5 border border-white/10 text-xs text-slate-300 flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px] text-electric-teal">
                    local_car_wash
                  </span>{' '}
                  {t.locations.lys.featureDetailing}
                </span>
                <span className="px-2 py-1 rounded bg-white/5 border border-white/10 text-xs text-slate-300 flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px] text-electric-teal">
                    key
                  </span>{' '}
                  {t.locations.lys.featureValet}
                </span>
                <span className="px-2 py-1 rounded bg-white/5 border border-white/10 text-xs text-slate-300 flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px] text-electric-teal">
                    garage
                  </span>{' '}
                  {t.locations.lys.featureIndoor}
                </span>
              </div>
            </div>
            <Link
              href="/book"
              className="w-full py-3 px-4 bg-white/10 hover:bg-purple-400 text-white hover:text-black border border-white/20 hover:border-purple-400 font-bold rounded-xl transition-all flex items-center justify-center gap-2 group-hover:translate-y-[-2px]"
            >
              {t.locations.lys.bookNow}
              <span className="material-symbols-outlined text-sm">
                arrow_forward
              </span>
            </Link>
          </div>
        </div>

        {/* Feature Strip */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center p-4 rounded-xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/5">
            <span className="material-symbols-outlined text-3xl text-electric-teal mb-3">
              security
            </span>
            <h4 className="text-white font-bold mb-1">{t.locations.featureStrip.security}</h4>
            <p className="text-xs text-slate-400">{t.locations.featureStrip.securityDesc}</p>
          </div>
          <div className="text-center p-4 rounded-xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/5">
            <span className="material-symbols-outlined text-3xl text-fresh-mint mb-3">
              price_check
            </span>
            <h4 className="text-white font-bold mb-1">{t.locations.featureStrip.bestRates}</h4>
            <p className="text-xs text-slate-400">{t.locations.featureStrip.bestRatesDesc}</p>
          </div>
          <div className="text-center p-4 rounded-xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/5">
            <span className="material-symbols-outlined text-3xl text-purple-400 mb-3">
              smartphone
            </span>
            <h4 className="text-white font-bold mb-1">{t.locations.featureStrip.contactless}</h4>
            <p className="text-xs text-slate-400">{t.locations.featureStrip.contactlessDesc}</p>
          </div>
          <div className="text-center p-4 rounded-xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/5">
            <span className="material-symbols-outlined text-3xl text-orange-400 mb-3">
              cancel
            </span>
            <h4 className="text-white font-bold mb-1">{t.locations.featureStrip.freeCancel}</h4>
            <p className="text-xs text-slate-400">{t.locations.featureStrip.freeCancelDesc}</p>
          </div>
        </div>
      </div>
    </main>
  );
}
