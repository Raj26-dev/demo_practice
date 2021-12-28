import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBars from './NavBar/NavBars';
import Card from './Ecommerce/Component/Card'
import Imgs from './Img/Img'
import Home from './NavBar/Home';
import SignUp from './NavBar/SignUp';
import Add from './Crud/Add';

const App = () => {
  return (
    <Router>
    <NavBars />
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/shopping' element={<Card/>} />
      <Route path='/events' element={<Imgs/>} />
      <Route path='/add' element={<Add/>}/>
      <Route path='/sign-up' element={<SignUp/>} />
    </Routes>
  </Router>
  )
}

export default App

