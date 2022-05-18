import styled from "styled-components";

export const GameBoardWrapper = styled.div`
  height: calc(100% - 8px);
  width: calc(100% - 8px);
  display: flex;
  align-items: center;
  //background for map
  background-image: url(${`${process.env.PUBLIC_URL}/images/TheFightingPit_port.jpg`});
  background-position: center;
  background-size: cover;
  margin: auto;
  position: relative;
  box-shadow: 8px 8px 16px rgba(0, 0, 0, 0.5) inset,
    -8px -8px 16px rgba(0, 0, 0, 0.5) inset;
  &::before {
    content: "";
    position: absolute;

    height: calc(100% + 8px);
    width: calc(100% + 8px);
    box-shadow: 0px 0px 32px rgba(0, 0, 0, 0.8);
    background: linear-gradient(
        180deg,
        #bf953f -65.02%,
        #fcf6ba -26.35%,
        #b38728 20.06%,
        #fbf5b7 63.88%,
        #aa771c 99.98%
      ),
      #595959;
    z-index: -1;
    margin-left: -4px;
  }

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
