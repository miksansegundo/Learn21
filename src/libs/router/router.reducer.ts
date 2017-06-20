import { Action as ReduxAction } from 'redux'
import { isType } from 'redux-typescript-actions'
import {setMenuActiveAction} from './router.actions'

import { setUserAction, logoutAction } from '../actions/actions'

const publicMenu = [
  {
    name: 'Home',
    url: '/'
  }
]

const privateMenu = [
]

const DEFAULT_STATE = {
  menuActive: '',
  menuItems: publicMenu
}

const setMenuActive = (state, action) => {
  const newState = {}
  Object.assign(newState, state, {menuActive: action.payload.url})
  return newState
}

const showMenuPrivate = (state) => {
  const newState = {}
  Object.assign(newState, state, {menuItems: [...publicMenu, ...privateMenu]})
  return newState
}

const showMenuPublic = (state) => {
  const newState = {}
  Object.assign(newState, state, {menuItems: publicMenu})
  return newState
}

export function router (state = DEFAULT_STATE, action:ReduxAction) {

  if (isType(action, setMenuActiveAction)) {
    return setMenuActive(state, action)
  }
  if (isType(action, setUserAction)) {
    return showMenuPrivate(state)
  }
  if (isType(action, logoutAction)) {
    return showMenuPublic(state)
  }
  return state
}