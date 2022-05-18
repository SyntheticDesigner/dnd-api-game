import styled from "styled-components";

export const AppWrap = styled.div`
  display: grid;
  height: 100vh;
  grid-template-columns: 1fr min(100%, 560px) 1fr;
  grid-template-rows: 1fr min(100%, 720px) 1fr;
  background: linear-gradient(
      180deg,
      #bf953f -65.02%,
      #fcf6ba -26.35%,
      #b38728 20.06%,
      #fbf5b7 63.88%,
      #aa771c 99.98%
    ),
    #595959;
  position: relative;
  z-index: 0;
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
  &::before {
    content: "";
    height: calc(100% - 4px);
    width: calc(100% - 4px);
    position: absolute;
    margin: 2px;
    background-color: var(--bg-dark);
    z-index: -1;
    pointer-events: none;
  }
  #gameBoardPos {
    grid-column: 2/3;
    grid-row: 2/3;
  }
`;
