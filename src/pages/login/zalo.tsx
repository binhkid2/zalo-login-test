import { useLocation } from 'react-router-dom';

export default function ZaloLoginCallBack() {
    const location = useLocation();
  const params = new URLSearchParams(location.search);

  const code = params.get('code');
  const state = params.get('state');
  const codeChallenge = params.get('code_challenge');
  
    return (
    <>
     <div>Code: {code}</div>
      <div>State: {state}</div>
      <div>Code Challenge: {codeChallenge}</div>  
    </>
  );
}