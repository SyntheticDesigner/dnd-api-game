import styled from "styled-components";

export const GameBoardWrapper = styled.div`
  height: 100%;
  width: 100%;

  display: flex;
  align-items: center;
  //background for map
  background-image: url(${`${process.env.PUBLIC_URL}/images/TheFightingPit_port.jpg`});
  background-position: center;
  background-size: cover;
  margin: auto;

  @media (orientation: landscape) {
    background-image: url(${`${process.env.PUBLIC_URL}/images/TheFightingPit_land.jpg`});
  }
`;

export const Board = styled.ul`
  position: relative;
  display: grid;
  list-style-type: none;
  grid-template-columns: repeat(auto-fill, 60px);
  grid-template-rows: repeat(auto-fill, 60px);
  height: 68%;
  width: 61%;
  min-width: 240px;
  min-height: 420px;
  margin: auto auto;
  @media (orientation: landscape) {
    height: 61%;
    width: 68%;
    min-width: 420px;
    min-height: 240px;
  }
`;

export const Token = styled.li`
  height: 100%;
  width: 100%;
`;


