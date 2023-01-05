/*
Create
Read (Index & Show)
Update
Destroy
*/
import { useState, useEffect } from 'react'
import './CreateGuestbookEntryPage.module.scss';

export default function CreateGuestbookEntryPage(props) {
    const [showInput, setShowInput] = useState(false)
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
                method: "DELETE",
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
                method: "PUT",
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
            const response = await fetch(`/api/guestbook`, {
                method: "POST",
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
        setNewGuestbookEntry({ ...newGuestbookEntry, [evt.target.name]: evt.target.value })
    }

    useEffect(() => {
        getGuestbookEntries()
    }, [foundGuestbookEntry])
    
    return (
        <>
            {
                guestbookEntries && guestbookEntries.length ? (<ul>
                    {
                        guestbookEntries.map((guestbookEntry) => {
                            return (
                                <li key={guestbookEntry._id}>
                                    <span className="guest-name">{guestbookEntry.name} </span>
                                    RSVP'd {guestbookEntry.rsvp ? 'YES' : 'NO'}<br />
                                    
                                    <span onClick={(e) => {
                                        setShowInput(!showInput)
                                    }}>Message:{guestbookEntry.message}</span>
                                    <input
                                        style={{ display: showInput ? "block" : "none" }}
                                        type="text"
                                        name="message"
                                        onChange={handleUpdate}
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") {
                                                updateGuestbookEntry(guestbookEntry._id,{message:e.target.value})
                                                setShowInput(false)
                                            }
                                        }}
                                    />
                                    
                                    <br /><button onClick={() => deleteGuestbookEntry(guestbookEntry._id)}>Delete This Entry</button>
                                    <button onClick={() => updateGuestbookEntry(guestbookEntry._id,{rsvp:!guestbookEntry.rsvp})}>Change RSVP</button>
                                </li>
                            )
                        })
                    }
                </ul>) : <h1>No GuestbookEntries Yet Add One Below</h1>
            }
            {'Name '}<input value={newGuestbookEntry.name} onChange={handleChange} name="name"></input><br />
            {'Message '}<input value={newGuestbookEntry.message} onChange={handleChange} name="message"></input><br />
            {'RSVP '}<input type="checkbox" checked={newGuestbookEntry.rsvp} onChange={(evt) => setNewGuestbookEntry({ ...newGuestbookEntry, rsvp: evt.target.checked })}></input><br />
            <button onClick={() => createGuestbookEntry()}>Leave a Message</button>
        </>
    )
}