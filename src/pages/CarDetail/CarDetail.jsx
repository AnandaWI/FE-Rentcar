import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { FaUsers, FaCogs } from "react-icons/fa";
import { useParams } from "react-router-dom";
import "./cardetail.css";
import Header from "../../components/Common/Header/Header";
import { carsVIP, carsReguler } from "../../components/Cars/Cars";
import axiosInstance from "../../core/axiosinstance";

const CarDetail = () => {
  const { id } = useParams();

  const [dataCar, setDataCar] = useState({});
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchCar = async () => {
      const response = await axiosInstance.get(`/api/guest/cars/${id}`);
      setDataCar(response.data.data);
      setImages([
        response.data.data.images[0].img_url,
        response.data.data.images[1].img_url,
        response.data.data.images[2].img_url,
      ]);
    };

    fetchCar();
  });

  // Mencari mobil berdasarkan ID dari kedua array
  // const car = [...carsVIP, ...carsReguler].find(car => car.id === parseInt(id))

  if (!dataCar) {
    return <div>Mobil tidak ditemukan</div>;
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
                  src={images[0]}
                  alt={`${dataCar.car_name} - Main`}
                  className="img-fluid"
                  style={{ objectFit: "cover", height: "400px", width: "100%" }}
                />
              </Card>
              <Row className="g-3">
                <Col xs={6}>
                  <Card className="border-0 rounded-4 overflow-hidden shadow-sm">
                    <Card.Img
                      src={images[1]}
                      alt={`${dataCar.car_name} - Side`}
                      className="img-fluid"
                      style={{
                        objectFit: "cover",
                        height: "190px",
                        width: "100%",
                      }}
                    />
                  </Card>
                </Col>
                <Col xs={6}>
                  <Card className="border-0 rounded-4 overflow-hidden shadow-sm">
                    <Card.Img
                      src={images[2]}
                      alt={`${dataCar.car_name} - Back`}
                      className="img-fluid"
                      style={{
                        objectFit: "cover",
                        height: "190px",
                        width: "100%",
                      }}
                    />
                  </Card>
                </Col>
              </Row>
            </div>
          </Col>
          <Col lg={6}>
            <div className="h-100 d-flex flex-column">
              <h2 className="fw-bold mb-3">{dataCar.car_name}</h2>
              <div className="car-info d-flex gap-4 mb-3">
                <div className="d-flex align-items-center gap-2">
                  <FaUsers className="text-primary" size={24} />
                  <span className="fw-medium">{dataCar.capacity} Seat</span>
                </div>
              </div>
              <p className="text-muted mb-4">
                {dataCar.car_name} adalah pilihan sempurna untuk perjalanan
                Anda. Dengan {dataCar.capacity} kursi yang nyaman, dan kualitas
                VIP, mobil ini ideal untuk berbagai keperluan perjalanan Anda.
              </p>
              <h4 className="fw-bold mb-3">Fitur Utama</h4>
              <ul className="list-unstyled mb-4">
                {dataCar?.features?.map((feature, index) => (
                  <li
                    key={index}
                    className="mb-2 d-flex align-items-center gap-2"
                  >
                    {" "}
                    <span className="bullet-poin">•</span>
                    {feature.feature}
                  </li>
                ))}
              </ul>
              <div className="car-price">
                <h3 className="fw-bold mb-0">
                  <span className="fs-5 fw-normal">Mulai dari </span>
                  <span className="gold-text">
                    Rp {parseFloat(dataCar.rent_price).toLocaleString("id-ID")}
                  </span>
                  <span className="fs-5 fw-normal">/hari</span>
                </h3>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default CarDetail;
