'use client';

import { useState } from 'react';
import { useLocale } from '../../../i18n/LocaleContext';

export default function SettingsPage() {
  const { t } = useLocale();
  const [firstName, setFirstName] = useState('Alex');
  const [lastName, setLastName] = useState('Morgan');
  const [email, setEmail] = useState('alex.morgan@example.com');
  const [phone, setPhone] = useState('+1 (555) 012-3456');
  const [serviceUpdates, setServiceUpdates] = useState(true);
  const [promoOffers, setPromoOffers] = useState(false);
  const [newsletter, setNewsletter] = useState(false);
  const [activeTab, setActiveTab] = useState<'profile' | 'vehicle' | 'notifications'>('profile');

  return (
    <div className="p-6 lg:p-10 w-full max-w-6xl mx-auto flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-white mb-1">
            {t.accountSettings.title}
          </h1>
          <p className="text-slate-400">
            {t.accountSettings.subtitle}
          </p>
        </div>
        <div className="hidden md:flex gap-3">
          <button className="group flex items-center gap-2 py-2.5 px-5 rounded-xl border border-electric-teal/30 bg-electric-teal/5 hover:bg-electric-teal/10 text-electric-teal font-bold transition-all duration-300">
            <span className="material-symbols-outlined text-lg">save</span>
            <span>{t.accountSettings.saveChanges}</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-8 border-b border-white/10 overflow-x-auto pb-1">
        <button
          onClick={() => setActiveTab('profile')}
          className={`px-6 py-3 border-b-2 rounded-t-lg font-medium transition-colors ${
            activeTab === 'profile'
              ? 'text-white border-electric-teal font-bold bg-white/5'
              : 'text-slate-400 hover:text-white hover:bg-white/5 border-transparent hover:border-white/20'
          }`}
        >
          {t.accountSettings.profileTab}
        </button>
        <button
          onClick={() => setActiveTab('vehicle')}
          className={`px-6 py-3 border-b-2 rounded-t-lg font-medium transition-colors ${
            activeTab === 'vehicle'
              ? 'text-white border-electric-teal font-bold bg-white/5'
              : 'text-slate-400 hover:text-white hover:bg-white/5 border-transparent hover:border-white/20'
          }`}
        >
          {t.accountSettings.vehicleTab}
        </button>
        <button
          onClick={() => setActiveTab('notifications')}
          className={`px-6 py-3 border-b-2 rounded-t-lg font-medium transition-colors ${
            activeTab === 'notifications'
              ? 'text-white border-electric-teal font-bold bg-white/5'
              : 'text-slate-400 hover:text-white hover:bg-white/5 border-transparent hover:border-white/20'
          }`}
        >
          {t.accountSettings.notificationsTab}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-full pb-10">
        {/* Main Content */}
        <div className="lg:col-span-8 flex flex-col gap-8">
          {/* Personal Information */}
          <section className="glass-card rounded-[2rem] p-8 relative overflow-hidden">
            <div className="flex items-center gap-4 mb-8">
              <div className="relative group cursor-pointer">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-electric-teal to-fresh-mint p-[2px]">
                  <div className="w-full h-full rounded-full bg-charcoal overflow-hidden flex items-center justify-center relative">
                    <span className="material-symbols-outlined text-4xl text-white/50">
                      person
                    </span>
                  </div>
                </div>
                <div className="absolute bottom-0 right-0 w-7 h-7 bg-electric-teal rounded-full flex items-center justify-center border-2 border-charcoal text-black">
                  <span className="material-symbols-outlined text-xs font-bold">
                    edit
                  </span>
                </div>
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">
                  {t.accountSettings.personalInfo}
                </h2>
                <p className="text-slate-400 text-sm">
                  {t.accountSettings.personalInfoDesc}
                </p>
              </div>
            </div>
            <div className="space-y-6 max-w-2xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">
                    {t.accountSettings.firstName}
                  </label>
                  <input
                    className="w-full rounded-xl px-4 py-3 text-sm font-medium text-white transition-all"
                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">
                    {t.accountSettings.lastName}
                  </label>
                  <input
                    className="w-full rounded-xl px-4 py-3 text-sm font-medium text-white transition-all"
                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">
                  {t.accountSettings.emailAddress}
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 material-symbols-outlined text-lg">
                    mail
                  </span>
                  <input
                    className="w-full rounded-xl pl-11 pr-4 py-3 text-sm font-medium text-white transition-all"
                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">
                  {t.accountSettings.phoneNumber}
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 material-symbols-outlined text-lg">
                    call
                  </span>
                  <input
                    className="w-full rounded-xl pl-11 pr-4 py-3 text-sm font-medium text-white transition-all"
                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </section>

          {/* My Vehicles */}
          <section className="space-y-4">
            <div className="flex items-center justify-between px-2">
              <h3 className="text-lg font-bold text-white">{t.accountSettings.myVehicles}</h3>
              <button className="text-electric-teal text-sm font-bold hover:text-white transition-colors flex items-center gap-1">
                <span className="material-symbols-outlined text-lg">add</span>{' '}
                {t.accountSettings.addNew}
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="glass-card p-5 rounded-2xl border border-electric-teal/30 relative group hover:bg-white/5 transition-all cursor-pointer">
                <div className="absolute top-4 right-4">
                  <span className="bg-electric-teal/10 text-electric-teal text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
                    {t.accountSettings.defaultLabel}
                  </span>
                </div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-slate-300">
                    <span className="material-symbols-outlined">
                      directions_car
                    </span>
                  </div>
                  <div>
                    <h4 className="font-bold text-white">SEAT Ateca FR</h4>
                    <p className="text-slate-400 text-xs">SUV &bull; 2022</p>
                  </div>
                </div>
                <div className="bg-black/30 rounded-lg p-2 text-center border border-white/5 font-mono text-sm tracking-widest text-white">
                  ABC-1234
                </div>
              </div>
              <div className="glass-card p-5 rounded-2xl border border-transparent hover:border-white/10 relative group hover:bg-white/5 transition-all cursor-pointer opacity-70 hover:opacity-100">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-slate-300">
                    <span className="material-symbols-outlined">
                      directions_car
                    </span>
                  </div>
                  <div>
                    <h4 className="font-bold text-white">Tesla Model 3</h4>
                    <p className="text-slate-400 text-xs">
                      Sedan &bull; 2023
                    </p>
                  </div>
                </div>
                <div className="bg-black/30 rounded-lg p-2 text-center border border-white/5 font-mono text-sm tracking-widest text-white">
                  EV-9921
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          {/* Notifications */}
          <div className="glass-card rounded-[2rem] p-8 h-full">
            <div className="flex items-center gap-3 mb-6 pb-6 border-b border-white/10">
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-fresh-mint">
                <span className="material-symbols-outlined">
                  notifications
                </span>
              </div>
              <h3 className="font-bold text-lg text-white">{t.accountSettings.notifications}</h3>
            </div>
            <div className="space-y-8">
              <div className="flex items-center justify-between group">
                <div className="pr-4">
                  <h4 className="text-white font-medium mb-1 group-hover:text-fresh-mint transition-colors">
                    {t.accountSettings.serviceUpdates}
                  </h4>
                  <p className="text-slate-400 text-xs leading-relaxed">
                    {t.accountSettings.serviceUpdatesDesc}
                  </p>
                </div>
                <button
                  onClick={() => setServiceUpdates(!serviceUpdates)}
                  className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${
                    serviceUpdates ? 'bg-fresh-mint' : 'bg-slate-700'
                  }`}
                >
                  <div
                    className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-all duration-300 ${
                      serviceUpdates ? 'left-[26px]' : 'left-0.5'
                    }`}
                  />
                </button>
              </div>
              <div className="flex items-center justify-between group">
                <div className="pr-4">
                  <h4 className="text-white font-medium mb-1 group-hover:text-fresh-mint transition-colors">
                    {t.accountSettings.promoOffers}
                  </h4>
                  <p className="text-slate-400 text-xs leading-relaxed">
                    {t.accountSettings.promoOffersDesc}
                  </p>
                </div>
                <button
                  onClick={() => setPromoOffers(!promoOffers)}
                  className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${
                    promoOffers ? 'bg-fresh-mint' : 'bg-slate-700'
                  }`}
                >
                  <div
                    className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-all duration-300 ${
                      promoOffers ? 'left-[26px]' : 'left-0.5'
                    }`}
                  />
                </button>
              </div>
              <div className="flex items-center justify-between group opacity-50">
                <div className="pr-4">
                  <h4 className="text-white font-medium mb-1">
                    {t.accountSettings.emailNewsletter}
                  </h4>
                  <p className="text-slate-400 text-xs leading-relaxed">
                    {t.accountSettings.emailNewsletterDesc}
                  </p>
                </div>
                <button
                  onClick={() => setNewsletter(!newsletter)}
                  className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${
                    newsletter ? 'bg-fresh-mint' : 'bg-slate-700'
                  }`}
                >
                  <div
                    className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-all duration-300 ${
                      newsletter ? 'left-[26px]' : 'left-0.5'
                    }`}
                  />
                </button>
              </div>
            </div>
            <div className="mt-8 pt-6 border-t border-white/10">
              <button className="w-full py-3 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white text-sm font-medium transition-all">
                {t.accountSettings.managePush}
              </button>
            </div>
          </div>

          {/* Security */}
          <div className="glass-card rounded-[2rem] p-8 bg-gradient-to-br from-red-500/5 to-transparent border-red-500/10">
            <div className="flex items-start gap-4">
              <span className="material-symbols-outlined text-red-400 mt-1">
                lock_reset
              </span>
              <div>
                <h4 className="text-white font-bold mb-1">{t.accountSettings.security}</h4>
                <p className="text-slate-400 text-xs mb-4">
                  {t.accountSettings.securityDesc}
                </p>
                <button className="text-red-400 text-xs font-bold uppercase tracking-wider hover:text-red-300">
                  {t.accountSettings.changePassword}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
