import { atom } from "jotai";

export const isMapLoadedAtom = atom(false);

export const usersLocationAtom = atom<UserAddress[]>([]);
