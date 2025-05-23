import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Popup from './popup.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Popup />
  </StrictMode>,
)
