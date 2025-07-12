import React, { useState } from 'react'
import { Modal, Button, Card, Row, Col } from 'react-bootstrap'
import OrderForm from '../OrderForm/OrderForm'
import './cart.css'

const Cart = ({ show, onHide, items, onRemove, onUpdateQuantity, onProceed }) => {
    const [showOrderForm, setShowOrderForm] = useState(false)
    const [selectedItem, setSelectedItem] = useState(null)

    const calculateTotal = () => {
        return items.reduce((total, item) => {
            const hargaPerHari = item.car.price || 0
            const jumlahHari = parseInt(item.searchParams.jangkaWaktu) || 1
            return total + (hargaPerHari * jumlahHari * item.quantity)
        }, 0)
    }

    const handleProceedToOrder = () => {
        if (items.length > 0) {
            setSelectedItem(items[0]) // Mengambil item pertama dari keranjang
            setShowOrderForm(true)
            onHide() // Menutup modal keranjang
        }
    }

    return (
        <>
            <Modal 
                show={show} 
                onHide={onHide} 
                size="lg"
                className="cart-modal"
            >
                <Modal.Header closeButton className="cart-header">
                    <Modal.Title>Keranjang Sewa Mobil</Modal.Title>
                </Modal.Header>
                <Modal.Body className="cart-body">
                    {items.length === 0 ? (
                        <div className="text-center py-4">
                            <i className="bi bi-cart-x cart-empty-icon"></i>
                            <p className="mt-3">Keranjang masih kosong</p>
                        </div>
                    ) : (
                        <div className="cart-items">
                            {items.map((item) => (
                                <Card key={item.id} className="cart-item mb-3">
                                    <Card.Body>
                                        <Row className="align-items-center">
                                            <Col md={3}>
                                                <img src={item.car.image} alt={item.car.name} className="cart-item-image" />
                                            </Col>
                                            <Col md={6}>
                                                <h5 className="cart-item-name">{item.car.name}</h5>
                                                <div className="cart-item-details">
                                                    <p><i className="bi bi-tag"></i> Kategori: {item.car.category}</p>
                                                    <p><i className="bi bi-people"></i> {item.car.seat} Kursi</p>
                                                    <p><i className="bi bi-clock"></i> Durasi: {item.searchParams.jangkaWaktu}</p>
                                                    <p><i className="bi bi-geo-alt"></i> Destinasi: {item.searchParams.destinasi}</p>
                                                    <p className="price">Rp {(item.car.price * parseInt(item.searchParams.jangkaWaktu)).toLocaleString('id-ID')}</p>
                                                </div>
                                            </Col>
                                            <Col md={3} className="text-end">
                                                <div className="quantity-control">
                                                    <Button 
                                                        variant="outline-secondary" 
                                                        size="sm"
                                                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                                                        disabled={item.quantity <= 1}
                                                        className="btn-sm"
                                                    >
                                                        <i className="bi bi-dash"></i>
                                                    </Button>
                                                    <span className="mx-2">{item.quantity}</span>
                                                    <Button 
                                                        variant="outline-secondary" 
                                                        size="sm"
                                                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                                                        className="btn-sm"
                                                    >
                                                        <i className="bi bi-plus"></i>
                                                    </Button>
                                                </div>
                                                <Button 
                                                    variant="danger" 
                                                    size="sm" 
                                                    className="mt-2 btn-sm"
                                                    onClick={() => onRemove(item.id)}
                                                >
                                                    <i className="bi bi-trash"></i> Hapus
                                                </Button>
                                                {item.car.category === 'VIP' && (
                                                    <Button 
                                                        variant="success" 
                                                        size="sm" 
                                                        className="mt-2 btn-sm"
                                                        onClick={() => onProceed(item.id, item.quantity)}
                                                    >
                                                        <i className="bi bi-person-plus"></i> Pilih {item.quantity} Driver
                                                    </Button>
                                                )}
                                            </Col>
                                        </Row>
                                    </Card.Body>
                                </Card>
                            ))}
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer className="cart-footer">
                    <div className="cart-total">
                        <h5>Total: Rp {calculateTotal().toLocaleString('id-ID')}</h5>
                    </div>
                    <Button variant="primary" onClick={onHide} size="sm">
                        Lanjut Belanja
                    </Button>
                    <Button 
                        variant="primary" 
                        onClick={handleProceedToOrder}
                        disabled={items.length === 0}
                        size="sm"
                    >
                        Lanjut Pemesanan
                    </Button>
                </Modal.Footer>
            </Modal>

            <OrderForm 
                show={showOrderForm}
                onHide={() => setShowOrderForm(false)}
                searchParams={selectedItem?.searchParams}
                selectedCar={selectedItem?.car}
            />
        </>
    )
}

export default Cart