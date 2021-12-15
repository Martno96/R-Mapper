import React, { useEffect } from 'react'
import * as joint from 'jointjs'
import { useSelector, useDispatch } from 'react-redux'

import cast from '../reducers/cast'
import user from '../reducers/user'
import { saveAndLoad } from '../reducers/cast'

export let updatedGraph = new joint.dia.Graph({}, { cellNamespace: joint.shapes })
export let graphSnapshot

export const CastGraph = () => {

  let graph = useSelector(store => store.cast.graph)
  const characters = useSelector(store => store.cast.characters)
  const bonds = useSelector(store => store.cast.bonds)
  const first = useSelector(store => store.cast.first)
  const casts = useSelector(store => store.user.casts)
  const dispatch = useDispatch()

  useEffect (() => {
    dispatch(cast.actions.drawMap({ model: updatedGraph }))
  }, [characters, bonds])

  console.log(`first is ${first}`)

  //only create new paper on first and second mount (quick-fix since the component mounts twice before the drawMap reducer has managed to be dispatched to, otherwise causing an empty graph)
  if (first < 2 && casts !== undefined && casts.length) {
    dispatch(cast.actions.setCastId(casts))
    dispatch(saveAndLoad('load'))
    let paper = new joint.dia.Paper({ //paper is actually read, since it is injected into 'myholder'
      el: document.getElementById('myholder'),
      model: updatedGraph,
      cellViewNamespace: joint.shapes,
      width: window.innerWidth-20, //this is the culprit xD it is too big so things missing are things just off-screen
      height: 500, 
      gridSize: 1,
      background: {
        color: '#ffffff'
      }
    })
    updatedGraph.fromJSON(JSON.parse(graph))
    dispatch(cast.actions.clearFirst())
  }

  updatedGraph.on('change:position', function(cell){
    graphSnapshot = updatedGraph.toJSON()
  })

  return (
    <>
    </>
  )
}

export default CastGraph