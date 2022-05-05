import styled from "styled-components";

export const ApiNavWrap = styled.ul`
  display: ${({ open }) => (open ? "grid" : "none")};
  list-style: none;
  grid-template-columns: repeat(3, auto);
  /* width: 100%; */
  position: absolute;
  z-index: 1;
  top: 64px;
  left: 8px;
  background-color: hsla(0, 0%, 20%, 1);
  padding: 8px 8px;
  border-radius: 8px;
  li {
    width: fit-content;
    button {
      height: 3.5em;
      width: 7.5em;
      font-size: 12px;
      font-weight: bold;
      margin: 2px 2px;
    }
  }
`;
