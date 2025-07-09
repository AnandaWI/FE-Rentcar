import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import Header from './components/Common/Header/Header'
import Footer from './components/Common/Footer/Footer'
import CarDetail from './pages/CarDetail/CarDetail'
import ServiceDetail from './pages/ServiceDetail/ServiceDetail'
import HasilPencarian from './pages/HasilPencarian/HasilPencarian';
import Driver from './pages/Driver/Driver';
import './index.css'

const App = () => {
  return (
    <>
    <Header />
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/cars/:id' element={<CarDetail />} />
      <Route path='/service/:id' element={<ServiceDetail />} />
      <Route path="/hasil-pencarian" element={<HasilPencarian />} />
      <Route path="/driver" element={<Driver />} />
    </Routes>
    <Footer />
    </>
  )
}

export default App