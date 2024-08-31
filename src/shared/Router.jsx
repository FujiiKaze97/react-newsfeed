import React from 'react';
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
        <Route path="loginaccount" element={<LoginAccount />} />
        <Routes>
          <Route path="mainnewsfeed" element={<MainNewsfeed />} />
          <Route path="mainnewsfeeddetail" element={<MainNewsfeedDetail />} />
        </Routes>
        <Route path="mainnewsfeedwrite" element={<MainNewsfeedWrite />} />
        <Route path="mypage" element={<MyPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
