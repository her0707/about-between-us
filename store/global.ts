import { atom } from "jotai";

export const isMapLoadedAtom = atom(false);

export const locationAtom = atom<KakaoAddress[] | null>(null);

export const usersLocationAtom = atom<UserAddress[]>([]);
