import { useContext } from 'react';
import supabase from '../../suparbase';
import { SessionContext } from '../context/SessionContext';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
  const navigate = useNavigate();
  const { setSession } = useContext(SessionContext);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut(); // Supabase에서 로그아웃
      localStorage.removeItem('session'); // 로컬 스토리지에서 세션 삭제
      setSession(null); // session 상태를 null로 설정
      navigate('/');
    } catch (error) {
      console.error('로그아웃 중 오류가 발생했습니다:', error); // 오류가 발생하면 콘솔에 출력
    }
  };
  return <button onClick={handleLogout}>로그아웃</button>;
};

export default LogoutButton;
