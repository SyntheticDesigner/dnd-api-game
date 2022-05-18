import React from 'react'
import styled from 'styled-components'

const Close = styled.button`
  position: fixed;
  right: 16px;
`;



export default function CloseBtn({ click }) {
  return (
    <Close onClick={click}>Close</Close>
  )
}
