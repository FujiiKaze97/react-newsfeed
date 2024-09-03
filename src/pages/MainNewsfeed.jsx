import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SessionContext } from '../context/SessionContext';
import Newsfeed from '../components/Newsfeed/Newsfeed';

const MainNewsfeed = () => {
  const navigate = useNavigate();
  const { session } = useContext(SessionContext);

  useEffect(() => {
    // 만약 로그인이 안 되어있다면 로그인 페이지로 리디렉션
    if (!session) {
      navigate('/login');
    }
  }, [session, navigate]);

  return (
    <div>
      <Newsfeed />
    </div>
  );
};

export default MainNewsfeed;
