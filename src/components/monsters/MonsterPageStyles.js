import styled from "styled-components";

export const PageWrap = styled.div`
  position: relative;
  /* max-height: 80vh; */
  background-color: lightblue;
  display: flex;
`;

export const ListWrap = styled.ul`
  height: 80vh;
  overflow-y: scroll;
  width: fit-content;
  /* width: 8em; */
  list-style: none;
  li {
    width: fit-content;
    margin-left: auto;
    button {
      width: fit-content;
    }
  }
`;

export const MonsterOverview = styled.div`
  width: 70%;
  img {
    height: 200px;
    width: 200px;
  }
`;
