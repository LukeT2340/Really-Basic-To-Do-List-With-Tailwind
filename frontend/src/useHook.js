import React, { useState, useEffect } from "react"

// Each function uses fetch to perform CRUD operations on the backend api. If successful it also updates the 'listItems' list.
export const useHook = () => {
    const [listItems, setListItems] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const updateItem = async (item, newText) => {
        try {
            const response = await fetch("http://localhost:3001/api/updateItem", {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    itemId: item._id,
                    newText
                })
            })

            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.message || "An unknown server error occured")
            }

            const updatedItem = { ...item, content: newText }
            const updatedList = listItems.map(item => (item._id === updatedItem._id ? updatedItem : item))
            setListItems(updatedList)
        } catch (error) {
            console.log(error)
            setError(error)
        }
    }

    const deleteItem = async (item) => {
        try {
            const response = await fetch(`http://localhost:3001/api/deleteItem/${item._id}`, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                }
            })

            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.message || "An unknown server error occured")
            }

            setListItems(prevItems => prevItems.filter(oldItems => oldItems._id !== item._id))
        } catch (error) {
            console.log(error)
            setError(error)
        }
    }

    const postItem = async (text) => {
        const body = { text }
        try {
            const response = await fetch("http://localhost:3001/api/createItem", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            })

            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.message || 'Unknown server error. Please try again later.')
            }

            const item = await response.json()
            setListItems(prevItems => [...prevItems, item]);
        } catch (error) {
            console.log(error)
            setError(error)
        }
    }

    const fetchItems = async () => {
        setLoading(true)
        setError(null)
        try { 
            const response = await fetch("http://localhost:3001/api/fetchItems", {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.message || 'Unknown server error. Please try again later.')
            }

            const items = await response.json()
            setListItems(items)
        } catch (error) {
            console.log(error)
            setError(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchItems()
    }, [])

    return { listItems, loading, error, postItem, deleteItem, updateItem }
}