import { useContext } from 'react';
import supabase from '../suparbase';
import { SessionContext } from './SessionContext';

const LogoutButton = () => {
  const { setSession } = useContext(SessionContext);

  const handleLogout = async () => {
    await supabase.auth.signOut(); // Supabase에서 로그아웃
    localStorage.removeItem('session'); // 로컬 스토리지에서 세션 삭제
    setSession(null); // session 상태를 null로 설정
  };

  return <button onClick={handleLogout}>로그아웃</button>;
};

export default LogoutButton;
