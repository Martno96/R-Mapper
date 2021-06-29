import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Container from '@material-ui/core/Container';

import CastGraph from '../components/CastGraph'
import CharacterSection from '../components/CharacterSection'
import EditorHeader from '../components/EditorHeader'

const CastEditor = () => {
  const { username } = useParams()
  //dis here be where the magic aka loading the right graph via fetch will happen:

  return (
    <>
      <Container maxWidth='sm'>
        <EditorHeader />
        <CastGraph />
        <Container maxWidth='sm'>
          <CharacterSection />
        </Container>
        
      </Container>
    </>
  )
}

export default CastEditor