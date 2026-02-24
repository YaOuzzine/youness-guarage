'use client';

import { useLocale } from '../../../i18n/LocaleContext';

export default function DashboardPage() {
  const { t } = useLocale();

  return (
    <div className="p-6 lg:p-10 w-full max-w-7xl mx-auto flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-white mb-1">
            {t.accountDashboard.title}
          </h1>
          <p className="text-slate-400">
            {t.accountDashboard.subtitle}
          </p>
        </div>
        <div className="hidden md:flex gap-3">
          <button className="group flex items-center gap-2 py-2.5 px-5 rounded-xl border border-electric-teal/30 bg-electric-teal/5 hover:bg-electric-teal/10 text-electric-teal font-bold transition-all duration-300">
            <span className="material-symbols-outlined text-lg">near_me</span>
            <span>{t.accountDashboard.getDirections}</span>
          </button>
          <button className="group flex items-center gap-2 py-2.5 px-5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-white font-medium transition-all duration-300">
            <span className="material-symbols-outlined text-lg">call</span>
            <span>{t.accountDashboard.supportButton}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 pb-10">
        {/* Digital Pass Card */}
        <div className="lg:col-span-5 xl:col-span-4 flex flex-col gap-6">
          <div className="glass-card rounded-[2rem] p-8 lg:p-10 relative overflow-hidden border border-electric-teal/20 flex flex-col justify-center items-center shadow-[0_0_50px_rgba(0,240,255,0.15)]">
            <div className="absolute top-0 right-0 w-64 h-64 bg-electric-teal/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-fresh-mint/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

            <div className="flex flex-col items-center w-full space-y-8 relative z-10">
              <div className="w-full flex justify-between items-center border-b border-white/10 pb-4 mb-2">
                <span className="text-xs font-bold text-electric-teal uppercase tracking-widest">
                  {t.accountDashboard.passLabel}
                </span>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-fresh-mint/10 border border-fresh-mint/20">
                  <span className="w-2 h-2 rounded-full bg-fresh-mint animate-pulse" />
                  <span className="text-fresh-mint text-xs font-bold uppercase tracking-wide">
                    {t.accountDashboard.active}
                  </span>
                </div>
              </div>

              {/* QR placeholder */}
              <div className="p-6 bg-white rounded-3xl shadow-glow-teal">
                <div className="w-56 h-56 lg:w-64 lg:h-64 bg-gradient-to-br from-charcoal to-charcoal-dark rounded-2xl flex items-center justify-center">
                  <span className="material-symbols-outlined text-8xl text-electric-teal/30">
                    qr_code_2
                  </span>
                </div>
              </div>

              <div className="text-center space-y-2">
                <h2 className="text-4xl font-black text-white tracking-tight">
                  P-8294
                </h2>
                <p className="text-slate-400 text-sm font-mono tracking-widest uppercase">
                  {t.accountDashboard.bookingRef}
                </p>
              </div>

              <div className="w-full bg-white/5 rounded-xl p-4 flex items-center justify-between border border-white/5 mt-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-charcoal flex items-center justify-center text-electric-teal">
                    <span className="material-symbols-outlined">
                      directions_car
                    </span>
                  </div>
                  <div>
                    <p className="text-white font-bold text-sm">
                      SEAT Ateca FR
                    </p>
                    <p className="text-slate-400 text-xs font-mono">
                      ABC-1234
                    </p>
                  </div>
                </div>
                <span className="text-xs text-electric-teal font-bold px-2 py-1 bg-electric-teal/10 rounded">
                  {t.accountDashboard.owner}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-6">
          {/* Stat Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass-card rounded-3xl p-6 flex flex-col justify-between relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="flex justify-between items-start mb-4 relative z-10">
                <div>
                  <h3 className="text-slate-400 text-xs font-bold uppercase tracking-wide mb-1">
                    {t.accountDashboard.vehicleLocation}
                  </h3>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-black text-white">
                      Zone B
                    </span>
                    <span className="text-lg font-medium text-slate-400">
                      {t.accountDashboard.level} 2
                    </span>
                  </div>
                </div>
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-electric-teal">
                  <span className="material-symbols-outlined">
                    location_on
                  </span>
                </div>
              </div>
              <div className="mt-2 pt-4 border-t border-white/5 relative z-10">
                <p className="text-xs text-slate-400 flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm">
                    info
                  </span>
                  {t.accountDashboard.nearInfo}
                </p>
              </div>
            </div>
            <div className="glass-card rounded-3xl p-6 flex flex-col justify-between relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="flex justify-between items-start mb-4 relative z-10">
                <div>
                  <h3 className="text-slate-400 text-xs font-bold uppercase tracking-wide mb-1">
                    {t.accountDashboard.currentTotal}
                  </h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-black text-white">
                      $42.50
                    </span>
                    <span className="text-sm text-slate-500 font-medium">
                      USD
                    </span>
                  </div>
                </div>
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-fresh-mint">
                  <span className="material-symbols-outlined">
                    receipt_long
                  </span>
                </div>
              </div>
              <div className="mt-2 pt-4 border-t border-white/5 relative z-10">
                <p className="text-xs text-slate-400 flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm">
                    schedule
                  </span>
                  {t.accountDashboard.rate}
                </p>
              </div>
            </div>
          </div>

          {/* Service Progress Timeline */}
          <div className="glass-card rounded-3xl p-8 flex-grow">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-lg font-bold text-white tracking-wide">
                {t.accountDashboard.serviceProgress}
              </h3>
              <span className="px-3 py-1 rounded-full bg-white/5 text-xs text-slate-400 font-mono">
                {t.accountDashboard.serviceId}: #SRV-9921
              </span>
            </div>
            <div className="relative pl-8 md:pl-16 space-y-10 lg:space-y-12 max-w-3xl">
              {/* Timeline line */}
              <div className="absolute left-4 md:left-[3.5rem] top-6 bottom-6 w-0.5 bg-gradient-to-b from-electric-teal via-fresh-mint to-slate-800" />

              {/* Step 1: Checked In */}
              <div className="relative flex items-start group">
                <div className="absolute -left-12 md:-left-[4.5rem] top-0 w-10 h-10 md:w-12 md:h-12 rounded-full bg-electric-teal/20 border border-electric-teal text-electric-teal flex items-center justify-center shadow-glow-teal z-10">
                  <span className="material-symbols-outlined text-lg font-bold">
                    check
                  </span>
                </div>
                <div className="flex-grow pl-4">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline">
                    <h4 className="text-white font-bold text-lg">
                      {t.accountDashboard.checkedIn}
                    </h4>
                    <span className="text-slate-500 text-xs font-mono">
                      {t.accountDashboard.checkedInTime}
                    </span>
                  </div>
                  <p className="text-slate-400 text-sm mt-1">
                    {t.accountDashboard.checkedInDesc}
                  </p>
                </div>
              </div>

              {/* Step 2: Car Wash */}
              <div className="relative flex items-start group">
                <div className="absolute -left-12 md:-left-[4.5rem] top-0 w-10 h-10 md:w-12 md:h-12 rounded-full bg-electric-teal/20 border border-electric-teal text-electric-teal flex items-center justify-center shadow-glow-teal z-10">
                  <span className="material-symbols-outlined text-lg font-bold">
                    check
                  </span>
                </div>
                <div className="flex-grow pl-4">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline">
                    <h4 className="text-white font-bold text-lg">
                      {t.accountDashboard.carWash}
                    </h4>
                    <span className="text-slate-500 text-xs font-mono">
                      {t.accountDashboard.carWashTime}
                    </span>
                  </div>
                  <p className="text-slate-400 text-sm mt-1">
                    {t.accountDashboard.carWashDesc}
                  </p>
                </div>
              </div>

              {/* Step 3: EV Charging (In Progress) */}
              <div className="relative flex items-start">
                <div className="absolute -left-12 md:-left-[4.5rem] top-0 w-10 h-10 md:w-12 md:h-12 rounded-full bg-fresh-mint text-charcoal-dark flex items-center justify-center shadow-glow-mint animate-pulse z-10 border-4 border-charcoal">
                  <span className="material-symbols-outlined text-2xl">
                    bolt
                  </span>
                </div>
                <div className="flex-grow pl-4">
                  <div className="bg-white/5 rounded-xl p-4 border border-fresh-mint/30">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
                      <h4 className="text-white font-bold text-lg flex items-center gap-3">
                        {t.accountDashboard.evCharging}
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] bg-fresh-mint text-charcoal font-bold tracking-wider uppercase">
                          {t.accountDashboard.inProgress}
                        </span>
                      </h4>
                      <span className="text-fresh-mint text-xs font-mono mt-1 sm:mt-0">
                        {t.accountDashboard.estRemaining}
                      </span>
                    </div>
                    <div className="w-full bg-charcoal rounded-full h-2 mb-2 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-electric-teal to-fresh-mint h-2 rounded-full shadow-[0_0_10px_rgba(102,255,204,0.5)]"
                        style={{ width: '85%' }}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-slate-400 font-mono">
                      <span>{t.accountDashboard.current}</span>
                      <span>{t.accountDashboard.target}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 4: Ready for Pickup */}
              <div className="relative flex items-start opacity-40">
                <div className="absolute -left-12 md:-left-[4.5rem] top-0 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center z-10">
                  <span className="material-symbols-outlined text-lg">
                    directions_car
                  </span>
                </div>
                <div className="flex-grow pl-4">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline">
                    <h4 className="text-white font-bold text-lg">
                      {t.accountDashboard.readyForPickup}
                    </h4>
                    <span className="text-slate-500 text-xs font-mono">
                      --:--
                    </span>
                  </div>
                  <p className="text-slate-400 text-sm mt-1">
                    {t.accountDashboard.readyDesc}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
