import type {
  AuthResponse,
  BookingResponse,
  CreateBookingDto,
  LoginDto,
  PaginatedResponse,
  ApiSuccessResponse,
  ParkingSpotResponse,
  BookingStatus,
  RegisterDto,
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

export async function apiRegister(dto: RegisterDto): Promise<UserResponse> {
  const res = await apiFetch<ApiSuccessResponse<AuthResponse>>(
    '/api/auth/register',
    { method: 'POST', body: JSON.stringify(dto) },
  );
  return res.data.user;
}

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

// ── Spots ─────────────────────────────────────────

export async function getAvailableSpots(
  checkIn: string,
  checkOut: string,
  type?: string,
): Promise<ParkingSpotResponse[]> {
  const params = new URLSearchParams({ checkIn, checkOut });
  if (type) params.set('type', type);
  const res = await apiFetch<ApiSuccessResponse<ParkingSpotResponse[]>>(
    `/api/spots/available?${params}`,
  );
  return res.data;
}

// ── Bookings ──────────────────────────────────────

export async function createBooking(
  dto: CreateBookingDto,
): Promise<BookingResponse> {
  const res = await apiFetch<ApiSuccessResponse<BookingResponse>>(
    '/api/bookings',
    { method: 'POST', body: JSON.stringify(dto) },
  );
  return res.data;
}

export async function getBooking(id: string): Promise<BookingResponse> {
  const res = await apiFetch<ApiSuccessResponse<BookingResponse>>(
    `/api/bookings/${id}`,
  );
  return res.data;
}

export async function checkoutBooking(id: string): Promise<BookingResponse> {
  const res = await apiFetch<ApiSuccessResponse<BookingResponse>>(
    `/api/bookings/${id}/checkout`,
    { method: 'POST' },
  );
  return res.data;
}

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
