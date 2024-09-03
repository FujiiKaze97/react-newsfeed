import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../../supabase';
import { SessionContext } from '../context/SessionContext';

import {
  Wrapper,
  LeftSection,
  WelcomeImage,
  WelcomeText,
  RightSection,
  LoginTitle,
  InputContainer,
  InputLable,
  InputForm,
  LoginButton,
  SocialLoginButtons,
  SocialButton,
  SignUpLink
} from './LoginStyle';

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
  const handleLogin = async (value) => {
    try {
      if (value === 'email') {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: email,
          password: password
        });

        if (error) {
          // 오류가 발생하면 알림을 표시합니다.
          alert('로그인에 실패했습니다. 다시 시도해주세요.');
        } else if (data) {
          setSession(data.session);
          navigate('/mainnewsfeed');
        }
      } else {
        const { data, error } = await supabase.auth.signInWithOAuth({
          provider: value //  OAuth 프로바이더 사용
        });

        if (error) {
          // 오류가 발생하면 알림을 표시합니다.
          alert(value + '로그인에 실패했습니다. 다시 시도해주세요.');
        } else {
          navigate('/mainnewfeed');
        }
      }
    } catch (e) {
      console.log(e);
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

            <LoginButton onClick={() => handleLogin('email')}>로그인</LoginButton>
          </InputContainer>

          <SocialLoginButtons>
            {/* GitHub로 로그인하는 버튼 */}
            <SocialButton
              $backgroundurl="https://cdn.pixabay.com/photo/2022/01/30/13/33/github-6980894_640.png"
              onClick={() => {
                handleLogin('github');
              }}
            ></SocialButton>
            <SocialButton
              $backgroundurl="https://w7.pngwing.com/pngs/506/509/png-transparent-google-company-text-logo.png"
              onClick={() => {
                handleLogin('google');
              }}
            ></SocialButton>
            <SocialButton
              $backgroundurl="https://yt3.googleusercontent.com/p5o0NE0QoIMjlIiX6S1E5xIULBtlS5bKhoFAv4LdOvp6i2yVvMOFFgV2hNW4YGKRRm-73Qz_=s900-c-k-c0x00ffffff-no-rj"
              onClick={() => {
                handleLogin('zoom');
              }}
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
