'use client';

import { useState, useEffect, useCallback } from 'react';
import { useLocale } from '../../../i18n/LocaleContext';
import { getMe, updateProfile } from '@/app/actions/auth';
import { changePassword } from '@/app/actions/settings';
import { getNotificationPrefs, updateNotificationPrefs } from '@/app/actions/settings';
import { getVehicles, addVehicle, removeVehicle, setDefaultVehicle } from '@/app/actions/vehicles';
import type { UserResponse, VehicleResponse } from '@youness-garage/shared';

export default function SettingsPage() {
  const { t } = useLocale();
  const [user, setUser] = useState<UserResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [serviceUpdates, setServiceUpdates] = useState(true);
  const [promoOffers, setPromoOffers] = useState(false);
  const [newsletter, setNewsletter] = useState(false);
  const [activeTab, setActiveTab] = useState<'profile' | 'vehicle' | 'notifications'>('profile');

  // Change password state
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPasswordVal, setConfirmPasswordVal] = useState('');
  const [changingPassword, setChangingPassword] = useState(false);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [passwordSuccess, setPasswordSuccess] = useState<string | null>(null);

  // Notification save state
  const [savingNotifs, setSavingNotifs] = useState(false);
  const [notifSuccess, setNotifSuccess] = useState<string | null>(null);

  // Vehicle state
  const [vehicles, setVehicles] = useState<VehicleResponse[]>([]);
  const [showAddVehicle, setShowAddVehicle] = useState(false);
  const [vPlate, setVPlate] = useState('');
  const [vMake, setVMake] = useState('');
  const [vModel, setVModel] = useState('');
  const [vColor, setVColor] = useState('');
  const [vYear, setVYear] = useState('');
  const [addingVehicle, setAddingVehicle] = useState(false);
  const [vehicleSuccess, setVehicleSuccess] = useState<string | null>(null);

  const loadVehicles = useCallback(async () => {
    try {
      setVehicles(await getVehicles());
    } catch {
      // silent — vehicles are non-critical
    }
  }, []);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const [me, prefs] = await Promise.all([getMe(), getNotificationPrefs()]);
        if (!cancelled && me) {
          setUser(me);
          setFirstName(me.firstName);
          setLastName(me.lastName);
          setEmail(me.email);
          setPhone(me.phone ?? '');
        } else if (!cancelled && !me) {
          setError('Not authenticated');
        }
        if (!cancelled && prefs) {
          setServiceUpdates(prefs.serviceUpdates);
          setPromoOffers(prefs.promoOffers);
        }
        const vList = await getVehicles();
        if (!cancelled) setVehicles(vList);
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to load profile');
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, []);

  async function handleSave() {
    setSaving(true);
    setError(null);
    setSuccess(null);
    try {
      const updated = await updateProfile({ firstName, lastName, phone });
      setUser(updated);
      setFirstName(updated.firstName);
      setLastName(updated.lastName);
      setPhone(updated.phone ?? '');
      setSuccess('Profile updated successfully.');
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save changes');
    } finally {
      setSaving(false);
    }
  }

  async function handleChangePassword() {
    setPasswordError(null);
    setPasswordSuccess(null);

    if (newPassword.length < 8) {
      setPasswordError(t.accountSettings.passwordTooShort);
      return;
    }
    if (newPassword !== confirmPasswordVal) {
      setPasswordError(t.accountSettings.passwordMismatch);
      return;
    }

    setChangingPassword(true);
    try {
      await changePassword({ currentPassword, newPassword });
      setPasswordSuccess(t.accountSettings.passwordChanged);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPasswordVal('');
      setShowPasswordForm(false);
      setTimeout(() => setPasswordSuccess(null), 3000);
    } catch (err) {
      setPasswordError(err instanceof Error ? err.message : 'Failed to change password');
    } finally {
      setChangingPassword(false);
    }
  }

  async function handleSaveNotifications() {
    setSavingNotifs(true);
    setNotifSuccess(null);
    try {
      await updateNotificationPrefs({
        serviceUpdates,
        promoOffers,
      });
      setNotifSuccess(t.accountSettings.notificationsSaved);
      setTimeout(() => setNotifSuccess(null), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save preferences');
    } finally {
      setSavingNotifs(false);
    }
  }

  async function handleAddVehicle() {
    if (!vPlate || !vMake || !vModel) return;
    setAddingVehicle(true);
    try {
      await addVehicle({
        licensePlate: vPlate,
        make: vMake,
        model: vModel,
        color: vColor || undefined,
        year: vYear ? parseInt(vYear, 10) : undefined,
      });
      setVehicles(await getVehicles());
      setShowAddVehicle(false);
      setVPlate('');
      setVMake('');
      setVModel('');
      setVColor('');
      setVYear('');
      setVehicleSuccess(t.accountSettings.vehicleAdded);
      setTimeout(() => setVehicleSuccess(null), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add vehicle');
    } finally {
      setAddingVehicle(false);
    }
  }

  async function handleRemoveVehicle(id: string) {
    try {
      await removeVehicle(id);
      setVehicles(await getVehicles());
      setVehicleSuccess(t.accountSettings.vehicleRemoved);
      setTimeout(() => setVehicleSuccess(null), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to remove vehicle');
    }
  }

  async function handleSetDefaultVehicle(id: string) {
    try {
      await setDefaultVehicle(id);
      setVehicles(await getVehicles());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to set default');
    }
  }

  if (loading) {
    return (
      <div className="p-6 lg:p-10 w-full max-w-6xl mx-auto flex flex-col items-center justify-center min-h-[60vh]">
        <div className="w-12 h-12 border-4 border-electric-teal/30 border-t-electric-teal rounded-full animate-spin" />
        <p className="text-slate-400 mt-4 text-sm">{t.accountSettings.title}...</p>
      </div>
    );
  }

  if (!user && error) {
    return (
      <div className="p-6 lg:p-10 w-full max-w-6xl mx-auto flex flex-col items-center justify-center min-h-[60vh]">
        <span className="material-symbols-outlined text-5xl text-red-400 mb-4">error</span>
        <p className="text-red-400 font-bold mb-2">Something went wrong</p>
        <p className="text-slate-400 text-sm">{error}</p>
      </div>
    );
  }

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
        {activeTab === 'profile' && (
        <div className="hidden md:flex gap-3">
          <button
            onClick={handleSave}
            disabled={saving}
            className="group flex items-center gap-2 py-2.5 px-5 rounded-xl border border-electric-teal/30 bg-electric-teal/5 hover:bg-electric-teal/10 text-electric-teal font-bold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="material-symbols-outlined text-lg">
              {saving ? 'hourglass_empty' : 'save'}
            </span>
            <span>{saving ? 'Saving...' : t.accountSettings.saveChanges}</span>
          </button>
        </div>
        )}
      </div>

      {/* Feedback messages */}
      {success && (
        <div className="mb-6 p-4 rounded-xl bg-fresh-mint/10 border border-fresh-mint/20 text-fresh-mint text-sm font-medium flex items-center gap-2">
          <span className="material-symbols-outlined text-lg">check_circle</span>
          {success}
        </div>
      )}
      {error && !loading && user && (
        <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium flex items-center gap-2">
          <span className="material-symbols-outlined text-lg">error</span>
          {error}
        </div>
      )}

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
          {activeTab === 'profile' && (
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
                    className="w-full rounded-xl pl-11 pr-4 py-3 text-sm font-medium text-white/50 transition-all cursor-not-allowed"
                    style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
                    type="email"
                    value={email}
                    disabled
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
          )}

          {/* My Vehicles */}
          {activeTab === 'vehicle' && (
          <section className="space-y-6">
            <div className="flex items-center justify-between px-2">
              <h3 className="text-lg font-bold text-white">{t.accountSettings.myVehicles}</h3>
              <button
                onClick={() => setShowAddVehicle(!showAddVehicle)}
                className="text-electric-teal text-sm font-bold hover:text-fresh-mint transition-colors flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-lg">add</span>{' '}
                {t.accountSettings.addNew}
              </button>
            </div>

            {vehicleSuccess && (
              <div className="p-4 rounded-xl bg-fresh-mint/10 border border-fresh-mint/20 text-fresh-mint text-sm font-medium flex items-center gap-2">
                <span className="material-symbols-outlined text-lg">check_circle</span>
                {vehicleSuccess}
              </div>
            )}

            {/* Add Vehicle Form */}
            {showAddVehicle && (
              <div className="glass-card rounded-2xl p-6 border border-electric-teal/20 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      {t.accountSettings.vehiclePlate} *
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 material-symbols-outlined text-lg">badge</span>
                      <input
                        type="text"
                        value={vPlate}
                        onChange={(e) => setVPlate(e.target.value.toUpperCase())}
                        placeholder="AB-123-CD"
                        className="w-full rounded-xl pl-11 pr-4 py-3 text-sm font-medium text-white transition-all"
                        style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      {t.accountSettings.vehicleMake} *
                    </label>
                    <input
                      type="text"
                      value={vMake}
                      onChange={(e) => setVMake(e.target.value)}
                      placeholder="Tesla"
                      className="w-full rounded-xl px-4 py-3 text-sm font-medium text-white transition-all"
                      style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      {t.accountSettings.vehicleModel} *
                    </label>
                    <input
                      type="text"
                      value={vModel}
                      onChange={(e) => setVModel(e.target.value)}
                      placeholder="Model 3"
                      className="w-full rounded-xl px-4 py-3 text-sm font-medium text-white transition-all"
                      style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      {t.accountSettings.vehicleColor}
                    </label>
                    <input
                      type="text"
                      value={vColor}
                      onChange={(e) => setVColor(e.target.value)}
                      placeholder="White"
                      className="w-full rounded-xl px-4 py-3 text-sm font-medium text-white transition-all"
                      style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      {t.accountSettings.vehicleYear}
                    </label>
                    <input
                      type="number"
                      value={vYear}
                      onChange={(e) => setVYear(e.target.value)}
                      placeholder="2024"
                      min={1990}
                      max={2030}
                      className="w-full rounded-xl px-4 py-3 text-sm font-medium text-white transition-all"
                      style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
                    />
                  </div>
                </div>
                <div className="flex gap-3 pt-2">
                  <button
                    onClick={handleAddVehicle}
                    disabled={addingVehicle || !vPlate || !vMake || !vModel}
                    className="flex-grow py-3 rounded-xl bg-gradient-to-r from-electric-teal to-fresh-mint text-charcoal font-bold text-sm shadow-glow-mint hover:shadow-[0_0_20px_rgba(102,255,204,0.6)] transition-all disabled:opacity-50"
                  >
                    {addingVehicle ? t.accountSettings.addingVehicle : t.accountSettings.addVehicle}
                  </button>
                  <button
                    onClick={() => setShowAddVehicle(false)}
                    className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-slate-400 font-medium text-sm hover:bg-white/10 transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {/* Vehicle List */}
            {vehicles.length === 0 && !showAddVehicle ? (
              <div className="glass-card rounded-2xl p-8 flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-slate-400 mb-4">
                  <span className="material-symbols-outlined text-3xl">directions_car</span>
                </div>
                <p className="text-white font-bold mb-1">{t.accountSettings.noVehicles}</p>
                <p className="text-slate-400 text-sm mb-6">{t.accountSettings.noVehiclesDesc}</p>
                <button
                  onClick={() => setShowAddVehicle(true)}
                  className="px-6 py-3 rounded-xl bg-electric-teal/10 border border-electric-teal/30 text-electric-teal font-bold text-sm hover:bg-electric-teal/20 transition-all flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-base">add</span>
                  {t.accountSettings.addNew}
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {vehicles.map((v) => (
                  <div
                    key={v.id}
                    className={`glass-card p-5 rounded-2xl relative group transition-all ${
                      v.isDefault
                        ? 'border border-electric-teal/30 shadow-glow-teal'
                        : 'border border-white/10 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          v.isDefault ? 'bg-electric-teal/20 text-electric-teal' : 'bg-white/5 text-slate-400'
                        }`}>
                          <span className="material-symbols-outlined">directions_car</span>
                        </div>
                        <div>
                          <p className="font-bold text-white text-sm flex items-center gap-2">
                            {v.make} {v.model}
                            {v.isDefault && (
                              <span className="px-2 py-0.5 rounded bg-electric-teal/10 text-electric-teal text-[10px] font-bold tracking-wider uppercase">
                                {t.accountSettings.defaultLabel}
                              </span>
                            )}
                          </p>
                          <p className="text-xs text-slate-400 mt-0.5">
                            {v.licensePlate}
                            {v.color && ` · ${v.color}`}
                            {v.year && ` · ${v.year}`}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-3 pt-3 border-t border-white/5">
                      {!v.isDefault && (
                        <button
                          onClick={() => handleSetDefaultVehicle(v.id)}
                          className="flex-grow py-2 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-medium text-slate-300 hover:text-white transition-all flex items-center justify-center gap-1"
                        >
                          <span className="material-symbols-outlined text-sm">star</span>
                          {t.accountSettings.setDefaultVehicle}
                        </button>
                      )}
                      <button
                        onClick={() => handleRemoveVehicle(v.id)}
                        className="py-2 px-4 rounded-lg bg-red-500/5 hover:bg-red-500/10 text-xs font-medium text-red-400 hover:text-red-300 transition-all flex items-center justify-center gap-1"
                      >
                        <span className="material-symbols-outlined text-sm">delete</span>
                        {t.accountSettings.removeVehicle}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
          )}

          {/* Mobile save button */}
          {activeTab === 'profile' && (
          <div className="md:hidden">
            <button
              onClick={handleSave}
              disabled={saving}
              className="w-full flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-electric-teal text-charcoal font-bold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="material-symbols-outlined text-lg">
                {saving ? 'hourglass_empty' : 'save'}
              </span>
              <span>{saving ? 'Saving...' : t.accountSettings.saveChanges}</span>
            </button>
          </div>
          )}
        </div>

        {/* Right Column */}
        {activeTab === 'notifications' && (
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
            {notifSuccess && (
              <div className="mt-4 p-3 rounded-xl bg-fresh-mint/10 border border-fresh-mint/20 text-fresh-mint text-sm font-medium flex items-center gap-2">
                <span className="material-symbols-outlined text-lg">check_circle</span>
                {notifSuccess}
              </div>
            )}
            <div className="mt-8 pt-6 border-t border-white/10 space-y-3">
              <button
                onClick={handleSaveNotifications}
                disabled={savingNotifs}
                className="w-full py-3 rounded-xl bg-electric-teal/10 border border-electric-teal/30 text-electric-teal hover:bg-electric-teal/20 text-sm font-bold transition-all disabled:opacity-50"
              >
                {savingNotifs ? t.accountSettings.savingNotifications : t.accountSettings.saveNotifications}
              </button>
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
              <div className="flex-grow">
                <h4 className="text-white font-bold mb-1">{t.accountSettings.security}</h4>
                <p className="text-slate-400 text-xs mb-4">
                  {t.accountSettings.securityDesc}
                </p>

                {passwordSuccess && (
                  <div className="mb-4 p-3 rounded-xl bg-fresh-mint/10 border border-fresh-mint/20 text-fresh-mint text-sm font-medium flex items-center gap-2">
                    <span className="material-symbols-outlined text-lg">check_circle</span>
                    {passwordSuccess}
                  </div>
                )}

                {!showPasswordForm ? (
                  <button
                    onClick={() => setShowPasswordForm(true)}
                    className="text-red-400 text-xs font-bold uppercase tracking-wider hover:text-red-300"
                  >
                    {t.accountSettings.changePassword}
                  </button>
                ) : (
                  <div className="space-y-4 mt-2">
                    {passwordError && (
                      <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium flex items-center gap-2">
                        <span className="material-symbols-outlined text-lg">error</span>
                        {passwordError}
                      </div>
                    )}
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                        {t.accountSettings.currentPassword}
                      </label>
                      <input
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        className="w-full rounded-xl px-4 py-3 text-sm font-medium text-white transition-all"
                        style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                        {t.accountSettings.newPassword}
                      </label>
                      <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full rounded-xl px-4 py-3 text-sm font-medium text-white transition-all"
                        style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                        {t.accountSettings.confirmPassword}
                      </label>
                      <input
                        type="password"
                        value={confirmPasswordVal}
                        onChange={(e) => setConfirmPasswordVal(e.target.value)}
                        className="w-full rounded-xl px-4 py-3 text-sm font-medium text-white transition-all"
                        style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
                      />
                    </div>
                    <div className="flex gap-3">
                      <button
                        onClick={handleChangePassword}
                        disabled={changingPassword}
                        className="flex-grow py-3 rounded-xl bg-red-500/20 border border-red-500/30 text-red-400 font-bold text-sm hover:bg-red-500/30 transition-all disabled:opacity-50"
                      >
                        {changingPassword ? t.accountSettings.changingPassword : t.accountSettings.changePasswordButton}
                      </button>
                      <button
                        onClick={() => {
                          setShowPasswordForm(false);
                          setPasswordError(null);
                          setCurrentPassword('');
                          setNewPassword('');
                          setConfirmPasswordVal('');
                        }}
                        className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-slate-400 font-medium text-sm hover:bg-white/10 transition-all"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        )}
      </div>
    </div>
  );
}
