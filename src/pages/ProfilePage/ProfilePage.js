/*
Create
Read (Index & Show)
Update
Destroy
*/
import { useState, useEffect } from 'react'
import styles from './ProfilePage.module.scss';
import editIcon from '../../images/editpencilicon.png'

export default function CreateProfilePage({user}) {
    const [showInput, setShowInput] = useState(false)
    const [inputId, setInputId] = useState('')
    const [profiles, setProfiles] = useState([])
    const [foundProfile, setFoundProfile] = useState(null)
    const [newProfile, setNewProfile] = useState({
        name: '',
        message: '',
        rsvp: false
    })
    // index
    const getProfiles = async () => {
        try {
            const response = await fetch('/api/guestbook')
            const data = await response.json()
            setProfiles(data)
        } catch (error) {
            console.error(error)
        }
    }
    // delete
    const deleteProfile = async (id) => {
        try {
            const response = await fetch(`/api/guestbook/${id}`, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const data = await response.json()
            setFoundProfile(data)
        } catch (error) {
            console.error(error)
        }
    }
    // update
    const updateProfile = async (id, updatedData) => {
        try {
            const response = await fetch(`/api/guestbook/${id}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ ...updatedData })
            })
            const data = await response.json()
            setFoundProfile(data)
        } catch (error) {
            console.error(error)
        }
    }
    // create
    const createProfile = async () => {
        try {
            const response = await fetch(`/api/guestbook`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ ...newProfile })
            })
            const data = await response.json()
            setFoundProfile(data)
            setNewProfile({
                name: '',
                message: '',
                rsvp: false
            })
        } catch (error) {
            console.error(error)
        }
    }
    const handleUpdate = (evt) => {
        setFoundProfile({ ...foundProfile, [evt.target.name]: evt.target.value })
    }

    const handleChange = (evt) => {
        setNewProfile({ ...newProfile, [evt.target.name]: evt.target.value, posterId: user._id })
    }

    useEffect(() => {
        getProfiles()
    }, [foundProfile])

    return (
        <>
            Name: {user.name}<img src={editIcon}></img><br />
            Email: {user.email}<img src={editIcon}></img>
        </>
    )
}