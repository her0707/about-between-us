type GeoLocation = { lat: string; lng: string };

type CurrentPosition = GeoLocation & {
  addressName: string;
};

type UserAddress = CurrentPosition & {
  name: string;
};
