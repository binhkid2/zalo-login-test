import { useEffect, useState, ReactNode } from "react";
import { getCookie } from "../Utils/cookieUtils";
import { useAtom } from "jotai";
import { userAtom } from "../store";

interface UserInfo {
  name: string;
  zaloId: string;
  avatar: string;
}

const AuthCheck: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [, setUserInfo] = useAtom(userAtom);

  useEffect(() => {
    setAccessToken(getCookie("zalo_access_token"));
  }, []);

  useEffect(() => {
    if (accessToken) {
      // User is authenticated, fetch user information
      const userAccessToken = JSON.parse(accessToken || "").access_token;
      fetchUserInfo(userAccessToken);
    } else {
      // User is not authenticated, reset user info
      setUserInfo({
        "name":'unknown userName',
        'zaloId':'',
        'avatar':'https://res.cloudinary.com/yenvietsoft/image/upload/v1713693749/sithucong/user_sithucong_de00hh.png'
    });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken, setUserInfo]);

  const fetchUserInfo = (userAccessToken: string) => {
    fetch("https://graph.zalo.me/v2.0/me?fields=id,name,picture", {
      headers: {
        access_token: userAccessToken,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message && data.message.toLowerCase() === "success") {
          const userData: UserInfo = {
            name: data.name,
            zaloId: data.id,
            avatar: data.picture.data.url,
          };
          setUserInfo(userData);
        }
      })
      .catch((error) => {
        console.error("Error fetching user info:", error);
        // Handle errors if necessary
      });
  };

  return <>{accessToken ? <>{children}</> : null}</>;
};

export default AuthCheck;
