import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SessionContext } from '../context/SessionContext';
import LogoutButton from '../components/LogoutButton';
import Newsfeed from '../components/Newsfeed/Newsfeed';
import NewsfeedDetail from '../components/NewsfeedDetail/NewsfeedDetail';

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
      <LogoutButton />
    </div>
  );
};

export default MainNewsfeed;
