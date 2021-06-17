import { createSlice } from '@reduxjs/toolkit'
import { nanoid } from 'nanoid'
import * as joint from 'jointjs'
import { shapes, dia } from 'jointjs'
import * as standard from 'jointjs/src/shapes/standard.mjs'


import { bondCategories } from '../constants'

// window.joint = joint
// graph: () => {
//   let graph = new joint.dia.Graph
//   graph.toJSON()
//   return graph
// },
console.log(joint.shapes)
let initGraph = new joint.dia.Graph({}, { cellNamespace: joint.shapes })

let rectio = new joint.shapes.standard.Rectangle()
rectio.position(150, 50)
rectio.resize(100, 40)
rectio.attr({
  body: {
    fill: 'green'
  },
  label: {
    text: 'bob',
    fill: 'white'
  }
})
console.log(rectio)
rectio.addTo(initGraph)

let jsonGraph = initGraph.toJSON(initGraph)
console.log(jsonGraph)
console.log(JSON.stringify(jsonGraph))
const parsy = JSON.stringify(jsonGraph)
console.log(JSON.parse(parsy))

const initialItems = localStorage.getItem('cast')
? JSON.parse(localStorage.getItem('cast'))
: {
  graph: JSON.stringify(jsonGraph),
  characters: [
    {
      id: "T2StgXR6_r4jdHI9B-myV",
      name: "Smirgus",
      bio: "sabka jcbskbqkib bdkabsd sabkdbka dbkasbjkdb kdbajsbd"
    },
    {
      id: "TXstMXY5_B4DDhI9B-myV",
      name: "Virp",
      bio: "olbdkabsd sabkdbka sabka jcbskbqkib dbkasbjkdb kdbajsbd"
    },
    {
      id: "7NstgcR6_81jd1I0x-c0m",
      name: "Plonky",
      bio: "sabka dbkasbjkdb jcbskbqkib sabkdbka kdbajsbd bdkabsd "
    }
  ],
  bonds: [
    {
      category: "Familial Bonds",
      source: "Plonky",
      subtype: "has kids with",
      target: "Smirgus",
      summary: "sabka sabkdbka dbkasbjkdb kdbajsbd"
    }
  ],
  bunny: {
    "bobec": "I am a bunny"
  }
}

export const cast = createSlice ({
  name: "cast",
  initialState: initialItems,
  reducers: {
    addCharacter: (store, action) => {
      //localStorage.setItem('username', JSON.stringify(action.payload))
      store.characters = [...store.characters, {
        id: nanoid(),
        name: action.payload.name,
        bio: action.payload.bio
      }]
    },
    addBond: (store, action) => {
      //localStorage.setItem('username', JSON.stringify(action.payload))
      
      //validate that values are okay
      if (
        typeof action.payload.category === 'string' && action.payload.category !== '' &&
        typeof action.payload.source === 'string' && action.payload.source !== '' &&
        typeof action.payload.subtype === 'string' && action.payload.subtype !== '' &&
        typeof action.payload.target === 'string' && action.payload.target !== '' &&
        typeof action.payload.category === 'string' && action.payload.category !== '' &&
        typeof action.payload.details === 'string' && action.payload.details !== ''
      ) {
        store.bonds = [...store.bonds, {
          category: action.payload.category,
          source: action.payload.source,
          subtype: action.payload.subtype,
          target: action.payload.target,
          summary: action.payload.details
        }]
      } else {
        console.error("addBond reducer caught payload properties either not being strings AND/OR being empty strings")
        console.log(action.payload.category)
        console.log(action.payload.source)
        console.log(action.payload.subtype)
        console.log(action.payload.target)
        console.log(action.payload.details)
      }
    },
    drawCharacters: (store, action) => {
      // const bunny2 = JSON.stringify(store.bunny)
      // console.log(bunny2)
      // console.log(JSON.parse(bunny2))
      // console.log(JSON.parse(store.bunny))
      let updatedGraph = new joint.dia.Graph({}, { cellNamespace: joint.shapes }) //init new graph instance
      //console.log(store.graph) //okay store.graph becomes a Proxy when JSON.parse is used in the line below, but NOT when it isnt....
      console.log(JSON.parse(store.graph))
 
      updatedGraph.fromJSON(JSON.parse(store.graph)) //get existing graph from store
      console.log(updatedGraph)
      store.characters.forEach((character, index) => {
        let rect = new joint.shapes.standard.Rectangle();
        rect.position(150+index*10, 50+index*10);
        rect.resize(100, 40);
        rect.attr({
          body: {
            fill: 'green'
          },
          label: {
            text: character.name,
            fill: 'white'
          }
        });
        console.log(rect)
        rect.addTo(updatedGraph)
        console.log(`added ${character.name} to graph!`)
      })
      store.graph = JSON.stringify(updatedGraph.toJSON()) //update store
    },
    drawBonds: (store, action) => {
      let updatedGraph = new joint.dia.Graph({}, { cellNamespace: joint.shapes }) //init new graph instance
      updatedGraph.fromJSON(store.graph) //get existing graph from store
      const characterElements = updatedGraph.getElements()

      store.bonds.forEach((bond, index) => {
        const sourceElement = updatedGraph.getElements().find(element => element.attr.label.text === bond.source)
        const targetElement = updatedGraph.getElements().find(element => element.attr.label.text === bond.target)
        console.log(sourceElement)
        console.log(targetElement)
        //the issue with this section of code is that I was trying to take a normal object and put it into the graph xD
        // const sourceElement = store.characters.find(character => character.id === bond.source)
        // const targetElement = store.characters.find(character => character.id === bond.target)

        //I gotta reach into the actual graph Element! Once I am inside this forEach, MOST of the bonds array usage is done
        //search among character Elements in graph using the label name of bond.source etc.


        let link = new joint.shapes.standard.Link();
        link.source(sourceElement);
        link.target(targetElement);
        link.addTo(updatedGraph)
      })
      store.graph = JSON.stringify(updatedGraph.toJSON()) //update store
    },
    drawTest: (store, action) => {
      let updatedGraph = new joint.dia.Graph({}, { cellNamespace: joint.shapes }) //init new graph instance
      updatedGraph.fromJSON(store.graph) //get existing graph from store
      
      store.graph = JSON.stringify(updatedGraph.toJSON()) //update store
    }
  }
})

export const saveChanges = (input) => {
  // let isStart = input.type ? false : true
  // let endpoint = ""
  // let postBody = {}

  // return (dispatch, getState) => {
  //   const state = getState()
  //   if (isStart) {
  //     endpoint = "start"
  //     postBody = JSON.stringify({
  //       username: input
  //     })
  //   } else {
  //     endpoint = "action"
  //     postBody = JSON.stringify({
  //       username: state.game.username,
  //       type: input.type,
  //       direction: input.direction
  //     })
  //     dispatch(game.actions.logAction(JSON.parse(postBody)))
  //   }
  //   dispatch(game.actions.setLoadProgress(33))
  //   fetch(`https://wk16-backend.herokuapp.com/${endpoint}`, {
  //     method: "POST",
  //     headers: {
  //       'Content-Type': 'application/json;charset=utf-8'
  //     },
  //     body: postBody
  //   })
  //     .then(res => {
  //       dispatch(game.actions.setLoadProgress(55))
  //       return res.json()
  //     })
  //     .then(update => {
  //       dispatch(game.actions.setLoadProgress(77))
  //       return dispatch(game.actions.setGameState(update))
  //     })
  //     .catch(error => dispatch(game.actions.setError(error.message)))
  //     .finally(() => dispatch(game.actions.setLoadProgress(100))) 
  //   }
}

export default cast