import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import axios from 'axios'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

// Global Axios Interceptors for NProgress
axios.interceptors.request.use(config => {
  NProgress.start()
  return config
}, error => {
  NProgress.done()
  return Promise.reject(error)
})

axios.interceptors.response.use(response => {
  NProgress.done()
  return response
}, error => {
  NProgress.done()
  return Promise.reject(error)
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
