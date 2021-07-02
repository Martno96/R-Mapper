import React from 'react'
import Container from '@material-ui/core/Container';

import CastGraph from '../components/CastGraph'
import CharacterSection from '../components/CharacterSection'
import EditorHeader from '../components/EditorHeader'

const CastEditor = () => {
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