import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Toaster } from 'sonner'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ParticipantsList } from './components/participants-list'
import { Events } from './components/envents'
import { HomePage } from './components/home-page'

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    errorElement: ''
  },
  {
    path: '/participantes',
    element: <ParticipantsList />
  },
  {
    path: '/eventos',
    element: <Events />
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Toaster richColors />
    <RouterProvider router={router} />
  </React.StrictMode>
)
