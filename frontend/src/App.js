import './App.css';
import React from 'react'
import { Provider } from 'react-redux'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Login from './pages/Login' 
import CastEditor from './pages/CastEditor'

import user from './reducers/user'
import cast from './reducers/cast'

const reducer = combineReducers({ 
  cast: cast.reducer,
  user: user.reducer
})

const store = configureStore({ reducer })

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/users/:username" component={CastEditor} />
        </Switch>
      </BrowserRouter>
    </Provider>
  )
}

export default App;
