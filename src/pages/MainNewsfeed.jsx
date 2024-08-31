import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SessionContext } from '../context/SessionContext';
import LogoutButton from '../components/LogoutButton';

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
      <h1>허허 메인화면 이올시다.</h1>
      <br></br>
      <br></br>
      <button
        onClick={() => {
          navigate('/mainnewsfeeddetail');
        }}
      >
        메인화면 자세한 상세페이지 뉴스피드 클릭 이동
      </button>

      <br></br>
      <br></br>

      <button
        onClick={() => {
          navigate('/mainnewsfeedwrite');
        }}
      >
        메인화면 뉴스피드 작성 페이지로 이동 이미지 등록되야합니다
      </button>
      <br></br>
      <br></br>
      <button
        onClick={() => {
          navigate('/mainnewsfeedwrite');
        }}
      >
        마이페이지로 이동
      </button>
      <LogoutButton />
    </div>
  );
};

export default MainNewsfeed;
