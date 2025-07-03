import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import '../Banner/banner.css'

const Banner = () => {
  return (
    <>
    <div id='home' className='hero'>
        <Container>
            <Row>
                <Col>
                    <h1>Pilih Mobil dan Rasakan Perjalanan <br /><span>Bersama Kami</span></h1>
                    <br />
                    <p  id='booking'>Temukan kenyamanan, keamanan, dan pelayanan terbaik dalam setiap perjalanan.</p>
                </Col>
            </Row>
        </Container>
    </div>
    </>
  )
}

export default Banner