import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import QueryProvider from './providers/QueryProvider.tsx'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes/routes.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
   <QueryProvider>
  <RouterProvider router={router} />
</QueryProvider>
  </StrictMode>,
)


