import { createSlice } from '@reduxjs/toolkit'
import { nanoid } from 'nanoid'
import * as joint from 'jointjs'
import { shapes, dia } from 'jointjs'
import * as standard from 'jointjs/src/shapes/standard.mjs'


import { bondCategories, BondLink } from '../constants'

// window.joint = joint
// graph: () => {
//   let graph = new joint.dia.Graph
//   graph.toJSON()
//   return graph
// },
// console.log(joint.shapes)
let initGraph = new joint.dia.Graph({}, { cellNamespace: joint.shapes })

// let rectio = new joint.shapes.standard.Rectangle()
// rectio.position(150, 50)
// rectio.resize(100, 40)
// rectio.attr({
//   body: {
//     fill: 'green'
//   },
//   label: {
//     text: 'bob',
//     fill: 'white'
//   }
// })
// // console.log(rectio)
// rectio.addTo(initGraph)

console.log("--- Initialized graph in redux store! ---")
let jsonGraph = initGraph.toJSON(initGraph)
// console.log(jsonGraph)
// console.log(JSON.stringify(jsonGraph))
// const parsy = JSON.stringify(jsonGraph)
// console.log(JSON.parse(parsy))
console.log(nanoid())
console.log(nanoid())
console.log(nanoid())

const initialItems = localStorage.getItem('cast')
? JSON.parse(localStorage.getItem('cast'))
: {
  graph: JSON.stringify(jsonGraph),
  characters: [
    {
      id: "oy4jF4qTIzpHvEWS6xbk4",
      name: "Smirgus",
      bio: "sabka jcbskbqkib bdkabsd sabkdbka dbkasbjkdb kdbajsbd"
    },
    {
      id: "_Cdw9IYAXc-41miSlO5Xr",
      name: "Virp",
      bio: "olbdkabsd sabkdbka sabka jcbskbqkib dbkasbjkdb kdbajsbd"
    },
    {
      id: "PUX_muVoY4tHA2Dy-0gOX",
      name: "Plonky",
      bio: "sabka dbkasbjkdb jcbskbqkib sabkdbka kdbajsbd bdkabsd "
    }
  ],
  bonds: [
    {
      id: nanoid(),
      category: "Social conflicts",
      source: "Plonky",
      subtype: "wants to be respected by",
      target: "Smirgus",
      summary: "sabka sabkdbka dbkasbjkdb kdbajsbd"
    },
    {
      id: nanoid(),
      category: "Official Bonds",
      source: "Smirgus",
      subtype: "polices",
      target: "Virp",
      summary: "sabka sabkdbka dbkasbjkdb kdbajsbd"
    },
    {
      id: nanoid(),
      category: "Social conflicts",
      source: "Virp",
      subtype: "seeks approval from",
      target: "Plonky",
      summary: "sabka sabkdbka dbkasbjkdb kdbajsbd"
    }
  ],
  first: 0
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
    removeCharacter: (store, action) => {
      //localStorage.setItem('username', JSON.stringify(action.payload))
      const bondsWithoutRemovedCharacter = store.bonds.map(bond => {
        if (bond.source === action.payload.name) {
          return Object.assign({}, bond, {source: "???"})
        } else if (bond.target === action.payload.name) {
          return Object.assign({}, bond, {target: "???"})
        } else {
          return bond
        }
      })
      store.bonds = [...bondsWithoutRemovedCharacter]
      // console.log("store.bonds:")
      // console.log(store.bonds)
      const charactersWithoutRemovedCharacter = store.characters.filter(character => character.name !== action.payload.name)
      store.characters = [...charactersWithoutRemovedCharacter]
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
          id: nanoid(),
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
    loadGraph: (store, action) => {

    },
    saveGraph: (store, action) => {

    },
    drawMap: (store, action) => {
      
      //log the current positions
      const elementPositionsToRetain = action.payload.model.getElements().map(element => {
        if (element.attributes.type === "standard.Ellipse") {
          return { type: "character", name: element.attributes.attrs.label.text, position: element.getBBox().center() }
        } else if (element.attributes.type === "standard.Rectangle") {
          return { type: "bond details", position: element.getBBox().center() }
        } else {
          return {}
        }
      })

      //remove unwanted Characters from graph
      action.payload.model.getElements().forEach(characterElement => {
        if (store.characters.find(character => character.name === characterElement.attributes.attrs.label.text) === undefined) {
          characterElement.remove()
        }
      })

      //draw Characters
      store.characters.forEach((character, index) => {
        let positionX, positionY
        if (elementPositionsToRetain.find(element => element.name === character.name) !== undefined) {
          //element is already in graph since previously
          console.log("found element")
          positionX = elementPositionsToRetain.find(element => element.name === character.name).position.x
          positionY = elementPositionsToRetain.find(element => element.name === character.name).position.y
        } else {
          //character is new and should be added to graph
          console.log("new element")
          positionX = index*100
          positionY = index*100
          
          let characterElement = new joint.shapes.standard.Ellipse()
          characterElement.position(positionX, positionY)
          characterElement.resize(100, 40);
          characterElement.attr({
            body: {
              fill: '#3f51b5',
              refRx: '60%',
              refRy: '100%',
              cursor: 'default',
              visibility: 'visible'
            },
            label: {
              text: character.name,
              fill: 'white',
              fontSize: 16,
              cursor: 'default',
              pointerEvents: 'none',
              visibility: 'visible',
            }
            
          });
          characterElement.addTo(action.payload.model)
        }
        console.log(`x: ${positionX}`)
        console.log(`y: ${positionY}`)        
      })

      const linkLabelMarkup = [
        {
          tagName: 'ellipse',
          selector: 'body'
        }, {
          tagName: 'text',
          selector: 'label'
        }, {
          tagName: 'rect',
          selector: 'button'
        }, {
          tagName: 'text',
          selector: 'buttonLabel'
        }
      ]

      const linkPathMarkup = [
        {
          tagName: 'path',
          selector: 'line'
        }
      ]

      store.bonds.forEach((bond, index) => {
        const sourceElement = action.payload.model.getElements().find(element => element.attributes.attrs.label.text === bond.source)
        const targetElement = action.payload.model.getElements().find(element => element.attributes.attrs.label.text === bond.target)
        if (targetElement !== undefined) {
          let bondLink = new joint.shapes.standard.Link({
            markup: linkPathMarkup,
            attrs: {
              line: {
                fill: 'none',
                stroke: '#808080',
                strokeWidth: 2,
                cursor: 'default'
              }
            }
          });
          bondLink.source(sourceElement, {
            connectionPoint: {
              name: 'boundary',
              args: {
                  offset: 10,
                  stroke: true
              }
            }
          })
          bondLink.target(targetElement, {
            connectionPoint: {
              name: 'boundary',
              args: {
                  offset: 10,
                  stroke: true
              }
            }
          })
          bondLink.router('normal')
          bondLink.appendLabel({    
            markup: linkLabelMarkup,
            attrs: {
              body: {
                ref: 'label',
                refX: '50%',
                refY: '50%',
                fill: '#ffffff',
                opacity: '100%',
                stroke: '#c3c3c3',
                strokeWidth: 2,
                cursor: 'pointer',
                refRx: '75%',
                refRy: '130%',
                refCx: 0,
                refCy: 0
              },
              label: {
                text: joint.util.breakText(bond.subtype, { width: 100, height: 100 }, { 'font-size': 16 }),
                fill: '#000000',
                fontSize: 16,
                textAnchor: 'middle',
                yAlignment: 'middle',
                pointerEvents: 'none',
                cursor: 'pointer'
              },
              button: {
                cursor: 'pointer',
                ref: 'buttonLabel',
                refWidth: '150%',
                refHeight: '150%',
                refX: '-25%',
                refY: '-25%'
              },
              buttonLabel: {
                pointerEvents: 'none',
                refX: '100%',
                refY: 0,
                textAnchor: 'middle',
                textVerticalAnchor: 'middle'
              }
            }
          })
          bondLink.addTo(action.payload.model)
        }
      })
      console.log(action.payload.model.toJSON())
      console.log("--- Stored graph in redux store! ---")
      store.graph = JSON.stringify(action.payload.model.toJSON()) //update store
    },
    clearFirst: (store, action) => {
      store.first++
    }
  }
})

// drawCharacters: (store, action) => {
//   console.log("draw character")
//   let updatedGraph = new joint.dia.Graph({}, { cellNamespace: joint.shapes }) //init new graph instance
//   // console.log(JSON.parse(store.graph))

//   updatedGraph.fromJSON(JSON.parse(store.graph)) //get existing graph from store
//  // console.log(updatedGraph)
//   store.characters.forEach((character, index) => {
//     let rect = new joint.shapes.standard.Rectangle();
//     rect.position(150+index*10, 50+index*10);
//     rect.resize(100, 40);
//     rect.attr({
//       body: {
//         fill: 'green'
//       },
//       label: {
//         text: character.name,
//         fill: 'white'
//       }
//     });
//    // console.log(rect)
//     rect.addTo(updatedGraph)
//    // console.log(`added ${character.name} to graph!`)
//   })
//   store.graph = JSON.stringify(updatedGraph.toJSON()) //update store
// },
// drawBonds: (store, action) => {
//   console.log("is running? Uwu")
//   let updatedGraph = new joint.dia.Graph({}, { cellNamespace: joint.shapes }) //init new graph instance
//   updatedGraph.fromJSON(store.graph) //get existing graph from store
//   const characterElements = updatedGraph.getElements()

//   // const markup = [
//   //   {
//   //     tagName: 'bond-node-body',
//   //     selector: 'body'
//   //   }, {
//   //     tagName: 'bond-summary-text',
//   //     selector: 'label'
//   //   }
//   // ]

//   store.bonds.forEach((bond, index) => {
//     const sourceElement = updatedGraph.getElements().find(element => element.attr.label.text === bond.source)
//     const targetElement = updatedGraph.getElements().find(element => element.attr.label.text === bond.target)
//    // console.log(sourceElement)
//    // console.log(targetElement)
//     //the issue with this section of code is that I was trying to take a normal object and put it into the graph xD
//     // const sourceElement = store.characters.find(character => character.id === bond.source)
//     // const targetElement = store.characters.find(character => character.id === bond.target)

//     //I gotta reach into the actual graph Element! Once I am inside this forEach, MOST of the bonds array usage is done
//     //search among character Elements in graph using the label name of bond.source etc.

//     let link = new joint.shapes.standard.Link();
//     link.source(sourceElement);
//     link.target(targetElement);
//     link.appendLabel({
//       attrs: {
//         text: {
//           text: bond.subtype
//         }
//       }
//     })
//     link.addTo(updatedGraph)
//   })
//   store.graph = JSON.stringify(updatedGraph.toJSON()) //update store
// },
// drawTest: (store, action) => {
//   let updatedGraph = new joint.dia.Graph({}, { cellNamespace: joint.shapes }) //init new graph instance
//   updatedGraph.fromJSON(store.graph) //get existing graph from store
  
//   store.graph = JSON.stringify(updatedGraph.toJSON()) //update store
// },


// console.log("updatedGraph.getElements():")
// console.log(updatedGraph.getElements())
// console.log("Bond details:")
// console.log(bond.details)
// console.log("Bond sourceElement:")
// console.log(sourceElement)
// console.log("Bond targetElement:")
// console.log(targetElement)

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