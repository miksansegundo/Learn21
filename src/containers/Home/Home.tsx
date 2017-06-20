import * as React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Game from '../../components/Game/Game'

function Home (props) {
  const {word} = props
  return (
    <div>
      <Game word={word}/>
      <p>The word is: <strong>{word}</strong>strong></p>
    </div>
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