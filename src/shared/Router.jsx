import { React } from 'react';
import { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { SessionContext } from '../context/SessionContext';
import { UserContext } from '../context/UserContext';
import Login from '../pages/Login';
import LoginAccount from '../pages/LoginAccount';
import MainNewsfeed from '../pages/MainNewsfeed';
import MainNewsfeedDetail from '../pages/MainNewsfeedDetail';
import MainNewsfeedWrite from '../pages/MainNewsfeedWrite';
import MyPage from '../pages/MyPage';

const Router = () => {
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (session) {
      // 세션이 있으면 사용자 정보를 가져와서 설정
      setUser({
        id: session.user.id
        // 필요한 다른 사용자 정보들
      });
    }
  }, [session]);

  return (
    <SessionContext.Provider value={{ session, setSession }}>
      <UserContext.Provider value={session?.user?.id || null}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="login" element={<Login />} />
            <Route path="loginaccount" element={<LoginAccount />} />
            <Route path="mainnewsfeed" element={<MainNewsfeed />} />
            <Route path="mainnewsfeeddetail" element={<MainNewsfeedDetail />} />
            <Route path="mainnewsfeedwrite" element={<MainNewsfeedWrite />} />
            <Route path="mypage" element={<MyPage />} />
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </SessionContext.Provider>
  );
};

export default Router;
