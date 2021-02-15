import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import * as serviceWorkerRegistration from './serviceWorkerRegistration'
import reportWebVitals from './reportWebVitals'

const rootElement = document.getElementById("root")

if (rootElement.hasChildNodes()) {
  ReactDOM.hydrate(<App />, rootElement)
  } else {
  ReactDOM.render(<App />, rootElement)
}

serviceWorkerRegistration.register()
reportWebVitals()
