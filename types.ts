export enum Zone {
  SAFE = 'SAFE',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
}

export enum LocationType {
  STREET = 'STREET',
  PARK = 'PARK',
  MARKET = 'MARKET',
  PLAZA = 'PLAZA',
  WATERFRONT = 'WATERFRONT',
}

export interface DeviceData {
  device_id: string;
  ward: string;
  location: string;
  locationType: LocationType;
  mas: number; // Mosquito Activity Score
  zone: Zone;
  detected_freq: number;
  captures: number;
  temp_c: number;
  humidity: number;
  battery_v: number;
  ai_whisper: string;
  ai_gpt: string;
  ai_dalle: {
    prompt: string;
    url:string;
  };
}