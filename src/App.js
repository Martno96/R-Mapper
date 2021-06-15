import logo from './logo.svg';
import './App.css';
import React from 'react'
import * as joint from 'jointjs'
import { Provider } from 'react-redux'
import { combineReducers, configureStore } from '@reduxjs/toolkit'

import Container from './components/Container'
import CharacterSection from './components/CharacterSection'

import cast from "./reducers/cast"

//TO-DO
//-------- TODAY ----------
//[_] Draw Bonds in reducer (more complex than u think)
//[_] Colors
//[_] Icons
//[_] Rename
//[_] Delete
//-------------------------
//[X][X] MVP selects
//[postponed] add details via tooltip on hover
//[postponed] Use textbox when adding a bond, then have a little warning text that says "this name isn't recognized as a created character"

const reducer = combineReducers({ 
  cast: cast.reducer
})

const store = configureStore({ reducer })

// store.subscribe(() => {
//   localStorage.setItem('game', JSON.stringify(store.getState().game))
// })

function App() {

  // let rect = new joint.shapes.standard.Rectangle();
  // rect.position(100, 30);
  // rect.resize(100, 40);
  // rect.attr({
  //   body: {
  //     fill: 'blue'
  //   },
  //   label: {
  //     text: 'Hello',
  //     fill: 'white'
  //   }
  // });
  // rect.addTo(graph);

  // let rect2 = rect.clone();
  // rect2.translate(300, 0);
  // rect2.attr('label/text', 'World!');
  // rect2.addTo(graph);

  // let link = new joint.shapes.standard.Link();
  // link.source(rect);
  // link.target(rect2);
  // link.addTo(graph);

  return (
    <Provider store={store}>
      <Container />
      <CharacterSection />
    </Provider>
  )

  // return (
  //   <div className="App">
  //     <header className="App-header">
  //       <img src={logo} className="App-logo" alt="logo" />
  //       <p>
  //         Edit <code>src/App.js</code> and save to reload.
  //       </p>
  //       <a
  //         className="App-link"
  //         href="https://reactjs.org"
  //         target="_blank"
  //         rel="noopener noreferrer"
  //       >
  //         Learn React
  //       </a>
  //     </header>
  //   </div>
  // );
}

export default App;
