import axios from "axios";

const Axios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_KAKAO_REST_API_URL,
});

interface KakaoSearchParams {
  query: string;
}

interface KakaoCategoryParams {
  category_group_code: CategoryGroupCode[keyof CategoryGroupCode];
  /**
   * 중심 좌표의 longitude 값
   */
  x?: string;
  /**
   * 중심 좌표의 latitude 값
   */
  y?: string;
  /**
   * 중심 좌표로부터 반경거리
   * 단위 (meter)
   * 0~20000 사이의 값
   */
  radius?: number;
  /**
   * 결과 페이지 번호
   * 1~45 사이의 값 (기본값 : 15)
   */
  page?: number;
  /**
   * 한 페이지에 보여질 문서의 개수
   * 1~15 사이의 값 (기본값 : 15)
   */
  size?: number;
  /**
   * 결과 정렬 순서
   * distance 정렬 필요 시 기준 좌표로 쓰일 x, y 파라미터 필요
   * distance or accuracy (기본값 : accuracy)
   */
  sort?: string;
}

Axios.interceptors.request.use(
  (config) => {
    const accessToken = process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY;

    config.headers["Authorization"] = `KakaoAK ${accessToken}`;

    return config;
  },
  (error) => Promise.reject(error)
);

export const getKakaoSearchAddress = (params: KakaoSearchParams) => {
  return Axios.get<KakaoDocumentResponse>(`/v2/local/search/address.json`, {
    params,
  });
};

export const getKakaoCategoryAddress = (params: KakaoCategoryParams) => {
  return Axios.get<KakaoDocumentResponse>(`/v2/local/search/category.json`, {
    params,
  });
};
