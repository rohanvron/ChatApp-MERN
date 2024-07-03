import { Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import SignUp from './pages/signup/SignUp';
import VerificationPage from './pages/verification/VerificationPage';
import ForgetPasswordPage from './pages/forgetPassword/ForgetPasswordPage';
import ForgetPasswordVerifyPage from './pages/forgetPasswordVerify/ForgetPasswordVerifyPage';
import ChangePasswordPage from './pages/changePassword/ChangePasswordPage';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/signup/verify-email' element={<VerificationPage />} />
        <Route path='/forget-password' element={<ForgetPasswordPage />} />
        <Route path='/forget-password-verify' element={<ForgetPasswordVerifyPage />} />
        <Route path='/change-password' element={<ChangePasswordPage />} />
      </Routes>
      <Toaster/>
    </div>
  );
}

export default App;
