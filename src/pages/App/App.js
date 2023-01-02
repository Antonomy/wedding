import { useState, useEffect } from 'react';
import AuthPage from '../AuthPage/AuthPage';
import CreateAlbumPage from '../CreateAlbumPage/CreateAlbumPage';
import DashboardPage from '../DashboardPage/DashboardPage';
import NavBar from '../../components/NavBar/NavBar';
import { Routes, Route } from 'react-router-dom'
import './App.module.scss';

function App() {
  const [state, setState] = useState(null)
  const [user, setUser] = useState(null)

  const fetchState = async () => {
    try {
      const response = await fetch('/api/test')
      const data = await response.json()
      setState(data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchState()
  }, [])

  return (
    <main className="App">
      {
        user ?
          <>
            <NavBar />
            <Routes>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/albums/create" element={<CreateAlbumPage />} />
              <Route path="/" element={<CreateAlbumPage />} />
            </Routes>
          </>
          :
          <AuthPage setUser={setUser} />
      }
    </main>
  );
}

export default App;