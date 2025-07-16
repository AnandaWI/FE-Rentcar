import React from 'react';
import { Card } from 'react-bootstrap';
import './carddriver.css';

// Hapus semua import yang tidak perlu lagi:
// import { useState, useEffect } from 'react' // Ini dihapus
// import axiosInstance from '../../core/axiosinstance' // Ini dihapus
// import feature3 from "../../assets/images/feature/driver.png"; // Ini dihapus, karena gambar sudah dari driver.img_url

const DriverCard = ({ driver, onSelect, disabled }) => {
    // Fungsi calculateAge tetap sama
    const calculateAge = (birthDate) => {
        const today = new Date();
        const birth = new Date(birthDate);
        let age = today.getFullYear() - birth.getFullYear();
        const monthDiff = today.getMonth() - birth.getMonth();

        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
            age--;
        }
        return age;
    };

    // DriverCard TIDAK LAGI melakukan fetching data atau menampilkan daftar driver.
    // Ia hanya menampilkan SATU driver yang diberikan melalui prop 'driver'.
    // Oleh karena itu, kita tidak lagi memerlukan loading state atau cek 'drivers.length'.

    return (
        <Card className={`driver-card h-100 mb-4 ${disabled ? 'disabled' : ''}`}>
            <Card.Body>
                <div className="driver-photo mb-3">
                    {/* Menggunakan driver.img_url dari prop 'driver' */}
                    <img
                        src={driver.img_url}
                        alt={driver.name}
                        className="rounded-circle"
                        onError={(e) => {
                            // Gambar default jika img_url error atau tidak ditemukan
                            e.target.src = '/images/default-driver.jpg';
                        }}
                    />
                    <span className={`status-badge ${disabled ? 'unavailable' : 'available'}`}>
                        {/* Status badge sekarang tergantung pada prop 'disabled' */}
                        {disabled ? 'Tidak Tersedia' : 'Tersedia'}
                    </span>
                </div>
                <h5 className="driver-name">{driver.name}</h5>
                <div className="driver-info">
                    {/* Menggunakan data dari objek 'driver' */}
                    <p><i className="bi bi-calendar2-check"></i> {driver.pengalaman} Tahun Pengalaman</p>
                    <p><i className="bi bi-person"></i> {calculateAge(driver.tgl_lahir)} Tahun</p>
                </div>
                <button
                    className="btn btn-primary w-100 mt-3"
                    onClick={() => onSelect(driver)} // Memicu fungsi onSelect yang diterima dari parent (Cart)
                    disabled={disabled} // Tombol dinonaktifkan berdasarkan prop 'disabled'
                >
                    {disabled ? 'Driver Tidak Tersedia' : 'Pilih Driver'}
                </button>
            </Card.Body>
        </Card>
    );
};

export default DriverCard;