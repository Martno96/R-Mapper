import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as joint from 'jointjs'

import cast from '../reducers/cast'
// import { bondCategories } from '../constants'


const DrawBonds = () => {
  
  const dispatch = useDispatch
  dispatch(cast.actions.drawBonds())

  return (
    <div>
    </div>
  )
}

export default DrawBonds