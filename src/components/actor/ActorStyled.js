import styled from "styled-components";
import { Token } from "../gameBoard/GameBoardStyle";

export const ActorToken = styled(Token)`
  grid-column: ${({ x }) => `${x} / ${x + 1}`};
  grid-row: ${({ y }) => `${y + 1} / ${y + 2}`};
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  /* border: 4px solid red; */
  .actorWrap {
    height: calc(100% - 4px);
    width: calc(100% - 4px);
    position: relative;
    border-radius: 50%;
    z-index: 0;
    display: flex;
    justify-content: center;
    align-items: center;

    &::before {
      content: "";
      --bg-at-overlay: none; //var(--bg-overlay);
      position: absolute;
      height: calc(100% - 8px);
      width: calc(100% - 8px);
      background-color: var(--bg-at-overlay);
      z-index: 1;
      margin: auto;
      border: ${({ selected, targeted }) =>
        selected
          ? `4px solid var(--selected-border)`
          : targeted
          ? `4px solid var(--targeted-border)`
          : `4px solid var(--bg-at-overlay)`};
      border-radius: 50%;
    }
    .actorTokenImg {
      height: 100%;
      box-shadow: 0 2px 4px hsla(0, 0%, 0%, 0.5);
      border-radius: 50%;
      position: absolute;
    }
    .skull {
      position: absolute;
      z-index: 1;
      height: 80%;
      opacity: 0.80;
      margin-top: 2px;
      margin-left: 2px;
    }
  }
`;

export const TokenMenuGrid = styled.div`
  height: 180%;
  width: 180%;
  position: absolute;
  top: -42%;
  left: -40%;
  display: ${({ selected }) => (selected ? "grid" : "none")};
  z-index: 1;
  grid-template-columns: 40px 1fr 40px;
  grid-template-rows: 40px 1fr 40px;
  pointer-events: none;
  button{
    z-index: 2;
  }
  .target {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    grid-row: 1 / 2;
    grid-column: 1 / 2;
    background: none;
    border: none;
    height: 100%;
    width: 100%;
    margin: 0;
    margin-top: 2px;
    pointer-events: auto;
    .targetImg {
      position: absolute;
      height: 70%;
      margin-top: -2px;
    }
    .targetFrame {
      position: absolute;
      height: 120%;
    }
  }
  .monsterHeart {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    grid-row: 1 / 2;
    grid-column: 3 / 4;
    background: none;
    border: none;
    height: 100%;
    width: 100%;
    margin: 0;
    margin-top: 4px;
    pointer-events: auto;
    P{
      z-index: 1;
      color: var(--font-color-brand);
      margin-top: -16px;
      font-size: 0.9em;
    }
    img {
      position: absolute;
      height: 140%;
    }
  }
  .combatState {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    grid-row: 3 / 4;
    grid-column: 1 / 2;
    background: none;
    border: none;
    height: 100%;
    width: 100%;
    margin: 0;
    margin-top: 4px;
    pointer-events: auto;

    .shield {
      position: absolute;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      width: 100%;
      transform: translate(-15%, -15%);
      img {
        height: 100%;
        position: absolute;
      }
    }
    .sword {
      position: absolute;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      width: 100%;
      transform: translate(15%, 15%);
      img {
        position: absolute;
        height: 100%;
      }
      img:nth-child(2) {
        transform: rotate(45deg);
      }
    }
  }
  .characterSheet {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    grid-row: 3 / 4;
    grid-column: 3 / 4;
    background: none;
    border: none;
    height: 100%;
    width: 100%;
    margin: 0;
    margin-top: 4px;
    pointer-events: auto;

    img {
      height: 190%;
    }
  }
`;
