
import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils'

export const zalo_access_tokenAtom = atomWithStorage<string | null>('zalo_access_token', null);
export const zalo_auth_stateAtom = atomWithStorage<string | null>('zalo_auth_state', null);
export const zalo_code_verifierAtom = atomWithStorage<string | null>('zalo_code_verifier', null);


export const userAtom = atom({
  name: "unknown userName",
  zaloId: "",
  avatar:
    "https://res.cloudinary.com/yenvietsoft/image/upload/v1713693749/sithucong/user_sithucong_de00hh.png",
});
