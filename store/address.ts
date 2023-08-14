import { atom } from "jotai";
import { selectAddressInitialValue } from "@/constants/address-data";

export const addressSearchAtom = atom<CurrentPosition>(
  selectAddressInitialValue
);
