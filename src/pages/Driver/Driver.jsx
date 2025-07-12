import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Container, Row, Col, Card } from 'react-bootstrap'
import { format } from 'date-fns'
import { id } from 'date-fns/locale'
import Header from '../../components/Common/Header/Header'
import feature3 from "../../assets/images/feature/driver.png";
import "./driver.css";
import CardDriver from "../../components/CardDriver/CardDriver";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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

    const sliderSettings = {
        dots: false,                    // Tambahkan dots indicator
        infinite: true,
        autoplay: true,                // Aktifkan autoplay
        autoplaySpeed: 5000,           // Interval 5 detik
        speed: 500,
        slidesToShow: 4,               // Ubah menjadi 4 untuk desktop
        slidesToScroll: 1,
        arrows: true,                  // Tampilkan tombol navigasi
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2,
                    arrows: true,
                    dots: true
                }
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 1,
                    arrows: false,      // Sembunyikan arrow di mobile
                    dots: true
                }
            }
        ]
    }

    return (
        <>
            <Header />
            <Container className="mt-6 pt-4">
                <h3>Pilih Driver Profesional</h3>
                {/* Informasi Mobil yang Dipilih */}
                

                {/* Daftar Driver */}
                <div className="driver-slider-wrapper">
                    <Slider {...sliderSettings}>
                        {drivers.map(driver => (
                            <div key={driver.id}>
                                <CardDriver 
                                    driver={driver} 
                                    onSelect={handleSelectDriver}
                                />
                            </div>
                        ))}
                    </Slider>
                </div>
            </Container>
        </>
    )
}

export default Driver