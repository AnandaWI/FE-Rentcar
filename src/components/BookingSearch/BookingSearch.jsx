import React from 'react'
import '../BookingSearch/bookingsearch.css'
import { Container, Col, Row, Button } from'react-bootstrap'
import DatePicker from "react-datepicker";
import TimePicker from 'react-time-picker';
import "react-datepicker/dist/react-datepicker.css";
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';
import { useState } from 'react';
import CustomDropdown from '../CustomDropdown/CustomDropdown';

const BookingSearch = () => {

    const [startDate, setStartDate] = useState(new Date());
    const [value, onChange] = useState('');

      const selectedJangkaWaktu =(value)=>{
        console.log("Jangka Waktu Sewa", value)
      }
    
      const selectedKategori =(value)=>{
        console.log("Kategori ", value)
      }

      const selectedDestinasi =(value)=>{
        console.log("Destinasi ", value)
      }

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
                            onChange={(date) => setStartDate(date)} 
                            dateFormat={"dd MMMM yyyy"}
                        />
                    </div>
                    <div className='item-search'>
                        <label className='item-search-label'>Jam Penjemputan</label>
                        <TimePicker 
                            onChange={onChange}   
                            value={value}
                            format='HH:mm'
                        />
                    </div>
                    <div className='item-search'>
                        <CustomDropdown
                            label="Jangka Waktu"
                            onSelect={selectedJangkaWaktu}
                            options={
                            [
                              "1 Hari",
                              "2 Hari",
                              "3 Hari",
                              "4 Hari",
                              "5 Hari",
                              "6 Hari",
                              "7 Hari",
                            ]
                        }
                        
                        />
                    </div>
                    <div className='item-search'>
                    <CustomDropdown
                            label="Kategori"
                            onSelect={selectedKategori}
                            options={
                            [
                              "VIP",
                              "Reguler",
                            ]
                        }
                        
                        />
                    </div>
                    <div className='item-search'>
                    <CustomDropdown
                            label="Destinasi"
                            onSelect={selectedDestinasi}
                            options={
                            [
                              "Semarang-Solo",
                              "Semarang-Jogja",
                              "Semarang-Jakarta",
                              "Semarang-Bandung",
                              "Semarang-Surabaya",
                            ]
                        }
                        
                        />
                    </div>
                    <div className="item-search bd-none">
                    <Button className="primaryBtn flex-even d-flex justify-content-center">
                    <i className="bi bi-search me-2"></i> Cari 
                    </Button>

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