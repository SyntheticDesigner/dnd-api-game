import styled from "styled-components";

export const GameBoardWrapper = styled.div`
  background-color: blue;
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
  grid-template-columns: repeat(2, 100px);
  grid-template-rows: repeat(5, 100px);
  height: 532px;
  width: 328px;
  gap: 8px 128px;
  margin: auto auto;
  li{
    border: 2px solid black;
  }
`