import { useAtom } from "jotai";
import { zaloAccessTokenAtom, zaloAuthStateAtom, zaloCodeVerifierAtom } from '../../../store';
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function LoginPage() {
    const navigate = useNavigate();
    const [body, setBody] = useState('');
    const [, setZaloAccessToken] = useAtom(zaloAccessTokenAtom);
    const [zaloCodeVerifier, setZaloCodeVerifier] = useAtom(zaloCodeVerifierAtom);
    const [zaloAuthState, setZaloAuthState] = useAtom(zaloAuthStateAtom);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const isValid = new URLSearchParams(window.location.search).has("state") &&
                    zaloAuthState === new URLSearchParams(window.location.search).get("state");

                if (isValid) {
                    const code = new URLSearchParams(window.location.search).get("code") ?? '';

                    const data = new URLSearchParams({
                        app_id: import.meta.env.VITE_APP_ID,
                        code,
                        code_verifier: zaloCodeVerifier,
                        grant_type: "authorization_code"
                    }).toString();

                    const response = await fetch(import.meta.env.VITE_ZALO_ACCESS_TOKEN_URL, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        },
                        body: data
                    });

                    if (!response.ok) {
                        throw new Error('Failed to fetch access token');
                    }

                    const auth = await response.json();

                    setZaloAccessToken(JSON.stringify({
                        access_token: auth.access_token,
                        expires_in: auth.expires_in
                    }));

                    const expr = new Date(new Date().getTime() + (3 * 30 * 24 * 60 * 60 * 1000)); // 3 months?
                    document.cookie = `zalo_refresh_token=${auth.refresh_token};expires=${expr.toUTCString()};path=/refresh;domain=${window.location.hostname};secure;HttpOnly`;

                    setZaloCodeVerifier('');
                    setZaloAuthState('');
                    navigate('/');
                } else {
                    setBody('Bad Request');
                }
            } catch (error) {
                console.error('Error:', error);
                setBody('An error occurred. Please try again later.');
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <p>{body}</p>
        </>
    );
}
