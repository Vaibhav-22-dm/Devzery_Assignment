import './App.css';
import { Route, Routes } from "react-router-dom"
import Registration from './pages/registration/Registration';
import Login from './pages/login/Login';
import Dashboard from './pages/dashboard/Dashboard';
import ResetPassword from './pages/reset_password/ResetPassword';

function App() {
  return (
    <>

      <Routes>
        <Route path="/" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/reset_password" element={<ResetPassword />} />
        <Route path="/reset_password/:uidb64/:token" element={<ResetPassword />} />
      </Routes>
    </>
  );
}

export default App;
