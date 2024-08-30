import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../../suparbase';
import styled from 'styled-components';

const Login = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

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

  return (
    <>
      <InputSection>
        <h1>첫 페이지 login 화면입니다.</h1>
        <br></br>
        <br></br>
        <InputLable>이메일</InputLable>
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <InputLable>비밀번호</InputLable>
        <input
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </InputSection>

      {/* 회원가입 페이지로 이동하는 버튼 */}
      <button
        onClick={() => {
          navigate('/loginaccount');
        }}
      >
        회원가입 로직으로 이동
      </button>

      <br></br>
      <br></br>
      <button onClick={handleLogin}>login(메인화면 로직으로 이동)</button>

      <br></br>
      <br></br>

      {/* GitHub로 로그인하는 버튼 */}
      <button onClick={handleGithubLogin}>GitHub로 로그인</button>
    </>
  );
};

export default Login;

const InputSection = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  margin: 0 auto;
`;

const InputLable = styled.div``;

const InputForm = styled.input``;
