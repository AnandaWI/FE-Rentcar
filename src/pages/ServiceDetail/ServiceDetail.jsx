import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import './servicedetail.css'
import Header from '../../components/Common/Header/Header'
import axiosInstance from '../../core/axiosinstance'

const ServiceDetail = () => {
  const { id } = useParams()
  const [service, setService] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchService = async () => {
      try {
        const response = await axiosInstance.get(`/api/guest/services/${id}`)
        setService(response.data.data)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching service:', error)
        setLoading(false)
      }
    }

    fetchService()
  }, [id])

  if (loading) {
    return (
      <>
        <Header />
        <Container className="py-5 mt-6">
          <p>Loading...</p>
        </Container>
      </>
    )
  }

  if (!service) {
    return (
      <>
        <Header />
        <Container className="py-5 mt-6">
          <p>Service tidak ditemukan</p>
        </Container>
      </>
    )
  }

  return (
    <>
      <Header />
      <Container className="py-5 mt-6">
        <Row className="g-4">
          <Col lg={6}>
            <div className="service-images d-flex flex-column gap-3">
              <Card className="border-0 rounded-4 overflow-hidden shadow-sm">
                <Card.Img
                  src={service.images[0].img_url}
                  alt={`${service.name} - Main`}
                  className="img-fluid"
                  style={{ objectFit: 'cover', height: '400px', width: '100%' }}
                />
              </Card>
              <Row className="g-3">
                {service.images.slice(1).map((image, index) => (
                  <Col xs={6} key={image.id}>
                    <Card className="border-0 rounded-4 overflow-hidden shadow-sm">
                      <Card.Img
                        src={image.img_url}
                        alt={`${service.name} - ${index + 2}`}
                        className="img-fluid"
                        style={{ objectFit: 'cover', height: '190px', width: '100%' }}
                      />
                    </Card>
                  </Col>
                ))}
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