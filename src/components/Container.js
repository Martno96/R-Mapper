import React, { useState } from 'react'
import * as joint from 'jointjs'
import { useSelector } from 'react-redux'
import { shapes, dia } from 'jointjs'
import * as standard from 'jointjs/src/shapes/standard.mjs';


import Button from './Button'
import DrawCharacters from './DrawCharacters'
import DrawBonds from './DrawBonds'

// window.joint = joint

const Container = () => {

// let smog = new joint.dia.Graph({}, { cellNameSpace: shapes })
// const cells = JSON.stringify(smog.toJSON());
// smog.clear();
// console.log(JSON.parse(cells))
// smog.fromJSON(JSON.parse(cells));
console.log(joint.shapes)

  let graph = useSelector(store => store.cast.graph)
  let updatedGraph = new joint.dia.Graph({}, { cellNameSpace: shapes })
  console.log(JSON.parse(graph))
  // updatedGraph.fromJSON(JSON.parse(graph))


  // let graph = new joint.dia.Graph

  let paper = new joint.dia.Paper({
    el: document.getElementById('myholder'),
    model: updatedGraph,
    cellViewNamespace: shapes,
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

  return (
    <>
      {/* <DrawCharacters />
      <DrawBonds /> */}
    </>
  )
}

export default Container