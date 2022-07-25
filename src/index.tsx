import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import 'react-quill/dist/quill.snow.css'
import './global.scss'
import './theme.scss'
import '@reach/dialog/styles.css'
import * as serviceWorkerRegistration from './serviceWorkerRegistration'

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
serviceWorkerRegistration.register()
