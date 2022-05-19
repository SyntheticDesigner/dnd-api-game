import styled from "styled-components";

export const ApiNavWrap = styled.ul`
  /* display: ${({ open }) => (open ? "grid" : "none")}; */
  display: grid;
  list-style: none;
  grid-template-columns: repeat(2, auto);
  width: 60%;
  max-width: 300px;
  height: 100vh;
  position: absolute;
  top: 0;
  right: 0;
  z-index: 4;
  padding: 8px;
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
  li {
    width: fit-content;
    button {
      position: relative;
      height: 3.5em;
      width: 7.5em;
      font-size: 12px;
      font-weight: bold;
      border: none;
      z-index: 0;
      color: var(--font-color-brand);
      background: linear-gradient(
          180deg,
          #bf953f -65.02%,
          #fcf6ba -26.35%,
          #b38728 20.06%,
          #fbf5b7 63.88%,
          #aa771c 99.98%
        ),
        #595959;
        transition: transform 0.3s;
      &::before {
        content: "";
        height: calc(100% - 4px);
        width: calc(100% - 4px);
        margin: auto;
        background-color: var(--bg-light);
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        z-index: -1;
      }
      &:hover{
        transform: scale(1.1);
      }
      &:active{
        transform: scale(1);
      }
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
