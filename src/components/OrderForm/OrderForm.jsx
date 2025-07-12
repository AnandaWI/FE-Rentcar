import React, { useState } from 'react'
import { Modal, Form, Button } from 'react-bootstrap'
import './orderform.css'

const OrderForm = ({ show, onHide, searchParams, selectedCar }) => {
    const [formData, setFormData] = useState({
        nama: '',
        email: '',
        noHp: '',
        destinasi: searchParams?.destinasi || '',
        jumlahHari: searchParams?.jangkaWaktu || '',
        tanggalBerangkat: '',
        tanggalPulang: '',
        alamatPenjemputan: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('Form Data:', formData)
        onHide()
    }

    return (
        <Modal show={show} onHide={onHide} size="lg" centered className="order-form-modal">
            <Modal.Body className="p-4">
                <h4 className="text-center mb-4">Formulir Data Pemesanan</h4>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Control
                            type="text"
                            name="nama"
                            value={formData.nama}
                            onChange={handleChange}
                            required
                            placeholder="Nama Lengkap"
                            className="form-control-dark"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Control
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder="Email"
                            className="form-control-dark"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Control
                            type="tel"
                            name="noHp"
                            value={formData.noHp}
                            onChange={handleChange}
                            required
                            placeholder="No HP / WA"
                            className="form-control-dark"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Control
                            type="text"
                            name="destinasi"
                            value={formData.destinasi}
                            onChange={handleChange}
                            required
                            placeholder="Destinasi"
                            className="form-control-dark"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Control
                            type="number"
                            name="jumlahHari"
                            value={formData.jumlahHari}
                            onChange={handleChange}
                            required
                            placeholder="Jumlah Hari"
                            className="form-control-dark"
                        />
                    </Form.Group>

                    <div className="d-flex gap-2 mb-3">
                        <Form.Group className="flex-grow-1">
                            <Form.Control
                                type="date"
                                name="tanggalBerangkat"
                                value={formData.tanggalBerangkat}
                                onChange={handleChange}
                                required
                                placeholder="Tanggal Berangkat"
                                className="form-control-dark"
                            />
                        </Form.Group>

                        <Form.Group className="flex-grow-1">
                            <Form.Control
                                type="date"
                                name="tanggalPulang"
                                value={formData.tanggalPulang}
                                onChange={handleChange}
                                required
                                placeholder="Tanggal Pulang"
                                className="form-control-dark"
                            />
                        </Form.Group>
                    </div>

                    <Form.Group className="mb-4">
                        <Form.Control
                            as="textarea"
                            name="alamatPenjemputan"
                            value={formData.alamatPenjemputan}
                            onChange={handleChange}
                            required
                            placeholder="Alamat Penjemputan"
                            rows={3}
                            className="form-control-dark"
                        />
                    </Form.Group>

                    <div className="d-flex gap-2">
                        <Button variant="danger" onClick={onHide} className="flex-grow-1">
                            Batalkan
                        </Button>
                        <Button variant="primary" type="submit" className="flex-grow-1">
                            Lanjut Pembayaran
                        </Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    )
}

export default OrderForm