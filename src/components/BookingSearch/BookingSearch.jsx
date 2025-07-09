import React, { useState } from 'react'
import '../BookingSearch/bookingsearch.css'
import { Container, Col, Row, Button } from'react-bootstrap'
import DatePicker from "react-datepicker";
import TimePicker from 'react-time-picker';
import "react-datepicker/dist/react-datepicker.css";
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';
import CustomDropdown from '../CustomDropdown/CustomDropdown';
import { useNavigate } from 'react-router-dom';

const BookingSearch = () => {
    const navigate = useNavigate();
    const [startDate, setStartDate] = useState(new Date());
    const [value, onChange] = useState('');
    const [formData, setFormData] = useState({
        jangkaWaktu: '',
        kategori: '',
        destinasi: ''
    });
    const [error, setError] = useState('');

    const selectedJangkaWaktu = (value) => {
        setFormData(prev => ({ ...prev, jangkaWaktu: value }));
        if(error) setError('');
    }
    
    const selectedKategori = (value) => {
        setFormData(prev => ({ ...prev, kategori: value }));
        if(error) setError('');
    }

    const selectedDestinasi = (value) => {
        setFormData(prev => ({ ...prev, destinasi: value }));
        if(error) setError('');
    }

    const handleSearch = () => {
        const { jangkaWaktu, kategori, destinasi } = formData;

        // Validasi jika ada field kosong
        if (!startDate || !value || !jangkaWaktu || !kategori || !destinasi) {
            setError('Mohon isi semua informasi terlebih dahulu.');
            return; // Mencegah navigasi
        }

        const searchParams = {
            tanggal: startDate,
            jamPenjemputan: value,
            ...formData
        };
        navigate('/hasil-pencarian', { state: searchParams });
    };

    return (
        <>
        <section className='box-search-booking'>
        <Container>
            <Row>
                <Col md={12} xs={12} >
                    <div className='box-search shadow-sm'>
                        <div className='item-search item-search-2'>
                            <label className='item-search-label'>Tanggal</label>
                            <DatePicker 
                                selected={startDate} 
                                onChange={(date) => {
                                    setStartDate(date);
                                    if(error) setError('');
                                }} 
                                dateFormat={"dd MMMM yyyy"}
                            />
                        </div>
                        <div className='item-search'>
                            <label className='item-search-label'>Jam Penjemputan</label>
                            <TimePicker 
                                onChange={(val) => {
                                    onChange(val);
                                    if(error) setError('');
                                }}   
                                value={value}
                                format='HH:mm'
                            />
                        </div>
                        <div className='item-search'>
                            <CustomDropdown
                                label="Jangka Waktu"
                                onSelect={selectedJangkaWaktu}
                                options={[
                                  "1 Hari",
                                  "2 Hari",
                                  "3 Hari",
                                  "4 Hari",
                                  "5 Hari",
                                  "6 Hari",
                                  "7 Hari",
                                ]}
                            />
                        </div>
                        <div className='item-search'>
                            <CustomDropdown
                                label="Kategori"
                                onSelect={selectedKategori}
                                options={[
                                  "VIP",
                                  "Reguler",
                                ]}
                            />
                        </div>
                        <div className='item-search'>
                            <CustomDropdown
                                label="Destinasi"
                                onSelect={selectedDestinasi}
                                options={[
                                  "Semarang-Solo",
                                  "Semarang-Jogja",
                                  "Semarang-Jakarta",
                                  "Semarang-Bandung",
                                  "Semarang-Surabaya",
                                ]}
                            />
                        </div>
                        <div className="item-search bd-none">
                            <Button 
                                className="primaryBtn flex-even d-flex justify-content-center"
                                onClick={handleSearch}
                            >
                                <i className="bi bi-search me-2"></i> Cari 
                            </Button>
                            {error && <div style={{color: 'red', marginTop: '8px'}}>{error}</div>}
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
        </section>
        </>
    )
}

export default BookingSearch
