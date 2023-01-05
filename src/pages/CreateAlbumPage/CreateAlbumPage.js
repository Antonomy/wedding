/*
Create
Read (Index & Show)
Update
Destroy
*/
import { useState, useEffect } from 'react'
import './CreateAlbumPage.module.scss';

export default function CreateAlbumPage(props) {
    const [albums, setAlbums] = useState([])
    const [foundAlbum, setFoundAlbum] = useState(null)
    const [newAlbum, setNewAlbum] = useState({
        name: '',
        photographer: '',
        client: '',
        photos: '',
        released: false
    })
    // index
    const getAlbums = async () => {
        try {
            const response = await fetch('/api/albums')
            const data = await response.json()
            setAlbums(data)
        } catch (error) {
            console.error(error)
        }
    }
    // delete
    const deleteAlbum = async (id) => {
        try {
            const response = await fetch(`/api/albums/${id}`, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const data = await response.json()
            setFoundAlbum(data)
        } catch (error) {
            console.error(error)
        }
    }
    // update
    const updateAlbum = async (id, updatedData) => {
        try {
            const response = await fetch(`/api/albums/${id}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ ...updatedData })
            })
            const data = await response.json()
            setFoundAlbum(data)
        } catch (error) {
            console.error(error)
        }
    }
    // create
    const createAlbum = async () => {
        try {
            const response = await fetch(`/api/albums`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ ...newAlbum })
            })
            const data = await response.json()
            setFoundAlbum(data)
            setNewAlbum({
                name: '',
                photographer: '',
                client: '',
                photos: '',
                released: false
            })
        } catch (error) {
            console.error(error)
        }
    }

    const handleChange = (evt) => {
        setNewAlbum({ ...newAlbum, [evt.target.name]: evt.target.value })
    }

    useEffect(() => {
        getAlbums()
    }, [foundAlbum])

    return (
        <>
            {
                albums && albums.length ? (<ul>
                    {
                        albums.map((album) => {
                            return (
                                <li key={album._id}>
                                    Album: {album.name} Photographer:{album.photographer} client:{album.client} {album.released ? 'and its published' : 'its not published'}
                                    <br /><button onClick={() => deleteAlbum(album._id)}>Delete This Album</button>
                                </li>
                            )
                        })
                    }
                </ul>) : <h1>No Albums Yet Add One Below</h1>
            }
            {'Name '}<input value={newAlbum.name} onChange={handleChange} name="name"></input><br />
            {'Photographer '}<input value={newAlbum.photographer} onChange={handleChange} name="photographer"></input><br />
            {'Client '}<input value={newAlbum.client} onChange={handleChange} name="client"></input><br />
            {'Released '}<input type="checkbox" checked={newAlbum.released} onChange={(evt) => setNewAlbum({ ...newAlbum, released: evt.target.checked })}></input><br />
            <button onClick={() => createAlbum()}>Create A New Album</button>
        </>
    )
}