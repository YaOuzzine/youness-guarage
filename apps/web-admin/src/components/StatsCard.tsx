interface StatsCardProps {
  icon: string;
  label: string;
  value: string | number;
  trend?: { direction: 'up' | 'down'; percent: string };
  bgIcon?: string;
}

export function StatsCard({ icon, label, value, trend, bgIcon }: StatsCardProps) {
  const isUp = trend?.direction === 'up';

  return (
    <div className="glass-panel rounded-2xl p-6 flex flex-col justify-between h-36 relative overflow-hidden group transition-all duration-300">
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="flex justify-between items-start z-10">
        <h3 className="text-text-secondary font-medium text-sm uppercase tracking-wider">
          {label}
        </h3>
        <div className="p-2.5 bg-primary/10 rounded-xl text-primary border border-primary/20 shadow-[0_0_10px_rgba(13,242,242,0.15)]">
          <span className="material-symbols-outlined">{icon}</span>
        </div>
      </div>
      <div className="flex items-end gap-3 z-10 mt-2">
        <span className="text-5xl font-bold text-white drop-shadow-sm">{value}</span>
        {trend && (
          <span
            className={`text-sm font-medium mb-2 flex items-center px-2 py-0.5 rounded-full border ${
              isUp
                ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20'
                : 'text-rose-400 bg-rose-500/10 border-rose-500/20'
            }`}
          >
            <span className="material-symbols-outlined text-[16px] mr-1">
              {isUp ? 'arrow_upward' : 'arrow_downward'}
            </span>
            {trend.percent}
          </span>
        )}
      </div>
      {bgIcon && (
        <div className="absolute -right-6 -bottom-6 opacity-[0.03] pointer-events-none text-white">
          <span className="material-symbols-outlined text-[140px]">{bgIcon}</span>
        </div>
      )}
    </div>
  );
}
