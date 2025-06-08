import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import path from 'path'
import { RouterProvider,createBrowserRouter } from 'react-router-dom'
import CreateTrip from './create-trip/index.jsx'
import Header from './components/custom/Header'
import { Toaster } from 'sonner'
import { GoogleOAuthProvider } from '@react-oauth/google'
import Viewtrip from './view-trip/[tripId]/index.jsx'
import MyTrips from './my-trips'


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/create-trip',
    element:<CreateTrip/>
  },
  {
    path: '/view-trip/:tripId',
    element:<Viewtrip/>
  },
  {
    path: '/my-trips',
    element:<MyTrips/>
  }
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT__ID}>
    <Header></Header>
    <Toaster></Toaster>
  <RouterProvider router={router} />
  </GoogleOAuthProvider>
  </StrictMode>,
)
