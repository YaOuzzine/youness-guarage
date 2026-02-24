'use client';

import { useState } from 'react';
import { AddonType, BookingStatus } from '@youness-garage/shared';
import { StatsCard } from '@/components/StatsCard';
import { StatusBadge } from '@/components/StatusBadge';
import { AddonIcon } from '@/components/AddonIcon';
import { useLocale } from '../i18n/LocaleContext';

interface VehicleRow {
  id: string;
  guestName: string;
  vehicleMake: string;
  vehicleModel: string;
  licensePlate: string;
  time: string;
  status: BookingStatus;
  addons: AddonType[];
  action: 'check-in' | 'view' | 'check-out';
}

const mockVehicles: VehicleRow[] = [
  {
    id: '1',
    guestName: 'John Doe',
    vehicleMake: 'Tesla',
    vehicleModel: 'Model 3',
    licensePlate: 'ABC-1234',
    time: '08:30 AM',
    status: BookingStatus.CONFIRMED,
    addons: [AddonType.EV_CHARGING],
    action: 'check-in',
  },
  {
    id: '2',
    guestName: 'Jane Smith',
    vehicleMake: 'BMW',
    vehicleModel: 'X5',
    licensePlate: 'XYZ-9876',
    time: '09:15 AM',
    status: BookingStatus.CHECKED_IN,
    addons: [AddonType.CAR_WASH],
    action: 'view',
  },
  {
    id: '3',
    guestName: 'Robert Brown',
    vehicleMake: 'Ford',
    vehicleModel: 'F-150',
    licensePlate: 'LMN-4567',
    time: '10:00 AM',
    status: BookingStatus.PENDING,
    addons: [],
    action: 'check-out',
  },
  {
    id: '4',
    guestName: 'Emily Davis',
    vehicleMake: 'Audi',
    vehicleModel: 'Q5',
    licensePlate: 'QWE-3210',
    time: '10:45 AM',
    status: BookingStatus.CONFIRMED,
    addons: [AddonType.CAR_WASH, AddonType.EV_CHARGING],
    action: 'check-in',
  },
  {
    id: '5',
    guestName: 'Michael Wilson',
    vehicleMake: 'Toyota',
    vehicleModel: 'Camry',
    licensePlate: 'RTY-6543',
    time: '11:30 AM',
    status: BookingStatus.CHECKED_IN,
    addons: [],
    action: 'view',
  },
  {
    id: '6',
    guestName: 'Sarah Connor',
    vehicleMake: 'Rivian',
    vehicleModel: 'R1T',
    licensePlate: 'SKY-2029',
    time: '12:15 PM',
    status: BookingStatus.CONFIRMED,
    addons: [AddonType.EV_CHARGING],
    action: 'check-in',
  },
];

export default function Dashboard() {
  const [page, setPage] = useState(1);
  const { t } = useLocale();

  return (
    <div className="flex flex-col gap-8">
      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard
          icon="input"
          label={t.dashboard.expectedArrivals}
          value={42}
          trend={{ direction: 'up', percent: '5%' }}
          bgIcon="directions_car"
        />
        <StatsCard
          icon="output"
          label={t.dashboard.departures}
          value={38}
          trend={{ direction: 'up', percent: '2%' }}
          bgIcon="flight_takeoff"
        />
        <StatsCard
          icon="local_car_wash"
          label={t.dashboard.pendingWashes}
          value={12}
          trend={{ direction: 'down', percent: '1%' }}
          bgIcon="water_drop"
        />
      </div>

      {/* Vehicle Management table */}
      <div className="glass-panel rounded-2xl overflow-hidden flex flex-col">
        <div className="px-6 py-5 border-b border-glass-border flex justify-between items-center bg-white/5">
          <h2 className="text-xl font-bold text-white tracking-tight">
            {t.dashboard.vehicleManagement}
          </h2>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-text-secondary bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 hover:text-white transition-colors">
              <span className="material-symbols-outlined text-[18px]">
                filter_list
              </span>
              {t.dashboard.filter}
            </button>
            <button className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-black bg-primary rounded-lg hover:bg-primary-dark transition-colors shadow-[0_0_15px_rgba(13,242,242,0.3)] hover:shadow-[0_0_20px_rgba(13,242,242,0.5)]">
              <span className="material-symbols-outlined text-[20px]">add</span>
              {t.dashboard.addGuest}
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/5 border-b border-glass-border">
                <th className="px-6 py-5 text-xs font-semibold text-text-secondary uppercase tracking-wider w-[20%]">
                  {t.dashboard.guestName}
                </th>
                <th className="px-6 py-5 text-xs font-semibold text-text-secondary uppercase tracking-wider w-[20%]">
                  {t.dashboard.vehicle}
                </th>
                <th className="px-6 py-5 text-xs font-semibold text-text-secondary uppercase tracking-wider w-[15%]">
                  {t.dashboard.time}
                </th>
                <th className="px-6 py-5 text-xs font-semibold text-text-secondary uppercase tracking-wider w-[15%]">
                  {t.dashboard.status}
                </th>
                <th className="px-6 py-5 text-xs font-semibold text-text-secondary uppercase tracking-wider w-[20%]">
                  {t.dashboard.services}
                </th>
                <th className="px-6 py-5 text-xs font-semibold text-text-secondary uppercase tracking-wider w-[10%] text-right">
                  {t.dashboard.action}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-glass-border text-sm">
              {mockVehicles.map((v) => (
                <tr
                  key={v.id}
                  className="group hover:bg-white/5 transition-colors"
                >
                  <td className="px-6 py-5 font-medium text-white group-hover:text-primary transition-colors">
                    {v.guestName}
                  </td>
                  <td className="px-6 py-5 text-text-secondary">
                    <div className="flex flex-col">
                      <span className="text-white font-medium">
                        {v.vehicleMake} {v.vehicleModel}
                      </span>
                      <span className="text-xs text-gray-500 font-mono mt-0.5">
                        {v.licensePlate}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-text-secondary font-mono">
                    {v.time}
                  </td>
                  <td className="px-6 py-5">
                    <StatusBadge status={v.status} />
                  </td>
                  <td className="px-6 py-5">
                    {v.addons.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {v.addons.map((addon) => (
                          <AddonIcon key={addon} type={addon} />
                        ))}
                      </div>
                    ) : (
                      <span className="text-gray-600 text-xs italic">{t.dashboard.none}</span>
                    )}
                  </td>
                  <td className="px-6 py-5 text-right">
                    {v.action === 'view' ? (
                      <button className="text-xs font-bold text-gray-400 hover:text-white transition-colors bg-white/5 border border-white/10 hover:bg-white/10 px-4 py-2 rounded-lg">
                        {t.dashboard.view}
                      </button>
                    ) : (
                      <button className="text-xs font-bold text-black bg-primary hover:bg-primary-dark transition-colors px-4 py-2 rounded-lg shadow-[0_0_10px_rgba(13,242,242,0.2)]">
                        {v.action === 'check-in' ? t.dashboard.checkIn : t.dashboard.checkOut}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-white/5 px-6 py-4 border-t border-glass-border flex items-center justify-between">
          <span className="text-sm text-gray-400">
            {t.dashboard.showing} <span className="font-medium text-white">1</span> {t.dashboard.to}{' '}
            <span className="font-medium text-white">6</span> {t.dashboard.of}{' '}
            <span className="font-medium text-white">42</span> {t.dashboard.results}
          </span>
          <div className="flex gap-2">
            <button
              className="px-3 py-1.5 border border-white/10 rounded-lg text-sm text-gray-400 disabled:opacity-50 hover:bg-white/5 transition-colors"
              disabled={page <= 1}
              onClick={() => setPage((p) => p - 1)}
            >
              {t.dashboard.previous}
            </button>
            <button
              className="px-3 py-1.5 border border-white/10 rounded-lg text-sm text-white hover:bg-white/10 transition-colors"
              onClick={() => setPage((p) => p + 1)}
            >
              {t.dashboard.next}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
