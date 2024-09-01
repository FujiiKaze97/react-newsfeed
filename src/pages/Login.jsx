import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../../suparbase';
import styled from 'styled-components';
import { SessionContext } from '../context/SessionContext';

const Login = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const { session, setSession } = useContext(SessionContext);

  useEffect(() => {
    const handlePopState = () => {
      if (window.location.pathname !== '/') {
        navigate('/'); // 현재 경로가 '/'가 아닐 때만 이동
      }
    };

    window.addEventListener('popstate', handlePopState); // 이벤트 리스너 추가

    return () => {
      window.removeEventListener('popstate', handlePopState); // 컴포넌트 언마운트 시 리스너 제거
    };
  }, [navigate]);

  useEffect(() => {
    // 컴포넌트가 마운트될 때 세션을 확인하여 로그인 상태를 업데이트
    const checkSession = async () => {
      const {
        data: { session }
      } = await supabase.auth.getSession();
      if (session) {
        setSession(session); // 세션이 있으면 상태에 반영
        navigate('/mainnewsfeed'); // 로그인된 상태면 메인 피드로 이동
      }
    };

    checkSession(); // 세션 확인 호출
  }, [navigate, setSession]);

  // 이메일로 로그인 하는 함수
  const handleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password
    });
    if (error) {
      alert('아이디와 비밀번호를 다시 확인해주세요');
    } else {
      navigate('/mainnewsfeed');
    }
  };

  // GitHub로 로그인하는 함수
  const handleGithubLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'github' // GitHub OAuth 프로바이더 사용
    });

    if (error) {
      // 오류가 발생하면 알림을 표시합니다.
      alert('GitHub 로그인에 실패했습니다. 다시 시도해주세요.');
    } else {
      // 성공하면 메인 뉴스 피드 페이지로 이동합니다.
      navigate('/mainnewsfeed');
    }
  };

  // Google로 로그인하는 함수
  const handleGoogleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google'
    });

    if (error) {
      // 오류가 발생하면 알림을 표시합니다.
      alert('GooGle 로그인에 실패했습니다. 다시 시도해주세요.');
    } else {
      // 성공하면 메인 뉴스 피드 페이지로 이동합니다.
      navigate('/mainnewsfeed');
    }
  };

  // Zoom으로 로그인하는 함수
  const handleZoomLogin = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'zoom'
    });

    if (error) {
      // 오류가 발생하면 알림을 표시합니다.
      alert('Zoom 로그인에 실패했습니다. 다시 시도해주세요.');
    } else {
      // 성공하면 메인 뉴스 피드 페이지로 이동합니다.
      navigate('/mainnewsfeed');
    }
  };

  return (
    <>
      <Wrapper>
        <LeftSection>
          <WelcomeImage src="https://cdn.imweb.me/upload/S20220728586c4366ae600/1b44908f5637f.png" alt="환영 이미지" />
          <WelcomeText>어서오시개!</WelcomeText>
        </LeftSection>

        <RightSection>
          <LoginTitle>login</LoginTitle>

          <InputContainer>
            <InputLable>이메일</InputLable>

            <InputForm
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </InputContainer>

          <InputContainer>
            <InputLable>비밀번호</InputLable>
            <InputForm
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />

            <LoginButton onClick={handleLogin}>로그인</LoginButton>
          </InputContainer>

          <SocialLoginLabel>소셜 계정으로 로그인</SocialLoginLabel>
          <SocialLoginButtons>
            {/* GitHub로 로그인하는 버튼 */}
            <SocialButton
              backgroundUrl="https://cdn.pixabay.com/photo/2022/01/30/13/33/github-6980894_640.png"
              onClick={handleGithubLogin}
            ></SocialButton>
            <SocialButton
              backgroundUrl="https://w7.pngwing.com/pngs/506/509/png-transparent-google-company-text-logo.png"
              onClick={handleGoogleLogin}
            ></SocialButton>
            <SocialButton
              backgroundUrl="https://cdn.icon-icons.com/icons2/2429/PNG/512/zoom_logo_icon_147196.png"
              onClick={handleZoomLogin}
            ></SocialButton>
          </SocialLoginButtons>

          {/* 회원가입 페이지로 이동하는 버튼 */}
          <SignUpLink onClick={() => navigate('/loginaccount')}>아직 회원이 아니신가요? 회원가입</SignUpLink>
        </RightSection>
      </Wrapper>
    </>
  );
};
export default Login;

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
`;

const LeftSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f5f5f5;
  padding: 2rem;
  margin-left: 100px;
  height: 70%;
`;

const RightSection = styled.div`
  flex: 1;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 300px;
  height: 70%;
  margin-right: 100px;
`;

const WelcomeImage = styled.img`
  width: 150px;
  margin-bottom: 1rem;
`;

const WelcomeText = styled.h1`
  font-size: 2rem;
  color: #333;
`;

const LoginTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 1rem;
`;

const InputLable = styled.div`
  flex: 0 0 100px; // 라벨의 너비를 고정
  font-weight: bold;
  color: #333;
`;

const InputForm = styled.input`
  padding: 0.5rem;
  background-color: #ffc0cb; // 연한 분홍색 배경
  border: none;
  border-radius: 4px;
  color: #333;
  width: 30%;
`;

const LoginButton = styled.button`
  padding: 0.75rem;
  margin-top: 1rem;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 20%;
  text-align: center;
  margin-left: 100px;
  height: 40px;
`;

const SocialLoginLabel = styled.p`
  margin-top: 1.5rem;
  margin-bottom: 0.5rem;
`;

const SocialLoginButtons = styled.div`
  display: flex;
  /* justify-content: space-around; */
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const SocialButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  // 추가 스타일 필요 시 여기에 추가
  background-image: url(${(props) => props.backgroundUrl});
  background-size: cover;
  background-position: center;
`;

const SignUpLink = styled.p`
  margin-top: 1rem;
  font-size: 0.9rem;
  color: #4caf50;
  cursor: pointer;
  text-align: center;
`;
