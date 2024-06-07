import React, { useEffect } from "react";
import {  generate_state_param } from "../Utils/zaloOauth";
import { atomWithStorage } from "jotai/utils";
// Define interface for Zalo access token

// Create atoms for zalo_auth_state and zalo_code_verifier
const zaloAuthStateAtom = atomWithStorage('zalo_auth_state', generate_state_param());
//const zaloCodeVerifierAtom = atomWithStorage('zalo_code_verifier', generate_pkce_codes().verifier);

const IndexPage: React.FC = () => {
    useEffect(() => {
        if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") {
            document.body.innerHTML = '<h1>Please use a domain.</h1>';
        } else {
            if (!localStorage.getItem("zalo_access_token")) {
                const state = zaloAuthStateAtom; // Retrieve zalo_auth_state from the atom
              //  const verifier = zaloCodeVerifierAtom; // Retrieve zalo_code_verifier from the atom
                const authUri = `https://oauth.zaloapp.com/v4/permission?${new URLSearchParams({
                    app_id: "4220696386833253137",
                    redirect_uri: "https://zalo-login-test.vercel.app/login/zalo",
                  //  code_challenge: codes.challenge,
                    state: state,
                }.toString())}`;
                window.location.replace(authUri);
            } else {
                const initialToken = localStorage.getItem("zalo_access_token");
                alert(initialToken);
                const userAccessToken = JSON.parse(initialToken || "").access_token;
                document.getElementById("user_token")!.innerHTML = "access_token = " + JSON.parse(initialToken || "").access_token;

                fetch("https://graph.zalo.me/v2.0/me?fields=id,name,picture",
                    {
                        headers: {
                            access_token: userAccessToken
                        }
                }).then(response => response.json())
                .then(data => {
                    let userInfo = "";
                    if (data.message.toLowerCase() === "success") {
                        userInfo = `<table style="border:none;border-top:1px solid black;">
                                        <tr>
                                            <td>id:</td>
                                            <td>${data.id}<td>
                                        </tr>
                                        <tr>
                                            <td>name:</td>
                                            <td>${data.name}</td>
                                        </tr>
                                        <tr>
                                            <td>picture:</td>
                                            <td><img src="${data.picture.data.url}" alt="avatar" width="120" height="120"></td>
                                        </tr>
                                    </table>`;
                    } else {
                        userInfo = "Cannot get user info";
                    }
                    document.getElementById("user_info")!.innerHTML = userInfo;
                });
                
                localStorage.removeItem("zalo_access_token");
            }
        }
    }, []);

    return (
        <>
        User info
            <div id="user_token"></div>
            <div id="user_info" style={{ marginTop: "20px" }}></div>
        </>
    );
}

export default IndexPage;