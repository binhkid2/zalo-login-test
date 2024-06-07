import { useState } from "react";
import { useLocation } from "react-router-dom";

export default function LoginZaloPage() {
    const [body, setBody] = useState('');
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    try {
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
                localStorage.setItem("zalo_access_token", JSON.stringify({
                    access_token: auth.access_token,
                    expires_in: auth.expires_in
                }));

                const exprZaloRefreshToken = new Date(new Date().getTime() + (3 * 30 * 24 * 60 * 60 * 1000)); // 3 months
                document.cookie = `zalo_refresh_token=${auth.refresh_token};expires=${exprZaloRefreshToken.toUTCString()};path=/refresh;domain=${window.location.hostname};secure;HttpOnly`;

                localStorage.removeItem("zalo_auth_state");
                localStorage.removeItem("zalo_code_verifier");

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

    return (
        <>
            <h1>{body}</h1>
        </>
    );
}
