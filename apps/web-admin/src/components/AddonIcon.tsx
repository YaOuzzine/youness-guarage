import { AddonType } from '@youness-garage/shared';

interface AddonIconProps {
  type: AddonType;
  label?: string;
}

const addonConfig: Record<
  AddonType,
  { icon: string; label: string; classes: string }
> = {
  [AddonType.CAR_WASH]: {
    icon: 'local_car_wash',
    label: 'Wash',
    classes:
      'bg-info-light text-info-text border-cyan-500/20 shadow-[0_0_8px_rgba(34,211,238,0.1)]',
  },
  [AddonType.EV_CHARGING]: {
    icon: 'ev_station',
    label: 'Charge',
    classes:
      'bg-success-light text-success-text border-emerald-500/20 shadow-[0_0_8px_rgba(52,211,153,0.1)]',
  },
};

export function AddonIcon({ type, label }: AddonIconProps) {
  const config = addonConfig[type];

  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${config.classes}`}
    >
      <span className="material-symbols-outlined text-[14px] mr-1">
        {config.icon}
      </span>
      {label ?? config.label}
    </span>
  );
}
