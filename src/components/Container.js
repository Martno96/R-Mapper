import React, { useState } from 'react'
import * as joint from 'jointjs'
import { useSelector } from 'react-redux'

import Button from './Button'
import DrawCharacters from './DrawCharacters'
import DrawBonds from './DrawBonds'

const Container = () => {
  const graph = useSelector(store => store.cast.graph)
  // let graph = new joint.dia.Graph

  let paper = new joint.dia.Paper({
    el: document.getElementById('myholder'),
    model: graph,
    width: 800,
    height: 500, 
    gridSize: 1
  })

  // const [value, setValue] = useState('')

  // const onValueChange = (event) => {
  //   setValue(event.target.value)
  // }

  // const onClick = (event) => {
  //   event.preventDefault()
  //   let rect = new joint.shapes.standard.Rectangle();
  //   rect.position(150, 50);
  //   rect.resize(100, 40);
  //   rect.attr({
  //     body: {
  //       fill: 'green'
  //     },
  //     label: {
  //       text: value,
  //       fill: 'white'
  //     }
  //   });
  //   rect.addTo(graph);
  //   setValue('')
  // }

  console.log(graph.getElements())

  return (
    <DrawCharacters graph={graph}/>
  )
}

export default Container