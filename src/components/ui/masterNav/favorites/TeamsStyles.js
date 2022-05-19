import styled from "styled-components";

export const MiniMngrWrap = styled.div`
  position: fixed;
  display: grid;
  font-size: 18px;
  padding: 8px;
  align-items: center;
  width: 90vw;
  box-shadow: 0px 2px 4px hsla(0, 0%, 0%, 0.6);
  z-index: 4;
  pointer-events: auto;
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
    background-color: var(--bg-dark);
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    z-index: -1;
  }
`;

export const Team = styled.div`
  background: ${({ selected }) =>
    selected
      ? "var(--selected-border)"
      : `linear-gradient(
      180deg,
      #bf953f -65.02%,
      #fcf6ba -26.35%,
      #b38728 20.06%,
      #fbf5b7 63.88%,
      #aa771c 99.98%
    ),
    #595959`};

  margin: 16px;
  color: white;
  text-align: center;
  position: relative;
  transition: all 0.5s;
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
  box-shadow: 0px 4px 8px hsla(0, 0%, 0%, 0.5);
  button {
  }
  ul {
    display: none;
    height: 0px;
    width: 100%;
    background-color: grey;
    position: absolute;
    padding: 0px 8px 16px;
    & li {
      background-color: hsla(0, 0%, 0%, 20%);
      margin: 8px;
    }
  }
  &:hover {
    ul {
      display: block;
      height: fit-content;
    }
  }
  &::before {
    content: "";
    height: calc(100% - 4px);
    width: calc(100% - 4px);
    margin: auto;
    background-color: var(--bg-medium);
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    z-index: -1;
  }
`;
