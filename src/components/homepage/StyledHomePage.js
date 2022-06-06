import styled from "styled-components";

export const HomePageWrapper = styled.div`
  background-color: var(--bg-dark-opac);
  height: 100vh;
  width: 100vw;
  z-index: 4;
  position: fixed;
  top: 0;
  color: white;
  ul {
    position: relative;
    z-index: 0;
    margin: 32px;
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
    padding: 32px;
    box-shadow: var(--shadow-dark);
    width: 25%;
    max-width: 90vw;
    display: grid;
    gap: 16px;
    li {
      button {
        padding: 16px;
        width: calc(100% - 8px);
        box-shadow: var(--shadow-medium);
        position: relative;
        z-index: 0;
        cursor: pointer;
        border: none;
        color: white;
        transition: transform 0.3s;
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
          top: 0;
          bottom: 0;
          right: 0;
          left: 0;
          z-index: -1;
        }
        &:hover {
          transform: scale(1.1);
        }
      }
    }
  }
`;
