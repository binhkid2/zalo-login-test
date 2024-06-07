import { useEffect } from "react";

function AuthPage() {
    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const isValid =
            queryParams.has("state") &&
            localStorage.getItem("zalo_auth_state") === queryParams.get("state");

        if (isValid) {
            const code = queryParams.get("code") || ""; // Provide a default value if 'code' is null
           // const codeVerifier = localStorage.getItem("zalo_code_verifier") || "";

            const data = new URLSearchParams({
                app_id: "4220696386833253137",
                code,
              //  code_verifier: codeVerifier,
                grant_type: "authorization_code"
            }).toString();

            fetch("https://oauth.zaloapp.com/v4/access_token", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: data
            })
                .then(response => response.json())
                .then(auth => {
                    localStorage.setItem("zalo_access_token", JSON.stringify({
                        access_token: auth.access_token,
                        expires_in: auth.expires_in
                    }));

                    const expr = new Date(new Date().getTime() + (3 * 30 * 24 * 60 * 60 * 1000)); // 3 months
                    document.cookie = `zalo_refresh_token=${auth.refresh_token};expires=${expr.toUTCString()};path=/refresh;domain=${window.location.hostname};secure;HttpOnly`;

                    localStorage.removeItem("zalo_auth_state");
                    localStorage.removeItem("zalo_code_verifier");

                    window.location.replace("/");
                })
                .catch(error => {
                    console.error("Error fetching the access token:", error);
                    document.body.innerHTML = `Error: ${error.message}`;
                });
        } else {
            document.body.innerHTML = "Bad Request";
        }
    }, []);

    return null; // This component doesn't render anything visible
}

export default AuthPage;
