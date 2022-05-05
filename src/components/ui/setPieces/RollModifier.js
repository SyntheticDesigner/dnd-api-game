import React from 'react'

export default function RollModifier({ score }) {

    const modifier = Math.floor(score / 2) -5;
  return (
    <p className='modifier' title='The "Ability Modifier" is added to any ability checks using the respective skill.'>+{modifier}</p>
  )
}
