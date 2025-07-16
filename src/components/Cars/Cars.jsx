import React, { useEffect, useState } from 'react'
import {Col, Container, Row } from 'react-bootstrap'
import "../Cars/cars.css"
import car1 from "../../assets/images/cars/hiace.jpg"
import car2 from "../../assets/images/cars/hiace.jpg"
import car3 from "../../assets/images/cars/hiace.jpg"
import car4 from "../../assets/images/cars/hiace.jpg"
import car5 from "../../assets/images/cars/hiace.jpg"
import car6 from "../../assets/images/cars/hiace.jpg"
import Slider from "react-slick";
import CarCard from './CarCard'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axiosInstance from '../../core/axiosinstance'

export const carsVIP = [
  {
    id: 1,
    name: "Hiace",
    seat: 15,
    
    price: 850000,
    image: car1,
    type: "VIP"
  },
  {
    id: 2,
    name: "Alphard",
    seat: 7,
    
    price: 1500000,
    image: car2,
    type: "VIP"
  },
  {
    id: 3,
    name: "Zenix",
    seat: 15,
    
    price: 850000,
    image: car1,
    type: "VIP"
  },
  {
    id: 4,
    name: "Innova Reborn",
    seat: 7,
    
    price: 1500000,
    image: car2,
    type: "VIP"
  },
  {
    id: 5,
    name: "Veloz",
    seat: 15,
    
    price: 850000,
    image: car1,
    type: "VIP"
  },
  {
    id: 6,
    name: "CRV",
    seat: 7,
    
    price: 1500000,
    image: car2,
    type: "VIP"
  },
]

export const carsReguler = [
  {
    id: 7,
    name: "Hiace",
    seat: 15,
    
    price: 850000,
    image: car1,
    type: "Reguler"
  },
  {
    id: 8,
    name: "Elf",
    seat: 7,
    price: 1500000,
    image: car2,
    type: "Reguler"
  },
  {
    id: 9,
    name: "Avanza",
    seat: 15,
    
    price: 850000,
    image: car1,
    type: "Reguler"
  },
  {
    id: 10,
    name: "Innova Reborn",
    seat: 7,
    
    price: 1500000,
    image: car2,
    type: "Reguler"
  },
  {
    id: 11,
    name: "Hiace Commuter",
    seat: 15,
   
    price: 850000,
    image: car1,
    type: "Reguler"
  },
  {
    id: 12,
    name: "Xpander",

    seat: 7,
    price: 1500000,
    image: car2,
    type: "Reguler"
  },
  ]

const sliderSettings = {
    dots: false,
    infinite: true,
    autoplay: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  }

  const Cars = () => {
    const [carVIP, setCarVIP] = useState([])
    const [carReguler, setCarReguler] = useState([])

    useEffect(() => {
      const fetchCar = async () => {
        const responseCarReguler = await axiosInstance.get('/api/guest/cars?category_id=2')
        setCarReguler(responseCarReguler.data.data || [])
        
        const responseCarVIP = await axiosInstance.get('/api/guest/cars?category_id=1')
        setCarVIP(responseCarVIP.data.data || [])
      }

      fetchCar()
    }, [])

    return (
      <section id="cars" className='car py-5'>
        <Container>
          {/* Daftar Mobil */}
          <Row className="mb-3">
            <Col>
              <h1 className="text-center fw-bold">Daftar Mobil</h1>
            </Col>
          </Row>
  
          {/* Kategori VIP */}
          <Row className="mb-4">
            <Col><h2 className="fw-semibold fst-italic">Unit VIP</h2></Col>
          </Row>
          <Slider {...sliderSettings}>
            {carVIP.map((car, index) => (
              <CarCard key={index} car={car} />
            ))}
          </Slider>
  
          {/* Kategori Reguler */}
          <Row className="mt-5 mb-4">
            <Col><h2 className="fw-semibold fst-italic">Unit Reguler</h2></Col>
          </Row>
          <Slider {...sliderSettings}>
            {carReguler.map((car, index) => (
              <CarCard key={index} car={car} />
            ))}
          </Slider>
        </Container>
      </section>
    )
  }
  

export default Cars
