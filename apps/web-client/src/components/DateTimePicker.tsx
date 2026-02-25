'use client';

import { useState, useRef, useEffect, useCallback } from 'react';

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function daysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

function firstDayOfMonth(year: number, month: number): number {
  // 0 = Sunday, adjust so Monday = 0
  const d = new Date(year, month, 1).getDay();
  return d === 0 ? 6 : d - 1;
}

function pad(n: number): string {
  return n.toString().padStart(2, '0');
}

function formatDisplayDate(d: Date): string {
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
  ];
  return `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
}

function formatDisplayTime(h: number, m: number): string {
  const suffix = h >= 12 ? 'PM' : 'AM';
  const displayH = h === 0 ? 12 : h > 12 ? h - 12 : h;
  return `${displayH}:${pad(m)} ${suffix}`;
}

/** Builds datetime-local string: "2026-02-25T14:30" */
function toDatetimeLocal(
  year: number, month: number, day: number, hour: number, minute: number,
): string {
  return `${year}-${pad(month + 1)}-${pad(day)}T${pad(hour)}:${pad(minute)}`;
}

const WEEKDAY_LABELS = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

const TIME_SLOTS: { h: number; m: number }[] = [];
for (let h = 0; h < 24; h++) {
  TIME_SLOTS.push({ h, m: 0 });
  TIME_SLOTS.push({ h, m: 30 });
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

interface DateTimePickerProps {
  value: string; // datetime-local format
  onChange: (value: string) => void;
  label: string;
  icon?: string;
  /** Minimum date (datetime-local string). Dates before this are disabled. */
  min?: string;
}

export function DateTimePicker({
  value,
  onChange,
  label,
  icon = 'calendar_today',
  min,
}: DateTimePickerProps) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<'date' | 'time'>('date');
  const containerRef = useRef<HTMLDivElement>(null);
  const timeListRef = useRef<HTMLDivElement>(null);

  // Parse current value or default to now
  const now = new Date();
  const parsed = value ? new Date(value) : null;

  const [viewYear, setViewYear] = useState(parsed?.getFullYear() ?? now.getFullYear());
  const [viewMonth, setViewMonth] = useState(parsed?.getMonth() ?? now.getMonth());

  const selectedDay = parsed?.getDate() ?? null;
  const selectedMonth = parsed?.getMonth() ?? null;
  const selectedYear = parsed?.getFullYear() ?? null;
  const selectedHour = parsed?.getHours() ?? 10;
  const selectedMinute = parsed?.getMinutes() ?? 0;

  // Parse min date
  const minDate = min ? new Date(min) : null;

  // Close on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener('mousedown', handleClick);
      return () => document.removeEventListener('mousedown', handleClick);
    }
  }, [open]);

  // Scroll to selected time when time step opens
  useEffect(() => {
    if (step === 'time' && timeListRef.current) {
      const idx = TIME_SLOTS.findIndex(
        (s) => s.h === selectedHour && s.m === selectedMinute,
      );
      if (idx >= 0) {
        const el = timeListRef.current.children[idx] as HTMLElement | undefined;
        el?.scrollIntoView({ block: 'center', behavior: 'instant' });
      }
    }
  }, [step, selectedHour, selectedMinute]);

  const handleDayClick = useCallback(
    (day: number) => {
      const newVal = toDatetimeLocal(viewYear, viewMonth, day, selectedHour, selectedMinute);
      onChange(newVal);
      setStep('time');
    },
    [viewYear, viewMonth, selectedHour, selectedMinute, onChange],
  );

  const handleTimeClick = useCallback(
    (h: number, m: number) => {
      const y = selectedYear ?? viewYear;
      const mo = selectedMonth ?? viewMonth;
      const d = selectedDay ?? now.getDate();
      onChange(toDatetimeLocal(y, mo, d, h, m));
      setOpen(false);
      setStep('date');
    },
    [selectedYear, selectedMonth, selectedDay, viewYear, viewMonth, now, onChange],
  );

  function prevMonth() {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear(viewYear - 1);
    } else {
      setViewMonth(viewMonth - 1);
    }
  }

  function nextMonth() {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear(viewYear + 1);
    } else {
      setViewMonth(viewMonth + 1);
    }
  }

  function isDayDisabled(day: number): boolean {
    if (!minDate) return false;
    const d = new Date(viewYear, viewMonth, day, 23, 59);
    return d < minDate;
  }

  function isToday(day: number): boolean {
    return (
      viewYear === now.getFullYear() &&
      viewMonth === now.getMonth() &&
      day === now.getDate()
    );
  }

  function isSelected(day: number): boolean {
    return (
      viewYear === selectedYear &&
      viewMonth === selectedMonth &&
      day === selectedDay
    );
  }

  // Build the calendar grid
  const totalDays = daysInMonth(viewYear, viewMonth);
  const offset = firstDayOfMonth(viewYear, viewMonth);
  const cells: (number | null)[] = [];
  for (let i = 0; i < offset; i++) cells.push(null);
  for (let d = 1; d <= totalDays; d++) cells.push(d);

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];

  // Display text for trigger
  const displayText = parsed
    ? `${formatDisplayDate(parsed)}  ·  ${formatDisplayTime(parsed.getHours(), parsed.getMinutes())}`
    : '';

  return (
    <div ref={containerRef} className="relative">
      {/* Trigger */}
      <button
        type="button"
        onClick={() => { setOpen(!open); setStep('date'); }}
        className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-left transition-all duration-200 ${
          open
            ? 'bg-black/60 border-electric-teal ring-1 ring-electric-teal'
            : 'bg-black/40 border-white/10 hover:border-electric-teal/50'
        } border`}
      >
        <span className="material-symbols-outlined text-electric-teal text-lg shrink-0">
          {icon}
        </span>
        <div className="flex-grow min-w-0">
          {parsed ? (
            <span className="text-white font-semibold text-sm truncate block">
              {displayText}
            </span>
          ) : (
            <span className="text-slate-500 text-sm font-medium">{label}</span>
          )}
        </div>
        <span className={`material-symbols-outlined text-slate-400 text-base transition-transform duration-200 ${open ? 'rotate-180' : ''}`}>
          expand_more
        </span>
      </button>

      {/* Popover */}
      {open && (
        <div className="absolute left-0 right-0 top-full mt-2 z-50 rounded-2xl bg-charcoal-dark/95 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
          {/* Step tabs */}
          <div className="flex border-b border-white/10">
            <button
              type="button"
              onClick={() => setStep('date')}
              className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 ${
                step === 'date'
                  ? 'text-electric-teal border-b-2 border-electric-teal bg-electric-teal/5'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span className="material-symbols-outlined text-sm">calendar_today</span>
              Date
            </button>
            <button
              type="button"
              onClick={() => setStep('time')}
              className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 ${
                step === 'time'
                  ? 'text-electric-teal border-b-2 border-electric-teal bg-electric-teal/5'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span className="material-symbols-outlined text-sm">schedule</span>
              Time
            </button>
          </div>

          {step === 'date' ? (
            <div className="p-4">
              {/* Month nav */}
              <div className="flex items-center justify-between mb-4">
                <button
                  type="button"
                  onClick={prevMonth}
                  className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
                >
                  <span className="material-symbols-outlined text-lg">chevron_left</span>
                </button>
                <span className="text-white font-bold text-sm">
                  {monthNames[viewMonth]} {viewYear}
                </span>
                <button
                  type="button"
                  onClick={nextMonth}
                  className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
                >
                  <span className="material-symbols-outlined text-lg">chevron_right</span>
                </button>
              </div>

              {/* Weekday headers */}
              <div className="grid grid-cols-7 gap-1 mb-2">
                {WEEKDAY_LABELS.map((wd) => (
                  <div key={wd} className="text-center text-[10px] font-bold text-slate-500 uppercase">
                    {wd}
                  </div>
                ))}
              </div>

              {/* Day grid */}
              <div className="grid grid-cols-7 gap-1">
                {cells.map((day, i) => {
                  if (day === null) {
                    return <div key={`empty-${i}`} className="h-9" />;
                  }
                  const disabled = isDayDisabled(day);
                  const today = isToday(day);
                  const selected = isSelected(day);
                  return (
                    <button
                      key={day}
                      type="button"
                      disabled={disabled}
                      onClick={() => handleDayClick(day)}
                      className={`h-9 rounded-lg text-sm font-medium transition-all duration-150 ${
                        disabled
                          ? 'text-slate-600 cursor-not-allowed'
                          : selected
                            ? 'bg-electric-teal text-charcoal font-bold shadow-glow-teal'
                            : today
                              ? 'bg-white/10 text-white font-bold ring-1 ring-electric-teal/40'
                              : 'text-slate-300 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            /* Time slots */
            <div ref={timeListRef} className="max-h-64 overflow-y-auto p-2 scrollbar-thin">
              <div className="grid grid-cols-3 gap-1.5">
                {TIME_SLOTS.map(({ h, m }) => {
                  const active = h === selectedHour && m === selectedMinute && parsed !== null;
                  return (
                    <button
                      key={`${h}:${m}`}
                      type="button"
                      onClick={() => handleTimeClick(h, m)}
                      className={`py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                        active
                          ? 'bg-electric-teal text-charcoal font-bold shadow-glow-teal'
                          : 'text-slate-300 hover:bg-white/10 hover:text-white bg-white/[0.02]'
                      }`}
                    >
                      {formatDisplayTime(h, m)}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
