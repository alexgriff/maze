import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

const sizeSelection = (state = 'medium', action) => {
  switch (action.type) {
    case 'SELECT_SIZE':
      return action.size;
    default:
      return state;
  }
};

const maze = (
  state = {
    size: 'medium',
    tree: []
  },
  action
) => {
  switch (action.type) {
    case 'NEW_MAZE':
      return { ...state, size: action.size, tree: action.tree };
    default:
      return state;
  }
};

const cellSelection = (state = { origin: null, destination: null }, action) => {
  switch (action.type) {
    case 'NEW_MAZE':
      return { ...state, origin: null, destination: null };
    case 'SELECT_CELL':
      let indices;
      const { origin, destination } = state;
      const { index } = action;
      if (index === origin) {
        indices = { origin: null, destination: null };
      } else if (index === destination) {
        indices = { origin, destination: null };
      } else {
        indices =
          typeof origin === 'number'
            ? { origin, destination: index }
            : { destination, origin: index };
      }
      return { ...state, ...indices };

    default:
      return state;
  }
};

const path = (state = { found: {}, inQueue: {} }, action) => {
  switch (action.type) {
    case 'FOUND_CELL':
      return { ...state, found: { ...state.found, [action.cell]: 'found' } };
    case 'CELL_IN_QUEUE':
      return {
        ...state,
        inQueue: { ...state.inQueue, [action.cell]: 'in queue' }
      };
    case 'NEW_MAZE':
    case 'SELECT_CELL':
      return { found: {}, inQueue: {} };
    default:
      return state;
  }
};

const reducer = combineReducers({ sizeSelection, maze, cellSelection, path });

const store = createStore(reducer, applyMiddleware(reduxThunk));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
