import { Action as ReduxAction } from 'redux'
import { isType } from 'redux-typescript-actions'
import configs from '../configs'
import {
  handleChangeAction,
  getCardsAction,
  changeOrderAction,
  undoAction,
  correctAction
} from '../actions/actions'

/**
 * Default State
 */
const DEFAULT_STATE = {
  word: configs.word,
  cards: [],
  previousState: null,
  correction: false
}

/**
 * Change the state following the path the property
 */
function handleChange (state, {payload: {path, value}}) {
  const keys = path.split('.')
  const name = keys.pop()
  const newState = Object.assign({}, state)
  let key = keys.reduce((i, e) => {
    return i[e]
  }, newState)
  key[name] = value // New value set
  return newState
}

/**
 * Shuffle an Array
 */
function shuffleArray (d) {
  for (let c = d.length - 1; c > 0; c--) {
    const b = Math.floor(Math.random() * (c + 1));
    const a = d[c];
    d[c] = d[b];
    d[b] = a;
  }
  return d
}

/**
 * Brake down the word in letter
 */
function getCards (state, {payload: {word}}) {
  return Object.assign({}, state, {
    cards: shuffleArray(Array.from(word).map((card, i) => {
      return {
        correction: false,
        value: card
      }
    }))
  })
}

/**
 * Correct the cards order
 */
function correctCards (cards, word) {
  return cards.map((card,i) => {
    return {
      ...card,
      correction: (word[i] === card.value)
    }
  })
}

/**
 * Change the cards order on Drag & Drop and when typing
 */
function changeOrder (state, {payload: {positionDragged, positionDropped}}) {
  const newCards = [...state.cards]
  const cardDragged = newCards.splice(positionDragged, 1)[0]
  newCards.splice(positionDropped, 0, cardDragged)
  const cardsCorrected = correctCards(newCards, state.word)
  return Object.assign({}, state, {
    previousState: JSON.parse(JSON.stringify(state)),
    cards: cardsCorrected
  })
}

/**
 * Reverse last step
 */
function undo (state) {
  if (state.previousState) {
    return Object.assign({}, state.previousState)
  } else {
    return state
  }
}

/**
 * Reverse last step
 */
function correct (state) {
  return Object.assign({}, state, {
    correction: !state.correction,
    cards: correctCards(state.cards, state.word)
  })
}

/**
 * Actions
 */
export function data (state = DEFAULT_STATE, action:ReduxAction) {
  if (isType(action, handleChangeAction)) {
    return handleChange(state, action)
  }
  if (isType(action, getCardsAction)) {
    return getCards(state, action)
  }
  if (isType(action, changeOrderAction)) {
    return changeOrder(state, action)
  }
  if (isType(action, undoAction)) {
    return undo(state)
  }
  if (isType(action, correctAction)) {
    return correct(state)
  }
  return state
}
