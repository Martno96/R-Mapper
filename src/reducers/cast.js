import { createSlice } from '@reduxjs/toolkit'
import { nanoid } from 'nanoid'
import * as joint from 'jointjs'

import { bondCategories } from '../constants'

const initialItems = localStorage.getItem('cast')
? JSON.parse(localStorage.getItem('cast'))
: {
  graph: new joint.dia.Graph,
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
  ]
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
        typeof action.payload.sourceId === 'string' && action.payload.sourceId !== '' &&
        typeof action.payload.subtype === 'string' && action.payload.subtype !== '' &&
        typeof action.payload.target === 'string' && action.payload.target !== '' &&
        typeof action.payload.category === 'string' && action.payload.category !== '' &&
        typeof action.payload.details === 'string' && action.payload.details !== ''
      ) {
        store.bonds = [...store.bonds, {
          category: action.payload.category,
          sourceId: action.payload.sourceId,
          subtype: action.payload.subtype,
          target: action.payload.target,
          summary: action.payload.details
        }]
      } else {
        console.error("addBond reducer caught payload properties either not being strings AND/OR being empty strings")
        console.log(action.payload.category)
        console.log(action.payload.sourceId)
        console.log(action.payload.subtype)
        console.log(action.payload.target)
        console.log(action.payload.details)
      }
    },
    drawCharacters: (store, action) => {
      store.graph.clear()
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
        rect.addTo(store.graph)
        console.log(`added ${character.name} to graph!`)
      })
    },
    drawBonds: (store, action) => {
      
      store.bonds.forEach((bond, index) => {
        let sourceId = store.characters.find(character => character.id === bond.sourceId)
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
        rect.addTo(store.graph)
        console.log(`added ${character.name} to graph!`)
      })
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