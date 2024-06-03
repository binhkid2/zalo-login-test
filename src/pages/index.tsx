import { useNavigate } from "react-router-dom";

export default function Home() {
    const navigate=useNavigate()
  return (
    <>
      <p onClick={()=>(navigate('/no-auth'))}>no-auth</p>
      <p onClick={()=>(navigate('/ai-image'))}>ai-image</p>
<button  className="bg-blue-500 px-5 py-2  rounded-3xl">Login with Zalo </button>
    </>
  );
}