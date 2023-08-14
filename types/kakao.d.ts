type KakaoSearchAddress = {
  address: KakaoAddress;
  address_name: string;
  b_code: string;
  h_code: string;
  main_address_no: string;
  mountain_yn: string;
  region_1depth_name: string;
  region_2depth_name: string;
  region_3depth_h_name: string;
  region_3depth_name: string;
  sub_address_no: string;
  x: string;
  y: string;
  address_name: string;
  address_type: string;
  road_address?: {
    address_name: string;
    region_1depth_name: string;
    region_2depth_name: string;
    region_3depth_name: string;
    road_name: string;
    underground_yn: string;
    main_building_no: string;
    sub_building_no: string;
    building_name: string;
    zone_no: string;
    y: string;
    x: string;
  };
  x: string;
  y: string;
};

type KakaoAddress = {
  address_name: string;
  b_code: string;
  h_code: string;
  main_address_no: string;
  mountain_yn: string;
  region_1depth_name: string;
  region_2depth_name: string;
  region_3depth_h_name: string;
  region_3depth_name: string;
  sub_address_no: string;
  x: string;
  y: string;
};

type CategoryGroupCode = {
  [key in string]:
    | "MT1"
    | "CS2"
    | "PS3"
    | "SC4"
    | "AC5"
    | "PK6"
    | "OL7"
    | "SW8"
    | "BK9"
    | "CT1"
    | "AG2"
    | "PO3"
    | "AT4"
    | "AD5"
    | "FD6"
    | "CE7"
    | "HP8"
    | "PM9";
};

interface KakaoDocumentResponse {
  documents: KakaoSearchAddress[];
  meta: { is_end: boolean; pageable_count: number; total_count: number };
}
