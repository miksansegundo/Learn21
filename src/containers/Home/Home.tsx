import * as React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Game from '../../components/Game/Game'
const css = require('./styles.css')

function Home (props) {
  const {word} = props
  return (
    <main className={css.main}>
      <Game word={word}/>
      <p>The word is: <strong>{word}</strong></p>
    </main>
  )
}

function mapStateToProps (state, props) {
  return {
    word: state.data.word
  }
}

function mapDispatchToProps (dispatch) {
  return { actions: bindActionCreators({
  }, dispatch)}
}
export default connect(mapStateToProps, mapDispatchToProps)(Home)