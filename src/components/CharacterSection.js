import React from 'react'
import ReactDOM from 'react-dom'
import { useSelector } from 'react-redux'

import Character from './Character'
import AddCharacterButton from './AddCharacterButton'
import AddBondButton from './AddBondButton'

const CharacterSection = ({ onClick, text }) => {
  
  const characters = useSelector(store => store.cast.characters)

  return (
    <section className="characters-section">
      <AddCharacterButton />
      <AddBondButton />
      {characters.map((character) => {
      return <Character key={character.name} character={character}/>
      })}
    </section>
  )
}

export default CharacterSection