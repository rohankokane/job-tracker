import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import 'react-quill/dist/quill.snow.css'
import './global.scss'
import './theme.scss'
import '@reach/dialog/styles.css'

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
