import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import todos from '../../utils/todos.json'
export interface TodoState {
  id: number
  content: string
  done: boolean
}

const todoInitiailState: TodoState[] = todos.sort((a, b) => b.id - a.id)

export const todoSlice = createSlice({
  name: "todo",
  initialState: todoInitiailState,
  reducers: {
    addTodo: (state, action) => {
      const newTodo = { id: state.length + 1, ...action.payload }
      // console.log(newTodo)
      state.push(newTodo)
    },
    deleteTodo: (state, action) => {
      const id = action.payload
      const todoFound = state.find(todo => todo.id === action.payload)
      if (todoFound) state.splice(state.indexOf(todoFound), 1)
      // console.log(id)
    },
    editTodo: (state, action) => {
      const { id, content, done } = action.payload
      const todoFound = state.find(todo => todo.id === id)
      console.log(action.payload)
      if (todoFound) {
        todoFound.content = content
        todoFound.done = done
      }
      // if (todoFound) state.splice(state.indexOf(todoFound), 1)
    },
    toggleDontodo: (state, action) => {
      const todoFound = state.find(todo => todo.id === action.payload)
      if (todoFound) todoFound.done = !todoFound.done
    }
  }

})

export const { addTodo, deleteTodo, editTodo, toggleDontodo } = todoSlice.actions

export default todoSlice.reducer