import * as React from 'react'
const classNames = require('classnames')
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Icard, changeOrderAction } from '../../libs/actions/actions'
const css = require('./ir-styles.css')

export interface ICardsProps {
  actions: {
    changeOrder: (IchangeOrder) => void
  },
  cards: Icard[],
  correction: boolean
}

function dragStart (positionDragged) {
  return (e) => {
    e.dataTransfer.effectAllowed = 'move'
    e.dataTransfer.setData('text', JSON.stringify(positionDragged))
  }
}

function onDragOver (e) {
  e.preventDefault()
  e.dataTransfer.dropEffect = 'move'
  e.currentTarget.classList.add(css.over)
}

function onDragEnd (e) {
  e.currentTarget.classList.remove(css.over)
}

function onDragLeave (e) {
  e.currentTarget.classList.remove(css.over)
}

function onDrop (positionDropped, changeOrder) {
  return (e) => {
    e.preventDefault()
    e.currentTarget.classList.remove(css.over)
    e.dataTransfer.dropEffect = 'move'
    const positionDragged = JSON.parse(e.dataTransfer.getData('text'))
    changeOrder({
      positionDragged,
      positionDropped
    })
    return false
  }
}

function isCorrect(correctPosition, position) {
  return (correctPosition ===  position)
}

function Cards (props: ICardsProps) {
  const {changeOrder} = props.actions
  const {cards, correction} = props
  return (
    <div>
      {cards && cards.map((card, i) => (
        <div key={i} draggable={true}
             className={classNames({
               [css.card]: true,
               [css.correct]: (correction && isCorrect(card.correctPosition, i)),
               [css.inCorrect]: (correction && !isCorrect(card.correctPosition, i))
             })}
             onDragStart={dragStart(i)}
             onDragOver={onDragOver}
             onDragEnd={onDragEnd}
             onDragLeave={onDragLeave}
             onDrop={onDrop(i, changeOrder)}
        >
          {card.value}
        </div>
      ))}
    </div>
  )
}

function mapStateToProps (state, props) {
  return {
    cards: state.data.cards,
    correction: state.data.correction
  }
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators({
    changeOrder: changeOrderAction
  }, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(Cards)
