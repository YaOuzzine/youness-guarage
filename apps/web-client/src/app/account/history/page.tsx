'use client';

import { useState } from 'react';
import { useLocale } from '../../../i18n/LocaleContext';

interface HistoryEntry {
  date: string;
  timeRange: string;
  location: string;
  spot: string;
  duration: string;
  addon?: { type: 'charging' | 'wash'; label: string };
  vehicle: string;
  plate: string;
  total: string;
  paymentMethod: string;
}

export default function HistoryPage() {
  const { t } = useLocale();
  const [activeFilter, setActiveFilter] = useState<'30d' | '6m' | 'custom'>('30d');

  const historyData: HistoryEntry[] = [
    {
      date: 'Oct 24, 2023',
      timeRange: '08:30 AM - 05:45 PM',
      location: 'Terminal 1 - Zone B',
      spot: 'Level 2, Spot 42',
      duration: '9h 15m',
      addon: { type: 'charging', label: t.accountHistory.chargingIncluded },
      vehicle: 'SEAT Ateca FR',
      plate: 'ABC-1234',
      total: '$48.50',
      paymentMethod: `${t.accountHistory.paidVia} Visa ••4242`,
    },
    {
      date: 'Oct 18, 2023',
      timeRange: '02:15 PM - 06:30 PM',
      location: 'Terminal 2 - Zone A',
      spot: 'Level 1, Spot 15',
      duration: '4h 15m',
      vehicle: 'Tesla Model 3',
      plate: 'XYZ-9876',
      total: '$22.00',
      paymentMethod: `${t.accountHistory.paidVia} Wallet`,
    },
    {
      date: 'Oct 12, 2023',
      timeRange: '09:00 AM - 11:00 AM',
      location: 'Short Stay - P1',
      spot: 'Ground Floor',
      duration: '2h 00m',
      vehicle: 'SEAT Ateca FR',
      plate: 'ABC-1234',
      total: '$14.50',
      paymentMethod: `${t.accountHistory.paidVia} Apple Pay`,
    },
    {
      date: 'Sep 28, 2023',
      timeRange: '06:00 AM - 08:30 PM',
      location: 'Long Stay - Zone C',
      spot: 'Outdoor Lot',
      duration: '14h 30m',
      addon: { type: 'wash', label: t.accountHistory.premiumWash },
      vehicle: 'SEAT Ateca FR',
      plate: 'ABC-1234',
      total: '$65.00',
      paymentMethod: `${t.accountHistory.paidVia} Visa ••4242`,
    },
    {
      date: 'Sep 15, 2023',
      timeRange: '10:30 AM - 12:45 PM',
      location: 'Terminal 1 - Zone B',
      spot: 'Level 3, Spot 11',
      duration: '2h 15m',
      vehicle: 'Tesla Model 3',
      plate: 'XYZ-9876',
      total: '$16.00',
      paymentMethod: `${t.accountHistory.paidVia} Wallet`,
    },
  ];

  return (
    <div className="p-6 lg:p-10 w-full max-w-7xl mx-auto flex flex-col h-full">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-6">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-white mb-1">
            {t.accountHistory.title}
          </h1>
          <p className="text-slate-400">
            {t.accountHistory.subtitle}
          </p>
        </div>
        <div className="flex items-center gap-4 bg-white/5 p-1 rounded-xl border border-white/5 self-start md:self-auto">
          <button
            onClick={() => setActiveFilter('30d')}
            className={`px-4 py-2 rounded-lg font-bold text-sm transition-all ${
              activeFilter === '30d'
                ? 'bg-electric-teal text-charcoal shadow-glow-teal hover:bg-white'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            {t.accountHistory.last30}
          </button>
          <button
            onClick={() => setActiveFilter('6m')}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
              activeFilter === '6m'
                ? 'bg-electric-teal text-charcoal shadow-glow-teal hover:bg-white'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            {t.accountHistory.last6m}
          </button>
          <button
            onClick={() => setActiveFilter('custom')}
            className={`px-4 py-2 rounded-lg font-medium text-sm flex items-center gap-2 transition-all ${
              activeFilter === 'custom'
                ? 'bg-electric-teal text-charcoal shadow-glow-teal hover:bg-white'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <span>{t.accountHistory.customRange}</span>
            <span className="material-symbols-outlined text-sm">
              calendar_today
            </span>
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="glass-card rounded-2xl overflow-hidden border border-white/10 flex-grow flex flex-col shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-slate-400 text-xs uppercase tracking-wider font-bold" style={{ background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <th className="p-6">{t.accountHistory.date}</th>
                <th className="p-6">{t.accountHistory.location}</th>
                <th className="p-6">{t.accountHistory.duration}</th>
                <th className="p-6">{t.accountHistory.vehicle}</th>
                <th className="p-6 text-right">{t.accountHistory.totalCost}</th>
                <th className="p-6 text-center">{t.accountHistory.receipt}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-sm">
              {historyData.map((entry, i) => (
                <tr
                  key={i}
                  className="hover:bg-white/[0.02] transition-colors"
                >
                  <td className="p-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400">
                        <span className="material-symbols-outlined text-xl">
                          event
                        </span>
                      </div>
                      <div>
                        <div className="font-bold text-white">
                          {entry.date}
                        </div>
                        <div className="text-slate-500 text-xs">
                          {entry.timeRange}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="p-6">
                    <div className="font-medium text-white">
                      {entry.location}
                    </div>
                    <div className="text-slate-500 text-xs">{entry.spot}</div>
                  </td>
                  <td className="p-6">
                    <div className="font-medium text-slate-300">
                      {entry.duration}
                    </div>
                    {entry.addon && (
                      <div
                        className={`inline-flex items-center gap-1 text-xs mt-1 ${
                          entry.addon.type === 'charging'
                            ? 'text-fresh-mint'
                            : 'text-electric-teal'
                        }`}
                      >
                        <span className="material-symbols-outlined text-[10px]">
                          {entry.addon.type === 'charging'
                            ? 'bolt'
                            : 'local_car_wash'}
                        </span>
                        {entry.addon.label}
                      </div>
                    )}
                  </td>
                  <td className="p-6">
                    <div className="font-medium text-slate-300">
                      {entry.vehicle}
                    </div>
                    <div className="text-slate-500 text-xs">{entry.plate}</div>
                  </td>
                  <td className="p-6 text-right">
                    <div className="font-bold text-white text-lg">
                      {entry.total}
                    </div>
                    <div className="text-slate-500 text-xs">
                      {entry.paymentMethod}
                    </div>
                  </td>
                  <td className="p-6 text-center">
                    <button
                      className="group p-2 rounded-lg hover:bg-electric-teal/10 text-slate-400 hover:text-electric-teal transition-all"
                      title="Download Receipt"
                    >
                      <span className="material-symbols-outlined">
                        download
                      </span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-6 border-t border-white/5 flex items-center justify-between bg-white/[0.02]">
          <p className="text-slate-400 text-sm">
            {t.accountHistory.showing} <span className="text-white font-bold">1-5</span> {t.accountHistory.of}{' '}
            <span className="text-white font-bold">24</span> {t.accountHistory.sessions}
          </p>
          <div className="flex gap-2">
            <button className="px-4 py-2 rounded-lg border border-white/10 text-slate-400 text-sm hover:bg-white/5 disabled:opacity-50 disabled:cursor-not-allowed">
              {t.accountHistory.previous}
            </button>
            <button className="px-4 py-2 rounded-lg border border-white/10 text-white text-sm bg-white/5 hover:bg-white/10">
              {t.accountHistory.next}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
