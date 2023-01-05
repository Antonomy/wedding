import { useState, useEffect } from 'react';
import AuthPage from '../AuthPage/AuthPage';
import HomePage from '../HomePage/HomePage';
import EventInfoPage from '../EventInfoPage/EventInfoPage';
import LivestreamPage from '../LivestreamPage/LivestreamPage';
import CreateAlbumPage from '../CreateAlbumPage/CreateAlbumPage';
import RegistryPage from '../RegistryPage/RegistryPage';
import CreateGuestbookEntryPage from '../GuestbookPage/CreateGuestbookEntryPage';
import { getUser } from '../../utilities/users-service';

import NavBar from '../../components/NavBar/NavBar';
import { Routes, Route } from 'react-router-dom'
import './App.module.scss';

function App() {
  const [state, setState] = useState(null)
  const [user, setUser] = useState(getUser())

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
              <Route path="/" element={<HomePage />} />
              <Route path="/eventinfo" element={<EventInfoPage />} />
              <Route path="/livestream" element={<LivestreamPage />} />
              <Route path="/albums/create" element={<CreateAlbumPage />} />
              <Route path="/guestbook/create" element={<CreateGuestbookEntryPage />} />
              <Route path="/registry" element={<RegistryPage />} />

            </Routes>
          </>
          :
          <AuthPage setUser={setUser} />
      }
    </main>
  );
}

export default App;