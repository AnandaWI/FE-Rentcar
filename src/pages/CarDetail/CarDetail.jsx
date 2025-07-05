import React from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap'
import { FaUsers, FaCogs } from 'react-icons/fa'
import { useParams } from 'react-router-dom'
import './cardetail.css'
import Header from '../../components/Common/Header/Header'

const CarDetail = () => {
  const { id } = useParams()
  // Contoh data mobil (nanti bisa diganti dengan data dari API atau props)
  const car = {
    id: id,
    name: 'Toyota Hiace',
    seat: 16,
    transmission: 'Manual',
    price: 500000,
    image: '/hiace.jpg',
    images: [
      '/hiace.jpg',
      '/depan.jpg',
      '/tes.jpg'
    ],
    description: 'Toyota Hiace adalah pilihan sempurna untuk perjalanan kelompok besar. Dengan 16 kursi yang nyaman, transmisi manual yang handal, dan ruang yang luas, mobil ini ideal untuk tur, perjalanan bisnis, atau acara keluarga.',
    features: [
      'AC Double Blower',
      'Audio System',
      'Comfortable Seats',
      'Large Luggage Space',
      'Safety Features'
    ]
  }

  return (
    <>
    <Header />
    <Container className="py-5 mt-6">
      <Row className="g-4">
        <Col lg={6}>
          <div className="car-images d-flex flex-column gap-3">
            <Card className="border-0 rounded-4 overflow-hidden shadow-sm">
              <Card.Img
                src={car.images[0]}
                alt={`${car.name} - Main`}
                className="img-fluid"
                style={{ objectFit: 'cover', height: '400px', width: '100%' }}
              />
            </Card>
            <Row className="g-3">
              <Col xs={6}>
                <Card className="border-0 rounded-4 overflow-hidden shadow-sm">
                  <Card.Img
                    src={car.images[1]}
                    alt={`${car.name} - Side`}
                    className="img-fluid"
                    style={{ objectFit: 'cover', height: '190px', width: '100%' }}
                  />
                </Card>
              </Col>
              <Col xs={6}>
                <Card className="border-0 rounded-4 overflow-hidden shadow-sm">
                  <Card.Img
                    src={car.images[2]}
                    alt={`${car.name} - Back`}
                    className="img-fluid"
                    style={{ objectFit: 'cover', height: '190px', width: '100%' }}
                  />
                </Card>
              </Col>
            </Row>
          </div>
        </Col>
        <Col lg={6}>
          <div className="h-100 d-flex flex-column">
            <h2 className="fw-bold mb-3">{car.name}</h2>
            <div className="car-info d-flex gap-4 mb-3">
              <div className="d-flex align-items-center gap-2">
                <FaUsers className="text-primary" size={24} />
                <span className="fw-medium">{car.seat} Seat</span>
              </div>
              <div className="d-flex align-items-center gap-2">
                <FaCogs className="text-primary" size={24} />
                <span className="fw-medium">{car.transmission}</span>
              </div>
            </div>
            <p className="text-muted mb-4">{car.description}</p>
            <h4 className="fw-bold mb-3">Fitur Utama</h4>
            <ul className="list-unstyled mb-4">
              {car.features.map((feature, index) => (
                <li key={index} className="mb-2 d-flex align-items-center gap-2">
                  <span className="bullet-poin">•</span>
                  {feature}
                </li>
              ))}
            </ul>
            <div className="car-price mt-auto">
              <h3 className="fw-bold mb-0">
                Rp {car.price.toLocaleString()}
                <span className="fs-5 fw-normal">/hari</span>
              </h3>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
    </>
  )
}

export default CarDetail