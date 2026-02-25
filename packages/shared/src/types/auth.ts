export enum UserRole {
  GUEST = 'GUEST',
  ADMIN = 'ADMIN',
}

export interface RegisterDto {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone?: string;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface UserResponse {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string | null;
  role: UserRole;
  createdAt: string;
}

export interface AuthResponse {
  user: UserResponse;
}

export interface ChangePasswordDto {
  currentPassword: string;
  newPassword: string;
}

export interface UpdateBillingInfoDto {
  billingAddress?: string;
  billingCity?: string;
  billingState?: string;
  billingZip?: string;
  billingCountry?: string;
  companyName?: string;
  taxId?: string;
}

export interface BillingInfoResponse {
  billingAddress: string | null;
  billingCity: string | null;
  billingState: string | null;
  billingZip: string | null;
  billingCountry: string | null;
  companyName: string | null;
  taxId: string | null;
}

export interface NotificationPrefsDto {
  serviceUpdates: boolean;
  promoOffers: boolean;
}

export interface NotificationPrefsResponse {
  serviceUpdates: boolean;
  promoOffers: boolean;
}
