import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import "../Cars/cars.css";
// ✅ Gunakan file gambar yang benar-benar ada

import Slider from "react-slick";
import CarCard from "./CarCard";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axiosInstance from "../../core/axiosinstance";

const sliderSettings = {
  dots: false,
  infinite: false,
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
      },
    },
    {
      breakpoint: 576,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
};

const Cars = () => {
  const [carVIP, setCarVIP] = useState([]);
  const [carReguler, setCarReguler] = useState([]);

  useEffect(() => {
    const fetchCar = async () => {
      const responseCarReguler = await axiosInstance.get(
        "/api/guest/cars?category_id=2"
      );
      setCarReguler(responseCarReguler.data.data || []);

      const responseCarVIP = await axiosInstance.get(
        "/api/guest/cars?category_id=1"
      );
      setCarVIP(responseCarVIP.data.data || []);
    };

    fetchCar();
  }, []);

  return (
    <section id="cars" className="car py-5">
      <Container>
        {/* Daftar Mobil */}
        <Row className="mb-3">
          <Col>
            <h1 className="text-center fw-bold">Daftar Mobil</h1>
          </Col>
        </Row>

        {/* Kategori VIP */}
        <Row className="mb-4">
          <Col>
            <h2 className="fw-semibold fst-italic">Unit VIP</h2>
          </Col>
        </Row>
        <Slider {...sliderSettings}>
          {carVIP.map((car, index) => (
            <CarCard key={index} car={car} />
          ))}
        </Slider>

        {/* Kategori Reguler */}
        <Row className="mt-5 mb-4">
          <Col>
            <h2 className="fw-semibold fst-italic">Unit Reguler</h2>
          </Col>
        </Row>
        <Slider {...sliderSettings}>
          {carReguler.map((car, index) => (
            <CarCard key={index} car={car} />
          ))}
        </Slider>
      </Container>
    </section>
  );
};

export default Cars;
