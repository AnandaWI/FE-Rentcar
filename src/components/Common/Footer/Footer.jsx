import React, { useState } from "react";
import "../Footer/footer.css"
import { Col, Container, Row ,ListGroup} from "react-bootstrap";
import { NavLink } from "react-router-dom";

const Footer = () => {
  const [visible, setVisible]=useState(false);

  const toggleVisible=()=>{
    const scrolled = document.documentElement.scrollTop;
    if(scrolled > 300){
      setVisible(true)
    }
   else if(scrolled  <= 300){
      setVisible(false)
    }
  }

  const scrollTop =()=>{
    window.scrollTo({
      top:0,
      behavior:"smooth"
    })
  }

  if(typeof window !== "undefined"){
    window.addEventListener("scroll", toggleVisible)
  }


  return (
    <>
    <footer className="pt-5">
      <Container>
        <Row>
          <Col md="6" sm="12" className="quick_link mt-3 mt-md-0 ">
            <h3 className="mt-lg-0 mt-sm-3 fst-italic">AEM RentCar </h3>
            <p>
              Kami adalah perusahaan rental mobil yang berdedikasi untuk memberikan solusi transportasi terbaik bagi pelanggan di berbagai kebutuhan perjalanan. Sejak awal berdiri, kami berkomitmen menghadirkan layanan berkualitas tinggi dengan armada kendaraan yang terawat dan beragam, mulai dari mobil ekonomis hingga kendaraan premium.
            </p>
          </Col>
          <Col md="3" sm="12" className="quick_link mt-3 mt-md-0 ">
          <h4 className="mt-lg-0 mt-sm-3">Quick Link </h4>
          <ListGroup variant="flush">
              <ListGroup.Item>
                <NavLink to="/#home"> Home</NavLink>
              </ListGroup.Item>
              <ListGroup.Item>
              <NavLink to="/#booking">Booking </NavLink>
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md="3" sm="12" className="location mt-3 mt-md-0 ">
          <h4 className="mt-lg-0 mt-sm-3">Contact Info </h4>

          <div className="d-flex align-items-center">
            <p className="pb-2"> Semarang, Jawa Tengah, Indonesia</p>
          </div>

          <div className="d-flex align-items-top my-2">
          <i className="bi bi-geo-alt me-3"></i>
          <a target="_blank" href="mailto:rawatcoder@gmail.com" className="d-block" >aemrentcar@gmail.com</a>
          </div>
          <div className="d-flex align-items-top ">
          <i className="bi bi-telephone me-3"></i>
          <a target="_blank" href="tel:9876543210" className="d-block" >081900000</a>
          </div>
         
          </Col>
        </Row>
        <Row className="py-2 bdr mt-3">
        <Col className="col copyright">
        <p className="text-light text-center">   @ 2025. AEM Rentcar All rights reserved </p> 
        </Col>
        </Row>

      </Container>
    </footer>

    <div id="back-top"
    onClick={scrollTop}
     className={visible ? "active" : ""}>
    <i className="bi bi-arrow-up"></i>

    </div>
    </>
  );
};

export default Footer;