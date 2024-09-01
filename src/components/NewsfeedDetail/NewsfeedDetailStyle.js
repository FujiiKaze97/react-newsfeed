import styled from "styled-components";

export const Card = styled.div`
  border: 1px solid rgb(221, 221, 221);
  background-color: rgb(255, 255, 255);
  border-radius: 10px;
  overflow: hidden;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 8px;
  text-align: center;
  padding: 10px;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  &:hover {
    transform: scale(1.05) translateY(-10px);
    transition: 0.3s;
  }
`;

export const CardImg = styled.img`
  width: 100px;
  height: 100px;
`;

export const CardInfo = styled.div`
  margin-top: 10px;
`;

export const CardPokeName = styled.p`
  font-size: 24px;
  font-weight: bold;
  margin: 5px 0px;
  color: black;
`;
export const CardPokeId = styled.p`
  font-size: 24px;
  color: rgb(102, 102, 102);
`;
