import React from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import './servicedetail.css'
import Header from '../../components/Common/Header/Header'

import bandara from "../../assets/images/service/bandara.jpg";
import wisata from "../../assets/images/service/wisata.jpg";
import kunjungan_kerja from "../../assets/images/service/kunjungan_kerja.jpg";
import pernikahan from "../../assets/images/service/pernikahan.jpg";

const serviceData = [
  {
    id: 1,
    name: 'Bandara',
    images: [bandara, bandara, bandara],
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro reprehenderit consectetur, quia pariatur nulla fugit? Fugit labore officia accusantium perspiciatis velit sed!'
  },
  {
    id: 2,
    name: 'Wisata/Religi',
    images: [wisata, wisata, wisata],
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro reprehenderit consectetur, quia pariatur nulla fugit? Fugit labore officia accusantium perspiciatis velit sed!'
  },
  {
    id: 3,
    name: 'Kunjungan Kerja',
    images: [kunjungan_kerja, kunjungan_kerja, kunjungan_kerja],
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro reprehenderit consectetur, quia pariatur nulla fugit? Fugit labore officia accusantium perspiciatis velit sed!'
  },
  {
    id: 4,
    name: 'Acara Pernikahan',
    images: [pernikahan, pernikahan, pernikahan],
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro reprehenderit consectetur, quia pariatur nulla fugit? Fugit labore officia accusantium perspiciatis velit sed!'
  }
]

const ServiceDetail = () => {
  const { id } = useParams()
  const service = serviceData.find(s => s.id === parseInt(id)) || serviceData[0]

  return (
    <>
    <Header />
    <Container className="py-5 mt-6">
      <Row className="g-4">
        <Col lg={6}>
          <div className="service-images d-flex flex-column gap-3">
            <Card className="border-0 rounded-4 overflow-hidden shadow-sm">
              <Card.Img
                src={service.images[0]}
                alt={`${service.name} - Main`}
                className="img-fluid"
                style={{ objectFit: 'cover', height: '400px', width: '100%' }}
              />
            </Card>
            <Row className="g-3">
              <Col xs={6}>
                <Card className="border-0 rounded-4 overflow-hidden shadow-sm">
                  <Card.Img
                    src={service.images[1]}
                    alt={`${service.name} - Side`}
                    className="img-fluid"
                    style={{ objectFit: 'cover', height: '190px', width: '100%' }}
                  />
                </Card>
              </Col>
              <Col xs={6}>
                <Card className="border-0 rounded-4 overflow-hidden shadow-sm">
                  <Card.Img
                    src={service.images[2]}
                    alt={`${service.name} - Back`}
                    className="img-fluid"
                    style={{ objectFit: 'cover', height: '190px', width: '100%' }}
                  />
                </Card>
              </Col>
            </Row>
          </div>
        </Col>
        <Col lg={6}>
          <div className="h-100 d-flex flex-column">
            <h2 className="fw-bold mb-3">{service.name}</h2>
            <div className="service-info d-flex gap-4 mb-3">
            </div>
            <p className="text-muted mb-4">{service.description}</p>
          </div>
        </Col>
      </Row>
    </Container>
    </>
  )
}

export default ServiceDetail