import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
<<<<<<< HEAD
import GetNewsfeed from '../components/GetNewsfeed';

const MainNewsfeed = () => {
  const navigate = useNavigate();
  GetNewsfeed('s77772005');
=======
import { SessionContext } from '../context/SessionContext';
import { UserContext } from '../context/UserContext';
import LogoutButton from '../components/LogoutButton';
import Newsfeed from '../components/Newsfeed/Newsfeed';
import NewsfeedDetail from '../components/NewsfeedDetail/NewsfeedDetail';

const MainNewsfeed = () => {
  const navigate = useNavigate();
  const { session } = useContext(SessionContext);

  const userData = useContext(UserContext);
  console.log(userData);

  useEffect(() => {
    // 만약 로그인이 안 되어있다면 로그인 페이지로 리디렉션
    if (!session) {
      navigate('/login');
    }
  }, [session, navigate]);
>>>>>>> 42cd36d3884ab0c4e9e827a272bf141eac84ac3a

  return (
    <div>
      <Newsfeed />
      <LogoutButton />
    </div>
  );
};

export default MainNewsfeed;
