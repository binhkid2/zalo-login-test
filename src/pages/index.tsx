import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { zaloAccessTokenAtom } from '../store';
import { generate_pkce_codes, generate_state_param } from '../Utils/crypto';

export default function HomePage() {
    const [zaloAccessToken, setZaloAccessToken] = useAtom(zaloAccessTokenAtom);
    const [isLogged, setIsLogged] = useState(false);
    const [userName, setUserName] = useState('');
    const [userAvatar, setUserAvatar] = useState('');
    const [userId, setUserId] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (!zaloAccessToken) {
                    const state = generate_state_param(); // for CSRF prevention
                    // Generate the code verifier and code challenge
                    const codes = generate_pkce_codes();
                    const auth_uri = `${import.meta.env.VITE_ZALO_PERMISSION_URL}?${new URLSearchParams({
                        app_id: import.meta.env.VITE_APP_ID,
                        redirect_uri: import.meta.env.VITE_APP_REDIRECT_URI,
                        code_challenge: codes.challenge,
                        state: state, // <- prevent CSRF
                    })}`;
                    window.location.replace(auth_uri);
                } else {
                    setIsLogged(true);
                    // Store the INITIAL access token in a JavaScript constant.
                    const initialToken = zaloAccessToken;
                    const user_access_token = JSON.parse(initialToken).access_token;

                    // Display information of user
                    const response = await fetch("https://graph.zalo.me/v2.0/me?fields=id,name,picture", {
                        headers: {
                            access_token: user_access_token
                        }
                    });

                    if (!response.ok) {
                        throw new Error('Failed to fetch user data');
                    }

                    const data = await response.json();

                    if (data.message.toLowerCase() === "success") {
                        setUserName(data.name);
                        setUserId(data.id);
                        setUserAvatar(data.picture.data.url);
                    } else {
                        setUserName("Unknown");
                        setUserId("Unknown");
                    }

                    setZaloAccessToken('');
                }
            } catch (error) {
                console.error('Error:', error);
                // Handle error appropriately
            }
        };

        fetchData();
    }, [zaloAccessToken, setZaloAccessToken]);

    if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") {
        return <h1>Please use a domain.</h1>;
    } else {
        return (
            <>
                {!isLogged ? (
                    <div>
                        <button
                            className="bg-blue-500 px-5 py-2 rounded-3xl"
                            onClick={() => { window.location.href = '/login/zalo' }}
                        >
                            Login with Zalo
                        </button>
                    </div>
                ) : (
                    <table style={{ border: "none", borderTop: "1px solid black" }}>
                        <tbody>
                            <tr>
                                <td>id:</td>
                                <td>{userId}</td>
                            </tr>
                            <tr>
                                <td>name:</td>
                                <td>{userName}</td>
                            </tr>
                            <tr>
                                <td>picture:</td>
                                <td><img src={userAvatar} alt="avatar" width="120" height="120" /></td>
                            </tr>
                        </tbody>
                    </table>
                )}
            </>
        );
    }
}
