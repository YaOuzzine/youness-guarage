'use client';

import { useState, useEffect, useCallback } from 'react';
import { useLocale } from '@/i18n/LocaleContext';
import {
  getGarageSettings,
  updateGarageSettings,
  getStaffUsers,
} from '@/app/actions/admin-settings';
import type { GarageSettings, StaffUser } from '@/app/actions/admin-settings';

// ── Controlled Toggle Components ────────────────────

interface ToggleProps {
  id: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

function Toggle({ id, checked, onChange }: ToggleProps) {
  return (
    <label className="flex items-center cursor-pointer relative" htmlFor={id}>
      <input
        id={id}
        type="checkbox"
        className="sr-only peer"
        checked={checked}
        onChange={() => onChange(!checked)}
      />
      <div className="w-11 h-6 bg-gray-700 rounded-full peer peer-focus:ring-2 peer-focus:ring-primary/50 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" />
    </label>
  );
}

function SmallToggle({ id, checked, onChange }: ToggleProps) {
  return (
    <label className="flex items-center cursor-pointer relative">
      <input
        id={id}
        type="checkbox"
        className="sr-only peer"
        checked={checked}
        onChange={() => onChange(!checked)}
      />
      <div className="w-9 h-5 bg-gray-700 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-success-text" />
    </label>
  );
}

// ── Page ────────────────────────────────────────────

export default function SettingsPage() {
  const { t } = useLocale();

  const [settings, setSettings] = useState<GarageSettings | null>(null);
  const [staffUsers, setStaffUsers] = useState<StaffUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const [settingsData, staffData] = await Promise.all([
        getGarageSettings(),
        getStaffUsers(),
      ]);
      setSettings(settingsData);
      setStaffUsers(staffData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load settings');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSave = async () => {
    if (!settings) return;
    try {
      setSaving(true);
      setError(null);
      setSaveSuccess(false);
      await updateGarageSettings(settings);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  const update = <K extends keyof GarageSettings>(
    key: K,
    value: GarageSettings[K],
  ) => {
    setSettings((prev) => (prev ? { ...prev, [key]: value } : prev));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex items-center gap-3 text-[#94a3b8]">
          <span className="material-symbols-outlined animate-spin">progress_activity</span>
          <span>Loading...</span>
        </div>
      </div>
    );
  }

  if (!settings) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex items-center gap-3 text-rose-400">
          <span className="material-symbols-outlined">error</span>
          <span>{error ?? 'Failed to load settings'}</span>
        </div>
      </div>
    );
  }

  const inputCls =
    'bg-[#0f172a]/60 border border-gray-700 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all w-full py-2.5 px-4';

  return (
    <div className="flex flex-col gap-8 pb-16">
      {error && (
        <div className="px-4 py-3 bg-rose-500/10 border border-rose-500/20 rounded-lg text-rose-400 text-sm">
          {error}
        </div>
      )}

      {/* Garage Capacity */}
      <div className="glass-panel rounded-2xl p-6 relative overflow-hidden">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg text-primary">
              <span className="material-symbols-outlined">warehouse</span>
            </div>
            <h2 className="text-lg font-bold text-white">{t.admin.settings.garageCapacity}</h2>
          </div>
          <span className="text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-1 rounded-md">
            {t.admin.settings.liveStatus}
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-medium text-text-secondary uppercase tracking-wider">
              {t.admin.settings.totalStandard}
            </label>
            <input
              className={inputCls}
              type="number"
              value={settings.capacityStandard}
              onChange={(e) => update('capacityStandard', Number(e.target.value))}
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-medium text-text-secondary uppercase tracking-wider">
              {t.admin.settings.reservedVip}
            </label>
            <input
              className={inputCls}
              type="number"
              value={settings.capacityVip}
              onChange={(e) => update('capacityVip', Number(e.target.value))}
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-medium text-text-secondary uppercase tracking-wider">
              {t.admin.settings.evChargingSpots}
            </label>
            <input
              className={inputCls}
              type="number"
              value={settings.capacityEv}
              onChange={(e) => update('capacityEv', Number(e.target.value))}
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-medium text-text-secondary uppercase tracking-wider">
              {t.admin.settings.valetZone}
            </label>
            <input
              className={inputCls}
              type="number"
              value={settings.capacityValet}
              onChange={(e) => update('capacityValet', Number(e.target.value))}
            />
          </div>
          <div className="col-span-1 md:col-span-2 flex items-center justify-between bg-white/5 p-3 rounded-xl border border-white/5">
            <div>
              <p className="text-sm font-medium text-white">
                {t.admin.settings.automatedBarrier}
              </p>
              <p className="text-xs text-gray-500">
                {t.admin.settings.automatedBarrierDesc}
              </p>
            </div>
            <Toggle
              id="barrier-toggle"
              checked={settings.automatedBarrier}
              onChange={(v) => update('automatedBarrier', v)}
            />
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
            <h2 className="text-lg font-bold text-white">{t.admin.settings.pricingModels}</h2>
          </div>
          <button
            className="text-xs text-primary/50 transition-colors cursor-not-allowed"
            disabled
            title="Coming soon"
          >
            {t.admin.settings.viewPricingHistory}
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-medium text-text-secondary uppercase tracking-wider">
              {t.admin.settings.hourlyRate}
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                {t.admin.settings.currencySymbol}
              </span>
              <input
                className={`${inputCls} pl-7`}
                type="text"
                value={settings.pricingHourly.toFixed(2)}
                onChange={(e) => update('pricingHourly', Number(e.target.value) || 0)}
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-medium text-text-secondary uppercase tracking-wider">
              {t.admin.settings.dailyMax}
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                {t.admin.settings.currencySymbol}
              </span>
              <input
                className={`${inputCls} pl-7`}
                type="text"
                value={settings.pricingDailyMax.toFixed(2)}
                onChange={(e) => update('pricingDailyMax', Number(e.target.value) || 0)}
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-medium text-text-secondary uppercase tracking-wider">
              {t.admin.settings.overnightSurcharge}
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                {t.admin.settings.currencySymbol}
              </span>
              <input
                className={`${inputCls} pl-7`}
                type="text"
                value={settings.pricingOvernightSurcharge.toFixed(2)}
                onChange={(e) => update('pricingOvernightSurcharge', Number(e.target.value) || 0)}
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-medium text-text-secondary uppercase tracking-wider">
              {t.admin.settings.lostTicketFee}
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                {t.admin.settings.currencySymbol}
              </span>
              <input
                className={`${inputCls} pl-7`}
                type="text"
                value={settings.pricingLostTicketFee.toFixed(2)}
                onChange={(e) => update('pricingLostTicketFee', Number(e.target.value) || 0)}
              />
            </div>
          </div>
        </div>

        {/* Dynamic Pricing Rules */}
        <div className="mt-6 pt-6 border-t border-glass-border">
          <h3 className="text-sm font-semibold text-white mb-4">
            {t.admin.settings.dynamicPricing}
          </h3>
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between bg-white/5 p-3 rounded-xl border border-white/5">
              <div>
                <p className="text-sm font-medium text-white">
                  {t.admin.settings.peakHourSurge}
                </p>
                <p className="text-xs text-gray-500">{t.admin.settings.peakHourSurgeDesc}</p>
              </div>
              <Toggle
                id="surge-toggle"
                checked={settings.pricingPeakHourSurge}
                onChange={(v) => update('pricingPeakHourSurge', v)}
              />
            </div>
            <div className="flex items-center justify-between bg-white/5 p-3 rounded-xl border border-white/5">
              <div>
                <p className="text-sm font-medium text-white">{t.admin.settings.holidayRates}</p>
                <p className="text-xs text-gray-500">
                  {t.admin.settings.holidayRatesDesc}
                </p>
              </div>
              <Toggle
                id="holiday-toggle"
                checked={settings.pricingHolidayRates}
                onChange={(v) => update('pricingHolidayRates', v)}
              />
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
            <h2 className="text-lg font-bold text-white">{t.admin.settings.servicePackages}</h2>
          </div>
          <button
            className="flex items-center gap-1 text-xs font-bold text-black/50 bg-primary/50 px-3 py-1.5 rounded-lg cursor-not-allowed opacity-50"
            disabled
            title="Coming soon"
          >
            <span className="material-symbols-outlined text-[16px]">add</span> {t.admin.settings.addPackage}
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
                <h4 className="text-sm font-bold text-white">{t.admin.settings.basicWash}</h4>
                <p className="text-xs text-gray-400">
                  {t.admin.settings.basicWashDesc}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-right">
                <span className="block text-xs text-gray-500 uppercase">{t.admin.settings.price}</span>
                <span className="font-mono text-white">${settings.serviceBasicWashPrice.toFixed(2)}</span>
              </div>
              <SmallToggle
                id="basic-wash-toggle"
                checked={settings.serviceBasicWashEnabled}
                onChange={(v) => update('serviceBasicWashEnabled', v)}
              />
              <button
                className="text-gray-400/50 cursor-not-allowed opacity-50"
                disabled
                title="Coming soon"
              >
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
                <h4 className="text-sm font-bold text-white">{t.admin.settings.evFastCharge}</h4>
                <p className="text-xs text-gray-400">{t.admin.settings.evFastChargeDesc}</p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-right">
                <span className="block text-xs text-gray-500 uppercase">{t.admin.settings.price}</span>
                <span className="font-mono text-white">${settings.serviceEvChargePrice}/kWh</span>
              </div>
              <SmallToggle
                id="ev-charge-toggle"
                checked={settings.serviceEvChargeEnabled}
                onChange={(v) => update('serviceEvChargeEnabled', v)}
              />
              <button
                className="text-gray-400/50 cursor-not-allowed opacity-50"
                disabled
                title="Coming soon"
              >
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
                <h4 className="text-sm font-bold text-white">{t.admin.settings.premiumDetail}</h4>
                <p className="text-xs text-gray-400">
                  {t.admin.settings.premiumDetailDesc}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-right">
                <span className="block text-xs text-gray-500 uppercase">{t.admin.settings.price}</span>
                <span className="font-mono text-white">${settings.servicePremiumDetailPrice.toFixed(2)}</span>
              </div>
              <SmallToggle
                id="premium-detail-toggle"
                checked={settings.servicePremiumDetailEnabled}
                onChange={(v) => update('servicePremiumDetailEnabled', v)}
              />
              <button
                className="text-gray-400/50 cursor-not-allowed opacity-50"
                disabled
                title="Coming soon"
              >
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
            <h2 className="text-lg font-bold text-white">{t.admin.settings.staffManagement}</h2>
          </div>
          <button
            className="flex items-center gap-1 text-xs font-bold text-white/50 bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg cursor-not-allowed opacity-50"
            disabled
            title="Coming soon"
          >
            {t.admin.settings.manageRoles}
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="text-xs text-text-secondary uppercase bg-white/5">
              <tr>
                <th className="px-4 py-3 rounded-l-lg">{t.admin.settings.name}</th>
                <th className="px-4 py-3">{t.admin.settings.role}</th>
                <th className="px-4 py-3">{t.admin.settings.lastActive}</th>
                <th className="px-4 py-3 text-right rounded-r-lg">{t.admin.settings.accessLevel}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-glass-border">
              {staffUsers.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-4 py-8 text-center text-gray-500">
                    No staff users found
                  </td>
                </tr>
              )}
              {staffUsers.map((staff) => {
                const initials = `${staff.firstName[0] ?? ''}${staff.lastName[0] ?? ''}`.toUpperCase();
                return (
                  <tr key={staff.id} className="group hover:bg-white/5 transition-colors">
                    <td className="px-4 py-3 font-medium text-white">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-gray-700 to-gray-600 flex items-center justify-center text-xs font-bold">
                          {initials}
                        </div>
                        {staff.firstName} {staff.lastName}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-300">{staff.role}</td>
                    <td className="px-4 py-3 text-gray-500">
                      {new Date(staff.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-md border border-primary/20">
                        {t.admin.settings.accessAdmin}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Floating Save button */}
      <div className="fixed bottom-8 right-8 z-50">
        <button
          className="flex items-center gap-2 px-6 py-3.5 bg-primary hover:bg-primary-dark text-black font-bold rounded-xl shadow-[0_0_20px_rgba(13,242,242,0.4)] hover:shadow-[0_0_30px_rgba(13,242,242,0.6)] transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          onClick={handleSave}
          disabled={saving}
        >
          <span className="material-symbols-outlined">
            {saving ? 'progress_activity' : saveSuccess ? 'check_circle' : 'save'}
          </span>
          {saving
            ? 'Saving...'
            : saveSuccess
              ? 'Saved!'
              : t.admin.settings.saveChanges}
        </button>
      </div>
    </div>
  );
}
