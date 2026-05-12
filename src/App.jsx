import { Outlet } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop.jsx';


function App() {

  return (
    <>
      <ScrollToTop />
      <Outlet />
    </>
  )
}

export default App
