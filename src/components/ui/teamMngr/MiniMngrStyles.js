import styled from "styled-components";

export const MiniMngrWrap = styled.div`
  background-color: pink;
  font-size: 18px;
  display: flex;
  padding: 8px;
  align-items: center;
`;

export const Team = styled.div`
  background-color: grey;
  margin: 0px 16px;
  color: white;
  text-align: center;
  position: relative;
  transition: all 0.5s;
  position: relative;
  z-index: 1;
  button {
    padding: 8px 38px;
    background: none;
    border: none;
    color: white;
  }
  ul {
    display: none;
    height: 0px;
    width: 100%;
    background-color: grey;
    position: absolute;
    padding: 0px 8px 16px;
    & li{
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
