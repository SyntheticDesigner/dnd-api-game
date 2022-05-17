import styled from "styled-components";

export const AppWrap = styled.div`
  display: grid;
  height: 100vh;
  grid-template-columns: 1fr min(100%, 560px) 1fr;
  grid-template-rows: 1fr min(100%, 720px) 1fr;
  background: blue;
  position: relative;
  @media (orientation: landscape) {
    grid-template-columns: 1fr min(100%, 720px) 1fr;
    grid-template-rows: 1fr min(100%, 560px) 1fr;
  }
  @media (min-width: 1200px) {
    @media (orientation: landscape) {
      grid-template-columns: 1fr min(100%, 900px) 1fr;
      grid-template-rows: 1fr min(100%, 700px) 1fr;
    }
  }
  #gameBoardPos {
    grid-column: 2/3;
    grid-row: 2/3;
  }
`;


