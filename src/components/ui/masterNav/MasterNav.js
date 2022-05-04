import React from 'react'
import { NavWrap } from './MasterNavStyle'

export default function MasterNav() {
  return (
    <NavWrap>
        <ul><li><img src={process.env.PUBLIC_URL + "/images/d20.ico"} alt={`D&D API`} /><p>{`D&D API`}</p></li></ul>
    </NavWrap>
  )
}
