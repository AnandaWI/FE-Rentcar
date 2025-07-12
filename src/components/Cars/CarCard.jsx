// src/components/Cars/CarCard.jsx
import React from 'react'
import { Card } from 'react-bootstrap'
import { FaUsers, FaCogs } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

const CarCard = ({ car }) => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/cars/${car.id}`)
  }

  return (
    <div className="px-1">
      <Card 
        className="car-card shadow-sm border-0 rounded-4 overflow-hidden h-100" 
        onClick={handleClick}
        style={{ cursor: 'pointer' }}
      >
        <Card.Img
          src={car.image}
          alt={car.name}
          className="img-fluid"
          style={{ objectFit: 'cover'}}
        />
        <Card.Body className="p-3 d-flex flex-column justify-content-between">
          <div>
            <h5 className="fw-bold mb-1">{car.name}</h5>
            <p className="text-muted mb-2">{car.seat} Seat</p>
            <hr className="my-2" />
          </div>
          <div className="car-info d-flex flex-wrap justify-content-between align-items-center mt-2 gap-2">
            <div className="text-muted d-flex align-items-center gap-1 flex-shrink-0" style={{ fontSize: '1rem' }}>
              <FaUsers /> {car.seat}
            </div>
            <div className="car-price d-flex align-items-center gap-1 fw-semibold flex-shrink-0">
              <span>Mulai Rp {car.price.toLocaleString()}</span>
              <span style={{ fontSize: '0.96rem'}}>/hari</span>
            </div>
          </div>
        </Card.Body>
      </Card>
    </div>
  )
}

export default CarCard
