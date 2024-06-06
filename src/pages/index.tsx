import { generatePKCECodes, generateStateParam } from "../Utils/zaloOauth";
import { useAtom } from "jotai";
import {
  zalo_code_verifierAtom,
  zalo_auth_stateAtom,
  zalo_access_tokenAtom,
  userAtom,
} from "../store";
import { useEffect, useState } from "react";
import { getCookie } from "../Utils/cookieUtils";
export default function App() {
  const [, setZalo_auth_state] = useAtom(zalo_auth_stateAtom);
  const [, setZalo_code_verifier] = useAtom(zalo_code_verifierAtom);
  const [zalo_access_token,setZalo_access_token]=useAtom(zalo_access_tokenAtom)
  const [isZaloAccessTokenExist, setIsZaloAccessTokenExist] = useState(false);
  const [userInfo, setUserInfo] = useAtom(userAtom);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  async function loginWithZalo() {
    console.log("login now....");
    const state = generateStateParam(); // for CSRF prevention
    const codes = await generatePKCECodes();
    let currentUrl = window.location.origin;
    currentUrl = currentUrl.replace(/\/+$/, "");
    const redirect_uri = `${currentUrl}/login/zalo`;

    setZalo_auth_state(state);
    setZalo_code_verifier(codes.verifier);

    const authUri = `${
      import.meta.env.VITE_ZALO_PERMISSION_URL
    }?${new URLSearchParams({
      app_id: import.meta.env.VITE_APP_ID,
      redirect_uri: redirect_uri,
      code_challenge: codes.challenge,
      state: state,
    }).toString()}`;
    
    window.location.replace(authUri);
  }

  useEffect(() => {
    const fetchTokensAndCheckAuth = async () => {
      setRefreshToken(getCookie("zalo_refresh_token"));
      await checkAuth();
    };

    fetchTokensAndCheckAuth();
  }, []);

  const checkAuth = async () => {
    if (!zalo_access_token) {
      setIsZaloAccessTokenExist(false);
      // TODO: Use refreshToken to get zaloAccessToken
      console.log(refreshToken);
    } else {
      setIsZaloAccessTokenExist(true);
      const userAccessToken = JSON.parse(zalo_access_token || "").access_token;
      
      try {
        const response = await fetch("https://graph.zalo.me/v2.0/me?fields=id,name,picture", {
          headers: {
            access_token: userAccessToken,
          },
        });

        const data = await response.json();

        if (data.message.toLowerCase() === "success") {
          setUserInfo({
            name: data.name,
            zaloId: data.id,
            avatar: data.picture.data.url,
          });
          // Check if user is stored in database or not, if not save it to the database
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
      
      setZalo_access_token(null);
    }
  };

  return (
    <>
    {!isZaloAccessTokenExist ?(
      <h1
        onClick={() => {
          loginWithZalo();
        }}
      >
        Login with Zalo
      </h1>
    ):(
        (<>
        <p>UserId: {userInfo.zaloId}</p>
        <p>UserName: {userInfo.name}</p>
        <p>UserAvatar: </p>
        <img src={userInfo.avatar} alt="user-avatar" className="w-20 h-20" />
        </>)
    )}
    </>
  );
}
