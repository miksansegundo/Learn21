import actionCreatorFactory from 'redux-typescript-actions'
const actionCreator = actionCreatorFactory()
import config from '../configs'

export const handleChangeAction = actionCreator<IhandleChange>('STATE_CHANGE')
export const getCardsAction = actionCreator<IgetCards>('GET_LETTERS')
export const changeOrderAction = actionCreator<IchangeOrder>('CHANGE_ORDER')
export const undoAction = actionCreator('UNDO')
export const logoutAction = actionCreator('LOGOUT_USER')
export const setUserAction = actionCreator<{}>('SET_USER')
export const correctAction = actionCreator('CORRECT')

/**
 * Change the order by keyboard
 */
let keyCounter = 0
export function setOrderByKeyboardAction ({payload: {key, code}}:IsetOrderByKeyboard) {
  // Reset or increment counter
  function incrementKeyCounter (total) {
    if (keyCounter + 1 === total) {
      keyCounter = 0
    } else {
      keyCounter += 1
    }
  }
  // Find card position
  function existCard (cards, card) {
    const position = cards.indexOf(card)
    if (position !== -1) {
      return position
    }
  }
  // Check if the key pressed is the space bar
  function isUndoKey (code) {
    return (code === config.undoKey)
  }
  // Check if the key pressed is the enter
  function isCorrectKey (code) {
    return (code === config.correctKey)
  }
  // Action
  return (dispatch, store) => {
    const {cards} = store.getState().data
    const card = cards.find((card, i) => key.toLowerCase() === card.value.toLowerCase())
    const cardPosition = existCard(cards, card)
    if (cardPosition) {
      dispatch(changeOrderAction({positionDragged: cardPosition, positionDropped: keyCounter}))
      incrementKeyCounter(cards.length)
    } else if (isUndoKey(code)) {
      dispatch(undoAction())
    } else if (isCorrectKey(code)) {
      dispatch(correctAction())
    }
  }
}
/**
 * setOrderByKeyboard Interface
 */
export interface IsetOrderByKeyboard {
  payload: {
    key: string,
    code: number
  }
}
/**
 * handle Interface
 */
export interface IhandleChange {
  path: string,
  value: any
}
/**
 * getCards Interface
 */
export interface IgetCards {
  word: string
}
/**
 * Card Interface
 */
export interface Icard {
  value: string,
  correction: boolean
}
/**
 * ChangeOrder Interface
 */
export interface IchangeOrder {
  positionDragged: number,
  positionDropped: number
}