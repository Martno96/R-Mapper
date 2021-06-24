import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as joint from 'jointjs'

import cast from '../reducers/cast'
// import { bondCategories } from '../constants'


const DrawBonds = () => {
  
  useEffect (() => {
    //tested scenarios:
    //[X] call reducer drawCharacters instead --> invalid hook call error
    //[X] don't dispatch at all --> solves the problem
    //[_] move bond drawing into the DrawCharacters component --> ???
    //[_] do X --> results in ???
    //[_] do X --> results in ???

    //dispatch(cast.actions.drawBonds()) //this dispatch causes an invalid hook call error
  }, [])
  
  const bonds = useSelector(store => store.cast.bonds)
  const dispatch = useDispatch

  

  console.log("UWU IS DRAW BOND COMPONENTE-")


  return (
    <div>
    </div>
  )
}

export default DrawBonds