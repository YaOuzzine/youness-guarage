import type {
  AuthResponse,
  BookingResponse,
  BookingStatus,
  LoginDto,
  PaginatedResponse,
  ApiSuccessResponse,
  ParkingSpotResponse,
  UserResponse,
} from '@youness-garage/shared';

const API_BASE = process.env['NEXT_PUBLIC_API_URL'] ?? 'http://localhost:4000';

async function apiFetch<T>(
  path: string,
  init?: RequestInit,
): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    credentials: 'include',
    headers: { 'Content-Type': 'application/json', ...init?.headers },
    ...init,
  });

  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new Error(
      body?.message ?? `API error ${res.status}`,
    );
  }

  return res.json() as Promise<T>;
}

// ── Auth ──────────────────────────────────────────

export async function apiLogin(dto: LoginDto): Promise<UserResponse> {
  const res = await apiFetch<ApiSuccessResponse<AuthResponse>>(
    '/api/auth/login',
    { method: 'POST', body: JSON.stringify(dto) },
  );
  return res.data.user;
}

export async function apiRefresh(): Promise<UserResponse> {
  const res = await apiFetch<ApiSuccessResponse<AuthResponse>>(
    '/api/auth/refresh',
    { method: 'POST' },
  );
  return res.data.user;
}

export async function apiLogout(): Promise<void> {
  await apiFetch<ApiSuccessResponse<{ message: string }>>(
    '/api/auth/logout',
    { method: 'POST' },
  );
}

export async function apiGetMe(): Promise<UserResponse> {
  const res = await apiFetch<ApiSuccessResponse<AuthResponse>>(
    '/api/auth/me',
  );
  return res.data.user;
}

// ── Bookings ──────────────────────────────────────

export async function getBookings(params?: {
  page?: number;
  limit?: number;
  status?: BookingStatus;
  from?: string;
  to?: string;
}): Promise<PaginatedResponse<BookingResponse>> {
  const sp = new URLSearchParams();
  if (params?.page) sp.set('page', String(params.page));
  if (params?.limit) sp.set('limit', String(params.limit));
  if (params?.status) sp.set('status', params.status);
  if (params?.from) sp.set('from', params.from);
  if (params?.to) sp.set('to', params.to);
  const qs = sp.toString();
  return apiFetch<PaginatedResponse<BookingResponse>>(
    `/api/bookings${qs ? `?${qs}` : ''}`,
  );
}

export async function getBooking(id: string): Promise<BookingResponse> {
  const res = await apiFetch<ApiSuccessResponse<BookingResponse>>(
    `/api/bookings/${id}`,
  );
  return res.data;
}

export async function updateBookingStatus(
  id: string,
  status: BookingStatus,
): Promise<BookingResponse> {
  const res = await apiFetch<ApiSuccessResponse<BookingResponse>>(
    `/api/bookings/${id}/status`,
    { method: 'PATCH', body: JSON.stringify({ status }) },
  );
  return res.data;
}

export async function cancelBooking(id: string): Promise<BookingResponse> {
  const res = await apiFetch<ApiSuccessResponse<BookingResponse>>(
    `/api/bookings/${id}`,
    { method: 'DELETE' },
  );
  return res.data;
}

export async function getAllSpots(
  type?: string,
): Promise<ParkingSpotResponse[]> {
  const params = type ? `?type=${type}` : '';
  const res = await apiFetch<ApiSuccessResponse<ParkingSpotResponse[]>>(
    `/api/spots${params}`,
  );
  return res.data;
}
