import React, { useState, useEffect } from 'react'
import { Modal, Form, Button } from 'react-bootstrap'
import './orderform.css'

const OrderForm = ({ show, onHide, searchParams, selectedCar, items, selectedDrivers }) => {
    const [showReceipt, setShowReceipt] = useState(false)
    const [formData, setFormData] = useState({
        nama: '',
        email: '',
        noHp: '',
        destinasi: '',
        jumlahHari: '',
        alamatPenjemputan: ''
    })

    // Update formData saat searchParams berubah
   useEffect(() => {
    console.log('searchParams di OrderForm:', searchParams) // 👈 Tambahkan ini
    if (searchParams) {
        setFormData(prev => ({
            ...prev,
            destinasi: searchParams.destinasi || '',
            jumlahHari: searchParams.jangkaWaktu || ''
        }))
    }
}, [searchParams])


    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const calculateTotal = () => {
        return items.reduce((total, item) => {
            const hargaPerHari = item.car.price || 0
            const jumlahHari = parseInt(item.searchParams.jangkaWaktu) || 1
            return total + (hargaPerHari * jumlahHari * item.quantity)
        }, 0)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setShowReceipt(true)
    }

    return (
        <>
            <Modal show={show} onHide={onHide} size="lg" centered className="order-form-modal">
                <Modal.Body className="p-4">
                    <h4 className="text-center mb-4">Formulir Data Pemesanan</h4>
                    <Form onSubmit={handleSubmit}>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <Form.Group className="mb-3" style={{ flex: 1 }}>
                                <Form.Label>Destinasi :</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="destinasi"
                                    value={formData.destinasi}
                                    onChange={handleChange}
                                    required
                                    placeholder="Destinasi"
                                    className="form-control-dark"
                                    disabled
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" style={{ flex: 1 }}>
                                <Form.Label>Jumlah Hari :</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="jumlahHari"
                                    value={formData.jumlahHari}
                                    onChange={handleChange}
                                    required
                                    placeholder="Jumlah Hari"
                                    className="form-control-dark"
                                    disabled
                                />
                            </Form.Group>
                        </div>

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
                                Konfirmasi Pembayaran
                            </Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>

            {/* Modal Struk Pembayaran */}
            <Modal 
                show={showReceipt} 
                onHide={() => {
                    setShowReceipt(false)
                    onHide()
                }}
                size="lg"
                centered
                className="receipt-modal"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Struk Pembayaran</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="receipt-content">
                        <div className="receipt-header text-center mb-4">
                            <h4>RENT CAR</h4>
                            <p className="mb-0">Jl. Contoh No. 123, Kota</p>
                            <p>Telp: (021) 1234567</p>
                        </div>

                        <div className="customer-info mb-4">
                            <p><strong>Nama:</strong> {formData.nama}</p>
                            <p><strong>Email:</strong> {formData.email}</p>
                            <p><strong>No HP:</strong> {formData.noHp}</p>
                            <p><strong>Alamat Penjemputan:</strong> {formData.alamatPenjemputan}</p>
                        </div>

                        <div className="order-details">
                            <h5 className="mb-3">Detail Pesanan:</h5>
                            {items.map((item, index) => (
                                <div key={index} className="order-item mb-3 pb-2 border-bottom">
                                    <h6>{item.car.name} ({item.quantity} unit)</h6>
                                    <p className="mb-1">Kategori: {item.searchParams.kategori}</p>
                                    <p className="mb-1">Durasi: {item.searchParams.jangkaWaktu}</p>
                                    <p className="mb-1">Destinasi: {item.searchParams.destinasi}</p>
                                    <p className="mb-1">Tanggal: {item.searchParams.tanggal}</p>
                                    <p className="mb-1">Jam Penjemputan: {item.searchParams.jamPenjemputan}</p>
                                    {selectedDrivers && selectedDrivers[item.id] && (
                                        <p className="mb-1">
                                            Driver: {selectedDrivers[item.id].map(driver => driver.name).join(', ')}
                                        </p>
                                    )}
                                    <p className="mb-1 text-end">
                                        Rp {(item.car.price * parseInt(item.searchParams.jangkaWaktu) * item.quantity).toLocaleString('id-ID')}
                                    </p>
                                </div>
                            ))}
                            <div className="total-amount mt-4">
                                <h5 className="text-end">
                                    Total: Rp {calculateTotal().toLocaleString('id-ID')}
                                </h5>
                            </div>
                        </div>

                        <div className="receipt-footer text-center mt-5">
                            <p>Terima kasih telah menggunakan layanan kami</p>
                            <small>Silakan melakukan pembayaran sesuai total di atas</small>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => {
                        setShowReceipt(false)
                        onHide()
                    }}>
                        Bayar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default OrderForm
