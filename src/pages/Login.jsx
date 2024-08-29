import React, { useState } from 'react';
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
      navigate('/loginaccount');
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
