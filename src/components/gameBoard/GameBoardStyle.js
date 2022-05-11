import styled from "styled-components";

export const GameBoardWrapper = styled.div`
  height: 100vh;
  position: absolute;
  top: 0px;
  width: 100%;
  min-width: 100vw;
  display: flex;
  align-items: center;
  p {
    background-color: green;
    height: fit-content;
  }
`;

export const Board = styled.ul`
  display: grid;
  list-style-type: none;
  grid-template-columns: repeat(2, 80px);
  grid-template-rows: repeat(5, 80px);
  gap: 8px 100px;
  margin: auto auto;
  li {
    border: 2px solid black;
    padding: 4px;
  }
`;

export const Token = styled.li`
  height: 100%;
  width: 100%;
  grid-column: ${({ x }) => `${x} / ${x + 1}`};
  grid-row: ${({ y }) => `${y} / ${y + 1}`};
  img {
    height: 100%;
  }
`;
