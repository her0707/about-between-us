export interface CandidateArea {
  id: string;
  name: string;
  type: 'geometric' | 'subway';
  lat: number;
  lng: number;
  distanceFromA: number;
  distanceFromB: number;
  accessibilityScore: number;
  address?: string;
}

export interface Place {
  id: string;
  name: string;
  category: string;
  address: string;
  lat: number;
  lng: number;
  distance: number;
  url: string;
  phone: string;
}

export const CATEGORIES = {
  CE7: { name: '카페', icon: 'coffee' },
  FD6: { name: '음식점', icon: 'utensils' },
  CT1: { name: '문화시설', icon: 'theater' },
  AT4: { name: '관광명소', icon: 'landmark' },
} as const;

export type CategoryCode = keyof typeof CATEGORIES;
