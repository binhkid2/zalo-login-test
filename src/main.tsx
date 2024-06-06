
import './index.css'
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import LoginPage from './pages/login/zalo';
import NoPage from './pages/noPage';
import HomePage from './pages';
import { createRoot } from 'react-dom/client';

export default function App() {
  return (
    
    <BrowserRouter>
    <Routes>
        <Route path="/" >
          <Route index element={<HomePage />} />
          <Route path="*" element={<NoPage />} />
          <Route path="/login/zalo" element={<LoginPage />} />
        
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
createRoot(document.getElementById("app")!).render(<App />);