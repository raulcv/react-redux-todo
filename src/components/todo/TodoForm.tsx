import React, { ChangeEvent, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { RootState } from '../../app/store'
import { addTodo, editTodo } from '../../features/todo/todoSlice'


function TodoForm() {
  const [todoState, setTodoSate] = useState({
    content: "",
    done: false
  })
  const dispatch = useDispatch()
  const naviagte = useNavigate()
  const params = useParams()

  const todos = useSelector((state: RootState) => state.todos)

  const handleOnChangeContent = (e: ChangeEvent<HTMLTextAreaElement>) => {
    console.log(e.target.value)
    setTodoSate({
      ...todoState, [e.target.name]: e.target.value
    })
  }
  const handleOnChangeDone = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.checked)
    setTodoSate({
      ...todoState, [e.target.name]: e.target.checked
    })
  }
  const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(todoState)
    if (params.id) {
      dispatch(editTodo({ ...todoState, id: Number(params.id) }))
    } else {
      dispatch(addTodo(todoState))
    }
    naviagte("/")
  }

  useEffect(() => {
    const foundTodo = todos.find((todo) => todo.id === Number(params.id)) || { content: "", done: false }
    setTodoSate(foundTodo)
    console.log(foundTodo)
  }, [params, todos])

  return (
    <div className='flex-col'>
      <h2 className='grid gap-4 mb-4 p-2 place-content-center text-2xl'>Add a new Todo</h2>

      <form onSubmit={handleSubmit} className='grid m-auto max-w-xl'>
        <div>
          <label htmlFor="about" className="block text-sm font-medium text-purple-400">
            Todo
          </label>
          <div className="mt-1">
            <textarea
              id="textContent"
              name="content"
              rows={4}
              className="p-2 resize mt-1 block w-full rounded-md bg-slate-50 dark:bg-slate-700 border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Type a todo here"
              defaultValue={''}
              value={todoState.content}
              onChange={(e) => handleOnChangeContent(e)}
            />
          </div>
        </div>
        <div className='gap-3'>
          <div className="flex gap-2 py-2 justify-end">
            <label htmlFor="done" className="ml-2 block text-sm">
              {`${todoState.done ? "Check as un-done" : "Check as Done"}`}
            </label>
            <input
              id="done"
              name="done"
              type="checkbox"
              className="h-5 w-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              checked={todoState.done} onChange={handleOnChangeDone}
            />
          </div>
          <div className='max-w-xs m-auto text-center'>
            <button className='p-2 rounded-lg border border-gray-300 hover:border-indigo-800 sm:text-sm'>Save Todo</button>
          </div>
        </div>

      </form>
    </div>
  )
}

export default TodoForm