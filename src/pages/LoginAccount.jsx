import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import supabase from '../../suparbase';

const LoginAccount = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleSignUp = async () => {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password
    });

    if (error) {
      alert(error.message);
    } else {
      alert('축하합니다. 회원가입에 성공했습니다.');
      navigate('/');
    }
  };
  return (
    <div>
      <h1>회원가입 페이지 입니다</h1>
      <InputSection>
        <input
          type="email"
          placeholder="이메일입력"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="비밀번호입력"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </InputSection>
      <button
        onClick={() => {
          navigate('/');
        }}
      >
        로그인
      </button>
      <button onClick={handleSignUp}>회원가입</button>
    </div>
  );
};

export default LoginAccount;

const InputSection = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  margin: 0 auto;
`;
