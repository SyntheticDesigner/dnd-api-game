import styled from "styled-components";

export const GameBoardWrapper = styled.div`
  height: 100vh;
  position: absolute;
  top: 0px;
  width: 100%;
  min-width: 100vw;
  display: flex;
  align-items: center;
  background-image: url(${`${process.env.PUBLIC_URL}/images/TheFightingPit.jpg`});
  background-position: center;
  background-size: cover;
  p {
    background-color: green;
    height: fit-content;
  }
`;

export const Board = styled.ul`
  position: relative;
  display: grid;
  list-style-type: none;
  grid-template-columns: repeat(6, min(14vw, 14vh));
  grid-template-rows: repeat(8, min(14vw, 14vh));
  height: fit-content;
  width: fit-content;
  /* gap: 8px 100px; */
  margin: auto auto;
`;

export const Token = styled.li`
  height: 100%;
  width: 100%;
`;
