import React from "react";
import "../Features/features.css";

import feature1 from "../../assets/images/feature/car.png";
import feature2 from "../../assets/images/feature/payment.png";
import feature3 from "../../assets/images/feature/driver.png";
import feature4 from "../../assets/images/feature/time.png";
import { Card, Col, Container, Row } from "react-bootstrap";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const Features = () => {
  var settings = {
    dots: false,
    infinite: true,
    autoplay:true,
    autoplaySpeed:1500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
    
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: false,
          dots: true,
        },
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: false,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          autoplay: true,
          prevArrow:false,
          nextArrow:false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          prevArrow:false,
          nextArrow:false,
        },
      },
    ],
  };

  const featureList = [
    {
      id: 0,
      image: feature1,
      title: "Banyak Pilihan Mobil",
      des: "Temukan berbagai jenis mobil sesuai kebutuhan Anda — dari mobil keluarga hingga VIP, semua tersedia.",
    },
    {
      id: 1,
      image: feature2,
      title: "Pembayaran Mudah & Aman",
      des: "Terintegrasi dengan payment gateway, Anda bisa bayar dengan mudah tanpa ribet.",
    },
    {
      id: 2,
      image: feature3,
      title: " Dengan Driver Berpengalaman",
      des: "Setiap pemesanan termasuk sopir profesional untuk kenyamanan dan keamanan perjalanan Anda.",
    },

    {
      id: 3,
      image: feature4,
      title: "Pesan Cepat & Fleksibel",
      des: "Pesan tanpa login, pilih tanggal dan waktu, dan dapatkan konfirmasi instan.",
    },
  ];

  return (
    <>
    
      <section id='booking'className="feature-section">
        <Container>
          <Row>
            <Col md="12">
              <Slider {...settings}>
                {featureList.map((feature, inx) => {
                  return (
                    <Card key={inx}>
                      <Card.Img
                        variant="top"
                        src={feature.image}
                        className="img-fluid"
                        alt={feature.title}
                      />
                      <Card.Title>{feature.title}</Card.Title>
                      <Card.Text>{feature.des}</Card.Text>
                    </Card>
                  );
                })}
              </Slider>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Features;