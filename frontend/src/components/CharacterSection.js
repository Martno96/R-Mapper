import React from 'react'
import ReactDOM from 'react-dom'
import { useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import Box from "@material-ui/core/Box"

import Character from './Character'
import AddCharacterButton from './AddCharacterButton'
import AddBondButton from './AddBondButton'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  buttons: {
    margin: 2
  }
}))

const CharacterSection = ({ onClick, text }) => {
  
  const characters = useSelector(store => store.cast.characters)
  const classes = useStyles()
  return (
    <section className="characters-section">
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        m={2}
      >     
        <AddCharacterButton className={classes.buttons}/>
        <AddBondButton className={classes.buttons}/>
      </Box>
      {characters.map((character) => {
      return <Character key={character.name} character={character}/>
      })}
    </section>
  )
}

export default CharacterSection