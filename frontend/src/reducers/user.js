import { createSlice } from '@reduxjs/toolkit'
import { batch } from 'react-redux'
import { API_URL } from '../reusables/urls'

const initialItems = localStorage.getItem('user')
  ? JSON.parse(localStorage.getItem('user'))
  : {
    username: null,
    accessToken: null,
    error: null,
    secret: '',
    casts: [] //unused for now
  }

const user = createSlice({
  name: 'user',
  initialState: initialItems,
  reducers: {
    setUsername: (store, action) => {
      localStorage.setItem('user', JSON.stringify({
        username: action.payload,
        accessToken: store.accessToken,
        error: store.error,
        secret: store.secret
      }))
      store.username = action.payload
    },
    setAccessToken: (store, action) => {
      localStorage.setItem('user', JSON.stringify({
        username: store.username,
        accessToken: action.payload,
        error: store.error,
        secret: store.secret
      }))
      store.accessToken = action.payload
    },
    setError: (store, action) => {
      localStorage.setItem('user', JSON.stringify({
        username: store.username,
        accessToken: store.accessToken,
        error: action.payload,
        secret: store.secret
      }))
      store.error = action.payload
    },
    logOut: (store, action) => {
      store.username = null
      store.accessToken = null
    },
    setSecret: (store, action) => {
      console.log(action.payload)
      store.secret = action.payload
    }
  }
})



export const authenticate = (params) => {
  const username = params.username
  const password = params.password
  const userAction = params.userAction
  console.log(username)
  console.log(password)
  console.log(userAction)

  return (dispatch, getState) => {
    const state = getState()
    let options
    //action - determines method, but not necessarily target
    switch (userAction) {
      case undefined:
      case null:
      case 'load': //move this to the cast reducer!!
        options = { 
          method: 'GET',
          headers: {
            // 'Content-type': 'application/json',
            'Authorization': state.user.accessToken
          } 
        }
        break
      case 'signup':
      case 'signin':
        options = { 
          method: 'POST',
          headers: {
            // 'Content-type': 'application/json',
            'Authorization': state.user.accessToken
          },
          body: JSON.stringify({ username, password }) 
        }
        break
      case 'save': //move this to the cast reducer where also another API url is used (/signup vs /users/:username!)!!
        options = { 
          method: 'POST',
          headers: {
            // 'Content-type': 'application/json',
            'Authorization': state.user.accessToken
          },
          body: JSON.stringify({ username, password }) 
        }
        break
    }
    console.log(options)
    console.log("klarade switchen")
    fetch(API_URL(userAction), options)
      .then(res => {
        console.log("i första .then()")
        return res.json()
      })
      .then(data => {
        console.log("i andra .then()")
        if (data.success) {
          batch(() => {
            dispatch(user.actions.setAccessToken(data.accessToken))
            dispatch(user.actions.setUsername(data.username))
            dispatch(user.actions.setError(null))
          })
        } else {
          dispatch(user.actions.setError(data))
        }
      })
      .catch(error => console.log(error)) 
  }
}

export default user