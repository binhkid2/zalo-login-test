import React, { useState, useEffect } from 'react';
import { generateCodeVerifier, generateCodeChallenge, generateState, getAccessToken } from '../../Utils/pkceUtils';

const LoginPage: React.FC = () => {
  const [authorizationCode, setAuthorizationCode] = useState<string>('');
  const [state, setState] = useState<string>('');
  const [codeVerifier, setCodeVerifier] = useState<string>('');
  const [, setCodeChallenge] = useState<string>('');
  const appId = '4220696386833253137';
  const secretKey='binh_dep_trai' //TODOOOOOOOOOOOOOOOOOOOOOOOOOOOO
  useEffect(() => {
    const initiateLogin = async () => {
      const verifier = await generateCodeVerifier();
      const challenge = await generateCodeChallenge(verifier);
      const newState = await generateState();
      
      setCodeVerifier(verifier);
      setCodeChallenge(challenge);
      setState(newState);
      
      // Construct the authorization URL with the code challenge
      const authorizationUrl = `https://oauth.zaloapp.com/v4/permission?app_id=${appId}&redirect_uri=https://zalo-login-test.vercel.app/login/zalo&code_challenge=${challenge}&state=${newState}`;

      // Redirect the user to the authorization URL
      window.location.href = authorizationUrl;
    };

    initiateLogin();
  }, []);

  useEffect(() => {
    // After being redirected back to the callback URL, retrieve the authorization code and state from the URL query parameters
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code') || '';
    const returnedState = urlParams.get('state');

    // Verify that the state parameter matches the one generated earlier
    if (returnedState === state) {
      setAuthorizationCode(code);
    } else {
      console.error('State parameter mismatch. Possible CSRF attack.');
    }
  }, [state]);

  useEffect(() => {
    // After retrieving the authorization code, exchange it for an access token
    if (authorizationCode && codeVerifier) {
      getAccessToken(authorizationCode,codeVerifier,appId,secretKey)
        .then((accessTokenData) => {
          console.log('Access token:', accessTokenData.access_token);
          console.log('Expires in:', accessTokenData.expires_in);
          // Handle successful token retrieval
        })
        .catch((error) => {
          console.error('Error fetching access token:', error);
          // Handle error
        });
    }
  }, [authorizationCode, codeVerifier]);

  return (
    <div>
      <h1>Loading...</h1>
      {/* You can display a loading indicator while the login process is in progress */}
    </div>
  );
};

export default LoginPage;
