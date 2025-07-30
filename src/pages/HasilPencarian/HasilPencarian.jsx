import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Badge } from "react-bootstrap";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import "./hasilpencarian.css";
import Header from "../../components/Common/Header/Header";
import axiosInstance from "../../core/axiosinstance";

const HasilPencarian = () => {
  const location = useLocation();
  const state = location.state || {};
  const [searchParams, setSearchParams] = useState(() => {
    const initial = location.state || {};
    return {
      ...initial,
      selisihJangkaWaktuDestinasi: initial.selisihJangkaWaktuDestinasi || 0,
    };
  });

  const param = new URLSearchParams(location.search);
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const availableAt = param.get("available_at");
  const notAvailableAt = param.get("not_available_at");
  const kategori = param.get("kategori");
  const destination_id = param.get("destination_id");

  useEffect(() => {
    const fetchHasilPencarian = async () => {
      try {
        const response = await axiosInstance.get(
          `/api/guest/car-availability?available_at=${availableAt}&not_available_at=${notAvailableAt}&kategori=${kategori}&destination_id=${destination_id}`
        );
        setCars(response.data.data);
      } catch (error) {
        console.error("Error fetching services:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHasilPencarian();
  }, [availableAt, notAvailableAt, kategori]); // tambahkan kategori disini

  const formatDate = (date) => {
    return format(new Date(date), "dd MMMM yyyy", { locale: id });
  };

  const handleKategoriChange = (newKategori) => {
    setSearchParams((prev) => ({
      ...prev,
      kategori: newKategori,
    }));

    // Update URL param dan trigger useEffect
    param.set("kategori", newKategori);
    navigate(`${location.pathname}?${param.toString()}`, { replace: true });
  };

  return (
    <>
      <Header />
      <Container className="mt-6 pt-5">
        {/* Ringkasan Pencarian */}
        <Row className="mb-4">
          <Col>
            <Card className="search-summary shadow-sm">
              <Card.Body>
                <h4 className="mb-3">Ringkasan Pencarian</h4>
                <Row className="search-summary-row">
                  <Col xl={3} lg={3} md={6} sm={6} xs={12}>
                    <div className="search-item">
                      <small className="text-muted">Tanggal</small>
                      <p className="mb-0">{formatDate(searchParams.tanggal)}</p>
                    </div>
                  </Col>
                  <Col xl={2} lg={2} md={6} sm={6} xs={12}>
                    <div className="search-item">
                      <small className="text-muted">Jam Penjemputan</small>
                      <p className="mb-0">
                        {searchParams.jamPenjemputan || "-"}
                      </p>
                    </div>
                  </Col>
                  <Col xl={2} lg={2} md={6} sm={6} xs={12}>
                    <div className="search-item">
                      <small className="text-muted">Jangka Waktu</small>
                      <p className="mb-0">{searchParams.jangkaWaktu}</p>
                    </div>
                  </Col>
                  <Col xl={2} lg={2} md={6} sm={6} xs={12}>
                    <div className="search-item">
                      <small className="text-muted">Kategori</small>
                      <div className="d-flex align-items-center gap-2">
                        <select
                          className="form-select form-select-sm"
                          value={searchParams.kategori}
                          onChange={(e) => handleKategoriChange(e.target.value)}
                        >
                          <option value="VIP">VIP</option>
                          <option value="Reguler">Reguler</option>
                        </select>
                      </div>
                    </div>
                  </Col>
                  <Col xl={3} lg={3} md={12} sm={12} xs={12}>
                    <div className="search-item">
                      <small className="text-muted">Destinasi</small>
                      <p className="mb-0">{searchParams.destinasi}</p>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Daftar Mobil */}
        <Row className="mb-3">
          <Col>
            <h4>Mobil Tersedia</h4>
            <p className="text-muted">
              Menampilkan hasil pencarian sesuai kriteria Anda
            </p>
          </Col>
        </Row>

        <Row>
          {loading ? (
            <p className="text-muted">Loading...</p>
          ) : cars.length > 0 ? (
            cars.map((car) => (
              <Col
                xl={3}
                lg={4}
                md={6}
                sm={6}
                xs={12}
                key={car.id}
                className="mb-4"
              >
                <Card className="car-card h-100 shadow-sm">
                  <div className="card-img-container">
                    <Card.Img
                      variant="top"
                      src={car.image?.path || "/default.jpg"}
                      alt={car.name}
                    />
                  </div>
                  <Card.Body className="d-flex flex-column">
                    <div className="d-flex justify-content-between align-items-start mb-2 flex-wrap">
                      <Badge
                        bg={
                          car.category?.name === "VIP" ? "warning" : "secondary"
                        }
                        className="mb-2 category-badge"
                      >
                        {car.category?.name}
                      </Badge>
                      <Badge bg="primary" className="availability-badge">
                        Tersedia {car.count} unit
                      </Badge>
                    </div>
                    <Card.Title className="car-title mb-0">
                      {car.name}
                    </Card.Title>
                    <div className="features mb-1">
                      <span className="feature-item">
                        <i className="bi bi-people"></i> {car.capacity} Kursi
                      </span>
                    </div>
                    <Card.Text className="price mb-0 d-flex flex-column mt-auto">
                      <small className="text-muted price-label">
                        Mulai dari
                      </small>
                      <span className="fw-bold price-amount">
                        Rp {Number(car?.rent_price).toLocaleString("id-ID")}
                        <span className="price-unit">/hari</span>
                      </span>
                    </Card.Text>
                  </Card.Body>
                  <Card.Footer className="bg-white border-top-0 card-footer-custom">
                    <button
                      className="btn btn-primary w-100 add-to-cart-btn"
                      onClick={() =>
                        window.cartButton.handleAddToCart(car, {
                          ...searchParams,
                          tanggal: formatDate(searchParams.tanggal),
                        })
                      }
                    >
                      <span className="btn-text">Tambah ke Keranjang</span>
                    </button>
                  </Card.Footer>
                </Card>
              </Col>
            ))
          ) : (
            <p className="text-muted">
              Tidak ada mobil dengan kategori {searchParams.kategori} tersedia.
            </p>
          )}
        </Row>
      </Container>
    </>
  );
};

export default HasilPencarian;
