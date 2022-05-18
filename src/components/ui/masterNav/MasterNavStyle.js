import styled from "styled-components";

export const NavWrap = styled.nav`
  display: flex;
  padding: 8px 8px;
  position: fixed;
  height: 100vh;
  width: 100%;
  z-index: 3;
  justify-content: center;
  pointer-events: none;
  align-items: center;
  button {
    pointer-events: auto;
  }
`;

export const NavGrid = styled.div`
  display: grid;
  width: 100%;
  height: 100%;
  grid-template-columns: 80px 1fr 80px 1fr 80px;
  grid-template-rows: 80px 1fr 80px 1fr 80px;
  gap: auto;
  ul {
    transition: all 0.3s;
  }
  & li {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export const LifeCountWrap = styled.button`
  grid-column: 5 / 6;
  border: none;
  outline: none;
  background: none;
  transition: all 0.3s;
  /* &:hover .imgWrap{
    transform: scale(1.1);
  }
  &:active .imgWrap{
    transform: scale(1);
  } */
  .imgWrap {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    height: 100%;
    width: 100%;
    transition: all 0.3s;
    #heartIcon {
      height: 110%;
      z-index: 1;
      margin-bottom: -16px;
    }
  }
`;

export const CreateTeamBtnWrap = styled.li`
  /* grid-column: 2 /4; */
  & button {
    font-size: 14px;
    font-weight: bold;
    box-shadow: 0px 2px 4px hsla(0, 0%, 0%, 0.5);
    &:active {
      transform: scale(0.9);
    }
  }
`;



export const PlayBtn = styled.li``;
