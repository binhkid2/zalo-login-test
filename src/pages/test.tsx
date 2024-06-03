// components/PKCEComponent.tsx
import React, { useState, useEffect } from 'react';
import { generateCodeVerifier, generateCodeChallenge, generateState } from '../Utils/pkceUtils';
import { useNavigate } from 'react-router-dom';

const TestPage: React.FC = () => {
  const [codeVerifier, setCodeVerifier] = useState<string>('');
  const [codeChallenge, setCodeChallenge] = useState<string>('');
  const [state, setState] = useState<string>('');

  useEffect(() => {
    const generatePKCE = async () => {
      const verifier = await generateCodeVerifier();
      const challenge = await generateCodeChallenge(verifier);
      const stateRandom= await generateState()
      setState(stateRandom)
      setCodeVerifier(verifier);
      setCodeChallenge(challenge);
    };

    generatePKCE();
  }, []);
const navigate=useNavigate()
  return (
    <div>
      <h1>PKCE Code Challenge Example</h1>
      <p><strong>State:</strong> {state}</p>
      <p><strong>Code Verifier:</strong> {codeVerifier}</p>
      <p><strong>Code Challenge:</strong> {codeChallenge}</p>
      <p><strong>Code Challenge:</strong> https://oauth.zaloapp.com/v4/permission?app_id=4220696386833253137&redirect_uri=https://zalo-login-test.vercel.app/login/zalo&code_challenge=${codeChallenge}&state=${state}</p>
      <button  className="bg-blue-500 px-5 py-2  rounded-3xl" onClick={()=>{navigate(`https://oauth.zaloapp.com/v4/permission?app_id=4220696386833253137&redirect_uri=https://zalo-login-test.vercel.app/login/zalo&code_challenge=${codeChallenge}&state=${state}`)}}>Login with Zalo </button>
   
    </div>
  );
};

export default TestPage;
