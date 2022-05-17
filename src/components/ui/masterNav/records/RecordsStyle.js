import styled from "styled-components";

export const RecordsBtnWrap = styled.button`
  grid-column: 1 / 2;
  grid-row: 5 / 6;
  border: none;
  outline: none;
  background: none;

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
  left:0;
  transition: transform 0.5s;
  transform: ${({ modal }) =>
    modal
      ? "translateY(-50%) translateX(0%)"
      : "translateY(-50%) translateX(-100%)"};
  box-shadow: 0px 4px 8px hsla(0, 0%, 0%, 0.5);
  z-index: 1;
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
  }
`;
