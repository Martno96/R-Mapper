import React, { useState, useEffect } from 'react'
import Container from '@material-ui/core/Container'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'

import CastGraph from '../components/CastGraph'
import CharacterSection from '../components/CharacterSection'
import EditorHeader from '../components/EditorHeader'

const CastEditor = () => {
  
  const characters = useSelector(store => store.cast.characters)
  const loading = useSelector(store => store.cast.first)
  const accessToken = useSelector(store => store.user.accessToken)
  const history = useHistory()
  let paperHolder = document.getElementById('myholder')

  useEffect(() => {
    if (!accessToken) {
      paperHolder.style = {} //this causes paper to never be visible again, as paper doesn't get destroyed at logout and recreated at new login! :(
      paperHolder.innerHTML = ""
      history.push('/')
    }
  }, [accessToken]) //removed history as dependency but didn't seem to change anything

  return (
    <>
      <Container maxWidth='sm'>
        <EditorHeader />
        <CastGraph />
        <p>The Cast Map is interactive - try dragging Characters and Bonds around!</p>
        <Container maxWidth='sm'>
          <CharacterSection />
        </Container>
      </Container>
    </>
  )
}

export default CastEditor