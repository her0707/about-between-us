export interface Origin {
  name: string;
  address: string;
  lat: number;
  lng: number;
}

export interface OriginState {
  originA: Origin | null;
  originB: Origin | null;
}
