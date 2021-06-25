import React, { useState, useEffect } from 'react'

import CastGraph from '../components/CastGraph'
import CharacterSection from '../components/CharacterSection'

const CastEditor = () => {

  return (
    <>
      <CastGraph />
      <CharacterSection />
    </>
  )
}

export default CastEditor