import * as React from 'react'
import {renderPage, providePage} from '../dom.utils'
const urlMapperFactory = require('url-mapper')
const urlMapper = urlMapperFactory()

import actionCreatorFactory from 'redux-typescript-actions'
const actionCreator = actionCreatorFactory()

// Connector & store
import { store } from '../reducers/store'

// App Routes
import routes from './routes'

// SET_MENU_ACTIVE
export const setMenuActiveAction = actionCreator<{url: string}>('SET_MENU_ACTIVE')

// Navigation Controller
export function navigate (event) {
  if (event.preventDefault) event.preventDefault()
  const url = event.url || event.currentTarget.getAttribute('href')
  const matchedRoute = urlMapper.map(url, routes)

  if (event.preventDefault) {
    event.preventDefault()
  }

  if (matchedRoute) {
    return pageFound(url, matchedRoute)
  } else {
    return pageNotFound()
  }
}

// Add to history, render component, set menu item active
function pageFound (url, matchedRoute) {
  if (window && window.location.pathname !== url) {
    window.history.pushState(null, null, url)
  }

  const Page = matchedRoute.match
  const props = matchedRoute.values
  renderPage(providePage(<Page {...props} />, store))

  return setMenuActiveAction({url})
}

// Redirect to Home page
function pageNotFound() {
  debugger
  const payload = { url: '/login' }
  navigate(payload)

  return setMenuActiveAction(payload)
}