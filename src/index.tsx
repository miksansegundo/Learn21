import * as React from 'react';
import 'core-js/modules/es6.object.assign'

require('file-loader?name=./index.html!./index.html');
require('file-loader?name=./favicon.ico!./assets/favicon.ico');
require('./global.css')

import { store } from './libs/reducers/store'
import { navigate } from './libs/router/router.actions'

// Dispatch navigation action with the current URL on the address bar
store.dispatch(navigate({url: location.pathname}))

// Super simple routing system - Changes on the address bar trigger the navigation action
if (window.addEventListener) {
  window.addEventListener('popstate', () => {
    store.dispatch(navigate({url: location.pathname}))
  })
}