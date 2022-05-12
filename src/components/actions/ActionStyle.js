import styled from "styled-components";

export const ActionsWrap = styled.section`
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
