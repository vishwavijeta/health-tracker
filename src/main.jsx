import React from 'react'
import ReactDOM from 'react-dom/client'
import { ConfigProvider, App as AntApp } from 'antd'
import enUS from 'antd/locale/en_US'
import App from './App.jsx'
import './index.css'

// Health / medical theme (teal-green primary)
const theme = {
  token: {
    colorPrimary: '#0d9488',
    colorInfo: '#0d9488',
    borderRadius: 10,
    fontFamily:
      "'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, Helvetica, Arial, sans-serif",
  },
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ConfigProvider theme={theme} locale={enUS}>
      <AntApp>
        <App />
      </AntApp>
    </ConfigProvider>
  </React.StrictMode>
)
