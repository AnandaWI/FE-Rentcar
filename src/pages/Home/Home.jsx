import React from 'react'
import Banner from '../../components/Banner/Banner'
import BookingSearch from '../../components/BookingSearch/BookingSearch'
import Features from '../../components/Features/Features'
import Cars from '../../components/Cars/Cars'
import { Container, Row, Col } from 'react-bootstrap'
import '../Home/home.css'
import Header from '../../components/Common/Header/Header'
import Service from '../../components/Service/Service'

const Home = () => {
  return (
    <>
    <Header />
    <Banner />
    <BookingSearch />
    <Features />
    <Cars />

    <Service />

    <section id='contact' className="call_us">
      <Container>
        <Row className="align-item-center ">
            <Col md={8}>
              <h5 className='title'>Call To Action</h5>
              <h2 className='heading'>Siap Memulai Perjalanan Nyaman Bersama Kami?</h2>
              <p className='text'>Nikmati pengalaman rental mobil terbaik dengan pilihan kendaraan premium, sopir berpengalaman, dan proses pemesanan yang mudah. Klik tombol Contact Us untuk pesan sekarang atau hubungi kami untuk info lebih lanjut.
              Jangan lewatkan kenyamanan yang Anda dan keluarga layak dapatkan!</p>
            </Col>
            <Col md={4} className='text-center mt-3 mt-md-0'>
              <a href='https://wa.me/6285900201214?text=Halo%20saya%20ingin%20memesan%20mobil'
              className='secondary_btn bounce' rel='no'
              >
                Contact Us !
              </a>
            </Col>
        </Row>
      </Container>
    </section>

    

    </>
  )
}

export default Home