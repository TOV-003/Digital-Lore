import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Explore from './Pages/Explore.jsx'
import Upcoming from './Pages/Upcoming.jsx'
import Game from './Pages/Game.jsx'
import Home from './Pages/Home.jsx'
import { GameProvider } from './Context/GameContext.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'explore',
        element: <Explore />,
      },
      {
        path: 'upcoming',
        element: <Upcoming />,
      },
      {
        path: 'game/:id',
        element: <Game />,
      },
    ]
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GameProvider>
      <RouterProvider router={router} />
    </GameProvider>
  </StrictMode>,
)