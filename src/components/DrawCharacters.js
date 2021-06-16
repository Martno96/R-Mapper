import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as joint from 'jointjs'

import cast from '../reducers/cast'
// import { bondCategories } from '../constants'


const DrawCharacters = () => {
  
  const characters = useSelector(store => store.cast.characters)
  const dispatch = useDispatch()

  dispatch(cast.actions.drawCharacters())

  return (
    <div>
    </div>
  )
}

export default DrawCharacters