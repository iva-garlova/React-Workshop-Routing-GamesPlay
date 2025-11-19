
import { Routes, Route } from 'react-router'
import './App.css'
import Header from './components/Header/Header'
import Home from './components/home/Home'
import Login from './components/login/Login'
import GameCreate from './components/game-create/GameCreate'
import GameEdit from './components/game-edit/GameEdit'
import GameDetails from './components/game-details/GameDetails'
import Games from './components/games/Games'
import Register from './components/register/Register'
import { useState } from 'react'


function App() {
  const [email, setEmail] = useState();

  const userLoginHalndler = (email) => {
   setEmail(email);
  }

  return (
    <div id='box'>
      <Header />

      <main id="main-content">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login onLogin={userLoginHalndler}/>} />
          <Route path='/register' element={<Register />} />
          <Route path='/games/create' element={<GameCreate />} />
          <Route path='/games/:gameId/details' element={<GameDetails email={email}/>} />
          <Route path='/games/:gameId/edit' element={<GameEdit />} />
          <Route path='/games/edit' element={<GameEdit />} />
          <Route path='/games' element={<Games />} />
        </Routes>
        
      </main>
    </div>
  )
}

export default App
