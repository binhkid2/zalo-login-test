import React, { useEffect } from "react";
import { generate_pkce_codes, generate_state_param } from "../Utils/crypto";

const IndexPage: React.FC = () => {
  useEffect(() => {
    ///// Authentication Process /////
    if (
      window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1"
    ) {
      document.body.innerHTML = "<h1>Please use a domain.</h1>";
    } else {
      if (!localStorage.getItem("zalo_access_token")) {
        const state = generate_state_param(); // for CSRF prevention
        // Generate the code verifier and code challenge
        const codes = generate_pkce_codes();
        // Get the current website URL
        let currentUrl = window.location.origin;

        // Remove any trailing slashes
        currentUrl = currentUrl.replace(/\/+$/, "");

        // Construct the redirect URI
        const redirect_uri = `${currentUrl}/login/zalo`;
        // Store the request state to be checked in auth.html
        localStorage.setItem("zalo_auth_state", state);
        // Store the code verifier to be used in auth.html
        localStorage.setItem("zalo_code_verifier", codes.verifier);
        const authUri = `${
          import.meta.env.ZALO_PERMISSION_URL
        }?${new URLSearchParams({
          app_id: import.meta.env.APP_ID || "",
          redirect_uri: redirect_uri,
          code_challenge: codes.challenge,
          state: state, // <- prevent CSRF
        }).toString()}`;
        window.location.replace(authUri);
      } else {
        // Store the INITIAL access token in a JavaScript constant.
        const initialToken = localStorage.getItem("zalo_access_token");
        alert(initialToken);
        const userAccessToken = JSON.parse(initialToken || "").access_token;
        document.getElementById("user_token")!.innerHTML =
          "access_token = " + userAccessToken;

        // Display information of user
        fetch("https://graph.zalo.me/v2.0/me?fields=id,name,picture", {
          headers: {
            access_token: userAccessToken,
          },
        })
          .then((response) => response.json())
          .then((data) => {
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

        // Remove the access token in localStorage
        localStorage.removeItem("zalo_access_token");
      }
    }
  }, []);

  return (
    <>
      <div id="user_token"></div>
      <div id="user_info" style={{ marginTop: "20px" }}></div>
    </>
  );
};

export default IndexPage;
