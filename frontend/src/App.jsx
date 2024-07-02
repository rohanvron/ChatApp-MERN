import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from './pages/signup/SignUp';
import Login from './pages/login/Login';
import VerificationPage from './pages/verification/VerificationPage';
import ForgetPasswordPage from './pages/forgetPassword/ForgetPasswordPage';
import ForgetPasswordVerifyPage from './pages/forgetPasswordVerify/ForgetPasswordVerifyPage';
import ChangePasswordPage from './pages/changePassword/ChangePasswordPage';
import Home from './pages/home/Home';

function App() {
  const basename = process.env.NODE_ENV === 'production' ? '/chat-app-mern' : '';
  const basePath = process.env.NODE_ENV === 'production' ? '/chat-app-mern' : '';

  return (
    <Router basename={basename}>
      <Routes>
        <Route path={`${basePath}/`} element={<Login />} />
        <Route path={`${basePath}/signup`} element={<SignUp />} />
        <Route path={`${basePath}/signup/verify-email`} element={<VerificationPage />} />
        <Route path={`${basePath}/login`} element={<Login />} />
        <Route path={`${basePath}/home`} element={<Home />} />
        <Route path={`${basePath}/forget-password`} element={<ForgetPasswordPage />} />
        <Route path={`${basePath}/forget-password-verify`} element={<ForgetPasswordVerifyPage />} />
        <Route path={`${basePath}/change-password`} element={<ChangePasswordPage />} />
      </Routes>
    </Router>
  );
}

export default App;
