import * as React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Game from '../../components/Game/Game'
import txt from '../../libs/literals'
const css = require('./styles.css')

function Home (props) {
  const {word} = props
  return (
    <main className={css.main}>
      <Game word={word}/>
      <h1>{txt.title}</h1>
      <p className={css.goal}>{txt.goal}</p>
      <ul className={css.list}>
        {txt.intructions.map((item, i) => <li key={i} dangerouslySetInnerHTML={{__html: item}}></li>)}
      </ul>
      <p>{txt.theWordIs} <strong>{word}</strong></p>
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