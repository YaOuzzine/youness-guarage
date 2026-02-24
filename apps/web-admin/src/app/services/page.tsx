'use client';

import { useState } from 'react';
import { AddonType } from '@youness-garage/shared';
import { useLocale } from '../../i18n/LocaleContext';

type Priority = 'high' | 'medium' | 'standard';
type ServiceStatus = 'pending' | 'in_progress' | 'completed';

interface ServiceCard {
  id: string;
  type: AddonType;
  title: string;
  vehicle: string;
  plate: string;
  location: string;
  dueTime: string;
  priority: Priority;
  status: ServiceStatus;
}

const priorityClasses: Record<Priority, string> = {
  high: 'bg-rose-500/20 text-rose-400 border-rose-500/20',
  medium: 'bg-amber-500/20 text-amber-400 border-amber-500/20',
  standard: 'bg-blue-500/20 text-blue-400 border-blue-500/20',
};

const mockServices: ServiceCard[] = [
  {
    id: '1',
    type: AddonType.CAR_WASH,
    title: 'Premium Wash',
    vehicle: 'Tesla Model S',
    plate: 'XYZ-9876',
    location: 'Level 2, A-14',
    dueTime: '10:45 AM',
    priority: 'high',
    status: 'pending',
  },
  {
    id: '2',
    type: AddonType.EV_CHARGING,
    title: 'Full Charge',
    vehicle: 'Rivian R1T',
    plate: 'SKY-2029',
    location: 'EV Zone, E-04',
    dueTime: '11:30 AM',
    priority: 'medium',
    status: 'in_progress',
  },
  {
    id: '3',
    type: AddonType.CAR_WASH,
    title: 'Exterior Wash',
    vehicle: 'Audi Q5',
    plate: 'QWE-3210',
    location: 'Level 1, B-22',
    dueTime: '12:00 PM',
    priority: 'standard',
    status: 'pending',
  },
  {
    id: '4',
    type: AddonType.EV_CHARGING,
    title: 'Quick Charge',
    vehicle: 'BMW iX',
    plate: 'BM-8888',
    location: 'EV Zone, E-01',
    dueTime: '12:15 PM',
    priority: 'high',
    status: 'pending',
  },
  {
    id: '5',
    type: AddonType.CAR_WASH,
    title: 'Detailing',
    vehicle: 'Porsche 911',
    plate: 'PO-9111',
    location: 'VIP, V-05',
    dueTime: '02:00 PM',
    priority: 'medium',
    status: 'in_progress',
  },
  {
    id: '6',
    type: AddonType.CAR_WASH,
    title: 'Basic Wash',
    vehicle: 'Ford F-150',
    plate: 'LMN-4567',
    location: 'Level 3, C-10',
    dueTime: '09:00 AM',
    priority: 'standard',
    status: 'completed',
  },
];

type FilterType = 'all' | 'car_wash' | 'ev_charging';

export default function ServicesPage() {
  const [filter, setFilter] = useState<FilterType>('all');
  const { t } = useLocale();

  const priorityLabels: Record<Priority, string> = {
    high: t.services.highPriority,
    medium: t.services.mediumPriority,
    standard: t.services.standard,
  };
  const [toggledIds, setToggledIds] = useState<Set<string>>(() => {
    const initial = new Set<string>();
    mockServices.forEach((s) => {
      if (s.status === 'in_progress' || s.status === 'completed') {
        initial.add(s.id);
      }
    });
    return initial;
  });

  const filtered = mockServices.filter((s) => {
    if (filter === 'car_wash') return s.type === AddonType.CAR_WASH;
    if (filter === 'ev_charging') return s.type === AddonType.EV_CHARGING;
    return true;
  });

  const handleToggle = (id: string) => {
    setToggledIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <div className="flex flex-col lg:flex-row gap-0 -m-8 h-[calc(100vh-5rem)]">
      {/* Main content area */}
      <div className="flex-1 overflow-y-auto p-8">
        <div className="max-w-6xl mx-auto">
          {/* Filter buttons */}
          <div className="flex items-center space-x-4 mb-8">
            <button
              className={`px-5 py-2.5 rounded-full text-sm font-semibold backdrop-blur-sm transition-all ${
                filter === 'all'
                  ? 'bg-primary/10 text-primary border border-primary/30 shadow-[0_0_15px_rgba(13,242,242,0.15)]'
                  : 'bg-white/5 text-gray-400 border border-white/5 hover:bg-white/10 hover:text-white font-medium'
              }`}
              onClick={() => setFilter('all')}
            >
              {t.services.allActive}
            </button>
            <button
              className={`px-5 py-2.5 rounded-full text-sm transition-all ${
                filter === 'car_wash'
                  ? 'bg-primary/10 text-primary border border-primary/30 shadow-[0_0_15px_rgba(13,242,242,0.15)] font-semibold'
                  : 'bg-white/5 text-gray-400 border border-white/5 hover:bg-white/10 hover:text-white font-medium'
              }`}
              onClick={() => setFilter('car_wash')}
            >
              {t.services.carWash}
            </button>
            <button
              className={`px-5 py-2.5 rounded-full text-sm transition-all ${
                filter === 'ev_charging'
                  ? 'bg-primary/10 text-primary border border-primary/30 shadow-[0_0_15px_rgba(13,242,242,0.15)] font-semibold'
                  : 'bg-white/5 text-gray-400 border border-white/5 hover:bg-white/10 hover:text-white font-medium'
              }`}
              onClick={() => setFilter('ev_charging')}
            >
              {t.services.evCharging}
            </button>
          </div>

          {/* Service cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filtered.map((svc) => {
              const isCompleted = svc.status === 'completed';
              const isWash = svc.type === AddonType.CAR_WASH;
              const isToggled = toggledIds.has(svc.id);
              const priorityCls = priorityClasses[svc.priority];

              return (
                <div
                  key={svc.id}
                  className={`bg-white/5 backdrop-blur-sm border border-white/5 rounded-2xl p-5 hover:bg-white/10 transition-all duration-300 group relative overflow-hidden ${
                    isCompleted ? 'opacity-60' : ''
                  }`}
                >
                  {/* Completed overlay */}
                  {isCompleted && (
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px] z-10 flex items-center justify-center">
                      <div className="px-4 py-2 bg-success-text/20 backdrop-blur-md rounded-lg border border-success-text/40 text-success-text font-bold shadow-[0_0_15px_rgba(52,211,153,0.3)]">
                        {t.services.completed}
                      </div>
                    </div>
                  )}

                  {/* Priority badge */}
                  <div className="absolute top-0 right-0 p-3 opacity-50 group-hover:opacity-100 transition-opacity">
                    <span
                      className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider border ${priorityCls}`}
                    >
                      {priorityLabels[svc.priority]}
                    </span>
                  </div>

                  {/* Service header */}
                  <div className="flex items-start gap-4 mb-4">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center border ${
                        isWash
                          ? 'bg-info-light text-info-text border-cyan-500/20 shadow-[0_0_10px_rgba(34,211,238,0.15)]'
                          : 'bg-success-light text-success-text border-emerald-500/20 shadow-[0_0_10px_rgba(52,211,153,0.15)]'
                      }`}
                    >
                      <span className="material-symbols-outlined">
                        {isWash ? 'local_car_wash' : 'ev_station'}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-white font-semibold text-lg">{svc.title}</h3>
                      <p className="text-gray-400 text-sm">
                        {svc.vehicle} &bull;{' '}
                        <span className="font-mono text-gray-500">{svc.plate}</span>
                      </p>
                    </div>
                  </div>

                  {/* Location / Due Time grid */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-black/20 rounded-lg p-2.5 border border-white/5">
                      <p className="text-[10px] uppercase text-gray-500 font-bold tracking-wider mb-1">
                        {t.services.location}
                      </p>
                      <p className="text-white text-sm font-medium flex items-center gap-1">
                        <span className="material-symbols-outlined text-xs text-primary">
                          pin_drop
                        </span>
                        {svc.location}
                      </p>
                    </div>
                    <div className="bg-black/20 rounded-lg p-2.5 border border-white/5">
                      <p className="text-[10px] uppercase text-gray-500 font-bold tracking-wider mb-1">
                        {t.services.dueTime}
                      </p>
                      <p className="text-white text-sm font-medium">{svc.dueTime}</p>
                    </div>
                  </div>

                  {/* Toggle */}
                  <div className="flex items-center justify-between pt-4 border-t border-white/5">
                    <span className="text-sm font-medium text-gray-400">
                      {isCompleted
                        ? t.services.statusLabel
                        : isToggled
                          ? t.services.inProgress
                          : t.services.markComplete}
                    </span>
                    <label className="relative inline-block w-[44px] h-[24px]">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={isToggled}
                        disabled={isCompleted}
                        onChange={() => handleToggle(svc.id)}
                      />
                      <div className="absolute inset-0 bg-[#334155] rounded-full cursor-pointer transition-all peer-checked:bg-success-text peer-checked:shadow-[0_0_10px_rgba(52,211,153,0.4)] peer-focus:shadow-[0_0_1px_#34d399]" />
                      <div className="absolute top-[3px] left-[3px] w-[18px] h-[18px] bg-white rounded-full transition-transform peer-checked:translate-x-[20px]" />
                    </label>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Daily Summary sidebar */}
      <div className="w-80 border-l border-glass-border bg-surface-dark backdrop-blur-md hidden xl:flex flex-col z-20 shadow-xl">
        <div className="p-6 border-b border-glass-border">
          <h2 className="text-lg font-bold text-white mb-1">{t.services.dailySummary}</h2>
          <p className="text-xs text-gray-400">{t.services.dailySummaryDesc}</p>
        </div>
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Circular progress */}
          <div className="flex flex-col items-center justify-center py-4">
            <div className="relative w-40 h-40 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-gray-700"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <path
                  className="text-primary drop-shadow-[0_0_4px_#0df2f2]"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="currentColor"
                  strokeDasharray="75, 100"
                  strokeWidth="2"
                />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="text-3xl font-bold text-white">18</span>
                <span className="text-xs text-gray-400 uppercase tracking-wide">
                  {t.services.pending}
                </span>
              </div>
            </div>
          </div>

          {/* Breakdown */}
          <div className="space-y-4">
            <div className="bg-white/5 rounded-xl p-4 border border-white/5">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-300 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-info-text shadow-[0_0_5px_#22d3ee]" />
                  {t.services.carWashes}
                </span>
                <span className="font-bold text-white">12</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-1.5">
                <div
                  className="bg-info-text h-1.5 rounded-full"
                  style={{ width: '60%' }}
                />
              </div>
            </div>
            <div className="bg-white/5 rounded-xl p-4 border border-white/5">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-300 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-success-text shadow-[0_0_5px_#34d399]" />
                  {t.services.evChargingLabel}
                </span>
                <span className="font-bold text-white">6</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-1.5">
                <div
                  className="bg-success-text h-1.5 rounded-full"
                  style={{ width: '30%' }}
                />
              </div>
            </div>
          </div>

          {/* Staff On Duty */}
          <div className="pt-6 border-t border-glass-border">
            <h3 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">
              {t.services.staffOnDuty}
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gray-600 border border-gray-500 flex items-center justify-center text-xs font-bold text-white">
                  JD
                </div>
                <div>
                  <p className="text-sm text-white font-medium">John Doe</p>
                  <p className="text-xs text-success-text">Level 2 &bull; Washing</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gray-600 border border-gray-500 flex items-center justify-center text-xs font-bold text-white">
                  MS
                </div>
                <div>
                  <p className="text-sm text-white font-medium">Mike Smith</p>
                  <p className="text-xs text-primary">EV Zone &bull; Charging</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gray-600 border border-gray-500 flex items-center justify-center text-xs font-bold text-white">
                  AL
                </div>
                <div>
                  <p className="text-sm text-white font-medium">Ana Lee</p>
                  <p className="text-xs text-gray-400">Break Room</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
