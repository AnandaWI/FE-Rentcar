import React from 'react'
import { Col, Row } from 'react-bootstrap'
import Slider from "react-slick"
import CarCard from './CarCard'
import car1 from "../../assets/images/cars/hiace.jpg"

const carsReguler = [
  {
    id: 7,
    name: "Hiace",
    seat: 15,
    transmission: "Manual",
    price: 850000,
    image: car1,
    type: "Reguler"
  },
  // ... existing code ...
]

const CarsReguler = ({ sliderSettings }) => {
  return (
    <>
      <Row className="mt-5 mb-4">
        <Col><h2 className="fw-semibold fst-italic">Unit Reguler</h2></Col>
      </Row>
      <Slider {...sliderSettings}>
        {carsReguler.map((car, index) => (
          <CarCard key={index} car={car} />
        ))}
      </Slider>
    </>
  )
}

export { carsReguler }
export default CarsReguler