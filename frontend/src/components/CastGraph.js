import React, { useState, useEffect } from 'react'
import * as joint from 'jointjs'
import { useSelector, useDispatch } from 'react-redux'

import cast from '../reducers/cast'
import { saveAndLoad } from '../reducers/cast'

export let updatedGraph = new joint.dia.Graph({}, { cellNamespace: joint.shapes })
export let graphSnapshot

export const CastGraph = () => {

  let graph = useSelector(store => store.cast.graph)
  const characters = useSelector(store => store.cast.characters)
  const bonds = useSelector(store => store.cast.bonds)
  const first = useSelector(store => store.cast.first)
  const dispatch = useDispatch()

  useEffect (() => {
    dispatch(cast.actions.drawMap({ model: updatedGraph }))
  }, [characters, bonds])

  //only create new paper on first and second mount (quick-fix since the component mounts twice before the drawMap reducer has managed to be dispatched to, otherwise causing an empty graph)
  if (first < 2) {
    dispatch(saveAndLoad('load'))
    let paper = new joint.dia.Paper({
      el: document.getElementById('myholder'),
      model: updatedGraph,
      cellViewNamespace: joint.shapes,
      width: window.screen.availWidth-20,
      height: 500, 
      gridSize: 1
    })
    updatedGraph.fromJSON(JSON.parse(graph))
    dispatch(cast.actions.clearFirst())
  }

  return (
    <>
    </>
  )
}

export default CastGraph