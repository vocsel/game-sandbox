import { atom, useAtom } from "jotai";

export const VocselApi = atom(null);

export const useVocselApi = () => useAtom(VocselApi);
