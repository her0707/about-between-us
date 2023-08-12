import { atom } from "jotai";
import { selectAddressInitialValue } from "@/constants/address-data";

export const selectAddressAtom = atom<CurrentPosition>(
  selectAddressInitialValue
);
