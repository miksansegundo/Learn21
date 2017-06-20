import { combineReducers } from 'redux'

import { data } from './data.reducer'
import { router } from '../router/router.reducer'

/**
 * @function combineReducers
 * @description State first level properties & reducer
 */
export default combineReducers({
  data,
  router
})