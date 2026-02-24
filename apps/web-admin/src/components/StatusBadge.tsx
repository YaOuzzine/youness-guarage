import { BookingStatus } from '@youness-garage/shared';

interface StatusBadgeProps {
  status: BookingStatus;
}

const statusConfig: Record<BookingStatus, { label: string; classes: string }> = {
  [BookingStatus.PENDING]: {
    label: 'Pending',
    classes:
      'bg-amber-500/10 text-amber-400 border-amber-500/20 shadow-[0_0_8px_rgba(251,191,36,0.1)]',
  },
  [BookingStatus.CONFIRMED]: {
    label: 'Confirmed',
    classes:
      'bg-blue-500/10 text-blue-400 border-blue-500/20 shadow-[0_0_8px_rgba(96,165,250,0.1)]',
  },
  [BookingStatus.CHECKED_IN]: {
    label: 'Checked In',
    classes:
      'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 shadow-[0_0_8px_rgba(52,211,153,0.1)]',
  },
  [BookingStatus.CHECKED_OUT]: {
    label: 'Checked Out',
    classes:
      'bg-purple-500/10 text-purple-400 border-purple-500/20 shadow-[0_0_8px_rgba(168,85,247,0.1)]',
  },
  [BookingStatus.CANCELLED]: {
    label: 'Cancelled',
    classes:
      'bg-rose-500/10 text-rose-400 border-rose-500/20 shadow-[0_0_8px_rgba(244,63,94,0.1)]',
  },
};

export function StatusBadge({ status }: StatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${config.classes}`}
    >
      {config.label}
    </span>
  );
}
