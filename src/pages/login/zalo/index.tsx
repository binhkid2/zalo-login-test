//import { useAtom } from "jotai";
import { useEffect, useState } from "react";
//import { zalo_code_verifierAtom,zalo_auth_stateAtom, zalo_access_tokenAtom } from "../../../store";
import { useLocation } from "react-router-dom";

export default function LoginZaloPage() {
   // const [zalo_code_verifier,setZalo_code_verifier]=useAtom(zalo_code_verifierAtom)
  //  const [zalo_auth_state,setZalo_auth_state]=useAtom(zalo_auth_stateAtom)
 //   const [,setZalo_access_token]=useAtom(zalo_access_tokenAtom)
    const [body,setBody]= useState('')
    const location = useLocation();
    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const stateParam = queryParams.get('state');
        const storedState = localStorage.getItem('zalo_auth_state');
        
        const isValid = stateParam && storedState === stateParam;
        
        if (isValid) {
            try {
                // Obtain the Access Token by performing a POST request to the Access Token URL
                const data = new URLSearchParams({
                    app_id: import.meta.env.VITE_APP_ID || '',
                    code: queryParams.get('code') || '',
                    code_verifier: localStorage.getItem("zalo_code_verifier") || '',
                    grant_type: 'authorization_code'
                }).toString();
    
                fetch(import.meta.env.ZALO_ACCESS_TOKEN_URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: data
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    return response.json();
                })
                .then(auth => {
                    if (auth.access_token && auth.refresh_token) {
                        // Store the Access Token in localStorage
                        localStorage.setItem("zalo_access_token", JSON.stringify({
                            access_token: auth.access_token,
                            expires_in: auth.expires_in
                        }));
    
                        // Store the Refresh Token in a secured HTTP only cookie
                        const exprZaloRefreshToken = new Date(new Date().getTime() + (3 * 30 * 24 * 60 * 60 * 1000)); // 3 months
                        document.cookie = `zalo_refresh_token=${auth.refresh_token};expires=${exprZaloRefreshToken.toUTCString()};path=/refresh;domain=${window.location.hostname};secure;HttpOnly`;
    
                        // Clean up the one-time-use state variables
                        localStorage.removeItem("zalo_auth_state");
                        localStorage.removeItem("zalo_code_verifier");
    
                        // Authenticated. Redirect to the desired page
                        window.location.replace('/dashboard');
                    } else {
                        throw new Error('Invalid authentication response');
                    }
                })
                .catch(error => {
                    console.error('Error fetching the access token:', error);
                    setBody(`Error: ${error.message}`);
                });
            } catch (error) {
                console.error('Unexpected error:', error);
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                //@ts-ignore
                setBody(`Unexpected error: ${error.message}`);
            }
        } else {
            // Respond with an error if state parameters are invalid
            setBody(`Bad Request. stateParam: ${stateParam}; zalo_auth_state: ${storedState}`);
        }
    }, [location.search]);
    
  return (
    <>
      <h1>{body}</h1>
    </>
  );
}