// src/components/Cars/CarCard.jsx
import React from "react";
import { Card } from "react-bootstrap";
import { FaUsers, FaCogs } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const CarCard = ({ car }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/cars/${car.id}`);
  };

  return (
    <div className="px-1">
      <Card
        className="car-card shadow-sm border-0 rounded-4 overflow-hidden h-100"
        onClick={handleClick}
        style={{ cursor: "pointer" }}
      >
        <Card.Img
          src={car.images[0].img_url}
          alt={car.car_name}
          className="img-fluid"
          style={{ objectFit: "cover" }}
        />
        <Card.Body className="p-3 d-flex flex-column justify-content-between">
          <div>
            <h5 className="fw-bold mb-1">{car.car_name}</h5>
            <p className="text-muted mb-2">{car.capacity} Seat</p>
            <hr className="my-2" />
          </div>
          <div className="car-info d-flex flex-column justify-content-between align-items-start mt-2 gap-2">
            <div
              className="text-muted d-flex align-items-center gap-1 flex-shrink-0"
              style={{ fontSize: "1rem" }}
            >
              <FaUsers /> {car.capacity}
            </div>
            <div className="car-price d-flex align-items-center gap-1 fw-semibold flex-shrink-0">
              <span>
                Mulai Rp {parseFloat(car.rent_price).toLocaleString("id-ID")}
              </span>
              <span style={{ fontSize: "0.96rem" }}>/hari</span>
            </div>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default CarCard;
