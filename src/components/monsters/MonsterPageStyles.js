import styled from "styled-components";

export const PageWrap = styled.div`
  position: fixed;
  padding: 100px 0px;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 8px;
  color: white;
  z-index: 1;
`;

export const ListWrap = styled.ul`
  height: fit-content;
  max-height: 60vh;
  overflow-y: scroll;
  width: ${({ open }) => (open ? `calc(100% - 16px)` : `fit-content`)};
  list-style: none;
  background-color: hsla(0, 0%, 20%, 0.8);
  border: 4px solid hsla(0, 0%, 23%, 1);
  border-radius: 8px;
  position: sticky;
  top: 0px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 8px;
  box-shadow: ${({ open }) =>
    open
      ? `0px 0px 8px hsla(0, 0%, 0%, 0.8) inset, 0px 0px 8px hsla(0, 0%, 0%, 0.8) inset, 0px 4px 4px hsla(0, 0%, 0%, 0.8)`
      : "0px 4px 4px hsla(0, 0%, 0%, 0.8)"};
  & > button {
    z-index: 2;
    width: 100%;
    margin: 0;
    text-align: left;
    position: sticky;
    top: 0px;
    background-color: hsla(0, 0%, 23%, 1);
    border: none;
    color: white;
    padding: 8px;
    box-shadow: ${({ open }) =>
      open ? "0px 2px 8px hsla(0, 0%, 0%, 0.8)" : "none"};
    margin-bottom: ${({ open }) => (open ? "8px" : "0")};
    span {
      width: auto;
      text-align: right;
      position: absolute;
      right: 8px;
    }
  }
  li {
    display: ${({ open }) => (open ? "inline-block" : "none")};
    width: fit-content;
    float: left;
    button {
      width: 90px;
      height: 90px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 50%;
      border: none;
      background: none;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      transition: all 0.3s;
      &:hover {
        transform: scale(1.2);
        z-index: 1;
      }
      p {
        font-size: 12px;
        font-weight: bold;
        color: white;
        position: absolute;
        z-index: 1;
      }
      &::after {
        content: "";
        background-color: hsla(0, 0%, 0%, 0.5);
        position: absolute;
        height: 100%;
        width: 100%;
        border-radius: 50%;
        pointer-events: none;
      }
    }
  }
  .flexMonsterListBtn{
    width: 100%;
    background-color: var(--bg-medium);
    padding: 4px;
    display: flex;
    justify-content: space-between;
    position: sticky;
    top: 0px;
    z-index: 2;
  }
`;

export const MonsterListBtn = styled.button`
  font-weight: bold;
  background: none;
  border: none;
  color: var(--font-color-brand);
  flex-grow: 1;
`;

export const SmallImg = styled.img`
  height: 125%;
`;

export const MonsterOverview = styled.div`
  width: 95%;
  height: 76vh;
  position: absolute;
  top: 80px;
  padding: 32px 16px;
  display: grid;
  grid-template-columns: 19% 21% 20% 21% 19%;
  padding-bottom: 58px;
  overflow-y: scroll;
  z-index: 0;
  background: var(--bg-medium);
  border: 3px solid var(--font-color-brand);
  & > img {
    grid-column: 2 / 5;
    grid-row: 2 / 3;
    height: 200px;
    width: 200px;
    margin: auto;
    margin-bottom: 16px;
  }
  & > h1 {
    grid-column: 1 / 6;
    grid-row: 2 / 3;
    text-align: center;
    background-color: hsla(0, 0%, 20%, 0.8);
    height: fit-content;
    margin: auto auto 0px;
    border-radius: 4px;
    line-height: 1em;
    padding: 4px;
    font-size: 1.7em;
    width: fit-content;
  }
  & > h3:nth-child(4) {
    font-size: 1.5em;
    text-align: center;
    margin: 16px 0px;
    grid-column: 1 / 2;
    grid-row: 2 / 3;
  }
  & > h3:nth-child(5) {
    font-size: 1.5em;
    text-align: center;
    margin: 16px 0px;
    grid-column: 5 / 6;
    grid-row: 2 / 3;
  }
  & > .addToTeam {
    grid-column: 1 / 6;
    margin-bottom: 16px;
  }
  & > .abilityScore {
    & > p {
      font-weight: bold;
      margin: 0px auto 4px;
      text-align: center;
      font-size: 1.2em;
    }
    & .modifier {
      border: 2px solid hsla(0, 0%, 80%, 1);
      margin: 0px 4px 16px;
      padding: 4px 0px;
      background-color: hsla(0, 0%, 23%, 1);
    }
  }
  & .fullLine {
    grid-column: 1 / 6;

    & > section {
      display: flex;
      flex-wrap: wrap;
    }
    p {
      padding: 2px 8px;
      background-color: hsla(0, 0%, 23%, 1);
      width: fit-content;
      margin: 4px;
      border-radius: 2px;
    }
  }
  h4 {
    margin: auto;
    padding: 4px;
    font-size: 1.2em;
    margin-bottom: 8px;
  }
`;

export const HitPoints = styled.button`
  height: fit-content;
  width: fit-content;
  grid-row: 2 /3;
  grid-column: 4 / 5;
  margin: 0px;
  color: white;
  background: none;
  border: none;
  background-image: url(${process.env.PUBLIC_URL + "/images/heart.png"});
  background-position: center;
  background-repeat: no-repeat;
  background-size: 100%;
  height: 80px;
  width: 80px;
  transform: translate(-16px, -8px);
  p {
    margin-top: -8px;
  }
`;
