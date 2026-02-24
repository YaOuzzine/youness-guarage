'use client';

import { useState } from 'react';
import { AddonType } from '@youness-garage/shared';
import { useLocale } from '../../i18n/LocaleContext';

type PaymentStatus = 'paid' | 'pending';

interface DepartureRow {
  id: string;
  guestName: string;
  initials: string;
  initialsColor: string;
  licensePlate: string;
  departureTime: string;
  isOverdue: boolean;
  overdueNote?: string;
  paymentStatus: PaymentStatus;
  services: { type: AddonType; status: 'complete' | 'in_progress' }[];
  actionType: 'checkout' | 'force_out';
}

const mockDepartures: DepartureRow[] = [
  {
    id: '1',
    guestName: 'John Doe',
    initials: 'JD',
    initialsColor: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
    licensePlate: 'ABC-1234',
    departureTime: '02:30 PM',
    isOverdue: false,
    paymentStatus: 'paid',
    services: [{ type: AddonType.EV_CHARGING, status: 'complete' }],
    actionType: 'checkout',
  },
  {
    id: '2',
    guestName: 'Jane Smith',
    initials: 'JS',
    initialsColor: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
    licensePlate: 'XYZ-9876',
    departureTime: '03:00 PM',
    isOverdue: false,
    paymentStatus: 'pending',
    services: [{ type: AddonType.CAR_WASH, status: 'complete' }],
    actionType: 'checkout',
  },
  {
    id: '3',
    guestName: 'Robert Brown',
    initials: 'RB',
    initialsColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    licensePlate: 'LMN-4567',
    departureTime: '01:45 PM',
    isOverdue: true,
    overdueNote: 'Overdue (+45m)',
    paymentStatus: 'paid',
    services: [],
    actionType: 'force_out',
  },
  {
    id: '4',
    guestName: 'Emily Davis',
    initials: 'ED',
    initialsColor: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    licensePlate: 'QWE-3210',
    departureTime: '04:15 PM',
    isOverdue: false,
    paymentStatus: 'pending',
    services: [
      { type: AddonType.CAR_WASH, status: 'complete' },
      { type: AddonType.EV_CHARGING, status: 'in_progress' },
    ],
    actionType: 'checkout',
  },
  {
    id: '5',
    guestName: 'Michael Wilson',
    initials: 'MW',
    initialsColor: 'bg-orange-500/20 text-orange-300 border-orange-500/30',
    licensePlate: 'RTY-6543',
    departureTime: '05:00 PM',
    isOverdue: false,
    paymentStatus: 'paid',
    services: [],
    actionType: 'checkout',
  },
];

function ServiceIcon({
  type,
  status,
  labels,
}: {
  type: AddonType;
  status: 'complete' | 'in_progress';
  labels: { washComplete: string; washInProgress: string; chargeComplete: string; chargingInProgress: string };
}) {
  const isWash = type === AddonType.CAR_WASH;
  const icon = isWash ? 'local_car_wash' : 'ev_station';
  const tooltip = isWash
    ? status === 'complete'
      ? labels.washComplete
      : labels.washInProgress
    : status === 'complete'
      ? labels.chargeComplete
      : labels.chargingInProgress;

  const colorClasses =
    status === 'in_progress'
      ? 'bg-amber-500/10 text-amber-400 border-amber-500/20 cursor-wait'
      : isWash
        ? 'bg-info-light text-info-text border-cyan-500/20 cursor-help'
        : 'bg-success-light text-success-text border-emerald-500/20 cursor-help';

  return (
    <div className="group/tooltip relative">
      <span
        className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium border ${colorClasses}`}
      >
        <span className="material-symbols-outlined text-[16px]">{icon}</span>
      </span>
      <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover/tooltip:opacity-100 transition-opacity whitespace-nowrap border border-gray-700 pointer-events-none">
        {tooltip}
      </span>
    </div>
  );
}

export default function DeparturesPage() {
  const [page, setPage] = useState(1);
  const { t } = useLocale();

  return (
    <div className="flex flex-col gap-8">
      {/* KPI Cards - 4 columns */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="glass-panel rounded-2xl p-6 flex flex-col justify-between h-32 relative overflow-hidden group transition-all duration-300">
          <div className="flex justify-between items-start z-10">
            <h3 className="text-text-secondary font-medium text-sm uppercase tracking-wider">
              {t.departures.departuresToday}
            </h3>
            <div className="p-2 bg-primary/10 rounded-lg text-primary border border-primary/20">
              <span className="material-symbols-outlined text-[20px]">
                flight_takeoff
              </span>
            </div>
          </div>
          <div className="flex items-end gap-3 z-10">
            <span className="text-4xl font-bold text-white drop-shadow-sm">45</span>
            <span className="text-xs text-text-secondary mb-1.5">{t.departures.scheduled}</span>
          </div>
        </div>

        <div className="glass-panel rounded-2xl p-6 flex flex-col justify-between h-32 relative overflow-hidden group transition-all duration-300">
          <div className="flex justify-between items-start z-10">
            <h3 className="text-text-secondary font-medium text-sm uppercase tracking-wider">
              {t.departures.checkedOut}
            </h3>
            <div className="p-2 bg-emerald-400/10 rounded-lg text-emerald-400 border border-emerald-400/20">
              <span className="material-symbols-outlined text-[20px]">
                check_circle
              </span>
            </div>
          </div>
          <div className="flex items-end gap-3 z-10">
            <span className="text-4xl font-bold text-white drop-shadow-sm">28</span>
            <span className="text-xs text-text-secondary mb-1.5">{t.departures.vehicles}</span>
          </div>
        </div>

        <div className="glass-panel rounded-2xl p-6 flex flex-col justify-between h-32 relative overflow-hidden group transition-all duration-300">
          <div className="flex justify-between items-start z-10">
            <h3 className="text-text-secondary font-medium text-sm uppercase tracking-wider">
              {t.departures.revenuePending}
            </h3>
            <div className="p-2 bg-amber-500/10 rounded-lg text-amber-400 border border-amber-500/20">
              <span className="material-symbols-outlined text-[20px]">payments</span>
            </div>
          </div>
          <div className="flex items-end gap-3 z-10">
            <span className="text-4xl font-bold text-white drop-shadow-sm">840 €</span>
            <span className="text-xs text-text-secondary mb-1.5">{t.departures.estTotal}</span>
          </div>
        </div>

        <div className="glass-panel rounded-2xl p-6 flex flex-col justify-between h-32 relative overflow-hidden group transition-all duration-300">
          <div className="flex justify-between items-start z-10">
            <h3 className="text-text-secondary font-medium text-sm uppercase tracking-wider">
              {t.departures.overdue}
            </h3>
            <div className="p-2 bg-rose-500/10 rounded-lg text-rose-400 border border-rose-500/20">
              <span className="material-symbols-outlined text-[20px]">warning</span>
            </div>
          </div>
          <div className="flex items-end gap-3 z-10">
            <span className="text-4xl font-bold text-white drop-shadow-sm">3</span>
            <span className="text-xs text-text-secondary mb-1.5">{t.departures.lateCheckout}</span>
          </div>
        </div>
      </div>

      {/* Departures Table */}
      <div className="glass-panel rounded-2xl overflow-hidden flex flex-col">
        <div className="px-6 py-5 border-b border-glass-border flex justify-between items-center bg-white/5">
          <div className="flex gap-4 items-center">
            <h2 className="text-xl font-bold text-white tracking-tight">
              {t.departures.scheduledDepartures}
            </h2>
            <span className="px-2.5 py-0.5 rounded-full bg-primary/20 text-primary text-xs font-bold border border-primary/20">
              {t.departures.live}
            </span>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-text-secondary bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 hover:text-white transition-colors">
              <span className="material-symbols-outlined text-[18px]">
                calendar_today
              </span>
              {t.departures.today}
            </button>
            <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-text-secondary bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 hover:text-white transition-colors">
              <span className="material-symbols-outlined text-[18px]">filter_list</span>
              {t.departures.filter}
            </button>
            <button className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-black bg-primary rounded-lg hover:bg-primary-dark transition-colors shadow-[0_0_15px_rgba(13,242,242,0.3)] hover:shadow-[0_0_20px_rgba(13,242,242,0.5)]">
              <span className="material-symbols-outlined text-[20px]">print</span>
              {t.departures.dailyReport}
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/5 border-b border-glass-border">
                <th className="px-6 py-5 text-xs font-semibold text-text-secondary uppercase tracking-wider w-[20%]">
                  {t.departures.guestName}
                </th>
                <th className="px-6 py-5 text-xs font-semibold text-text-secondary uppercase tracking-wider w-[15%]">
                  {t.departures.licensePlate}
                </th>
                <th className="px-6 py-5 text-xs font-semibold text-text-secondary uppercase tracking-wider w-[15%]">
                  {t.departures.departureTime}
                </th>
                <th className="px-6 py-5 text-xs font-semibold text-text-secondary uppercase tracking-wider w-[15%]">
                  {t.departures.paymentStatus}
                </th>
                <th className="px-6 py-5 text-xs font-semibold text-text-secondary uppercase tracking-wider w-[15%]">
                  {t.departures.serviceStatus}
                </th>
                <th className="px-6 py-5 text-xs font-semibold text-text-secondary uppercase tracking-wider w-[20%] text-right">
                  {t.departures.actions}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-glass-border text-sm">
              {mockDepartures.map((row) => (
                <tr
                  key={row.id}
                  className="group hover:bg-white/5 transition-colors"
                >
                  <td className="px-6 py-5 font-medium text-white group-hover:text-primary transition-colors">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs border ${row.initialsColor}`}
                      >
                        {row.initials}
                      </div>
                      {row.guestName}
                    </div>
                  </td>
                  <td className="px-6 py-5 text-text-secondary">
                    <span className="font-mono bg-white/5 px-2 py-1 rounded border border-white/10 text-white">
                      {row.licensePlate}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-text-secondary">
                    {row.isOverdue ? (
                      <div className="flex flex-col">
                        <span className="text-rose-400 font-medium flex items-center gap-1">
                          <span className="material-symbols-outlined text-[14px]">
                            warning
                          </span>
                          {row.departureTime}
                        </span>
                        <span className="text-xs text-rose-400/70">
                          {row.overdueNote}
                        </span>
                      </div>
                    ) : (
                      <div className="flex flex-col">
                        <span className="text-white font-medium">
                          {row.departureTime}
                        </span>
                        <span className="text-xs text-gray-500">{t.departures.todayLabel}</span>
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-5">
                    {row.paymentStatus === 'paid' ? (
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-[0_0_8px_rgba(52,211,153,0.1)]">
                        <span className="material-symbols-outlined text-[14px] mr-1">
                          check
                        </span>
                        {t.departures.paid}
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20 shadow-[0_0_8px_rgba(251,191,36,0.1)]">
                        <span className="material-symbols-outlined text-[14px] mr-1">
                          pending
                        </span>
                        {t.departures.pending}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-5">
                    {row.services.length > 0 ? (
                      <div className="flex gap-2">
                        {row.services.map((svc, idx) => (
                          <ServiceIcon
                            key={idx}
                            type={svc.type}
                            status={svc.status}
                            labels={{
                              washComplete: t.departures.washComplete,
                              washInProgress: t.departures.washInProgress,
                              chargeComplete: t.departures.chargeComplete,
                              chargingInProgress: t.departures.chargingInProgress,
                            }}
                          />
                        ))}
                      </div>
                    ) : (
                      <span className="text-gray-600 text-xs italic">{t.departures.none}</span>
                    )}
                  </td>
                  <td className="px-6 py-5 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        className="text-gray-400 hover:text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
                        title={t.departures.printReceipt}
                      >
                        <span className="material-symbols-outlined text-[20px]">
                          receipt
                        </span>
                      </button>
                      {row.actionType === 'force_out' ? (
                        <button className="text-xs font-bold text-white bg-rose-500 hover:bg-rose-600 transition-colors px-4 py-2 rounded-lg shadow-[0_0_10px_rgba(244,63,94,0.2)] flex items-center gap-1">
                          {t.departures.forceOut}
                          <span className="material-symbols-outlined text-[16px]">
                            logout
                          </span>
                        </button>
                      ) : (
                        <button className="text-xs font-bold text-black bg-primary hover:bg-primary-dark transition-colors px-4 py-2 rounded-lg shadow-[0_0_10px_rgba(13,242,242,0.2)] flex items-center gap-1">
                          {t.departures.checkOutBtn}
                          <span className="material-symbols-outlined text-[16px]">
                            arrow_forward
                          </span>
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination footer */}
        <div className="bg-white/5 px-6 py-4 border-t border-glass-border flex items-center justify-between">
          <span className="text-sm text-gray-400">
            {t.departures.showing} <span className="font-medium text-white">1</span> {t.departures.to}{' '}
            <span className="font-medium text-white">5</span> {t.departures.of}{' '}
            <span className="font-medium text-white">45</span> {t.departures.departuresLabel}
          </span>
          <div className="flex gap-2">
            <button
              className="px-3 py-1.5 border border-white/10 rounded-lg text-sm text-gray-400 disabled:opacity-50 hover:bg-white/5 transition-colors"
              disabled={page <= 1}
              onClick={() => setPage((p) => p - 1)}
            >
              {t.departures.previous}
            </button>
            <button
              className="px-3 py-1.5 border border-white/10 rounded-lg text-sm text-white hover:bg-white/10 transition-colors"
              onClick={() => setPage((p) => p + 1)}
            >
              {t.departures.next}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
