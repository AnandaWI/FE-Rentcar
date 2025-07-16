import React, { useEffect, useState } from "react";
import "../Features/features.css";
import { Card, Col, Container, Row } from "react-bootstrap";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import feature1 from "../../assets/images/feature/car.png";
import feature2 from "../../assets/images/feature/payment.png";
import feature3 from "../../assets/images/feature/driver.png";
import feature4 from "../../assets/images/feature/time.png";
import axiosInstance from "../../core/axiosinstance";

const Features = () => {
  const [featureList, setFeatureList] = useState([])

  useEffect(() => {
    axiosInstance.get('/api/guest/features')
      .then(response => {
        setFeatureList(response.data.data);
      })
      .catch(error => {
        console.error('Error fetching features:', error);
      });
  }, []);

  var settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 1500,
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
          prevArrow: false,
          nextArrow: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          prevArrow: false,
          nextArrow: false,
        },
      },
    ],
  };

  return (
    <>
      <section id='booking' className="feature-section">
        <Container>
          <Row>
            <Col md="12">
              <Slider {...settings}>
                {featureList.map((feature, inx) => {
                  return (
                    <Card key={inx}>
                      <Card.Img
                        variant="top"
                        src={feature.img_url}
                        className="img-fluid"
                        alt={feature.name}
                      />
                      <Card.Title>{feature.name}</Card.Title>
                      <Card.Text>{feature.description}</Card.Text>
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