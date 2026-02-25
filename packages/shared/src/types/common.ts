export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ApiError {
  statusCode: number;
  message: string;
  error?: string;
}

export interface ApiSuccessResponse<T> {
  data: T;
  message?: string;
}

export enum ParkingSpotType {
  STANDARD = 'STANDARD',
  EV = 'EV',
}

export interface ParkingSpotResponse {
  id: number;
  label: string;
  isAvailable: boolean;
  type: ParkingSpotType;
}

export interface PaymentMethodResponse {
  id: string;
  last4: string;
  brand: string;
  expMonth: number;
  expYear: number;
  isDefault: boolean;
  createdAt: string;
}

export interface AddPaymentMethodDto {
  last4: string;
  brand: string;
  expMonth: number;
  expYear: number;
}

export interface VehicleResponse {
  id: string;
  licensePlate: string;
  make: string;
  model: string;
  color: string | null;
  year: number | null;
  isDefault: boolean;
  createdAt: string;
}

export interface CreateVehicleDto {
  licensePlate: string;
  make: string;
  model: string;
  color?: string;
  year?: number;
}

export interface UpdateVehicleDto {
  licensePlate?: string;
  make?: string;
  model?: string;
  color?: string;
  year?: number;
}
