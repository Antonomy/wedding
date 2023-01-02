import { useState, useEffect } from 'react';
import AuthPage from '../AuthPage/AuthPage';
import DashboardPage from '../DashboardPage/DashboardPage';
import CreateAlbumPage from '../CreateAlbumPage/CreateAlbumPage';
import CreateGuestbookEntryPage from '../GuestbookPage/CreateGuestbookEntryPage';
import NavBar from '../../components/NavBar/NavBar';
import { Routes, Route } from 'react-router-dom'
import './App.scss';

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
              <Route path="/guestbook/create" element={<CreateGuestbookEntryPage />} />
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