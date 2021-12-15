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
    casts: []
  }

const user = createSlice({
  name: 'user',
  initialState: initialItems,
  reducers: {
    setUsername: (store, action) => {
      localStorage.setItem('user', JSON.stringify({
        username: action.payload,
        accessToken: store.accessToken,
        casts: store.casts,
        error: store.error,
        secret: store.secret
      }))
      store.username = action.payload
    },
    setAccessToken: (store, action) => {
      localStorage.setItem('user', JSON.stringify({
        username: store.username,
        accessToken: action.payload,
        casts: store.casts,
        error: store.error,
        secret: store.secret
      }))
      store.accessToken = action.payload
    },
    setCasts: (store, action) => {
      console.log(`attempting to set Casts. payload is:`)
      console.log(action.payload)
      localStorage.setItem('user', JSON.stringify({
        username: store.username,
        accessToken: store.accessToken,
        casts: action.payload,
        error: store.error,
        secret: store.secret
      }))
      store.casts = action.payload
      console.log(store.casts)
    },
    setError: (store, action) => {
      localStorage.setItem('user', JSON.stringify({
        username: store.username,
        accessToken: store.accessToken,
        casts: store.casts,
        error: action.payload,
        secret: store.secret
      }))
      store.error = action.payload
    },
    signOut: (store) => {
      console.log("user reducer signOut running!")
      localStorage.setItem('user', JSON.stringify({
        username: null,
        accessToken: null,
        error: null,
        secret: '',
        casts: []
      }))
      store.username = null
      store.accessToken = null
      store.error = null
      store.secret = ''
      store.casts = []
    }
  }
})

export const getCredentials = (getState) => {
  const state = getState()
  return ({ username: state.user.username, accessToken: state.user.accessToken })
}

export const getCasts = (getState) => {
  const state = getState()
  return ({ casts: state.user.casts })
}

export const authenticate = (params) => {
  const username = params.username
  const password = params.password
  const userAction = params.userAction

  return (dispatch, getState) => {
    const state = getState()
    fetch(API_URL(userAction), { 
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'Authorization': state.user.accessToken
      },
      body: JSON.stringify({ username, password }) 
    })
      .then(res => {
        return res.json()
      })
      .then(data => {
        if (data.success) {
          batch(() => {
            dispatch(user.actions.setAccessToken(data.accessToken))
            dispatch(user.actions.setUsername(data.username))
            dispatch(user.actions.setCasts(data.casts))
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