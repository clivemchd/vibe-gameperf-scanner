import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Panel from './panel.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Panel />
  </StrictMode>,
)
