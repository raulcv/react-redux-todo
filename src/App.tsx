import React, { useEffect, useState } from 'react';
import './App.css';
import Main from './pages/Main'
import Todo from './pages/Todo'
import ThemeComponent from "./themeComponent"
import { BrowserRouter, Route, Routes} from 'react-router-dom'

function App() {
  return (
    <div className="App bg-white dark:bg-black" >
      <div className='max-w-7xl m-auto p-4'>
        <div className='items-center dark:text-white'>
          <div className='flex justify-end'>
            <ThemeComponent />
          </div>
          <BrowserRouter>
            <Routes>
              <Route path='/' element={< Main />} />
              <Route path='/todo' element={<Todo />} />
              <Route path='/todo/:id' element={<Todo />} />
            </Routes>
          </BrowserRouter>
        </div>
      </div>
    </div>
  );
}

export default App;
