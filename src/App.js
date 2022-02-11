import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from 'components/display/Header';
import HomeScreen from 'screens/home';
import PostScreen from 'screens/post';
import LastestScreen from 'screens/lastest';
import CateScreen from 'screens/cate';
import SearchScreen from 'screens/search';
import LoginScreen from 'screens/login';
import SignupScreen from 'screens/signup';
import VerifyEmailScreen from 'screens/verifyEmail';
import MyAccountScreen from 'screens/myAccount';
import ForgotPasswordScreen from 'screens/forgotPassword';
import ResetPasswordScreen from 'screens/resetPassword';
import NotFound from 'components/display/NotFound';

function App() {
  return (
    <BrowserRouter>
      <Header/>
      <div className='body-container'>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/post/:articleSlug" element={<PostScreen />} />
          <Route path="/lastest" element={<LastestScreen />} />
          <Route path="/cate/:cateSlug" element={<CateScreen />} />
          <Route path="/search" element={<SearchScreen />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/sign-up" element={<SignupScreen />} />
          <Route path="/verify-email" element={<VerifyEmailScreen />} />
          <Route path="/my-account" element={<MyAccountScreen />} />
          <Route path="/forgot-password" element={<ForgotPasswordScreen />} />
          <Route path="/reset-password" element={<ResetPasswordScreen />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
