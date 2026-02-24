'use client';

import { useState } from 'react';
import { useLocale } from '../../i18n/LocaleContext';

interface ToggleProps {
  id: string;
  defaultChecked?: boolean;
}

function Toggle({ id, defaultChecked = false }: ToggleProps) {
  const [checked, setChecked] = useState(defaultChecked);

  return (
    <label className="flex items-center cursor-pointer relative" htmlFor={id}>
      <input
        id={id}
        type="checkbox"
        className="sr-only peer"
        checked={checked}
        onChange={() => setChecked((v) => !v)}
      />
      <div className="w-11 h-6 bg-gray-700 rounded-full peer peer-focus:ring-2 peer-focus:ring-primary/50 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" />
    </label>
  );
}

function SmallToggle({ id, defaultChecked = false }: ToggleProps) {
  const [checked, setChecked] = useState(defaultChecked);

  return (
    <label className="flex items-center cursor-pointer relative">
      <input
        id={id}
        type="checkbox"
        className="sr-only peer"
        checked={checked}
        onChange={() => setChecked((v) => !v)}
      />
      <div className="w-9 h-5 bg-gray-700 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-success-text" />
    </label>
  );
}

export default function SettingsPage() {
  const { t } = useLocale();

  return (
    <div className="flex flex-col gap-8 pb-16">
      {/* Garage Capacity */}
      <div className="glass-panel rounded-2xl p-6 relative overflow-hidden">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg text-primary">
              <span className="material-symbols-outlined">warehouse</span>
            </div>
            <h2 className="text-lg font-bold text-white">{t.settings.garageCapacity}</h2>
          </div>
          <span className="text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-1 rounded-md">
            {t.settings.liveStatus}
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-medium text-text-secondary uppercase tracking-wider">
              {t.settings.totalStandard}
            </label>
            <input
              className="bg-[#0f172a]/60 border border-gray-700 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all w-full py-2.5 px-4"
              type="number"
              defaultValue={450}
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-medium text-text-secondary uppercase tracking-wider">
              {t.settings.reservedVip}
            </label>
            <input
              className="bg-[#0f172a]/60 border border-gray-700 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all w-full py-2.5 px-4"
              type="number"
              defaultValue={25}
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-medium text-text-secondary uppercase tracking-wider">
              {t.settings.evChargingSpots}
            </label>
            <input
              className="bg-[#0f172a]/60 border border-gray-700 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all w-full py-2.5 px-4"
              type="number"
              defaultValue={12}
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-medium text-text-secondary uppercase tracking-wider">
              {t.settings.valetZone}
            </label>
            <input
              className="bg-[#0f172a]/60 border border-gray-700 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all w-full py-2.5 px-4"
              type="number"
              defaultValue={50}
            />
          </div>
          <div className="col-span-1 md:col-span-2 flex items-center justify-between bg-white/5 p-3 rounded-xl border border-white/5">
            <div>
              <p className="text-sm font-medium text-white">
                {t.settings.automatedBarrier}
              </p>
              <p className="text-xs text-gray-500">
                {t.settings.automatedBarrierDesc}
              </p>
            </div>
            <Toggle id="barrier-toggle" defaultChecked />
          </div>
        </div>
      </div>

      {/* Pricing Models */}
      <div className="glass-panel rounded-2xl p-6 relative overflow-hidden">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg text-primary">
              <span className="material-symbols-outlined">attach_money</span>
            </div>
            <h2 className="text-lg font-bold text-white">{t.settings.pricingModels}</h2>
          </div>
          <button className="text-xs text-primary hover:text-white transition-colors underline">
            {t.settings.viewPricingHistory}
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-medium text-text-secondary uppercase tracking-wider">
              {t.settings.hourlyRate}
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                {t.settings.currencySymbol}
              </span>
              <input
                className="bg-[#0f172a]/60 border border-gray-700 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all w-full py-2.5 px-4 pl-7"
                type="text"
                defaultValue="8.00"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-medium text-text-secondary uppercase tracking-wider">
              {t.settings.dailyMax}
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                {t.settings.currencySymbol}
              </span>
              <input
                className="bg-[#0f172a]/60 border border-gray-700 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all w-full py-2.5 px-4 pl-7"
                type="text"
                defaultValue="45.00"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-medium text-text-secondary uppercase tracking-wider">
              {t.settings.overnightSurcharge}
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                {t.settings.currencySymbol}
              </span>
              <input
                className="bg-[#0f172a]/60 border border-gray-700 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all w-full py-2.5 px-4 pl-7"
                type="text"
                defaultValue="15.00"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-medium text-text-secondary uppercase tracking-wider">
              {t.settings.lostTicketFee}
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                {t.settings.currencySymbol}
              </span>
              <input
                className="bg-[#0f172a]/60 border border-gray-700 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all w-full py-2.5 px-4 pl-7"
                type="text"
                defaultValue="60.00"
              />
            </div>
          </div>
        </div>

        {/* Dynamic Pricing Rules */}
        <div className="mt-6 pt-6 border-t border-glass-border">
          <h3 className="text-sm font-semibold text-white mb-4">
            {t.settings.dynamicPricing}
          </h3>
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between bg-white/5 p-3 rounded-xl border border-white/5">
              <div>
                <p className="text-sm font-medium text-white">
                  {t.settings.peakHourSurge}
                </p>
                <p className="text-xs text-gray-500">{t.settings.peakHourSurgeDesc}</p>
              </div>
              <Toggle id="surge-toggle" defaultChecked />
            </div>
            <div className="flex items-center justify-between bg-white/5 p-3 rounded-xl border border-white/5">
              <div>
                <p className="text-sm font-medium text-white">{t.settings.holidayRates}</p>
                <p className="text-xs text-gray-500">
                  {t.settings.holidayRatesDesc}
                </p>
              </div>
              <Toggle id="holiday-toggle" />
            </div>
          </div>
        </div>
      </div>

      {/* Service Packages */}
      <div className="glass-panel rounded-2xl p-6 relative overflow-hidden">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg text-primary">
              <span className="material-symbols-outlined">local_car_wash</span>
            </div>
            <h2 className="text-lg font-bold text-white">{t.settings.servicePackages}</h2>
          </div>
          <button className="flex items-center gap-1 text-xs font-bold text-black bg-primary hover:bg-primary-dark transition-colors px-3 py-1.5 rounded-lg shadow-[0_0_10px_rgba(13,242,242,0.2)]">
            <span className="material-symbols-outlined text-[16px]">add</span> {t.settings.addPackage}
          </button>
        </div>
        <div className="space-y-4">
          {/* Basic Wash */}
          <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5 group hover:border-primary/30 transition-all">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-info-light flex items-center justify-center text-info-text border border-cyan-500/20">
                <span className="material-symbols-outlined">water_drop</span>
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">{t.settings.basicWash}</h4>
                <p className="text-xs text-gray-400">
                  {t.settings.basicWashDesc}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-right">
                <span className="block text-xs text-gray-500 uppercase">{t.settings.price}</span>
                <span className="font-mono text-white">$25.00</span>
              </div>
              <div className="text-right hidden sm:block">
                <span className="block text-xs text-gray-500 uppercase">
                  {t.settings.dailyLimit}
                </span>
                <span className="font-mono text-white">20</span>
              </div>
              <SmallToggle id="basic-wash-toggle" defaultChecked />
              <button className="text-gray-400 hover:text-white">
                <span className="material-symbols-outlined">edit</span>
              </button>
            </div>
          </div>

          {/* EV Fast Charge */}
          <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5 group hover:border-primary/30 transition-all">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-success-light flex items-center justify-center text-success-text border border-emerald-500/20">
                <span className="material-symbols-outlined">ev_station</span>
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">{t.settings.evFastCharge}</h4>
                <p className="text-xs text-gray-400">{t.settings.evFastChargeDesc}</p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-right">
                <span className="block text-xs text-gray-500 uppercase">{t.settings.price}</span>
                <span className="font-mono text-white">$0.45/kWh</span>
              </div>
              <div className="text-right hidden sm:block">
                <span className="block text-xs text-gray-500 uppercase">
                  {t.settings.dailyLimit}
                </span>
                <span className="font-mono text-white">&infin;</span>
              </div>
              <SmallToggle id="ev-charge-toggle" defaultChecked />
              <button className="text-gray-400 hover:text-white">
                <span className="material-symbols-outlined">edit</span>
              </button>
            </div>
          </div>

          {/* Premium Detail */}
          <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5 group hover:border-primary/30 transition-all">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-purple-500/15 flex items-center justify-center text-purple-400 border border-purple-500/20">
                <span className="material-symbols-outlined">diamond</span>
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">{t.settings.premiumDetail}</h4>
                <p className="text-xs text-gray-400">
                  {t.settings.premiumDetailDesc}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-right">
                <span className="block text-xs text-gray-500 uppercase">{t.settings.price}</span>
                <span className="font-mono text-white">$150.00</span>
              </div>
              <div className="text-right hidden sm:block">
                <span className="block text-xs text-gray-500 uppercase">
                  {t.settings.dailyLimit}
                </span>
                <span className="font-mono text-white">5</span>
              </div>
              <SmallToggle id="premium-detail-toggle" />
              <button className="text-gray-400 hover:text-white">
                <span className="material-symbols-outlined">edit</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Staff Management */}
      <div className="glass-panel rounded-2xl p-6 relative overflow-hidden">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg text-primary">
              <span className="material-symbols-outlined">group</span>
            </div>
            <h2 className="text-lg font-bold text-white">{t.settings.staffManagement}</h2>
          </div>
          <button className="flex items-center gap-1 text-xs font-bold text-white bg-white/10 hover:bg-white/20 border border-white/10 transition-colors px-3 py-1.5 rounded-lg">
            {t.settings.manageRoles}
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="text-xs text-text-secondary uppercase bg-white/5">
              <tr>
                <th className="px-4 py-3 rounded-l-lg">{t.settings.name}</th>
                <th className="px-4 py-3">{t.settings.role}</th>
                <th className="px-4 py-3">{t.settings.lastActive}</th>
                <th className="px-4 py-3 text-right rounded-r-lg">{t.settings.accessLevel}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-glass-border">
              <tr className="group hover:bg-white/5 transition-colors">
                <td className="px-4 py-3 font-medium text-white">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-gray-700 to-gray-600 flex items-center justify-center text-xs font-bold">
                      JD
                    </div>
                    John Doe
                  </div>
                </td>
                <td className="px-4 py-3 text-gray-300">Manager</td>
                <td className="px-4 py-3 text-gray-500">2 mins ago</td>
                <td className="px-4 py-3 text-right">
                  <select className="bg-[#0f172a] border border-gray-700 text-white text-xs rounded-lg focus:ring-primary focus:border-primary block p-1.5 ml-auto">
                    <option defaultChecked>{t.settings.accessAdmin}</option>
                    <option>{t.settings.accessEditor}</option>
                    <option>{t.settings.accessViewer}</option>
                  </select>
                </td>
              </tr>
              <tr className="group hover:bg-white/5 transition-colors">
                <td className="px-4 py-3 font-medium text-white">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-gray-700 to-gray-600 flex items-center justify-center text-xs font-bold">
                      AS
                    </div>
                    Alice Smith
                  </div>
                </td>
                <td className="px-4 py-3 text-gray-300">Attendant</td>
                <td className="px-4 py-3 text-gray-500">1 hour ago</td>
                <td className="px-4 py-3 text-right">
                  <select
                    className="bg-[#0f172a] border border-gray-700 text-white text-xs rounded-lg focus:ring-primary focus:border-primary block p-1.5 ml-auto"
                    defaultValue="Editor"
                  >
                    <option>{t.settings.accessAdmin}</option>
                    <option>{t.settings.accessEditor}</option>
                    <option>{t.settings.accessViewer}</option>
                  </select>
                </td>
              </tr>
              <tr className="group hover:bg-white/5 transition-colors">
                <td className="px-4 py-3 font-medium text-white">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-gray-700 to-gray-600 flex items-center justify-center text-xs font-bold">
                      RB
                    </div>
                    Robert Brown
                  </div>
                </td>
                <td className="px-4 py-3 text-gray-300">Security</td>
                <td className="px-4 py-3 text-gray-500">5 hours ago</td>
                <td className="px-4 py-3 text-right">
                  <select
                    className="bg-[#0f172a] border border-gray-700 text-white text-xs rounded-lg focus:ring-primary focus:border-primary block p-1.5 ml-auto"
                    defaultValue="Viewer"
                  >
                    <option>{t.settings.accessAdmin}</option>
                    <option>{t.settings.accessEditor}</option>
                    <option>{t.settings.accessViewer}</option>
                  </select>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Floating Save button */}
      <div className="fixed bottom-8 right-8 z-50">
        <button className="flex items-center gap-2 px-6 py-3.5 bg-primary hover:bg-primary-dark text-black font-bold rounded-xl shadow-[0_0_20px_rgba(13,242,242,0.4)] hover:shadow-[0_0_30px_rgba(13,242,242,0.6)] transform hover:-translate-y-1 transition-all duration-300">
          <span className="material-symbols-outlined">save</span>
          {t.settings.saveChanges}
        </button>
      </div>
    </div>
  );
}
