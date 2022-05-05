import styled from "styled-components";

export const NavWrap = styled.nav`
  display: flex;
  padding: 8px 8px;
  position: fixed;
  height: 100vh;
  width: 100%;
  z-index: 3;
  justify-content: center;
  align-items: center;
  pointer-events: none;
  button {
    pointer-events: auto;
  }
`;

export const NavGrid = styled.ul`
  display: grid;
  width: 100%;
  height: 100%;
  grid-template-columns: repeat(auto-fill, 50px);
  grid-template-rows: repeat(auto-fill, 50px);
  & li {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export const DndApiBtn = styled.button`
  display: flex;
  align-items: center;
  background: none;
  border: none;
  position: relative;
  z-index: 2;
  transition: all 0.5s;
  height: 40px;
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
  p {
    margin-left: 8px;
    display: none;
    position: absolute;
    color: hsla(360, 80%, 60%, 1);
    font-weight: bold;
    font-size: 1.2em;
    text-shadow: -1px 1px 0 white, 1px 1px 0 white, 1px -1px 0 white,
      -1px -1px 0 white;
    left: 50%;
    top: 100%;
    transform: translateX(-65%);
  }
  &:hover {
    transform: scale(1.2);
    p {
      line-height: 1em;
      display: inline-block;
    }
  }
  &:active {
    transition: transform 0.2s;
    transform: scale(0.9);
  }
`;

export const CreateTeamWrap = styled.li`
  grid-column: 2 /4;
  & button {
    font-size: 14px;
    font-weight: bold;
    box-shadow: 0px 2px 4px hsla(0, 0%, 0%, 0.5);
    &:active {
      transform: scale(0.9);
    }
  }
`;
