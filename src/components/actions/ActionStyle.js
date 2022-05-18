import styled from "styled-components";

export const ActionsWrap = styled.section`
grid-column: 1 / 6;
width: 100%;
  & h1 {
    font-size: 1.2em;
    color: var(--font-color-brand);
    border-bottom: 1px solid var(--medium-border) inset;
    padding-bottom: 4px;
  }
  & .use {
    margin-left: auto;
    cursor: pointer;
  }
  & .actionName {
    margin: 16px 0 8px;
    display: flex;
    cursor: pointer;
    width: 100%;
    & h2 {
      font-size: 1em;
      border-left: 4px solid var(--medium-border);
      padding: 4px 8px;
      margin: 8px 0px;
      display: flex;
      flex-grow: 1;
      & .arrow {
        transition: all 0.3s;
        margin-left: 8px;
      }
      &:hover .arrow {
        transform: scale(1.3);
      }
    }
  }
`;

export const ActionDetailsWrapper = styled.div`
  box-shadow: -1px -1px 4px hsla(0, 0%, 55%, 0.5) inset,
    1px 1px 4px hsla(0, 0%, 0%, 0.35) inset;
  padding: 16px 10px;
  & .description {
    margin-bottom: 8px;
  }
`;

export const ActionModal = styled.div`
  height: 100vh;
  width: 100%;
  background-color: var(--bg-overlay);
  z-index: 4;
  position: fixed;
  display: flex;
  align-items: center;
  section {
    margin: auto;
    border-radius: 8px;
    background-color: var(--bg-medium);
    box-shadow: 0px 4px 8px hsla(0, 0%, 0%, 0.5);
    color: white;
    padding: 32px;
  }
`;
