import * as React from 'react'
const classNames = require('classnames')
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Icard, changeOrderAction } from '../../libs/actions/actions'
const css = require('./styles.css')
/**
 * Cards Interface
 */
export interface ICardsProps {
  actions: {
    changeOrder: (IchangeOrder) => void
  },
  cards: Icard[],
  correction: boolean
}
/**
 * On drag start event
 */
function dragStart (positionDragged) {
  return (e) => {
    e.dataTransfer.effectAllowed = 'move'
    e.dataTransfer.setData('text', JSON.stringify(positionDragged))
  }
}
/**
 * On drag over event
 */
function onDragOver (e) {
  e.preventDefault()
  e.dataTransfer.dropEffect = 'move'
  e.currentTarget.classList.add(css.over)
}
/**
 * On drag end event
 */
function onDragEnd (e) {
  e.currentTarget.classList.remove(css.over)
}
/**
 * On drag leave event
 */
function onDragLeave (e) {
  e.currentTarget.classList.remove(css.over)
}
/**
 * On drop event
 */
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
/**
 * Is the card in a correct position?
 */
function isCorrect(correctPosition, position) {
  return (correctPosition ===  position)
}
/**
 * Card Component
 */
function Cards (props: ICardsProps) {
  const {changeOrder} = props.actions
  const {cards, correction} = props
  return (
    <div className={css.cards}>
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
/**
 * State to properties
 */
function mapStateToProps (state, props) {
  return {
    cards: state.data.cards,
    correction: state.data.correction
  }
}
/**
 * Actions to properties
 */
function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators({
    changeOrder: changeOrderAction
  }, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(Cards)
