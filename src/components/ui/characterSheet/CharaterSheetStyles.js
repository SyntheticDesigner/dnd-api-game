import styled from "styled-components";

export const CharSheet = styled.div`
  background-color: var(--bg-char);
  position: absolute;
  top: 50%;
  left: 50%;
  height: calc(100vh - 120px);
  width: 90%;
  z-index: 3;
  transform: translate(-50%, -50%);
  box-shadow: 0px 4px 8px hsla(0, 0%, 0%, 0.5);
  overflow: scroll;
  color: white;
  pointer-events: auto;
  border: 3px solid var(--font-color-brand);
  & .close-btn {
    right: 16px;
    top: 16px;
    position: sticky;
    float: right;
    margin-bottom: -100%;
  }
  & .actor-image {
    width: 100px;
  }
  & .info-panel {
    background-color: var(--darkTan);
    padding: 16px;
    color: var(--font-light);
    width: 100%;
    box-shadow: 0px 4px 8px hsla(0, 0%, 0%, 0.5);
    .top {
      width: calc(100% - 160px);
      * {
        margin-bottom: 8px;
      }
    }
    .bottom {
      margin-top: 8px;
    }
    h1 {
      width: 100%;
    }
  }
  & .flex {
    display: flex;
    gap: 8px;
    width: 100%;
  }
  & .tag {
    background-color: var(--bg-medium);
    padding: 4px;
    width: fit-content;
    border-radius: 2px;
    box-shadow: 0px 4px 8px hsla(360, 100%, 10%, 0.5);
    border: 2px solid var(--dark-border);
  }
`;

export const AbilitiesWrap = styled.section`
  display: flex;
  justify-content: space-between;
  padding: 16px;
  gap: 8px;
  & .abilityScore {
    width: 20%;
    text-align: center;
    padding: 2px;
    border-radius: 4px;
    background-color: var(--bg-light);
    box-shadow: 0px 4px 8px hsla(360, 100%, 10%, 0.5);
    border: 2px solid var(--dark-border);
    transition: all 0.3s;
    cursor: pointer;
    & > p {
      font-weight: bold;
      margin: 0px auto 4px;
      font-size: 1em;
    }
    & .modifier {
      border: 2px solid var(--dark-border);
      margin: 4px;
      padding: 4px 0px;
      border-radius: 4px;
    }
    & .score {
      font-size: 1.5em;
    }
    &:hover {
      transform: scale(1.1);
    }
  }
`;

export const MenuWrap = styled.section`
  height: 90%;
  nav {
    position: sticky;
    top: 0;
    box-shadow: 0px 4px 8px hsla(0, 0%, 0%, 0.5);
    background-color: var(--bg-light);
    ul {
      padding: 4px 8px 8px;
      display: flex;
      font-size: 0.9em;
      overflow-x: scroll;
      li {
        width: fit-content;
      }
    }
    button {
      width: max-content;
      background: none;
      border: none;
      color: white;
      font-weight: bold;
      opacity: 50%;
      line-height: 1em;
      &:hover {
        opacity: 1;
      }
    }
    .selected {
      opacity: 1;
      border-bottom: 4px solid var(--medium-border);
    }
  }
  section{
      padding: 8px 4px;
      overflow-y: scroll;
      height: calc(100% - 43px);
  }
`;
