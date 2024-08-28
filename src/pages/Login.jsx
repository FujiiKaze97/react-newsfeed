import React from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>첫 페이지 login 화면입니다.</h1>
      <br></br>
      <br></br>
      <button
        onClick={() => {
          navigate('/loginaccount');
        }}
      >
        회원가입 로직으로 이동
      </button>

      <br></br>
      <br></br>
      <button
        onClick={() => {
          navigate('/mainnewsfeed');
        }}
      >
        메인화면 로직으로 이동
      </button>
    </div>
  );
};

export default Login;
