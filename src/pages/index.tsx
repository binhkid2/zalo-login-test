// components/PKCEComponent.tsx
import React from 'react';

const HomePage: React.FC = () => {
 

  return (
    <div>
      <button 
        className="bg-blue-500 px-5 py-2 rounded-3xl" 
        onClick={() => { window.location.href = '/login/zalo' }}
      >
        Login with Zalo
      </button>
    </div>
  );
};

export default HomePage;
