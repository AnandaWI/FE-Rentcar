import React from 'react'
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

const carsVIP = [
  {
    name: "Hiace",
    seat: 15,
    transmission: "Manual",
    price: 850000,
    image: car1
  },
  {
    name: "Alphard",
    seat: 7,
    transmission: "Matic",
    price: 1500000,
    image: car2
  },
  {
    name: "Fortuner",
    seat: 7,
    transmission: "Manual",
    price: 1200000,
    image: car3
  },
  {
    name: "Innova",
    seat: 7,
    transmission: "Matic",
    price: 950000,
    image: car4
  },
  {
    name: "Pajero",
    seat: 7,
    transmission: "Matic",
    price: 950000,
    image: car5
  },
  {
    name: "Zenix",
    seat: 7,
    transmission: "Matic",
    price: 950000,
    image: car6
  },
]

const carsReguler = [
    {
      name: "Hiace",
      seat: 15,
      transmission: "Manual",
      price: 850000,
      image: car1
    },
    {
      name: "Alphard",
      seat: 7,
      transmission: "Manual",
      price: 1500000,
      image: car2
    },
    {
      name: "Fortuner",
      seat: 7,
      transmission: "Manual",
      price: 1200000,
      image: car3
    },
    {
      name: "Innova",
      seat: 7,
      transmission: "Matic",
      price: 950000,
      image: car4
    },
    {
      name: "Pajero",
      seat: 7,
      transmission: "Matic",
      price: 950000,
      image: car5
    },
    {
      name: "Zenix",
      seat: 7,
      transmission: "Matic",
      price: 950000,
      image: car6
    },
  ]

const sliderSettings = {
    dots: false,
    infinite: true,
    autoplay: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
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
            {carsVIP.map((car, index) => (
              <CarCard key={index} car={car} />
            ))}
          </Slider>
  
          {/* Kategori Reguler */}
          <Row className="mt-5 mb-4">
            <Col><h2 className="fw-semibold fst-italic">Unit Reguler</h2></Col>
          </Row>
          <Slider {...sliderSettings}>
            {carsReguler.map((car, index) => (
              <CarCard key={index} car={car} />
            ))}
          </Slider>
        </Container>
      </section>
    )
  }
  

export default Cars
