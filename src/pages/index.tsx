import { generate_pkce_codes, generate_state_param } from "../Utils/zaloOauth";
import { useAtom } from "jotai";
import {
  zalo_code_verifierAtom,
  zalo_auth_stateAtom,
  userAtom,
} from "../store";
import { useEffect, useState } from "react";
import { getCookie } from "../Utils/cookieUtils";
export default function App() {
  const [, setZalo_auth_state] = useAtom(zalo_auth_stateAtom);
  const [, setZalo_code_verifier] = useAtom(zalo_code_verifierAtom);
  const [isZaloAccessTokenExist, setIsZaloAccessTokenExist] = useState(false);
  const [userInfo, setUserInfo] = useAtom(userAtom);
  function loginWithZalo() {
    console.log("login now....");
    const state = generate_state_param(); // for CSRF prevention
    // Generate the code verifier and code challenge
    const codes = generate_pkce_codes();
    // Get the current website URL
    let currentUrl = window.location.origin;

    // Remove any trailing slashes
    currentUrl = currentUrl.replace(/\/+$/, "");

    // Construct the redirect URI
    const redirect_uri = `${currentUrl}/login/zalo`;
    setZalo_auth_state(state);
    setZalo_code_verifier(codes.verifier);
    const authUri = `${
      import.meta.env.VITE_ZALO_PERMISSION_URL
    }?${new URLSearchParams({
      app_id: import.meta.env.VITE_APP_ID,
      redirect_uri: redirect_uri,
      code_challenge: codes.challenge,
      state: state, // <- prevent CSRF
    }).toString()}`;
    window.location.replace(authUri);
  }
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  useEffect(() => {
    const fetchTokensAndCheckAuth = async () => {
      setRefreshToken(getCookie("zalo_refresh_token"));
      setAccessToken(getCookie("zalo_access_token"));
      await checkAuth();
    };

    fetchTokensAndCheckAuth();
  }, []);
  const checkAuth = async () => {
    if (!accessToken) {
      setIsZaloAccessTokenExist(false);
      //TODO use RefreshToken to get zaloAccessToken
      console.log(refreshToken);
    } else {
      setIsZaloAccessTokenExist(true);
      const userAccessToken = JSON.parse(accessToken || "").access_token;
      // get information of user
      fetch("https://graph.zalo.me/v2.0/me?fields=id,name,picture", {
        headers: {
          access_token: userAccessToken,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.message.toLowerCase() === "success") {
            setUserInfo({
              name: data.name,
              zaloId: data.id,
              avatar: data.picture.data.url,
            });
            //Check if user stored in database or not .if not save it to  database
          }
        });
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
