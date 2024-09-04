import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import supabase from '../../supabase';
import {
  InputContainer,
  InputForm,
  InputLabel,
  LeftSection,
  LoginButton,
  RightSection,
  WelcomeImage,
  WelcomeText,
  Wrapper
} from './LoginStyle';

const LoginAccount = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleSignUp = async () => {
    try {
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
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <Wrapper>
        <LeftSection>
          <WelcomeImage src="https://cdn.imweb.me/upload/S20220728586c4366ae600/1b44908f5637f.png" alt="환영 이미지" />
          <WelcomeText>어서오시개!</WelcomeText>
        </LeftSection>

        <RightSection>
          <h1>회원가입 페이지 입니다</h1>
          <InputContainer>
            <InputLabel>이메일</InputLabel>

            <InputForm
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </InputContainer>

          <InputContainer>
            <InputLabel>비밀번호</InputLabel>
            <InputForm
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </InputContainer>
          <AccountButtonContainer>
            <LoginButton
              onClick={() => {
                navigate('/');
              }}
            >
              로그인
            </LoginButton>

            <AccountButton onClick={handleSignUp}>회원가입</AccountButton>
          </AccountButtonContainer>
        </RightSection>
      </Wrapper>
    </div>
  );
};

export default LoginAccount;

const AccountButton = styled.button`
  padding: 0.75rem;
  background-color: #4958ff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;
  max-width: 300px;
  text-align: center;
  height: 40px;
  align-items: center;
  margin-top: 1.5rem;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const AccountButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 300px;
  gap: 10px;
`;
