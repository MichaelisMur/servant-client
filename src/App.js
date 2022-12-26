import React from 'react'
import './style/App.css'
import {Routes, Route} from 'react-router-dom'
import Main from './Main'
import PostPage from './PostPage'
import Create from './Create'

const App = () => {
  return(
      <Routes>
        <Route exact path='/' element={<Main/>}/>
        <Route exact path='/create' element={<Create/>}/>
        <Route exact path='/post/:id' element={<PostPage/>}/>
      </Routes>
  )
}

export default App;