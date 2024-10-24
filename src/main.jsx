import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ReactDOM from 'react-dom/client';
import Contact from './routes/Start.jsx'
import Significance from './routes/Significance.jsx'
import Start from './routes/Contact.jsx'
import Realcontact from './routes/Realcontact.jsx'


const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/significance", element: <Significance /> },
  { path: "/start", element: <Start /> },
  { path: "/contact", element: <Realcontact /> },
])
ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
