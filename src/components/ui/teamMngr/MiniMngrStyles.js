import styled from "styled-components";

export const MiniMngrWrap = styled.div`
  position: fixed;
  display: ${({ open }) => (open ? "grid" : "none")};
  background-color: pink;
  font-size: 18px;
  padding: 8px;
  align-items: center;
  width: 90vw;
  box-shadow: 0px 2px 4px hsla(0, 0%, 0%, 0.6);
`;

export const Team = styled.div`
  background-color: ${({ selected })=>selected?"green":"grey"};
  margin: 0px 16px;
  color: white;
  text-align: center;
  position: relative;
  transition: all 0.5s;
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 32px;
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
`;
