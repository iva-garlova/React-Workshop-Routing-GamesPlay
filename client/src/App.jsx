
import { Routes, Route } from 'react-router'
import './App.css'
import Header from './components/Header/Header'
import Home from './components/home/Home'
import Login from './components/login/Login'

import { UserContext } from './contexts/UserContext.js'

import GameCreate from './components/game-create/GameCreate'
import GameEdit from './components/game-edit/GameEdit'
import GameDetails from './components/game-details/GameDetails'
import Games from './components/games/Games'
import Register from './components/register/Register'
import { useState } from 'react'
import Logout from './components/logout/Logout.jsx'


function App() {
  const [authData, setAuthData] = useState({});

  const userLoginHandler = (resultData) => {
   setAuthData(resultData);
 
   
  }

  return (
    <UserContext.Provider value={{...authData, userLoginHandler}}>
    <div id='box'>
      <Header />

      <main id="main-content">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login/>} />
          <Route path='/register' element={<Register />} />
          <Route path='/games/create' element={<GameCreate />} />
          <Route path='/games/:gameId/details' element={<GameDetails />} />
          <Route path='/games/:gameId/edit' element={<GameEdit />} />
          <Route path='/games/edit' element={<GameEdit />} />
          <Route path='/games' element={<Games />} />
          <Route path='/logout' element={<Logout />} />
        </Routes>
        
      </main>
    </div>
    </UserContext.Provider>
  )
}

export default App
