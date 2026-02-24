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
