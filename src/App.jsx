import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import Header from './components/Common/Header/Header'
import Footer from './components/Common/Footer/Footer'
import CarDetail from './pages/CarDetail/CarDetail'
import ServiceDetail from './pages/ServiceDetail/ServiceDetail'
import HasilPencarian from './pages/HasilPencarian/HasilPencarian';
import Driver from './pages/Driver/Driver';
import CartButton from './components/Common/CartButton/CartButton';
import './index.css'

const App = () => {
  return (
    <>
    {/* <Header />
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/cars/:id' element={<CarDetail />} />
      <Route path='/service/:id' element={<ServiceDetail />} />
      <Route path="/hasil-pencarian" element={<HasilPencarian />} />
      <Route path="/driver" element={<Driver />} />
    </Routes>
    <Footer /> */}

    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <main style={{ flex: '1 0 auto' }}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cars/:id' element={<CarDetail />} />
          <Route path='/service/:id' element={<ServiceDetail />} />
          <Route path="/hasil-pencarian" element={<HasilPencarian />} />
          <Route path="/driver" element={<Driver />} />
        </Routes>
      </main>
      <Footer />
    </div>
      <CartButton />
    </>
  )
}

export default App

