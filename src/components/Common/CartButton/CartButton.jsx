import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cart from '../../Cart/Cart';
import './cartbutton.css';

const CartButton = () => {
    const navigate = useNavigate();
    const [showCart, setShowCart] = useState(false);
    const [cartItems, setCartItems] = useState([]);

    // Fungsi untuk menambah item ke keranjang
    const handleAddToCart = (car, searchParams) => {
        // Cek apakah mobil sudah ada di keranjang
        const existingItemIndex = cartItems.findIndex(item => item.car.id === car.id)

        if (existingItemIndex !== -1) {
            // Jika mobil sudah ada, update quantity
            const updatedItems = cartItems.map((item, index) => {
                if (index === existingItemIndex) {
                    return { ...item, quantity: item.quantity + 1 }
                }
                return item
            })
            setCartItems(updatedItems)
        } else {
            // Jika mobil belum ada, tambahkan sebagai item baru
            const newItem = {
                id: Date.now(),
                car: car,
                searchParams: searchParams,
                quantity: 1
            }
            setCartItems(prevItems => [...prevItems, newItem])
        }
        setShowCart(true)
    }

    // Ekspos fungsi handleAddToCart ke window object
    useEffect(() => {
        window.cartButton = {
            handleAddToCart
        };
        return () => {
            delete window.cartButton;
        };
    }, [handleAddToCart]);

    // Fungsi untuk menghapus item dari keranjang
    const handleRemoveFromCart = (itemId) => {
        setCartItems(cartItems.filter(item => item.id !== itemId))
    }

    // Fungsi untuk mengupdate kuantitas
    const handleUpdateQuantity = (itemId, newQuantity) => {
        if (newQuantity < 1) return
        setCartItems(cartItems.map(item =>
            item.id === itemId ? {...item, quantity: newQuantity} : item
        ))
    }

    // Fungsi untuk melanjutkan ke pemilihan driver
    const handleProceedToDriver = () => {
        const firstItem = cartItems[0]
        if (firstItem) {
            setShowCart(false) // Tutup modal cart
            navigate('/driver', { 
                state: { 
                    car: firstItem.car,
                    searchParams: firstItem.searchParams,
                    quantity: firstItem.quantity
                } 
            })
        }
    }

    return (
        <>
            <div className="cart-button-fixed" onClick={() => setShowCart(true)}>
                <i className="bi bi-cart"></i>
                {cartItems.length > 0 && (
                    <span className="cart-badge">{cartItems.length}</span>
                )}
            </div>

            <Cart
                show={showCart}
                onHide={() => setShowCart(false)}
                items={cartItems}
                onRemove={handleRemoveFromCart}
                onUpdateQuantity={handleUpdateQuantity}
                onProceed={handleProceedToDriver}
            />
        </>
    );
};

export default CartButton;