import * as React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Cards from '../Cards/Cards'
import {
  getCardsAction,
  setOrderByKeyboardAction } from '../../libs/actions/actions'
const css = require('./styles.css')
/**
 * Game Interface
 */
export interface IGameProps {
  actions: {
    getCards: (IgetCards) => void,
    setOrderByKeyboard: (IsetOrderByKeyboard) => void
  },
  word: string
}
/**
 * Game Component
 */
function Game (props: IGameProps) {
  const {getCards, setOrderByKeyboard} = props.actions
  const {word} = props
  // On Key Up event
  function onKeyUp (e) {
    const code = e.keyCode ? e.keyCode : e.charCode
    const key = String.fromCharCode(code)
    setOrderByKeyboard({payload: {code, key}})
  }
  // Init Game
  if (word) {
    getCards({word})
    document.addEventListener("keyup", onKeyUp, false);
  }
  return (
    <Cards />
  )
}
/**
 * State to properties
 */
function mapStateToProps (state, props) {
  return {
    word: state.data.word
  }
}
/**
 * Actions to properties
 */
function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators({
    getCards: getCardsAction,
    setOrderByKeyboard: setOrderByKeyboardAction
  }, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(Game)
