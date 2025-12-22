// Kakao Maps SDK 타입 정의
export {};

declare global {
  interface Window {
    kakao: typeof kakao;
  }

  namespace kakao {
    namespace maps {
      class Map {
        constructor(container: HTMLElement, options: MapOptions);
        setCenter(latlng: LatLng): void;
        setLevel(level: number): void;
        getLevel(): number;
        setBounds(bounds: LatLngBounds, paddingTop?: number, paddingRight?: number, paddingBottom?: number, paddingLeft?: number): void;
      }

      class LatLng {
        constructor(lat: number, lng: number);
        getLat(): number;
        getLng(): number;
      }

      class LatLngBounds {
        constructor(sw?: LatLng, ne?: LatLng);
        extend(latlng: LatLng): void;
      }

      class Marker {
        constructor(options: MarkerOptions);
        setMap(map: Map | null): void;
        setPosition(position: LatLng): void;
        getPosition(): LatLng;
      }

      class CustomOverlay {
        constructor(options: CustomOverlayOptions);
        setMap(map: Map | null): void;
        setPosition(position: LatLng): void;
      }

      interface MapOptions {
        center: LatLng;
        level: number;
      }

      interface MarkerOptions {
        position: LatLng;
        map?: Map;
      }

      interface CustomOverlayOptions {
        position: LatLng;
        content: string | HTMLElement;
        map?: Map;
        yAnchor?: number;
      }

      function load(callback: () => void): void;

      namespace event {
        function addListener<T = unknown>(target: Map | Marker, type: string, callback: (e: T) => void): void;
        function removeListener(target: Map | Marker, type: string, callback: (e: unknown) => void): void;
      }

      namespace services {
        class Geocoder {
          coord2Address(lng: number, lat: number, callback: (result: GeocoderResult[], status: Status) => void): void;
          addressSearch(address: string, callback: (result: AddressSearchResult[], status: Status) => void): void;
        }

        class Places {
          keywordSearch(keyword: string, callback: (result: PlaceSearchResult[], status: Status, pagination: Pagination) => void, options?: PlaceSearchOptions): void;
          categorySearch(categoryCode: string, callback: (result: PlaceSearchResult[], status: Status, pagination: Pagination) => void, options?: CategorySearchOptions): void;
        }

        interface GeocoderResult {
          address: {
            address_name: string;
            region_1depth_name: string;
            region_2depth_name: string;
            region_3depth_name: string;
          };
          road_address: {
            address_name: string;
            building_name: string;
          } | null;
        }

        interface AddressSearchResult {
          address_name: string;
          x: string;
          y: string;
          address_type: string;
          road_address?: {
            address_name: string;
            building_name: string;
          };
        }

        interface PlaceSearchResult {
          id: string;
          place_name: string;
          category_name: string;
          category_group_code: string;
          phone: string;
          address_name: string;
          road_address_name: string;
          x: string;
          y: string;
          place_url: string;
          distance?: string;
        }

        interface PlaceSearchOptions {
          location?: LatLng;
          radius?: number;
          size?: number;
          page?: number;
          sort?: 'accuracy' | 'distance';
        }

        interface CategorySearchOptions {
          location: LatLng;
          radius: number;
          size?: number;
          page?: number;
          sort?: 'accuracy' | 'distance';
        }

        interface Pagination {
          totalCount: number;
          hasNextPage: boolean;
          hasPrevPage: boolean;
          current: number;
          gotoPage(page: number): void;
        }

        const Status: {
          OK: 'OK';
          ZERO_RESULT: 'ZERO_RESULT';
          ERROR: 'ERROR';
        };
        type Status = 'OK' | 'ZERO_RESULT' | 'ERROR';
      }
    }
  }
}
