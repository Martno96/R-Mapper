import React, { useState, useEffect } from 'react'
import * as joint from 'jointjs'
import { useSelector, useDispatch } from 'react-redux'
import { shapes, dia } from 'jointjs'
import * as standard from 'jointjs/src/shapes/standard.mjs'


import Button from './Button'
import DrawCharacters from './DrawCharacters'
import DrawBonds from './DrawBonds'
import Test from './Test'

import cast from '../reducers/cast'

// window.joint = joint

let updatedGraph = new joint.dia.Graph({}, { cellNamespace: joint.shapes })

const Container = () => {

  let graph = useSelector(store => store.cast.graph)
  const characters = useSelector(store => store.cast.characters)
  const bonds = useSelector(store => store.cast.bonds)
  const first = useSelector(store => store.cast.first)
  const dispatch = useDispatch()

  console.log("--- Container mounted ---")

  

  

  useEffect (() => {
    // console.log("updatedGraph as JSON:")
    // console.log(updatedGraph.toJSON())

    // console.log("updatedGraph as normal:")
    // console.log(updatedGraph)
    
    dispatch(cast.actions.drawMap({ model: updatedGraph }))
  }, [characters, bonds])

  // console.log("moved!")

  
  
  if (first < 2) {
    console.log("--- Updated graph from redux store! ---")
    
    let paper = new joint.dia.Paper({
      el: document.getElementById('myholder'),
      model: updatedGraph,
      cellViewNamespace: joint.shapes,
      width: 800,
      height: 500, 
      gridSize: 1
    })

    // paper.on('element:button:pointerdown', function(elementView, evt) {
    //   evt.stopPropagation(); // stop any further actions with the element view (e.g. dragging)
  
    //   var model = elementView.model;
  
    //   if (model.attr('body/visibility') === 'visible') {
    //     model.attr('body/visibility', 'hidden')
    //     model.attr('label/visibility', 'hidden')
    //     model.attr('buttonLabel/text', '<')
  
    //   } else {
    //     model.attr('body/visibility', 'visible')
    //     model.attr('label/visibility', 'visible')
    //     model.attr('buttonLabel/text', 'v')
    //   }
    // })
    
    updatedGraph.fromJSON(JSON.parse(graph))
    dispatch(cast.actions.clearFirst())
  }
  
  const elementsGotten = updatedGraph.getElements()

  // console.log("elementsGotten[0]")
  // console.log(elementsGotten[0])

  // console.log("elementsGotten")
  // console.log(elementsGotten)

  // elementsGotten[0].on('change: position', function(element){
  //   console.log(`${element.id}:${element.id}`)
  // })

  // console.log("paper model")
  // console.log(paper.model)


  
  

//   var graph0 = new joint.dia.Graph({}, { cellNamespace: shapes });
//   graph0.set('graphCustomProperty', true);
//   graph0.set('graphExportTime', Date.now());
//   var jsonObject = graph0.toJSON();
  
//   // transmission of `jsonObject` across network etc.
  
//   var graph2 = new joint.dia.Graph({}, { cellNamespace: shapes }); // new empty graph
//   graph2.fromJSON(jsonObject);
//   graph2.get('graphCustomProperty'); // true
//   graph2.get('graphExportTime'); // e.g. 627247800000

//   var graph1 = new joint.dia.Graph({}, { cellNamespace: shapes });

//   let rectio = new joint.shapes.standard.Rectangle()
//   rectio.position(150, 50)
//   rectio.resize(100, 40)
//   rectio.attr({
//     body: {
//       fill: 'green'
//     },
//     label: {
//       text: 'Richard Feynman',
//       fill: 'white'
//     }
//   })
//   console.log(rectio)
//   rectio.addTo(graph1)

//   // transmission of `jsonString` across network etc.

//   var graph3 = new joint.dia.Graph({}, { cellNamespace: shapes }); // new empty graph
//   graph3.fromJSON({
//     cells: [{
//         id: 1,
//         type: 'Circle',
//         position: {
//           x: 100,
//           y: 100
//         },
//         size: {
//           width: 100,
//           height: 100
//         }
//     }]
// });

//   let paper = new joint.dia.Paper({
//     el: document.getElementById('myholder'),
//     model: graph3,
//     cellViewNamespace: shapes,
//     width: 800,
//     height: 500, 
//     gridSize: 1
//   })


// let smog = new joint.dia.Graph({}, { cellNameSpace: shapes })
// const cells = JSON.stringify(smog.toJSON());
// smog.clear();
// console.log(JSON.parse(cells))
// smog.fromJSON(JSON.parse(cells));




// console.log(joint.shapes)

//   let graph = useSelector(store => store.cast.graph)
//   let updatedGraph = new joint.dia.Graph({}, { cellNameSpace: joint.shapes.standard.Rectangle.})
//   let rectio = new joint.shapes.standard.Rectangle()
//   rectio.position(150, 50)
//   rectio.resize(100, 40)
//   rectio.attr({
//     body: {
//       fill: 'green'
//     },
//     label: {
//       text: 'Richard Feynman',
//       fill: 'white'
//     }
//   })
//   console.log(rectio)
//   rectio.addTo(updatedGraph)
  
//   let superUpdatedGraph = new joint.dia.Graph({}, { cellNameSpace: shapes })
//   console.log(updatedGraph.toJSON())
//   superUpdatedGraph.clear()
//   superUpdatedGraph.fromJSON(JSON.stringify(updatedGraph.toJSON()))




  //superUpdatedGraph.fromJSON(updatedGraph.toJSON()) //this is where it GO WRONG: ERROR: dia.ElementView: markup required
  // console.log(JSON.parse(graph))
  
  // updatedGraph.fromJSON(JSON.parse(graph))


  // let graph = new joint.dia.Graph

  //creating a new paper should only happen when a new one is needed. But where is a currently running paper stored?
  //in the 'myholder' html element?? papers cannot be serialized, so they need to be kept somewhere which isn't redux store.
  //But where? Where is it currently???
  //How I think it has worked so far:
  //> The Paper has been recreated from scratch on each render using the new graph as model. HOWEVER, this stops working
  //with serialized graphs. SO, I need to start freezing a PERSISTING paper instead. This Paper needs to be stored somewhere.
  //where does Priyansh store his Paper?

  // let paper = new joint.dia.Paper({
  //   el: document.getElementById('myholder'),
  //   model: superUpdatedGraph,
  //   cellViewNamespace: shapes,
  //   width: 800,
  //   height: 500, 
  //   gridSize: 1
  // })

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