import React, { useState, useEffect } from 'react';
import { Modal, Button, Card, Row, Col } from 'react-bootstrap';
import OrderForm from '../OrderForm/OrderForm';
import DriverCard from '../CardDriver/CardDriver';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './cart.css';
import axiosInstance from '../../core/axiosinstance';

const Cart = ({ show, onHide, items, onRemove, onUpdateQuantity, onProceed }) => {
    const [showOrderForm, setShowOrderForm] = useState(false);
    const [showDriverModal, setShowDriverModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [selectedQuantity, setSelectedQuantity] = useState(1);
    const [selectedDrivers, setSelectedDrivers] = useState({});

    const [availableDrivers, setAvailableDrivers] = useState([]);
    const [loadingDrivers, setLoadingDrivers] = useState(true);

    useEffect(() => {
        const fetchAllDrivers = async () => {
            try {
                const response = await axiosInstance.get('/api/guest/drivers');
                setAvailableDrivers(response.data.data);
                setLoadingDrivers(false);
            } catch (error) {
                console.error('Error fetching drivers:', error);
                setLoadingDrivers(false);
            }
        };

        fetchAllDrivers();
    }, []);

    const calculateTotal = () => {
        return items.reduce((total, item) => {
            const hargaPerHari = item.car.price || 0;
            const jumlahHari = parseInt(item.searchParams.jangkaWaktu) || 1;
            return total + (hargaPerHari * jumlahHari * item.quantity);
        }, 0);
    };

    const handleProceedToOrder = () => {
        if (items.length > 0) {
            const firstItem = items[0];
            setSelectedItem(firstItem);
            setShowOrderForm(true);
            onHide();
        }
    };

    const handleSelectDriver = (driver) => { 
        const updatedDrivers = { ...selectedDrivers } 
        if (!updatedDrivers[selectedItem.id]) { 
            updatedDrivers[selectedItem.id] = [] 
        } 
    
        // Cek apakah driver sudah dipilih untuk mobil VIP manapun 
        const isDriverSelectedForAnyVIP = Object.values(selectedDrivers).some( 
            driverList => driverList.some(selectedDriver => selectedDriver.id === driver.id) 
        ) 
    
        // Jika driver belum dipilih untuk mobil VIP manapun dan jumlah belum mencapai batas 
        if (!isDriverSelectedForAnyVIP && updatedDrivers[selectedItem.id].length < selectedQuantity) { 
            updatedDrivers[selectedItem.id].push(driver) 
            setSelectedDrivers(updatedDrivers) 
    
            // Tutup modal jika jumlah driver sudah terpenuhi 
            if (updatedDrivers[selectedItem.id].length === selectedQuantity) { 
                setShowDriverModal(false) 
            } 
        } 
    } 

    const handleShowDriverModal = (item, quantity) => { 
        setSelectedItem(item) 
        setSelectedQuantity(quantity) 
        // Reset driver yang dipilih untuk item ini 
        setSelectedDrivers(prev => ({ 
            ...prev, 
            [item.id]: [] 
        })) 
        setShowDriverModal(true) 
    } 

    const sliderSettings = { 
        dots: false, 
        infinite: false, 
        slidesToShow: 3, 
        slidesToScroll: 1, 
        responsive: [ 
            { 
                breakpoint: 992, 
                settings: { 
                    slidesToShow: 2, 
                    slidesToScroll: 1 
                } 
            }, 
            { 
                breakpoint: 576, 
                settings: { 
                    slidesToShow: 1, 
                    slidesToScroll: 1 
                } 
            } 
        ] 
    } 

    // Reset selectedDrivers ketika items kosong 
    React.useEffect(() => { 
        if (items.length === 0) { 
            setSelectedDrivers({}) 
        } 
    }, [items]) 

    const handleRemove = (itemId) => { 
        // Hapus driver yang dipilih untuk item ini 
        const updatedDrivers = { ...selectedDrivers } 
        delete updatedDrivers[itemId] 
        setSelectedDrivers(updatedDrivers) 
        
        // Panggil fungsi onRemove yang diberikan sebagai prop 
        onRemove(itemId) 
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
                                                    <p><i className="bi bi-tag"></i> Kategori: {item.car.type}</p>
                                                    <p><i className="bi bi-people"></i> {item.car.seat} Kursi</p>
                                                    <p><i className="bi bi-clock"></i> Durasi: {item.searchParams.jangkaWaktu}</p>
                                                    <p><i className="bi bi-geo-alt"></i> Destinasi: {item.searchParams.destinasi}</p>
                                                    {selectedDrivers[item.id] && selectedDrivers[item.id].length > 0 && (
                                                        <p><i className="bi bi-person"></i> Driver: &nbsp;
                                                            {selectedDrivers[item.id].map(driver => driver.name).join(', ')}
                                                        </p>
                                                    )}
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
                                                    onClick={() => handleRemove(item.id)}
                                                >
                                                    <i className="bi bi-trash"></i> Hapus
                                                </Button>
                                                {item.car.type === 'VIP' && (
                                                    <Button
                                                        variant="success"
                                                        size="sm"
                                                        className="mt-2 btn-sm"
                                                        onClick={() => handleShowDriverModal(item, item.quantity)}
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

            {/* Modal Pilih Driver */}
            <Modal
                show={showDriverModal}
                onHide={() => setShowDriverModal(false)}
                size="lg"
                centered
                className="driver-selection-modal"
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        Pilih Driver ({selectedDrivers[selectedItem?.id]?.length || 0} dari {selectedQuantity} orang)
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {availableDrivers.length === 0 ? (
                        <div className="text-center py-3">Tidak ada driver tersedia.</div>
                    ) : (
                        <Slider {...sliderSettings}>
                            {availableDrivers.map(driver => {
                                const isSelectedForCurrentItem = selectedDrivers[selectedItem?.id]?.some(
                                    selectedDriver => selectedDriver.id === driver.id
                                );

                                const isSelectedForAnyOtherVIP = Object.entries(selectedDrivers)
                                    .filter(([itemId]) => itemId !== selectedItem?.id)
                                    .some(([_, driverList]) =>
                                        driverList.some(selectedDriver => selectedDriver.id === driver.id)
                                    );

                                // --- Logika isDisabled (TETAP SAMA seperti yang Anda berikan di input terakhir) ---
                                // Driver dinonaktifkan jika:
                                // 1. Dia sudah dipilih untuk mobil VIP lain (duplikasi global).
                                // 2. Jumlah driver yang dibutuhkan untuk mobil saat ini sudah terpenuhi,
                                //    DAN driver ini BUKAN yang saat ini sudah dipilih untuk mobil ini (untuk memungkinkan unselect).
                                const isDisabled = isSelectedForAnyOtherVIP ||
                                    (selectedDrivers[selectedItem?.id]?.length >= selectedQuantity && !isSelectedForCurrentItem);

                                return (
                                    <div key={driver.id} className="px-2">
                                        <div className={`driver-card ${isSelectedForCurrentItem ? 'selected' : ''} ${isDisabled ? 'disabled' : ''}`}>
                                            <DriverCard
                                                driver={driver}
                                                onSelect={handleSelectDriver}
                                                disabled={isDisabled}
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                        </Slider>
                    )}
                </Modal.Body>
            </Modal>

            <OrderForm
                show={showOrderForm}
                onHide={() => setShowOrderForm(false)}
                searchParams={selectedItem?.searchParams}
                selectedCar={selectedItem?.car}
                items={items}
                selectedDrivers={selectedDrivers}
            />
        </>
    );
};

export default Cart;