import React, { useEffect } from 'react';

const LoginPage: React.FC = () => {
    useEffect(() => {
        // CSRF prevention
        const searchParams = new URLSearchParams(window.location.search);
        const isValid =
            searchParams.has('state') &&
            localStorage.getItem('zalo_auth_state') === searchParams.get('state');

        if (isValid) {
            // Obtain the Access Token by performing a POST request to the Access Token URL
            const data = new URLSearchParams({
                app_id: import.meta.env.APP_ID || '', // Assuming you have environment variables setup
                code: searchParams.get('code') || '',
                code_verifier: localStorage.getItem('zalo_code_verifier') || '',
                grant_type: 'authorization_code'
            }).toString();

            fetch(import.meta.env.ZALO_ACCESS_TOKEN_URL || '', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: data
            })
            .then(response => response.json())
            .then(auth => {
                // store the Access Token in localStorage
                localStorage.setItem('zalo_access_token', JSON.stringify({
                    access_token: auth.access_token,
                    expires_in: auth.expires_in
                }));
                // store the Refresh Token in a secured HTTP only cookie
                const expr = new Date(new Date().getTime() + (3 * 30 * 24 * 60 * 60 * 1000)); // 3 months?
                document.cookie = `zalo_refresh_token=${auth.refresh_token};expires=${expr.toUTCString()};path=/refresh;domain=${window.location.hostname};secure;HttpOnly`;
                // clean up the one-time-use state variables
                localStorage.removeItem('zalo_auth_state');
                localStorage.removeItem('zalo_code_verifier');
                // Go back to index.html
                window.location.replace('index.html');
            });
        } else {
            // Otherwise response an error
            document.body.innerHTML = 'Bad Request';
        }
    }, []);

    return <></>; // or any UI you want to show during the loading process
};

export default LoginPage;
