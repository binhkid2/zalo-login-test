import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { zalo_code_verifierAtom,zalo_auth_stateAtom } from "../../../store";

export default function LoginZaloPage() {
    const [zalo_code_verifier,setZalo_code_verifier]=useAtom(zalo_code_verifierAtom)
    const [zalo_auth_state,setZalo_auth_state]=useAtom(zalo_auth_stateAtom)
    const [body,setBody]= useState('')
    useEffect(() => {
       // CSRF prevention
       const searchParams = new URLSearchParams(window.location.search);
       const isValid =
           searchParams.has('state') &&
           zalo_auth_state === searchParams.get('state');

         if (isValid) {
             // Obtain the Access Token by performing a POST request to the Access Token URL
             const data = new URLSearchParams({
                app_id: import.meta.env.VITE_APP_ID || '', // Assuming you have environment variables setup
                code: searchParams.get('code') || '',
                code_verifier: zalo_code_verifier || '',
                grant_type: 'authorization_code'
            }).toString();
            
 
             fetch(import.meta.env.ZALO_ACCESS_TOKEN_URL, {
                 method: 'POST',
                 headers: {
                     'Content-Type': 'application/x-www-form-urlencoded'
                 },
                 body: data
             }).then(response => response.json())
             .then(auth => {
                 // store the Access Token in localStorage
                const zaloAccessToken =  JSON.stringify({
                     access_token: auth.access_token,
                     expires_in: auth.expires_in
                 });
                  // store the zaloAccessToken in a secured HTTP only cookie
                  const exprZaloAccessToken = new Date(new Date().getTime() + (1 * 60 * 60 * 1000)); //1 hour
                  document.cookie = `zalo_access_token=${zaloAccessToken};expires=${exprZaloAccessToken.toUTCString()};path=/refresh;domain=${window.location.hostname};secure;HttpOnly`;
                 // store the Refresh Token in a secured HTTP only cookie
                 const exprZaloRefreshToken = new Date(new Date().getTime() + (3 * 30 * 24 * 60 * 60 * 1000)); // 3 months?
                 document.cookie = `zalo_refresh_token=${auth.refresh_token};expires=${exprZaloRefreshToken.toUTCString()};path=/refresh;domain=${window.location.hostname};secure;HttpOnly`;
                 // clean up the one-time-use state variables

                 setZalo_code_verifier(null);
                 setZalo_auth_state(null);
                 //Authenticated. Go to page wou want
                 window.location.replace('/dashboard');
             });
         } else {
             // Otherwise response an error
             setBody('Bad Request')
         }
      }, []);
  return (
    <>
      <h1>{body}</h1>
    </>
  );
}