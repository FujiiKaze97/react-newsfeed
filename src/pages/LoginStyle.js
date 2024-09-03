import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  padding: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    height: auto;
    padding: 2rem;
  }
`;

export const LeftSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f5f5f5;
  padding: 2rem;
  height: 70%;
  margin-left: 50px;
  margin-right: 50px;
  border-radius: 20px;

  @media (max-width: 768px) {
    margin-left: 0;
    margin-right: 0;
    height: auto;
    padding: 1rem;
  }
`;

export const RightSection = styled.div`
  flex: 1;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  max-width: 400px;
  height: 70%;
  margin-left: 50px;
  margin-right: 50px;
  align-items: center;

  @media (max-width: 768px) {
    margin-left: 0;
    margin-right: 0;
    height: auto;
    padding: 1rem;
    max-width: 100%;
  }
`;

export const WelcomeImage = styled.img`
  width: 150px;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    width: 100px;
  }
`;

export const WelcomeText = styled.h1`
  font-size: 2rem;
  color: #333;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

export const LoginTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1rem;
  width: 100%;

  @media (max-width: 768px) {
    margin-bottom: 0.5rem;
  }
`;

export const InputLabel = styled.div`
  font-weight: bold;
  color: #333;
  margin-bottom: 0.5rem;
  width: 100%;
  text-align: center;

  @media (max-width: 768px) {
    margin-bottom: 0.25rem;
  }
`;

export const InputForm = styled.input`
  padding: 0.5rem;
  background-color: #ffc0cb;
  border: none;
  border-radius: 4px;
  color: #333;
  width: 100%;
  max-width: 300px;
  text-align: center;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const LoginButton = styled.button`
  padding: 0.75rem;
  background-color: #4caf50;
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

export const SocialLoginLabel = styled.p`
  margin-top: 1.5rem;
  margin-bottom: 0.5rem;
  text-align: center;

  @media (max-width: 768px) {
    margin-top: 1rem;
  }
`;

export const SocialLoginButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  margin-top: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const SocialButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  background-image: url(${(props) => props.$backgroundurl});
  background-size: cover;
  background-position: center;

  @media (max-width: 768px) {
    width: 35px;
    height: 35px;
  }
`;

export const SignUpLink = styled.p`
  margin-top: 1rem;
  font-size: 0.9rem;
  color: #4caf50;
  cursor: pointer;
  text-align: center;
`;
