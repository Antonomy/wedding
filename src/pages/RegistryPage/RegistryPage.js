/*
Create
Read (Index & Show)
Update
Destroy
*/
import { useState, useEffect } from 'react'
import './RegistryPage.module.scss'

export default function RegistryPage (props) {
  const [registries, setRegistries] = useState([])
  const [foundRegistry, setFoundRegistry] = useState(null)
  const [newRegistry, setNewRegistry] = useState({
    name: '',
    link: ''
  })
  // index
  const getRegistries = async () => {
    try {
      const response = await fetch('/api/registries')
      const data = await response.json()
      setRegistries(data)
    } catch (error) {
      console.error(error)
    }
  }
  // delete
  const deleteRegistry = async (id) => {
    try {
      const response = await fetch(`/api/registries/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const data = await response.json()
      setFoundRegistry(data)
    } catch (error) {
      console.error(error)
    }
  }
  // update
  const updateRegistry = async (id, updatedData) => {
    try {
      const response = await fetch(`/api/registries/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...updatedData })
      })
      const data = await response.json()
      setFoundRegistry(data)
    } catch (error) {
      console.error(error)
    }
  }
  // create
  const createRegistry = async () => {
    try {
      const response = await fetch('/api/registries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...newRegistry })
      })
      const data = await response.json()
      setFoundRegistry(data)
      setNewRegistry({
        name: '',
        link: ''
      })
    } catch (error) {
      console.error(error)
    }
  }

  const handleChange = (evt) => {
    setNewRegistry({ ...newRegistry, [evt.target.name]: evt.target.value })
  }

  useEffect(() => {
    getRegistries()
  }, [foundRegistry])

  return (
    <>
      {
                registries && registries.length
                  ? (<ul>
                    {
                        registries.map((registry) => {
                          return (
                            <li key={registry._id}>
                              Registry: {registry.name} Link:{registry.link}
                              <br /><button onClick={() => deleteRegistry(registry._id)}>Delete This Registry</button>
                            </li>
                          )
                        })
                    }
                  </ul>)
                  : <h1>No Registries Yet Add One Below</h1>
            }
      {'Name '}<input value={newRegistry.name} onChange={handleChange} name='name' /><br />
      {'Link '}<input value={newRegistry.link} onChange={handleChange} name='link' /><br />
      <button onClick={() => createRegistry()}>Create A New Registry</button>
    </>
  )
}
