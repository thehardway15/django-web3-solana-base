import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { SolanaWalletProvider } from './WalletProvider'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SolanaWalletProvider>
      <App />
    </SolanaWalletProvider>
  </React.StrictMode>,
)
