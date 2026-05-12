import { Outlet, ScrollRestoration } from 'react-router-dom'
import ScrollUp from './components/ScrollUp'
function App() {

  return (
    <>
      <ScrollRestoration />
      <ScrollUp />
      <Outlet />
    </>
  )
}

export default App
