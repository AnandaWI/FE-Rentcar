import React, { useState, useEffect } from "react";
import { Modal, Form, Button, Spinner } from "react-bootstrap";
import "./orderform.css";
import axiosInstance from "../../core/axiosinstance";

const OrderForm = ({
  show,
  onHide,
  searchParams,
  selectedCar,
  items,
  selectedDrivers,
  onResetCart,
  onResetCartAndGoHome, // ✅ Tambahkan prop baru
}) => {
  const [showReceipt, setShowReceipt] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // ✅ Tambahkan state loading

  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    noHp: "",
    destinasi: "",
    jumlahHari: "",
    alamatPenjemputan: "",
    detailDestinasi: "",
  });

  // ✅ Fungsi untuk reset semua data formulir
  const resetFormData = () => {
    setFormData({
      nama: "",
      email: "",
      noHp: "",
      destinasi: "",
      jumlahHari: "",
      alamatPenjemputan: "",
      detailDestinasi: "",
    });
  };

  const resetOrderForm = () => {
    resetFormData();
    setShowReceipt(false);
    setIsLoading(false); // ✅ Reset loading state
    onHide(); // Tutup modal
    if (typeof onResetCart === "function") {
      onResetCart(); // Reset cart & selectedDrivers di parent
    }
  };

  // ✅ Reset form setiap kali modal dibuka (show berubah dari false ke true)
  useEffect(() => {
    if (show) {
      // Reset semua data ketika modal dibuka
      resetFormData();
      setIsLoading(false); // ✅ Reset loading state
    }
  }, [show]);

  // ✅ Update formData dengan searchParams setelah reset
  useEffect(() => {
    console.log("searchParams di OrderForm:", searchParams);
    if (show && searchParams) {
      setFormData((prev) => ({
        ...prev,
        destinasi: searchParams.destinasi || "",
        jumlahHari: searchParams.jangkaWaktu || "",
      }));
    }
  }, [show, searchParams]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const calculateTotal = () => {
    return items.reduce((total, item) => {
      const hargaPerHari = parseInt(item.car.rent_price) || 0;
      const hargaDestinasi = parseInt(item.car.destination_price) || 0;
      const jumlahHari = parseInt(item.searchParams.jangkaWaktu) || 1;
      const selisihJangkaWaktuDestinasi =
        parseInt(item.searchParams.selisihJangkaWaktuDestinasi) || 0;
      const bbm = selisihJangkaWaktuDestinasi * 100000;
      const biayaJamJemput = parseInt(item.searchParams.biayaJamJemput) || 0;

      return (
        total +
        bbm * item.quantity +
        hargaDestinasi * item.quantity +
        hargaPerHari * jumlahHari * item.quantity +
        biayaJamJemput * item.quantity
      );
    }, 0);
  };

  // Function to format pickup time to "HH:MM" format
  const formatPickupTime = (timeString) => {
    if (!timeString) return "00:00";
    // If already in HH:MM format, return as is
    if (timeString.includes(":")) {
      return timeString;
    }
    // If it's just a number, format it as HH:00
    const hour = parseInt(timeString);
    return `${hour.toString().padStart(2, "0")}:00`;
  };

  // Function to format rent date to "YYYY-MM-DD" format
  const formatRentDate = (dateString) => {
    if (!dateString) return "";

    // If already in YYYY-MM-DD format, return as is
    if (dateString.includes("-") && dateString.match(/^\d{4}-\d{2}-\d{2}$/)) {
      return dateString;
    }

    // Handle Date object
    if (dateString instanceof Date) {
      const year = dateString.getFullYear();
      const month = (dateString.getMonth() + 1).toString().padStart(2, "0");
      const day = dateString.getDate().toString().padStart(2, "0");
      return `${year}-${month}-${day}`;
    }

    // Handle Indonesian date format like "27 Juli 2025"
    const monthMap = {
      januari: "01",
      februari: "02",
      maret: "03",
      april: "04",
      mei: "05",
      juni: "06",
      juli: "07",
      agustus: "08",
      september: "09",
      oktober: "10",
      november: "11",
      desember: "12",
    };

    const parts = dateString.toLowerCase().split(" ");
    if (parts.length === 3) {
      const day = parts[0].padStart(2, "0");
      const month = monthMap[parts[1]] || "01";
      const year = parts[2];
      return `${year}-${month}-${day}`;
    }

    // Handle other date formats (try to parse as Date)
    try {
      const parsedDate = new Date(dateString);
      if (!isNaN(parsedDate.getTime())) {
        const year = parsedDate.getFullYear();
        const month = (parsedDate.getMonth() + 1).toString().padStart(2, "0");
        const day = parsedDate.getDate().toString().padStart(2, "0");
        return `${year}-${month}-${day}`;
      }
    } catch (error) {
      console.error("Error parsing date:", error);
    }

    return dateString;
  };

  // Function to prepare order data for API
  const prepareOrderData = () => {
    const baseSearchParams = items[0]?.searchParams || {};

    const orderDetails = items.map((item) => {
      const detail = {
        owner_car_type_id: item.car.id,
      };

      if (
        selectedDrivers &&
        selectedDrivers[item.id] &&
        selectedDrivers[item.id].length > 0
      ) {
        detail.driver_id = selectedDrivers[item.id][0].id;
      }

      return detail;
    });

    const orderData = {
      name: formData.nama,
      address: formData.alamatPenjemputan,
      phone_number: formData.noHp,
      email: formData.email,
      destination_id: parseInt(baseSearchParams.destination_id) || 0,
      day: parseInt(baseSearchParams.jangkaWaktu?.split(" ")[0]) || 1,
      rent_date: formatRentDate(baseSearchParams.tanggal),
      pickup_time: formatPickupTime(baseSearchParams.jamPenjemputan),
      detail_destination: formData.detailDestinasi,
      order_details: orderDetails,
      total_price: calculateTotal(),
    };

    return orderData;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onHide(); // Tutup modal formulir data pemesanan
    setShowReceipt(true); // Tampilkan modal struk pembayaran
  };

  const handleBayar = async (e) => {
    e.preventDefault();
    setIsLoading(true); // ✅ Set loading true saat mulai proses

    try {
      const orderData = prepareOrderData();
      console.log("Order Data Object:", orderData);

      const response = await axiosInstance.post("/api/create-order", orderData);
      console.log("Order created:", response.data);

      const snapToken = response.data.data?.snap_token;

      if (snapToken && window.snap) {
        window.snap.pay(snapToken, {
          onSuccess: function (result) {
            console.log("Payment Success:", result);
            // ✅ Reset form setelah pembayaran berhasil
            resetFormData();
            setShowReceipt(false);
            setIsLoading(false); // ✅ Reset loading state
            if (typeof onResetCartAndGoHome === "function") {
              onResetCartAndGoHome();
            } else {
              resetOrderForm();
            }
          },
          onPending: function (result) {
            console.log("Payment Pending:", result);
            setIsLoading(false); // ✅ Reset loading state
          },
          onError: function (result) {
            console.error("Payment Error:", result);
            setIsLoading(false); // ✅ Reset loading state
            alert("Terjadi kesalahan saat memproses pembayaran");
          },
          onClose: async function () {
            setIsLoading(false); // ✅ Reset loading state
            const response = await axiosInstance.get(
              `/api/close-modal/${snapToken}`
            );
            if (response) {
              console.log(
                "Customer closed the popup without finishing payment"
              );
              alert("Pembayaran dibatalkan");
            }
          },
        });
      } else {
        setIsLoading(false); // ✅ Reset loading state
        alert("Token pembayaran tidak ditemukan.");
      }
    } catch (error) {
      console.error("Error submitting order:", error);
      setIsLoading(false); // ✅ Reset loading state
      alert("Gagal membuat pesanan. Silakan coba lagi.");
    }
  };

  // ✅ Handler untuk menutup modal dengan reset
  const handleModalClose = () => {
    resetFormData();
    setIsLoading(false); // ✅ Reset loading state
    onHide();
  };

  // ✅ Handler untuk menutup modal struk dengan reset
  const handleReceiptClose = () => {
    resetFormData();
    setIsLoading(false); // ✅ Reset loading state
    setShowReceipt(false);
  };

  return (
    <>
      {/* Modal Formulir Data Pemesanan */}
      <Modal
        show={show && !showReceipt}
        onHide={handleModalClose}
        size="lg"
        centered
        className="order-form-modal"
      >
        <Modal.Body className="p-4">
          <h4 className="text-center mb-4">Formulir Data Pemesanan</h4>
          <Form onSubmit={handleSubmit}>
            <div style={{ display: "flex", gap: "1rem" }}>
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

            <Form.Group className="mb-4">
              <Form.Control
                as="textarea"
                name="detailDestinasi"
                value={formData.detailDestinasi}
                onChange={handleChange}
                required
                placeholder="Detail Destinasi"
                rows={3}
                className="form-control-dark"
              />
            </Form.Group>

            <div className="d-flex gap-2">
              <Button variant="danger" onClick={onHide} className="flex-grow-1">
                Batalkan
              </Button>
              <Button variant="primary" type="submit" className="flex-grow-1">
                Selanjutnya
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Modal Struk Pembayaran */}
      <Modal
        show={showReceipt}
        onHide={handleReceiptClose}
        size="lg"
        centered
        className="receipt-modal"
        style={{ zIndex: 1060 }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Struk Pembayaran</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="receipt-content">
            <div className="receipt-header text-center mb-4">
              <h4>AEM Rentcar</h4>
              <p className="mb-0">
                Jl. Tembalang Selatan No. 11, Kota Semarang
              </p>
              <p>Telp: (021) 1234567</p>
            </div>

            <div className="customer-info mb-4">
              <p>
                <strong>Nama:</strong> {formData.nama}
              </p>
              <p>
                <strong>Email:</strong> {formData.email}
              </p>
              <p>
                <strong>No HP:</strong> {formData.noHp}
              </p>
              <p>
                <strong>Alamat Penjemputan:</strong>{" "}
                {formData.alamatPenjemputan}
              </p>
            </div>

            <div className="order-details">
              <h5 className="mb-3">Detail Pesanan:</h5>
              {items.map((item, index) => (
                <div key={index} className="order-item mb-3 pb-2 border-bottom">
                  <h6>
                    {item.car.name} ({item.quantity} unit)
                  </h6>
                  <p className="mb-1">Kategori: {item.searchParams.kategori}</p>
                  <p className="mb-1">
                    Durasi: {item.searchParams.jangkaWaktu}
                  </p>
                  <p className="mb-1">
                    Destinasi: {item.searchParams.destinasi}
                  </p>
                  {/* ✅ Tambahkan detail destinasi */}
                  {formData.detailDestinasi && (
                    <p className="mb-1">
                      Detail Destinasi: {formData.detailDestinasi}
                    </p>
                  )}
                  <p className="mb-1">Tanggal: {item.searchParams.tanggal}</p>
                  <p className="mb-1">
                    Jam Penjemputan: {item.searchParams.jamPenjemputan}
                  </p>
                  {selectedDrivers && selectedDrivers[item.id] && (
                    <p className="mb-1">
                      Driver:{" "}
                      {selectedDrivers[item.id]
                        .map((driver) => driver.name)
                        .join(", ")}
                    </p>
                  )}
                  <p className="mb-1 text-end">
                    Rp{" "}
                    {(
                      item.car.rent_price *
                        parseInt(item.searchParams.jangkaWaktu) *
                        item.quantity +
                      parseInt(item.searchParams.selisihJangkaWaktuDestinasi) *
                        100000 *
                        item.quantity +
                      parseInt(item.searchParams.biayaJamJemput) *
                        item.quantity +
                      parseInt(item.car.destination_price) * item.quantity
                    ).toLocaleString("id-ID")}
                  </p>
                </div>
              ))}
              <div className="total-amount mt-4">
                <h5 className="text-end">
                  Total: Rp {calculateTotal().toLocaleString("id-ID")}
                </h5>
              </div>
            </div>

            <div className="receipt-footer text-center mt-5">
              <p>Terima kasih telah menggunakan layanan kami</p>
              <div
                className="alert alert-warning border-danger mt-3 mb-3"
                style={{ backgroundColor: "#fff3cd", borderColor: "#dc3545" }}
              >
                <div className="d-flex align-items-start justify-content-center">
                  <i
                    className="fas fa-exclamation-triangle text-danger me-2 mt-1"
                    style={{ fontSize: "18px" }}
                  ></i>
                  <div className="text-start">
                    <strong className="text-danger">Perhatian:</strong>
                    <ul className="mb-0 mt-1" style={{ paddingLeft: "20px" }}>
                      <li
                        className="text-danger"
                        style={{ fontStyle: "italic" }}
                      >
                        *Setelah pembayaran tidak bisa ganti jadwal/reschedule
                      </li>
                      <li
                        className="text-danger"
                        style={{ fontStyle: "italic" }}
                      >
                        *Cek lagi pesanan anda sebelum melakukan pembayaran
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <small>Silakan melakukan pembayaran sesuai total di atas</small>
              <br />
              <small>
                Konfirmasi Pembayaran akan dikirimkan ke email anda setelah
                melakukan pembayaran
              </small>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={handleBayar}
            disabled={isLoading} // ✅ Disable button saat loading
          >
            {isLoading ? (
              <>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                  className="me-2"
                />
                Memproses...
              </>
            ) : (
              "Bayar"
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default OrderForm;
