import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as joint from 'jointjs'

import cast from '../reducers/cast'
// import { bondCategories } from '../constants'


const DrawCharacters = ({ graph }) => {
  
  const characters = useSelector(store => store.cast.characters)
  const dispatch = useDispatch()

  dispatch(cast.actions.drawCharacters())

  

  console.log(graph.getElements())

  return (
    <div>
    </div>
  )
}

export default DrawCharacters