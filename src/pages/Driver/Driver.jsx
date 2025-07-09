import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Container, Row, Col, Card } from 'react-bootstrap'
import { format } from 'date-fns'
import { id } from 'date-fns/locale'
import Header from '../../components/Common/Header/Header'
import feature3 from "../../assets/images/feature/driver.png";
import "./driver.css";
import CardDriver from "../../components/CardDriver/CardDriver";

const Driver = () => {
    const location = useLocation()
    const navigate = useNavigate()
    
    // Ambil data dari location.state atau localStorage
    const [carData, setCarData] = React.useState(() => {
        const savedData = localStorage.getItem('selectedCarData')
        return location.state || (savedData ? JSON.parse(savedData) : null)
    })

    // Simpan data ke localStorage saat ada perubahan location.state
    React.useEffect(() => {
        if (location.state) {
            localStorage.setItem('selectedCarData', JSON.stringify(location.state))
            setCarData(location.state)
        }
    }, [location.state])

    const { car, searchParams } = carData || {}

    if (!car || !searchParams) {
        return (
            <Container className="mt-5 pt-5 text-center">
                <h3>Data Tidak Tersedia</h3>
                <p>Mohon kembali ke halaman pencarian untuk memilih mobil.</p>
                <button 
                    className="btn btn-primary"
                    onClick={() => navigate('/hasil-pencarian')}
                >
                    Kembali
                </button>
            </Container>
        )
    }

    const formatDate = (date) => {
        return format(new Date(date), 'dd MMMM yyyy', { locale: id })
    }

    if (!car || !searchParams) {
        return (
            <>
                <Header />
                <Container className="mt-5 pt-5 text-center">
                    <h3>Data Tidak Tersedia</h3>
                    <p>Mohon kembali ke halaman pencarian untuk memilih mobil.</p>
                    <button 
                        className="btn btn-primary"
                        onClick={() => navigate(-1)}
                    >
                        Kembali
                    </button>
                </Container>
            </>
        )
    }

    // Data driver contoh
    const drivers = [
        {
            id: 1,
            name: 'Ahmad Suherman',
            age: 35,
            experience: '5 tahun',
            photo: feature3,
            status: 'Tersedia'
        },
        {
            id: 2,
            name: 'Budi Santoso',
            age: 40,
            experience: '8 tahun',
            photo: feature3,
            status: 'Tersedia'
        },
        {
            id: 3,
            name: 'Charlie Wijaya',
            age: 38,
            experience: '6 tahun',
            photo: feature3,
            status: 'Tersedia'
        },
        {
            id: 4,
            name: 'Mulyono',
            age: 25,
            experience: '10 tahun',
            photo: feature3,
            status: 'Tersedia'
        }
    ]

    const handleSelectDriver = (selectedDriver) => {
        // Implementasi logika pemilihan driver
        console.log('Driver terpilih:', selectedDriver)
    }

    return (
        <>
            <Header />
            <Container className="mt-6 pt-4">
                <h3 className="mb-4">Pilih Driver Profesional</h3>
                
                {/* Informasi Mobil yang Dipilih */}
                <Card className="mb-4 selected-car">
                    <Card.Body>
                        <Row>
                            <Col md={3}>
                                <img src={car?.image} alt={car?.name} className="img-fluid rounded" />
                            </Col>
                            <Col md={9}>
                                <h4>{car?.name}</h4>
                                <div className="car-features">
                                    <span><i className="bi bi-people"></i> {car?.seat} Kursi</span>
                                    <span><i className="bi bi-gear"></i> {car?.transmission}</span>
                                </div>
                                <div className="booking-details mt-4 p-3 rounded shadow-sm">
                                    <h5 className="booking-title mb-3">
                                        <i className="bi bi-info-circle-fill me-2"></i>
                                        Detail Pemesanan
                                    </h5>
                                    <div className="booking-info">
                                        <div className="info-item">
                                            <i className="bi bi-calendar-event"></i>
                                            <div>
                                                <span className="info-label">Tanggal</span>
                                                <span className="info-value">{formatDate(searchParams?.tanggal)}</span>
                                            </div>
                                        </div>
                                        <div className="info-item">
                                            <i className="bi bi-clock"></i>
                                            <div>
                                                <span className="info-label">Jam Penjemputan</span>
                                                <span className="info-value">{searchParams?.jamPenjemputan}</span>
                                            </div>
                                        </div>
                                        <div className="info-item">
                                            <i className="bi bi-hourglass-split"></i>
                                            <div>
                                                <span className="info-label">Jangka Waktu</span>
                                                <span className="info-value">{searchParams?.jangkaWaktu}</span>
                                            </div>
                                        </div>
                                        <div className="info-item">
                                            <i className="bi bi-geo-alt"></i>
                                            <div>
                                                <span className="info-label">Destinasi</span>
                                                <span className="info-value">{searchParams?.destinasi}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>

                {/* Daftar Driver */}
                <Row>
                    {drivers.map(driver => (
                        <CardDriver 
                            key={driver.id} 
                            driver={driver} 
                            onSelect={handleSelectDriver}
                        />
                    ))}
                </Row>
            </Container>
        </>
    )
}

export default Driver