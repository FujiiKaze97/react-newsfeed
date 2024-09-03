import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1200px; /* 컨테이너 최대 너비 조정 */
  margin: 0 auto;
  padding: 20px;

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

export const ButtonContainer = styled.div`
  position: fixed;
  transform: translateY(0%); /* 버튼의 높이를 기준으로 중앙 맞춤 */
  z-index: 1000; /* 버튼이 다른 요소 위에 오도록 보장 */
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 10px; /* 버튼 사이의 간격 */
  margin-bottom: 20px; /* 버튼과 카드 사이의 간격 */
  width: 95%;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const Button = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 15px;
  padding: 5px 10px;
  font-size: 10px;
  cursor: pointer;
  margin-right: 20px;
  height: 30px;
  background-color: #343a40;
  &:hover {
    background-color: #808080;
  }
`;

export const CenterButton = styled.button`
  position: absolute;
  left: 47%;
  transform: translateX(-30%); /* 중앙으로 이동 */
  transform: translateY(-40%);
  background-image: url('/dog.png');
  background-size: cover;
  width: 100px;
  height: 100px;
  cursor: pointer;
`;

export const TextLink = styled.span`
  color: #007bff;
  font-size: 24px;
  font-weight: bold;
  cursor: pointer;
  text-decoration: underline;

  &:hover {
    color: #0056b3;
  }
`;

export const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  width: 100%;
  padding-top: 60px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(100%, 1fr));
  }
`;

export const Card = styled.div`
  width: 100%;
  max-width: 100%; /* 카드의 최대 너비를 100%로 설정 */
  height: 400px; /* 카드의 고정 높이 조정 */
  border: 1px solid #e0e0e0;
  overflow: hidden;
  background-color: #fff;
  cursor: pointer;
  transition: transform 0.2s;
  display: flex;
  flex-direction: column;

  &:hover {
    transform: scale(1.03);
  }
`;

export const CardImage = styled.img`
  width: 100%;
  height: 50%; /* 이미지의 고정 높이 조정 */
  object-fit: cover; /* 이미지가 카드에 맞게 잘림 */
`;

export const CardContent = styled.div`
  padding: 15px;
  flex: 1; /* 카드 내용이 이미지 아래에서 남은 공간을 채우도록 */
  display: flex;
  flex-direction: column;
`;

export const Title = styled.h1`
  font-size: 1.5em;
  margin: 0;
  border-bottom: 2px solid #f0f0f0; /* 제목 아래에 구분선 추가 */
  padding-bottom: 10px;
`;

export const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex: 1; /* 내용이 남은 공간을 채우도록 */
`;

export const InfoBlock = styled.div`
  border-bottom: 1px solid #f0f0f0; /* 구분선 추가 */
  padding-bottom: 10px;
`;

export const Info = styled.h5`
  margin: 0;
  color: #555; /* 텍스트 색상 조정 */
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap; /* 줄바꿈 방지 */
`;
export const AddButton = styled.button`
  cursor: pointer;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #f1a121;
  color: white;
  margin-left: auto;
  font-size: 20px;
  font-weight: 700;
  padding-bottom: 10;

  /* 하단에 붙어있게 */
  position: fixed;
  bottom: 50px;
  right: 50px;
  justify-content: center;
  text-align: center;
`;
