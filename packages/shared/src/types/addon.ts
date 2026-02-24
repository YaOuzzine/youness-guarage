export enum AddonType {
  CAR_WASH = 'CAR_WASH',
  EV_CHARGING = 'EV_CHARGING',
}

export enum AddonStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}

export interface CreateAddonDto {
  type: AddonType;
  notes?: string;
}

export interface AddonResponse {
  id: string;
  bookingId: string;
  type: AddonType;
  status: AddonStatus;
  price: number;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
}
