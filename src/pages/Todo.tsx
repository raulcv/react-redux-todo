import React from 'react'
import { useNavigate } from 'react-router-dom';
import TodoForm from '../components/todo/TodoForm';
function Todo() {
  const navigate = useNavigate()
  const handleReturn = () => {
    navigate("/")
  }
  return (
    <div>
      <button onClick={handleReturn}
        className='p-2 rounded-lg border hover:border-pink-500'
      >Back</button>
      <TodoForm />
    </div>
  )
}

export default Todo