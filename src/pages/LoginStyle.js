import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
`;

export const LeftSection = styled.div`
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

export const RightSection = styled.div`
  flex: 1;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 300px;
  height: 70%;
  margin-right: 100px;
`;

export const WelcomeImage = styled.img`
  width: 150px;
  margin-bottom: 1rem;
`;

export const WelcomeText = styled.h1`
  font-size: 2rem;
  color: #333;
`;

export const LoginTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 1rem;
`;

export const InputLable = styled.div`
  flex: 0 0 100px; // 라벨의 너비를 고정
  font-weight: bold;
  color: #333;
`;

export const InputForm = styled.input`
  padding: 0.5rem;
  background-color: #ffc0cb; // 연한 분홍색 배경
  border: none;
  border-radius: 4px;
  color: #333;
  width: 30%;
`;

export const LoginButton = styled.button`
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

export const SocialLoginLabel = styled.p`
  margin-top: 1.5rem;
  margin-bottom: 0.5rem;
`;

export const SocialLoginButtons = styled.div`
  display: flex;
  /* justify-content: space-around; */
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

export const SocialButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  // 추가 스타일 필요 시 여기에 추가
  background-image: url(${(props) => props.$backgroundurl});
  background-size: cover;
  background-position: center;
`;

export const SignUpLink = styled.p`
  margin-top: 1rem;
  font-size: 0.9rem;
  color: #4caf50;
  cursor: pointer;
  text-align: center;
`;
