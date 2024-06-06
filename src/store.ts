import { atom } from "jotai";

export const zalo_access_tokenAtom = atom("");
export const zalo_auth_stateAtom = atom("");
export const zalo_code_verifierAtom = atom("");

export const userAtom = atom({
  name: "unknown userName",
  zaloId: "",
  avatar:
    "https://res.cloudinary.com/yenvietsoft/image/upload/v1713693749/sithucong/user_sithucong_de00hh.png",
});
