import React from 'react';

interface Column {
  key: string;
  label: string;
  width?: string;
  align?: 'left' | 'right';
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  onPageChange: (page: number) => void;
}

interface PaginationLabels {
  showing?: string;
  to?: string;
  of?: string;
  results?: string;
  previous?: string;
  next?: string;
}

interface DataTableProps {
  columns: Column[];
  data: Record<string, unknown>[];
  renderCell?: (key: string, value: unknown, row: Record<string, unknown>) => React.ReactNode;
  pagination?: Pagination;
  labels?: PaginationLabels;
}

export function DataTable({ columns, data, renderCell, pagination, labels }: DataTableProps) {
  const totalPages = pagination ? Math.ceil(pagination.total / pagination.limit) : 1;
  const from = pagination ? (pagination.page - 1) * pagination.limit + 1 : 1;
  const to = pagination ? Math.min(pagination.page * pagination.limit, pagination.total) : data.length;

  return (
    <div className="glass-panel rounded-2xl overflow-hidden flex flex-col">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-white/5 border-b border-[rgba(255,255,255,0.1)]">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={`px-6 py-5 text-xs font-semibold text-[#94a3b8] uppercase tracking-wider ${col.align === 'right' ? 'text-right' : ''}`}
                  style={col.width ? { width: col.width } : undefined}
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[rgba(255,255,255,0.1)] text-sm">
            {data.map((row, rowIdx) => (
              <tr key={rowIdx} className="group hover:bg-white/5 transition-colors">
                {columns.map((col) => {
                  const value = row[col.key];
                  return (
                    <td key={col.key} className={`px-6 py-5 ${col.align === 'right' ? 'text-right' : ''}`}>
                      {renderCell ? renderCell(col.key, value, row) : (String(value ?? ''))}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {pagination && (
        <div className="bg-white/5 px-6 py-4 border-t border-[rgba(255,255,255,0.1)] flex items-center justify-between">
          <span className="text-sm text-gray-400">
            {labels?.showing ?? 'Showing'}{' '}
            <span className="font-medium text-white">{from}</span> {labels?.to ?? 'to'}{' '}
            <span className="font-medium text-white">{to}</span> {labels?.of ?? 'of'}{' '}
            <span className="font-medium text-white">{pagination.total}</span>{' '}
            {labels?.results ?? 'results'}
          </span>
          <div className="flex gap-2">
            <button
              className="px-3 py-1.5 border border-white/10 rounded-lg text-sm text-gray-400 disabled:opacity-50 hover:bg-white/5 transition-colors"
              disabled={pagination.page <= 1}
              onClick={() => pagination.onPageChange(pagination.page - 1)}
            >
              {labels?.previous ?? 'Previous'}
            </button>
            <button
              className="px-3 py-1.5 border border-white/10 rounded-lg text-sm text-white hover:bg-white/10 transition-colors disabled:opacity-50"
              disabled={pagination.page >= totalPages}
              onClick={() => pagination.onPageChange(pagination.page + 1)}
            >
              {labels?.next ?? 'Next'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
