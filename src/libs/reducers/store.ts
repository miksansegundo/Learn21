import reducer from './reducer'
import {createStore, applyMiddleware} from 'redux'
const {composeWithDevTools} = require('redux-devtools-extension/developmentOnly')
const {createLogger} = require('redux-logger')

/**
 * Basic Thunk Async Middleware
 */
const thunk = (store) => (next) => (action) =>
  typeof action === 'function' ?
    action(store.dispatch, store) :
    next(action)

/**
 * Actions and reducer changes logger
 */
const logger = createLogger()

/**
 * Redux Middlewares
 */
const middlewares = [thunk, logger]

/**
 * Store creation
 */
export const store = createStore(reducer, composeWithDevTools(
  applyMiddleware(...middlewares)
))
