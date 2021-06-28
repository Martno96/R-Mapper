import { createSlice } from '@reduxjs/toolkit'
import { batch } from 'react-redux'
import { API_URL } from '../reusables/urls'
import { nanoid } from 'nanoid'
import * as joint from 'jointjs'
import { getCredentials } from './user'

let initGraph = new joint.dia.Graph({}, { cellNamespace: joint.shapes })
let jsonGraph = initGraph.toJSON(initGraph)
console.log(JSON.stringify(jsonGraph))

const initialItems = localStorage.getItem('cast')
? JSON.parse(localStorage.getItem('cast'))
: {
  graph: JSON.stringify(jsonGraph),
  characters: [],
  bonds: [],
  first: 0
}

//OLD STARTING VALUES
// {
//   graph: JSON.stringify(jsonGraph),
//   characters: [
//     {
//       id: "oy4jF4qTIzpHvEWS6xbk4",
//       name: "Smirgus",
//       bio: "sabka jcbskbqkib bdkabsd sabkdbka dbkasbjkdb kdbajsbd"
//     },
//     {
//       id: "_Cdw9IYAXc-41miSlO5Xr",
//       name: "Virp",
//       bio: "olbdkabsd sabkdbka sabka jcbskbqkib dbkasbjkdb kdbajsbd"
//     },
//     {
//       id: "PUX_muVoY4tHA2Dy-0gOX",
//       name: "Plonky",
//       bio: "sabka dbkasbjkdb jcbskbqkib sabkdbka kdbajsbd bdkabsd "
//     }
//   ],
//   bonds: [
//     {
//       id: nanoid(),
//       category: "Social Conflicts",
//       source: "Plonky",
//       subtype: "wants to be respected by",
//       target: "Smirgus",
//       summary: "sabka sabkdbka dbkasbjkdb kdbajsbd"
//     },
//     {
//       id: nanoid(),
//       category: "Formal Bonds",
//       source: "Smirgus",
//       subtype: "polices",
//       target: "Virp",
//       summary: "sabka sabkdbka dbkasbjkdb kdbajsbd"
//     },
//     {
//       id: nanoid(),
//       category: "Social Conflicts",
//       source: "Virp",
//       subtype: "seeks approval from",
//       target: "Plonky",
//       summary: "sabka sabkdbka dbkasbjkdb kdbajsbd"
//     }
//   ],
//   first: 0
// }

export const cast = createSlice ({
  name: "cast",
  initialState: initialItems,
  reducers: {
    addCharacter: (store, action) => {
      store.characters = [...store.characters, {
        id: nanoid(),
        name: action.payload.name,
        bio: action.payload.bio
      }]
    },
    removeCharacter: (store, action) => {
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
      const charactersWithoutRemovedCharacter = store.characters.filter(character => character.name !== action.payload.name)
      store.characters = [...charactersWithoutRemovedCharacter]
    },
    addBond: (store, action) => {
      //validation of input
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
    loadCast: (store, action) => {
      store.graph = action.payload.graph
      store.characters = action.payload.characters
      store.bonds = action.payload.bonds
      store.first = 0
    },
    drawMap: (store, action) => {
      
      //log the current positions (now redundant, but can't risk refactoring last minute!)
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
          //(now redundant, but can't risk refactoring last minute!)
          //element is already in graph since previously
          positionX = elementPositionsToRetain.find(element => element.name === character.name).position.x
          positionY = elementPositionsToRetain.find(element => element.name === character.name).position.y
        } else {
          //character is new and should be added to graph
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
        if (sourceElement !== undefined && targetElement !== undefined) {
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
      store.graph = JSON.stringify(action.payload.model.toJSON())
    },
    clearFirst: (store, action) => {
      store.first++
    }
  }
})

export const saveAndLoad = (userAction) => {

  return (dispatch, getState) => {
    const credentials = getCredentials(getState)
    console.log(credentials)
    const state = getState()
    let options
    //action - determines method, but not necessarily target
    switch (userAction) {
      case 'save':
        options = { 
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
            'Authorization': credentials.accessToken
          },
          body: JSON.stringify({ cast: { graph: state.cast.graph, characters: state.cast.characters, bonds: state.cast.bonds }}) 
        }
        break
      case 'load':
        options = { 
          method: 'GET',
          headers: {
            'Content-type': 'application/json',
            'Authorization': credentials.accessToken
          } 
        }
        break
    }
    console.log(options)
    console.log("klarade switchen")
    fetch(API_URL(`users/${credentials.username}`), options)
      .then(res => {
        console.log("i första .then()")
        return res.json()
      })
      .then(data => {
        console.log("i andra .then()")
        if (data.success && userAction === 'load') {
          batch(() => {
            dispatch(cast.actions.loadCast(data))
          })
        } else if (data.success && userAction === 'save') {
          //save notification?
        } else {
          // dispatch(cast.actions.setError(data))
        }
      })
      .catch(error => console.log(error)) 
  }
}

export default cast