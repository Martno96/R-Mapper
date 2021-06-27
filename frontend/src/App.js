import logo from './logo.svg';
import './App.css';
import React from 'react'
import * as joint from 'jointjs'
import { Provider } from 'react-redux'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import CastGraph from './components/CastGraph'
import CharacterSection from './components/CharacterSection'
import Login from './pages/Login' 
import CastEditor from './pages/CastEditor'
import UserCasts from './pages/UserCasts'

import user from './reducers/user'
import cast from './reducers/cast'

//TO-DO
//-------- TODAY ----------
//[_] Draw Bonds in reducer (more complex than u think)
//[_] Colors
//[_] Icons
//[_] Rename
//[_] Delete
//-------------------------
//[_] Add Bonds by dragging Element onto another (https://resources.jointjs.com/tutorial/connecting-by-dropping)
//[X][X] MVP selects
//[postponed] add details via tooltip on hover
//[postponed] Use textbox when adding a bond, then have a little warning text that says "this name isn't recognized as a created character"

const reducer = combineReducers({ 
  cast: cast.reducer,
  user: user.reducer
})

const store = configureStore({ reducer })

// store.subscribe(() => {
//   localStorage.setItem('game', JSON.stringify(store.getState().game))
// })

function App() {

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Login} />
          {/* <Route path="/users/:username" component={UserCasts} /> */}
          <Route path="/users/:username" component={CastEditor} />
        </Switch>
      </BrowserRouter>
    </Provider>
  )
}

export default App;
