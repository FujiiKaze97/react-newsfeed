import { React } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from '../pages/Login';
import LoginAccount from '../pages/LoginAccount';
import MainNewsfeed from '../pages/MainNewsfeed';
import MainNewsfeedDetail from '../pages/MainNewsfeedDetail';
import MainNewsfeedWrite from '../pages/MainNewsfeedWrite';
import MyPage from '../pages/MyPage';

const Router = () => {

  return (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
<<<<<<< HEAD
            <Route path="login" element={<Login />} />
            <Route path="loginaccount" element={<LoginAccount />} />
            <Route path="mainnewsfeed" element={<MainNewsfeed />} />
            <Route path="mainnewsfeeddetail/:id" element={<MainNewsfeedDetail />} />
            <Route path="mainnewsfeedwrite" element={<MainNewsfeedWrite />} />
            <Route path="mypage" element={<MyPage />} />
=======
            <Route path="/login" element={<Login />} />
            <Route path="/loginaccount" element={<LoginAccount />} />
            <Route path="/mainnewsfeed" element={<MainNewsfeed />} />
            <Route path="/mainnewsfeeddetail/:id" element={<MainNewsfeedDetail />} />
            <Route path="/mainnewsfeedwrite" element={<MainNewsfeedWrite />} />
            <Route path="/mypage" element={<MyPage />} />
>>>>>>> 6ae3ca23cbae8f1d2b834d7239ff61da47e76020
          </Routes>
        </BrowserRouter>
  );
};

export default Router;
