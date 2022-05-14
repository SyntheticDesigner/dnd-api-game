import styled from "styled-components";
import { Token } from "../gameBoard/GameBoardStyle";

export const ActorToken = styled(Token)`
  grid-column: ${({ x }) => `${x + 1} / ${x + 2}`};
  grid-row: ${({ y }) => `${y + 1} / ${y + 2}`};
  padding: 4px;

  /* border: 4px solid red; */
  .actorWrap {
    height: 100%;
    width: 100%;
    position: relative;
    border-radius: 50%;
    z-index: 0;
    &::before {
      content: "";
      --bg-at-overlay: none;//var(--bg-overlay);
      position: absolute;
      height: calc(100% - 8px);
      width: calc(100% - 8px);
      background-color: var(--bg-at-overlay);
      z-index: 1;
      border: ${({selected, targeted})=>selected ? `4px solid var(--selected-border)`: targeted ? `4px solid var(--targeted-border)` : `4px solid var(--bg-at-overlay)`};
      border-radius: 50%;
    }
    img {
      height: 100%;
      box-shadow: 0 2px 4px hsla(0, 0%, 0%, 0.5);
      border-radius: 50%;
      position: absolute;
    }
  }
`;
