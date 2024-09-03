import React from 'react'; // React를 기본 가져오기
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from '../pages/Login';
import LoginAccount from '../pages/LoginAccount';
import MainNewsfeed from '../pages/MainNewsfeed';
import MainNewsfeedDetail from '../pages/MainNewsfeedDetail';
import MainNewsfeedWrite from '../pages/MainNewsfeedWrite';
import MyPage from '../pages/MyPage';
import MainNewsfeedUpdate from '../pages/MainNewsfeedUpdate';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="login" element={<Login />} />
        <Route path="loginaccount" element={<LoginAccount />} />
        <Route path="mainnewsfeed" element={<MainNewsfeed />} />
        <Route path="mainnewsfeeddetail/:id" element={<MainNewsfeedDetail />} />
        <Route path="mainnewsfeedwrite" element={<MainNewsfeedWrite />} />
        <Route path="mainnewsfeedupdate/:posting_id" element={<MainNewsfeedUpdate />} />
        <Route path="mypage" element={<MyPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
