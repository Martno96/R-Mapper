import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import CastGraph from '../components/CastGraph'
import CharacterSection from '../components/CharacterSection'

const CastEditor = () => {
  const { username } = useParams()
  //dis here be where the magic aka loading the right graph via fetch will happen:

  return (
    <>
      <CastGraph />
      <CharacterSection />
    </>
  )
}

export default CastEditor