import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import Header from './components/Common/Header/Header'
import Footer from './components/Common/Footer/Footer'
import './index.css'

const App = () => {
  return (
    <>
    {/* <Header /> */}
    <Routes>
      <Route path='/' element={<Home />} />
    </Routes>
    <Footer />
    </>
  )
}

export default App