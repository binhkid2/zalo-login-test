// components/PKCEComponent.tsx
import React, { useState, useEffect } from 'react';
import { generateCodeVerifier, generateCodeChallenge } from '../Utils/pkceUtils';

const TestPage: React.FC = () => {
  const [codeVerifier, setCodeVerifier] = useState<string>('');
  const [codeChallenge, setCodeChallenge] = useState<string>('');

  useEffect(() => {
    const generatePKCE = async () => {
      const verifier = await generateCodeVerifier();
      const challenge = await generateCodeChallenge(verifier);
      setCodeVerifier(verifier);
      setCodeChallenge(challenge);
    };

    generatePKCE();
  }, []);

  return (
    <div>
      <h1>PKCE Code Challenge Example</h1>
      <p><strong>Code Verifier:</strong> {codeVerifier}</p>
      <p><strong>Code Challenge:</strong> {codeChallenge}</p>
    
    </div>
  );
};

export default TestPage;
//https://oauth.zaloapp.com/v4/permission?app_id=4220696386833253137&redirect_uri=localhost:5173/&code_challenge=<CODE_CHALLENGE>&state=<STATE>