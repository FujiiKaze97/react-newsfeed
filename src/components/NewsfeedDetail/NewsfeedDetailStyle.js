import styled from 'styled-components';

export const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 20px;
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const TextContainter = styled.div`
  display: flex;
  justify-content: right;
  gap: 10px;
  margin-bottom: 20px;
  width: 50%;
  color: #a0a0a0;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const Button = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

export const CardContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 100px;
`;

export const Card = styled.div`
  width: 100%;
  max-width: 600px;
  height: auto;
  border: 1px solid #e0e0e0;
  overflow: hidden;
  background-color: #fff;
  transition: transform 0.2s;
  display: flex;
  flex-direction: column;
`;

export const CardImage = styled.img`
  width: 100%;
  height: 70%;
  object-fit: cover;
`;

export const CardContent = styled.div`
  padding: 15px;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const Title = styled.h1`
  font-size: 1.5em;
  margin: 0;
  border-bottom: 2px solid #f0f0f0;
  padding-bottom: 10px;
`;

export const Info = styled.h5`
  margin: 0;
  color: #555;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const CommentContainer = styled.div`
  width: 80%;
  max-width: 800px;
  margin-top: 50px;
`;

export const CommentForm = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;

  textarea {
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 4px;
    border: 1px solid #ddd;
    box-sizing: border-box;
  }

  button {
    align-self: flex-end;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;

    &:hover {
      background-color: #0056b3;
    }
  }
`;

export const CommentList = styled.div`
  border-top: 1px solid #ddd;
  padding-top: 10px;
`;

export const CommentItem = styled.div`
  margin-bottom: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid #ddd;

  p {
    margin: 5px 0;
  }
`;

export const CommentHeader = styled.h3`
  font-size: 1.5rem;
  color: #333;
  border-bottom: 2px solid #ccc;
  padding-bottom: 0.5rem;
  margin-bottom: 1rem;
  font-weight: bold;
`;
