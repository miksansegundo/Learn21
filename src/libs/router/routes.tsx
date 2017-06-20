import * as React from 'react'
import { renderPage, providePage } from '../dom.utils'
import { store } from '../reducers/store'

// Pages Components
import Home from '../../containers/Home/Home'

export default {
  '/': Home
}

if (module.hot) {
  module.hot.accept('../../containers/Home/Home.tsx', () => {
    const Page = require('../../containers/Home/Home.tsx').default
    renderPage(providePage(<Page />, store))
  })

}