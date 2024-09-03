// NewsfeedStyles.js
import styled from 'styled-components';

export const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  padding: 20px;
`;

export const Card = styled.div`
  border: 1px solid black;
  border-radius: 8px;
  overflow: hidden;
  background-color: #fff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.03);
  }
`;

export const CardImage = styled.img`
  width: 100%;
  height: auto;
`;

export const CardContent = styled.div`
  padding: 10px;
`;

export const Title = styled.h1`
  font-size: 1.2em;
  margin: 0;
`;

export const Info = styled.h5`
  margin: 5px 0;
`;