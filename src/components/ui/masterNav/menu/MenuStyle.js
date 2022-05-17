import styled from "styled-components";

export const MenuBtnWrap = styled.button`
  grid-row: 1 / 2;
  grid-column: 1 / 2;
  border: none;
  outline: none;
  background: none;
  &:hover .imgWrap {
    transform: scale(1.1);
  }
  &:active .imgWrap {
    transform: scale(1);
  }
  .imgWrap {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    height: 100%;
    width: 100%;
    transition: all 0.3s;
    #myD20Logo {
      height: 85%;
      z-index: 1;
      margin-bottom: 0px;
      position: absolute;
    }
    #close {
      height: 55%;
    }
  }
`;

export const DndApiBtn = styled.button`
  display: flex;
  align-items: center;
  background: none;
  border: none;
  position: relative;
  z-index: 2;
  transition: all 0.3s;
  height: 40px;
  margin: 4px auto;
  &::after {
    content: "";
    position: absolute;
    height: 33px;
    width: 33px;
    left: 7px;
    border-radius: 50%;
    box-shadow: 0px 3px 8px hsla(0, 0%, 0%, 1);
    z-index: -1;
  }
  img {
    height: 40px;
    width: 40px;
  }
  /* p {
    margin-left: 8px;
    display: none;
    position: absolute;
    color: red;
    font-weight: bold;
    font-size: 0.9em;
    letter-spacing: 2px;
    text-shadow: 1px 1px 1px white,
      -1px -1px 0 white;
    left: 50%;
    top: 50%;
    transform: translate(-70%, -50%);
  } */
  &:hover {
    transform: scale(1.1);
    /* p {
      line-height: 1em;
      display: inline-block;
    } */
  }
  &:active {
    transition: transform 0.2s;
    transform: scale(0.9);
  }
`;

export const TeamMngrWrap = styled.button`
  border: none;
  outline: none;
  background: none;
  margin: 8px auto 12px;
  padding: 0;
  width: 100%;

  &:hover .iconImg {
    transform: scale(1.1);
  }
  &:active .iconImg {
    transform: scale(1);
  }
  .imgWrap {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    height: 100%;
    width: 100%;
    .bgIconImg {
      position: absolute;
      height: calc(100% + 12px);
      margin-bottom: -6px;
    }
    .iconImg {
      transition: all 0.3s;
      z-index: 1;
      margin: auto;
      /* margin-bottom: -2px; */
      /* border: 2px solid green; */
    }
  }
`;

export const ExpandedWrap = styled.ul`
  grid-row: 1/4;
  grid-column: 1 / 2;
  position: relative;
  width: 56px;
  height: ${({ modal }) => (modal ? "fit-content" : "56px")};
  border-radius: 60px;
  margin: 8px auto;
  padding: ${({ modal }) => (modal ? "56px 0px 12px" : "56px 0px 0px")};
  overflow: hidden;
  //make the menu look like one of the icons
  background: linear-gradient(
      180deg,
      #bf953f -65.02%,
      #fcf6ba -26.35%,
      #b38728 20.06%,
      #fbf5b7 63.88%,
      #aa771c 99.98%
    ),
    #595959;
  &::before {
    content: "";
    height: calc(100% - 4px);
    width: calc(100% - 4px);
    margin: auto;
    background-color: var(--bg-medium);
    position: absolute;
    border-radius: 60px;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
  }
`;
