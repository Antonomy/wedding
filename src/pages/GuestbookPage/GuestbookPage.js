/*
Create
Read (Index & Show)
Update
Destroy
*/
import { useState, useEffect } from 'react'
import styles from './GuestbookPage.module.scss'
import guestbookCover from './images/guestbookCover.jpeg'
import editIcon from './images/editpencilicon.png'

export default function GuestbookPage ({ user }) {
  const [showInput, setShowInput] = useState(false)
  const [inputId, setInputId] = useState('')
  const [guestbookEntries, setGuestbookEntries] = useState([])
  const [foundGuestbookEntry, setFoundGuestbookEntry] = useState(null)
  const [newGuestbookEntry, setNewGuestbookEntry] = useState({
    name: '',
    message: '',
    rsvp: false
  })
  // index
  const getGuestbookEntries = async () => {
    try {
      const response = await fetch('/api/guestbook')
      const data = await response.json()
      setGuestbookEntries(data)
    } catch (error) {
      console.error(error)
    }
  }
  // delete
  const deleteGuestbookEntry = async (id) => {
    try {
      const response = await fetch(`/api/guestbook/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const data = await response.json()
      setFoundGuestbookEntry(data)
    } catch (error) {
      console.error(error)
    }
  }
  // update
  const updateGuestbookEntry = async (id, updatedData) => {
    try {
      const response = await fetch(`/api/guestbook/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...updatedData })
      })
      const data = await response.json()
      setFoundGuestbookEntry(data)
    } catch (error) {
      console.error(error)
    }
  }
  // create
  const createGuestbookEntry = async () => {
    try {
      const response = await fetch('/api/guestbook', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...newGuestbookEntry })
      })
      const data = await response.json()
      setFoundGuestbookEntry(data)
      setNewGuestbookEntry({
        name: '',
        message: '',
        rsvp: false
      })
    } catch (error) {
      console.error(error)
    }
  }
  const handleUpdate = (evt) => {
    setFoundGuestbookEntry({ ...foundGuestbookEntry, [evt.target.name]: evt.target.value })
  }

  const handleChange = (evt) => {
    setNewGuestbookEntry({ ...newGuestbookEntry, [evt.target.name]: evt.target.value, posterId: user._id })
  }

  useEffect(() => {
    getGuestbookEntries()
  }, [foundGuestbookEntry])

  return (
    <>
      <img className={styles.guestbookcover} src={guestbookCover} />
      <div className={styles.guestbook}>
        {
          guestbookEntries && guestbookEntries.length
            ? (
              <ul>
                {
                  guestbookEntries.map((guestbookEntry) => {
                    return (
                      <li key={guestbookEntry._id} className={styles.guestbookentry}>
                        <span className={styles.guestname}>{guestbookEntry.name} </span>
                        RSVP'd {guestbookEntry.rsvp ? 'YES' : 'NO'}<br />
                        Message:{guestbookEntry.message}
                        <input
                          style={{ display: inputId === guestbookEntry._id ? 'block' : 'none' }}
                          type='text'
                          name='message'
                          onChange={handleUpdate}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              updateGuestbookEntry(guestbookEntry._id, { message: e.target.value })
                              setInputId('')
                            }
                          }}
                        />

                        <br />
                        {
                          user._id === guestbookEntry.posterId
                            ? <div>
                              <div onClick={(e) => { setInputId(guestbookEntry._id) }}>
                                <img className={styles.editIcon} src={editIcon} />
                              </div>
                              <button onClick={() => deleteGuestbookEntry(guestbookEntry._id)}>Delete Entry</button>
                              <button onClick={() => updateGuestbookEntry(guestbookEntry._id, { rsvp: !guestbookEntry.rsvp })}>Update RSVP</button>
                            </div>
                            : ''
                        }
                      </li>
                    )
                  })
                }
              </ul>
              )
            : <h1>Be the first to sign the Guestbook!</h1>
        }
        <div className={styles.guestbookInputForm}>
          {'Name '}<input value={newGuestbookEntry.name} onChange={handleChange} name='name' /><br />
          {'Message '}<input value={newGuestbookEntry.message} onChange={handleChange} name='message' /><br />
          {'RSVP '}<input type='checkbox' checked={newGuestbookEntry.rsvp} onChange={(evt) => setNewGuestbookEntry({ ...newGuestbookEntry, rsvp: evt.target.checked })} /><br />
          <button onClick={() => createGuestbookEntry()}>Leave a Message</button>
        </div>
      </div>
    </>
  )
}
