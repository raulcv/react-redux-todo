import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../app/store'
import { deleteTodo, toggleDontodo } from '../../features/todo/todoSlice'
import { useNavigate } from 'react-router-dom'

function TodoList() {
  const todos = useSelector((state: RootState) => state.todos)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleDelete = (id: number) => {
    dispatch(deleteTodo(id))
  }

  const handleCreate = () => {
    navigate("/todo")
  }
  const handleEdit = (id: number) => {
    navigate(`todo/${id}`)
  }
  const handleDone = (id: number) => {
    dispatch(toggleDontodo(id))
  }
  return (
    <div className='flex-col'>
      <div className='grid gap-4 mb-4 p-2 place-content-center'>
        <h1 className='text-center text-2xl'>These are all todos</h1>
        <button onClick={handleCreate}
          className='p-2 rounded-lg bg-indigo-500 shadow-lg shadow-indigo-500/50 text-white' >Create a new Todo</button>
      </div>
      <div className='grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-flow-col-1 grid-flow-dense gap-6'>
        {
          todos.map((todo) =>
            <div key={todo.id}
              className='relative mt-1 rounded-md shadow-sm border border-indigo-200 p-2 grid justify-items-end'>
              <p>{todo.content}</p>
              <div className="flex items-end gap-2 justify-end py-2">
                <label htmlFor="done" className="ml-2 block text-sm ">
                  {`${todo.done ? "Completed" : "Non-Completed"}`}
                </label>
                <input
                  id="done"
                  name="done"
                  type="checkbox"
                  className="h-5 w-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  onChange={() => handleDone(todo.id)} checked={todo.done}
                />
              </div>
              <div className='flex gap-5 justify-end items-end'>
                <button className='p-2 px-4 rounded-lg border hover:border-pink-500'
                  type='button' onClick={() => handleDelete(todo.id)}>Delete</button>
                <button className='p-2 rounded-lg border hover:border-purple-500'
                  type='button' onClick={() => handleEdit(todo.id)}>Modify</button>
              </div>
            </div>
          )
        }
      </div>
    </div>
  )
}

export default TodoList