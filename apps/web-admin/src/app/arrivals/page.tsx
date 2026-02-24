'use client';

import { useState } from 'react';
import { useLocale } from '../../i18n/LocaleContext';

type ArrivalStatus = 'on_time' | 'arrived' | 'delayed';

interface ArrivalRow {
  id: string;
  guestName: string;
  initials: string;
  initialsColor: string;
  membership: string;
  vehicle: string;
  plate: string;
  terminal: string;
  eta: string;
  etaHighlight: boolean;
  status: ArrivalStatus;
  isDelayed: boolean;
}

const statusClasses: Record<ArrivalStatus, string> = {
  on_time:
    'bg-[rgba(13,242,242,0.1)] text-[#0df2f2] border border-[rgba(13,242,242,0.2)] shadow-[0_0_10px_rgba(13,242,242,0.1)]',
  arrived:
    'bg-[rgba(52,211,153,0.1)] text-[#34d399] border border-[rgba(52,211,153,0.2)] shadow-[0_0_10px_rgba(52,211,153,0.1)]',
  delayed:
    'bg-rose-500/10 text-rose-400 border border-rose-500/20 shadow-[0_0_10px_rgba(244,63,94,0.1)]',
};

const mockArrivals: ArrivalRow[] = [
  {
    id: '1',
    guestName: 'John Doe',
    initials: 'JD',
    initialsColor: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
    membership: 'Premium Member',
    vehicle: 'Tesla Model S',
    plate: 'ABC-1234',
    terminal: 'T2 / UA452',
    eta: '10:45 AM',
    etaHighlight: true,
    status: 'on_time',
    isDelayed: false,
  },
  {
    id: '2',
    guestName: 'Jane Smith',
    initials: 'JS',
    initialsColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    membership: 'Guest',
    vehicle: 'BMW X5',
    plate: 'XYZ-9876',
    terminal: 'T4 / AA102',
    eta: '10:15 AM',
    etaHighlight: false,
    status: 'arrived',
    isDelayed: false,
  },
  {
    id: '3',
    guestName: 'Robert Brown',
    initials: 'RB',
    initialsColor: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
    membership: 'Corporate',
    vehicle: 'Audi Q7',
    plate: 'LMN-4567',
    terminal: 'T1 / DL889',
    eta: '12:30 PM',
    etaHighlight: false,
    status: 'delayed',
    isDelayed: true,
  },
  {
    id: '4',
    guestName: 'Emily Davis',
    initials: 'ED',
    initialsColor: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    membership: 'Guest',
    vehicle: 'Rivian R1T',
    plate: 'RIV-2024',
    terminal: 'T5 / B6201',
    eta: '01:15 PM',
    etaHighlight: true,
    status: 'on_time',
    isDelayed: false,
  },
  {
    id: '5',
    guestName: 'Michael Wilson',
    initials: 'MW',
    initialsColor: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    membership: 'Premium Member',
    vehicle: 'Porsche 911',
    plate: 'FST-911',
    terminal: 'T2 / UA775',
    eta: '09:50 AM',
    etaHighlight: false,
    status: 'arrived',
    isDelayed: false,
  },
];

export default function ArrivalsPage() {
  const [page, setPage] = useState(1);
  const { t } = useLocale();

  const statusLabels: Record<ArrivalStatus, string> = {
    on_time: t.arrivals.onTime,
    arrived: t.arrivals.arrived,
    delayed: t.arrivals.delayed,
  };

  return (
    <div className="flex flex-col gap-8">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Scheduled */}
        <div className="glass-panel rounded-2xl p-6 flex flex-col justify-between h-32 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="flex justify-between items-start z-10">
            <h3 className="text-text-secondary font-medium text-sm uppercase tracking-wider">
              {t.arrivals.totalScheduled}
            </h3>
            <div className="p-2 bg-primary/10 rounded-lg text-primary border border-primary/20 shadow-[0_0_10px_rgba(13,242,242,0.1)]">
              <span className="material-symbols-outlined text-[20px]">schedule</span>
            </div>
          </div>
          <div className="flex items-end gap-3 z-10 mt-1">
            <span className="text-4xl font-bold text-white drop-shadow-sm">124</span>
            <span className="text-xs font-medium text-text-secondary mb-1.5">
              {t.arrivals.vehiclesToday}
            </span>
          </div>
        </div>

        {/* Checked In */}
        <div className="glass-panel rounded-2xl p-6 flex flex-col justify-between h-32 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="flex justify-between items-start z-10">
            <h3 className="text-text-secondary font-medium text-sm uppercase tracking-wider">
              {t.arrivals.checkedIn}
            </h3>
            <div className="p-2 bg-emerald-400/10 rounded-lg text-emerald-400 border border-emerald-400/20 shadow-[0_0_10px_rgba(52,211,153,0.1)]">
              <span className="material-symbols-outlined text-[20px]">
                check_circle
              </span>
            </div>
          </div>
          <div className="flex items-end gap-3 z-10 mt-1">
            <span className="text-4xl font-bold text-white drop-shadow-sm">45</span>
            <div className="h-1.5 w-24 bg-gray-700 rounded-full mb-2 overflow-hidden">
              <div className="h-full bg-emerald-400 w-[36%] shadow-[0_0_10px_rgba(52,211,153,0.5)]" />
            </div>
            <span className="text-xs font-medium text-emerald-400 mb-1.5">36%</span>
          </div>
        </div>

        {/* Delayed Flights */}
        <div className="glass-panel rounded-2xl p-6 flex flex-col justify-between h-32 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="flex justify-between items-start z-10">
            <h3 className="text-text-secondary font-medium text-sm uppercase tracking-wider">
              {t.arrivals.delayedFlights}
            </h3>
            <div className="p-2 bg-rose-500/10 rounded-lg text-rose-400 border border-rose-500/20 shadow-[0_0_10px_rgba(244,63,94,0.15)]">
              <span className="material-symbols-outlined text-[20px]">flight_land</span>
            </div>
          </div>
          <div className="flex items-end gap-3 z-10 mt-1">
            <span className="text-4xl font-bold text-white drop-shadow-sm">3</span>
            <span className="text-xs font-medium text-rose-400 mb-1.5 flex items-center bg-rose-500/10 px-2 py-0.5 rounded-full border border-rose-500/20">
              {t.arrivals.attentionNeeded}
            </span>
          </div>
        </div>
      </div>

      {/* Arrivals Table */}
      <div className="glass-panel rounded-2xl overflow-hidden flex flex-col shadow-2xl">
        {/* Table header bar */}
        <div className="px-6 py-5 border-b border-glass-border flex flex-wrap gap-4 justify-between items-center bg-white/[0.02]">
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-text-primary bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 hover:border-primary/30 transition-all">
              <span className="material-symbols-outlined text-[18px]">tune</span>
              {t.arrivals.filterByTerminal}
            </button>
            <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-text-primary bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 hover:border-primary/30 transition-all">
              <span className="material-symbols-outlined text-[18px]">schedule</span>
              {t.arrivals.sortByTime}
            </button>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-[#0f172a] bg-primary rounded-lg hover:bg-primary-dark transition-all shadow-[0_0_20px_rgba(13,242,242,0.25)] hover:shadow-[0_0_25px_rgba(13,242,242,0.4)] hover:-translate-y-0.5">
              <span className="material-symbols-outlined text-[20px]">add</span>
              {t.arrivals.manualEntry}
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-black/20 border-b border-glass-border">
                <th className="px-6 py-4 text-xs font-bold text-text-secondary uppercase tracking-wider w-[20%]">
                  {t.arrivals.guest}
                </th>
                <th className="px-6 py-4 text-xs font-bold text-text-secondary uppercase tracking-wider w-[15%]">
                  {t.arrivals.vehicleCol}
                </th>
                <th className="px-6 py-4 text-xs font-bold text-text-secondary uppercase tracking-wider w-[15%]">
                  {t.arrivals.terminalFlight}
                </th>
                <th className="px-6 py-4 text-xs font-bold text-text-secondary uppercase tracking-wider w-[15%]">
                  {t.arrivals.eta}
                </th>
                <th className="px-6 py-4 text-xs font-bold text-text-secondary uppercase tracking-wider w-[15%]">
                  {t.arrivals.statusCol}
                </th>
                <th className="px-6 py-4 text-xs font-bold text-text-secondary uppercase tracking-wider w-[20%] text-right">
                  {t.arrivals.actionCol}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-glass-border text-sm">
              {mockArrivals.map((row, idx) => (
                <tr
                  key={row.id}
                  className={`group hover:bg-white/[0.03] transition-colors ${
                    idx % 2 === 1 ? 'bg-white/[0.01]' : ''
                  }`}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center font-bold border ${row.initialsColor}`}
                      >
                        {row.initials}
                      </div>
                      <div>
                        <div className="font-semibold text-white group-hover:text-primary transition-colors">
                          {row.guestName}
                        </div>
                        <div className="text-xs text-gray-500">{row.membership}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-gray-300 font-medium">{row.vehicle}</span>
                      <span className="text-xs text-gray-500 font-mono mt-0.5">
                        {row.plate}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-400">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[16px]">
                        flight
                      </span>
                      <span>{row.terminal}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {row.isDelayed ? (
                      <span className="text-rose-300 font-mono font-medium flex items-center gap-2">
                        {row.eta}
                        <span className="material-symbols-outlined text-[14px]">
                          warning
                        </span>
                      </span>
                    ) : (
                      <span
                        className={`font-mono font-medium ${
                          row.etaHighlight ? 'text-white' : 'text-gray-400'
                        }`}
                      >
                        {row.eta}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
                        statusClasses[row.status]
                      }`}
                    >
                      {statusLabels[row.status]}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    {row.status === 'arrived' ? (
                      <button className="text-xs font-medium text-gray-400 border border-white/10 hover:text-white hover:bg-white/10 transition-colors px-4 py-2 rounded-lg">
                        {t.arrivals.viewDetails}
                      </button>
                    ) : (
                      <button className="text-xs font-bold text-[#0f172a] bg-primary hover:bg-primary-dark transition-all px-6 py-2.5 rounded-lg shadow-[0_0_15px_rgba(13,242,242,0.15)] hover:shadow-[0_0_20px_rgba(13,242,242,0.3)]">
                        {t.arrivals.checkInBtn}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination footer */}
        <div className="bg-white/[0.02] px-6 py-4 border-t border-glass-border flex items-center justify-between">
          <span className="text-sm text-gray-400">
            {t.arrivals.showing} <span className="font-medium text-white">1</span> {t.arrivals.to}{' '}
            <span className="font-medium text-white">5</span> {t.arrivals.of}{' '}
            <span className="font-medium text-white">124</span> {t.arrivals.arrivalsLabel}
          </span>
          <div className="flex gap-2">
            <button
              className="px-3 py-1.5 border border-white/10 rounded-lg text-sm text-gray-400 disabled:opacity-50 hover:bg-white/5 transition-colors"
              disabled={page <= 1}
              onClick={() => setPage((p) => p - 1)}
            >
              {t.arrivals.previous}
            </button>
            <button
              className="px-3 py-1.5 border border-white/10 rounded-lg text-sm text-white hover:bg-white/10 transition-colors"
              onClick={() => setPage((p) => p + 1)}
            >
              {t.arrivals.next}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
