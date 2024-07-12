import logo from './logo.svg';
import './ToDoList.css';
import { useHook } from './useHook'
import { useState } from 'react'

function ToDoList() {
  const { listItems, loading, error, postItem, deleteItem, updateItem } = useHook()
  const [newItemText, setNewItemText] = useState("")
  const [updateItemText, setUpdateItemText] = useState("")
  const [updateItemId, setUpdateItemId] = useState(null)

  const addNewItem = async (e) => {
    e.preventDefault()
    await postItem(newItemText)
    setNewItemText("")
  }

  const formatDate = (date) => {
    const dateObject = new Date(date)
    return `${dateObject.getHours()}: ${dateObject.getMinutes()}, ${dateObject.getDate()}/${dateObject.getMonth() + 1} ${dateObject.getFullYear()} `
  }

  const handleUpdate = (e) => {
    e.preventDefault()
    const itemToUpdate = listItems.filter(item => item._id === updateItemId)[0]
    updateItem(itemToUpdate, updateItemText)
    setUpdateItemId(null)
    setUpdateItemText(null)
  }

  return (
    <div className="min-h-screen flex text-center justify-center bg-gray-100">
      <div className='w-full md:w-1/2 p-4'>
        <h1 className='text-4xl font-bold text-orange-400'>Basic To-Do List</h1>
        {listItems.map((item, index) => (
          <div key={index} className="flex flex-row mt-2 p-2 border-b border-gray-300 justify-between">
            <div className='text-left'>
              {updateItemId === item._id ? (
                <form onSubmit={handleUpdate}>
                  <input type="text" value={updateItemText} onChange={(e) => setUpdateItemText(e.target.value)} placeholder='Update item text' 
                  className='p-3 mr-3 border-2 outline-none focus:border-orange-300 flex-grow rounded-md'></input>
                  <input type="submit" value="Update item" className="focus:outline-none hover:cursor-pointer p-3 bg-orange-300 hover:bg-orange-400 text-white font-medium rounded-md transition ease-in-out delay-100"></input>
                </form>
              ) : (
                <p className='text-xl'>{item.content}</p>
              )}
              <p className='text-lg font-bold'>{formatDate(item.createdAt)}</p>
            </div>
            <div>
              {updateItemId !== item._id && (
                <button onClick={() => {setUpdateItemId(item._id); setUpdateItemText(item.content)}} className='focus:outline-none p-3 mr-3 bg-orange-300 hover:bg-orange-400 text-white font-medium rounded-md'>Update item</button>
              )}
              <button onClick={() => deleteItem(item)} className='focus:outline-none p-3 bg-red-300 hover:bg-red-400 text-white font-medium rounded-md'>Delete item</button>
            </div>
          </div>
        ))}

        <form onSubmit={addNewItem} className='mt-3 w-full flex'>
          <input type="text" value={newItemText} onChange={(e) => setNewItemText(e.target.value)} placeholder='New item text' 
          className='p-3 mr-3 border-2 outline-none focus:border-orange-300 flex-grow rounded-md'></input>
          <input type="submit" value="Add new Item" className="focus:outline-none hover:cursor-pointer p-3 bg-orange-300 hover:bg-orange-400 text-white font-medium rounded-md transition ease-in-out delay-100"></input>
        </form>
      </div>
    </div>
  )
}

export default ToDoList
