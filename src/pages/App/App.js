import { useState, useEffect } from 'react'
import AuthPage from '../AuthPage/AuthPage'
import HomePage from '../HomePage/HomePage'
import EventInfoPage from '../EventInfoPage/EventInfoPage'
import VideoPage from '../VideoPage/VideoPage'
import CreateAlbumPage from '../CreateAlbumPage/CreateAlbumPage'
import RegistryPage from '../RegistryPage/RegistryPage'
import ProfilePage from '../ProfilePage/ProfilePage'
import GuestbookPage from '../GuestbookPage/GuestbookPage'
import { getUser } from '../../utilities/users-service'
import NavBar from '../../components/NavBar/NavBar'
import { Routes, Route } from 'react-router-dom'
import './App.module.scss'

export default function App () {
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
    <main className='App'>
      {
        user
          ? <>
            <NavBar setUser={setUser} />
            <Routes>
              <Route path='/' element={<HomePage />} />
              <Route path='/eventinfo' element={<EventInfoPage />} />
              <Route path='/video' element={<VideoPage />} />
              <Route path='/albums' element={<CreateAlbumPage />} />
              <Route path='/guestbook' element={<GuestbookPage user={user} />} />
              <Route path='/registry' element={<RegistryPage />} />
              <Route path='/profile' element={<ProfilePage user={user} />} />
            </Routes>
            </>
          : <AuthPage setUser={setUser} />
      }
    </main>
  )
}
