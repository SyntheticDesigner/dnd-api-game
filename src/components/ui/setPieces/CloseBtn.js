import React from "react";
import styled from "styled-components";

const Close = styled.button`
  position: sticky;
  top: 0px;
  margin-left: auto;
  height: 30px;
  width: 90px;
`;

export default function CloseBtn({ click }) {
  return <Close onClick={click}>Close</Close>;
}
