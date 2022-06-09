import React from "react";
import styled from "styled-components";

const Close = styled.button`
  position: sticky;
  position: relative;
  z-index: 0;
  color: white;
  background: linear-gradient(
      180deg,
      #bf953f -65.02%,
      #fcf6ba -26.35%,
      #b38728 20.06%,
      #fbf5b7 63.88%,
      #aa771c 99.98%
    ),
    #595959;
  &::before {
    content: "";
    height: calc(100% - 4px);
    width: calc(100% - 4px);
    margin: auto;
    background-color: var(--bg-medium);
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    z-index: -1;
  }
`;

export default function CloseBtn({ click, className }) {
  return <Close className={className} onClick={click}>Close</Close>;
}
