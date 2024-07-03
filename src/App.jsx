import './App.css'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import Login from './components/Login'
import Home from './components/Home'
import Header from './components/Header'
import SingleProduct from './components/SingleProduct'

function App () {
  // Auth
  const { auth } = useAuth()

  return (
    <>
      <Router>
        {auth && <Header />}
        <Routes>
          <Route path='/' element={auth ? <Navigate to='/inicio' /> : <Navigate to='/login' />} />
          <Route path='/login' element={auth ? <Navigate to='/inicio' /> : <Login />} />
          <Route path='/inicio' element={auth ? <Home /> : <Navigate to='/login' />} />
          <Route path='/producto/:id' element={auth ? <SingleProduct /> : <Navigate to='/login' />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
