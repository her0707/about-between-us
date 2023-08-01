import axios from "axios";

const Axios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_KAKAO_REST_API_URL,
});

interface KakaoSearchParams {
  query: string;
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
  return Axios.get<{
    documents: KakaoSearchAddress[];
    meta: { is_end: boolean; pageable_count: number; total_count: number };
  }>(`/v2/local/search/address.json`, { params: params });
};
