import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Container, Row, Col, Card, Badge } from 'react-bootstrap'
import { format } from 'date-fns'
import { id } from 'date-fns/locale'
import './hasilpencarian.css'
import Header from '../../components/Common/Header/Header'

const HasilPencarian = () => {
    const location = useLocation()
    const [searchParams, setSearchParams] = useState(location.state)

    const formatDate = (date) => {
        return format(new Date(date), 'dd MMMM yyyy', { locale: id })
    }

    // Data mobil contoh
    const cars = [
        { id: 1, name: 'Toyota Hiace', seat: 16, transmission: 'Manual', price: 1500000, image: '/hiace.jpg', category: 'VIP' },
        { id: 2, name: 'Daihatsu Luxio', seat: 7, transmission: 'Otomatis', price: 600000, image: '/hiace.jpg', category: 'Reguler' },
        { id: 3, name: 'Suzuki Ertiga', seat: 7, transmission: 'Otomatis', price: 550000, image: '/hiace.jpg', category: 'Reguler' },
        { id: 4, name: 'Honda CR-V', seat: 5, transmission: 'Otomatis', price: 800000, image: '/hiace.jpg', category: 'VIP' }
    ];

    // Handler untuk mengubah kategori
    const handleKategoriChange = (newKategori) => {
        setSearchParams(prev => ({
            ...prev,
            kategori: newKategori
        }))
    }

    // Filter mobil berdasarkan kategori yang dipilih
    const filteredCars = cars.filter(car => car.category.toLowerCase() === searchParams.kategori.toLowerCase())

    return (
        <>
            <Header />
            <Container className="mt-6 pt-5">

                {/* Ringkasan Pencarian */}
                <Row className="mb-4">
                    <Col>
                        <Card className="search-summary shadow-sm">
                            <Card.Body>
                                <h4 className="mb-3">Ringkasan Pencarian</h4>
                                <Row>
                                    <Col md={3}>
                                        <div className="search-item">
                                            <small className="text-muted">Tanggal</small>
                                            <p className="mb-0">{formatDate(searchParams.tanggal)}</p>
                                        </div>
                                    </Col>
                                    <Col md={3}>
                                        <div className="search-item">
                                            <small className="text-muted">Jam Penjemputan</small>
                                            <p className="mb-0">{searchParams.jamPenjemputan || '-'}</p>
                                        </div>
                                    </Col>
                                    <Col md={2}>
                                        <div className="search-item">
                                            <small className="text-muted">Jangka Waktu</small>
                                            <p className="mb-0">{searchParams.jangkaWaktu}</p>
                                        </div>
                                    </Col>
                                    <Col md={2}>
                                        <div className="search-item">
                                            <small className="text-muted">Kategori</small>
                                            <div className="d-flex align-items-center gap-2">
                                                <select 
                                                    className="form-select form-select-sm" 
                                                    value={searchParams.kategori}
                                                    onChange={(e) => handleKategoriChange(e.target.value)}
                                                >
                                                    <option value="VIP">VIP</option>
                                                    <option value="Reguler">Reguler</option>
                                                </select>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col md={2}>
                                        <div className="search-item">
                                            <small className="text-muted">Destinasi</small>
                                            <p className="mb-0">{searchParams.destinasi}</p>
                                        </div>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                <Row className="mb-3">
                    <Col>
                        <h4>Mobil Tersedia</h4>
                        <p className="text-muted">Menampilkan hasil pencarian sesuai kriteria Anda</p>
                    </Col>
                </Row>

                <Row>
                    {filteredCars.length > 0 ? (
                        filteredCars.map(car => (
                            <Col md={3} key={car.id} className="mb-4">
                                <Card className="car-card h-100 shadow-sm">
                                    <Card.Img variant="top" src={car.image} />
                                    <Card.Body>
                                        <Badge bg={car.category === 'VIP' ? 'warning' : 'secondary'} className="mb-2">{car.category}</Badge>
                                        <Card.Title>{car.name}</Card.Title>
                                        <div className="features mb-3">
                                            <span className="me-3"><i className="bi bi-people"></i> {car.seat} Kursi</span>
                                        </div>
                                        <Card.Text className="price mb-0 d-flex flex-column">
                                            <small className="text-muted">Mulai dari</small>
                                            <span className="fw-bold fs-5">Rp {car.price.toLocaleString('id-ID')}/hari</span>
                                        </Card.Text>
                                    </Card.Body>
                                    <Card.Footer className="bg-white border-top-0">
                                        <button 
                                            className="btn btn-primary w-100" 
                                            onClick={() => window.cartButton.handleAddToCart(car, searchParams)}
                                        >
                                            Tambah ke Keranjang
                                        </button>
                                    </Card.Footer>
                                </Card>
                            </Col>
                        ))
                    ) : (
                        <p className="text-muted">Tidak ada mobil dengan kategori {searchParams.kategori} tersedia.</p>
                    )}
                </Row>
            </Container>
        </>
    )
}

export default HasilPencarian


