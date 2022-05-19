import styled from "styled-components";

export const RecordsBtnWrap = styled.button`
  grid-column: 1 / 2;
  grid-row: 5 / 6;
  border: none;
  outline: none;
  background: none;
  pointer-events: auto;
  &:hover .recordsIconImg {
    transform: scale(1.1);
  }
  &:active .recordsIconImg {
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
    .recordsIconImg {
      transition: all 0.3s;
      height: 90%;
      z-index: 1;
      margin-bottom: -2px;
    }
  }
`;

export const RecordsWrapper = styled.aside`
  background-color: var(--bg-dark);
  height: 70%;
  width: 85vw;
  max-width: 400px;
  margin: auto;
  position: absolute;
  top: 50%;
  left: 0;
  transition: transform 0.5s;
  color: white;
  transform: ${({ modal }) =>
    modal
      ? "translateY(-50%) translateX(0%)"
      : "translateY(-50%) translateX(-100%)"};
  box-shadow: 0px 4px 8px hsla(0, 0%, 0%, 0.5);
  z-index: 0;
  background: linear-gradient(
      180deg,
      #bf953f -65.02%,
      #fcf6ba -26.35%,
      #b38728 20.06%,
      #fbf5b7 63.88%,
      #aa771c 99.98%
    ),
    #595959;
  pointer-events: auto;
  padding: 16px;
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
  & > ul {
    height: 100%;
    overflow-y: scroll;
  }
`;

export const Record = styled.li`
  padding: 8px;
  margin-bottom: 16px;
  background: linear-gradient(
      180deg,
      #bf953f -65.02%,
      #fcf6ba -26.35%,
      #b38728 20.06%,
      #fbf5b7 63.88%,
      #aa771c 99.98%
    )
    #595959;
  z-index: 0;
  position: relative;
  &::before {
    content: "";
    height: calc(100% - 4px);
    width: calc(100% - 4px);
    margin: auto;
    background-color: var(--bg-light);
    position: absolute;
    z-index: -1;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
`;
