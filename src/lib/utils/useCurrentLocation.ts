'use client';

import { useState, useCallback } from 'react';
import type { Origin } from '@/types/origin';

interface UseCurrentLocationReturn {
  getCurrentLocation: () => Promise<Origin | null>;
  isLoading: boolean;
  error: string | null;
}

export function useCurrentLocation(): UseCurrentLocationReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getCurrentLocation = useCallback(async (): Promise<Origin | null> => {
    if (!navigator.geolocation) {
      setError('이 브라우저는 위치 서비스를 지원하지 않습니다.');
      return null;
    }

    setIsLoading(true);
    setError(null);

    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        });
      });

      const { latitude, longitude } = position.coords;

      // Kakao Geocoder로 주소 변환
      const address = await new Promise<string>((resolve, reject) => {
        if (!window.kakao?.maps?.services) {
          reject(new Error('Kakao Maps SDK가 로드되지 않았습니다.'));
          return;
        }

        const geocoder = new window.kakao.maps.services.Geocoder();
        geocoder.coord2Address(longitude, latitude, (result, status) => {
          if (status === window.kakao.maps.services.Status.OK && result[0]) {
            const addr = result[0].road_address?.address_name || result[0].address.address_name;
            resolve(addr);
          } else {
            resolve('현재 위치');
          }
        });
      });

      return {
        name: '현재 위치',
        address,
        lat: latitude,
        lng: longitude,
      };
    } catch (err) {
      if (err instanceof GeolocationPositionError) {
        switch (err.code) {
          case err.PERMISSION_DENIED:
            setError('위치 권한이 거부되었습니다.');
            break;
          case err.POSITION_UNAVAILABLE:
            setError('위치 정보를 가져올 수 없습니다.');
            break;
          case err.TIMEOUT:
            setError('위치 정보 요청 시간이 초과되었습니다.');
            break;
        }
      } else {
        setError('위치를 가져오는 중 오류가 발생했습니다.');
      }
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { getCurrentLocation, isLoading, error };
}
