import React from 'react'
import { Card, Col } from 'react-bootstrap'
import './carddriver.css'

const DriverCard = ({ driver, onSelect }) => {
    return (
        <Col md={3} className="mb-4">
            <Card className="driver-card h-100">
                <Card.Body>
                    <div className="driver-photo mb-3">
                        <img 
                            src={driver.photo} 
                            alt={driver.name} 
                            className="rounded-circle" 
                            onError={(e) => {
                                e.target.src = '/images/default-driver.jpg'
                            }}
                        />
                        <span className={`status-badge ${driver.status === 'Tersedia' ? 'available' : 'unavailable'}`}>
                            {driver.status}
                        </span>
                    </div>
                    <h5 className="driver-name">{driver.name}</h5>
                    <div className="driver-info">
                        <p><i className="bi bi-calendar2-check"></i> {driver.experience} Pengalaman</p>
                        <p><i className="bi bi-person"></i> {driver.age} Tahun</p>
                    </div>
                    <button 
                        className="btn btn-primary w-100 mt-3"
                        onClick={() => onSelect(driver)}
                    >
                        Pilih Driver
                    </button>
                </Card.Body>
            </Card>
        </Col>
    )
}

export default DriverCard