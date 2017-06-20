import * as React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Cards from '../Cards/Cards'
import {
  getCardsAction,
  setOrderByKeyboardAction } from '../../libs/actions/actions'
const css = require('./ir-styles.css')

export interface IGameProps {
  actions: {
    getCards: (IgetCards) => void,
    setOrderByKeyboard: (IsetOrderByKeyboard) => void
  },
  word: string
}

function Game (props: IGameProps) {
  const {getCards, setOrderByKeyboard} = props.actions
  const {word} = props
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

function mapStateToProps (state, props) {
  return {
    word: state.data.word
  }
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators({
    getCards: getCardsAction,
    setOrderByKeyboard: setOrderByKeyboardAction
  }, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(Game)
