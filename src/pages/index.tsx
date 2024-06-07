import { generate_pkce_codes, generate_state_param } from "../Utils/zaloOauth";
import { useAtom } from "jotai";
import {
  userAtom,
} from "../store";
import { useEffect, useState } from "react";
import { getCookie } from "../Utils/cookieUtils";
export default function App() {
 // const [, setZalo_auth_state] = useAtom(zalo_auth_stateAtom);
//  const [, setZalo_code_verifier] = useAtom(zalo_code_verifierAtom);
 // const [zalo_access_token,setZalo_access_token]=useAtom(zalo_access_tokenAtom)
  const [isZaloAccessTokenExist, setIsZaloAccessTokenExist] = useState(false);
  const [userInfo, setUserInfo] = useAtom(userAtom);
   function loginWithZalo() {
    console.log("login now....");
    // Get the current website URL
   // let currentUrl = window.location.origin;

    // Remove any trailing slashes
   // currentUrl = currentUrl.replace(/\/+$/, "");
   const state = generate_state_param(); // for CSRF prevention
   // Generate the code verifier and code challenge
   const codes =generate_pkce_codes();
    // Construct the redirect URI
  //  const redirect_uri = `${currentUrl}/login/zalo`;
   // setZalo_auth_state(state);
    localStorage.setItem("zalo_auth_state", state)
    localStorage.setItem("zalo_code_verifier", codes.verifier)
    /*
    const authUri = `${
      import.meta.env.VITE_ZALO_PERMISSION_URL
    }?${new URLSearchParams({
      app_id: import.meta.env.VITE_APP_ID,
      redirect_uri: redirect_uri,
     // code_challenge: codes.challenge,  //TODOOOOOOOOOOOOOOOOOOOOO
      state: state, // <- prevent CSRF
    }).toString()}`;
    */
   const authUri=`https://oauth.zaloapp.com/v4/permission?app_id=4220696386833253137&redirect_uri=https://dashboard-v2-one-delta.vercel.app/login/zalo&state=${state}`
    window.location.replace(authUri);
  }
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  useEffect(() => {
    const fetchTokensAndCheckAuth = async () => {
      setRefreshToken(getCookie("zalo_refresh_token"));
      await checkAuth();
    };

    fetchTokensAndCheckAuth();
  }, []);
  const checkAuth = async () => {
    if (!localStorage.getItem("zalo_access_token")) {
      setIsZaloAccessTokenExist(false);
      //TODO use RefreshToken to get zaloAccessToken
      console.log(refreshToken);
    } else {
      setIsZaloAccessTokenExist(true);
      const initialToken = localStorage.getItem("zalo_access_token");
      const userAccessToken = JSON.parse(initialToken || "").access_token;
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
       // Remove the access token in localStorage
       localStorage.removeItem("zalo_access_token");
    }
  };

  return (
    <>
    {!isZaloAccessTokenExist ?(
      <button
      className="bg-green-500 rounded-full px-5 "
        onClick={() => {
          loginWithZalo();
        }}
      >
        Login with Zalo
      </button>
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
