import React, { useEffect, useState } from "react";
import "../BookingSearch/bookingsearch.css";
import { Container, Col, Row, Button } from "react-bootstrap";
import DatePicker from "react-datepicker";
import TimePicker from "react-time-picker";
import "react-datepicker/dist/react-datepicker.css";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import CustomDropdown from "../CustomDropdown/CustomDropdown";
import { useNavigate } from "react-router-dom";
import { addDays, format } from "date-fns";
import id from "date-fns/locale/id";
import axiosInstance from "../../core/axiosinstance";

const BookingSearch = () => {
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState(new Date());
  const [value, onChange] = useState("00:00");
  const [formData, setFormData] = useState({
    jangkaWaktu: "",
    kategori: "",
    destinasi: "",
    destination_id: "",
    selisihJangkaWaktuDestinasi: "",
    biayaJamJemput: 0,
  });
  const [error, setError] = useState("");
  const [destinationData, setDestinationData] = useState([]);
  const [minJangkaWaktu, setMinJangkaWaktu] = useState(1);

  useEffect(() => {
    const fetchDestination = async () => {
      try {
        const response = await axiosInstance.get("/api/guest/destinations");
        setDestinationData(response.data.data);
      } catch (error) {
        console.error("Error fetching destination:", error);
      }
    };
    fetchDestination();
  }, []);

  const selectedJangkaWaktu = (value) => {
    const jumlahHariDipilih = parseInt(value.split(" ")[0]);

    // Hitung selisih langsung dengan minJangkaWaktu saat ini
    const selisih = jumlahHariDipilih - minJangkaWaktu;

    setFormData((prev) => ({
      ...prev,
      jangkaWaktu: value,
      selisihJangkaWaktuDestinasi: selisih,
    }));

    if (error) setError("");
  };

  useEffect(() => {
    console.log("minJangkaWaktu updated:", minJangkaWaktu);
  }, [minJangkaWaktu]);

  const selectedKategori = (value) => {
    setFormData((prev) => ({ ...prev, kategori: value }));
    if (error) setError("");
  };

  const selectedDestinasi = (value) => {
    const selectedDest = destinationData.find((dest) => dest.name === value);

    if (selectedDest) {
      const minimalHari = parseInt(selectedDest.posibility_day);

      setMinJangkaWaktu(minimalHari);

      // Set nama, id, dan selisih ke formData
      setFormData((prev) => ({
        ...prev,
        destinasi: value,
        destination_id: selectedDest.id,
      }));
    } else {
      setMinJangkaWaktu(1);
      setFormData((prev) => ({
        ...prev,
        destinasi: value,
        destination_id: "",
      }));
    }

    if (error) setError("");
  };

  const handleSearch = () => {
    const { jangkaWaktu, kategori, destinasi, selisihJangkaWaktuDestinasi } =
      formData;

    if (!startDate || !value || !jangkaWaktu || !kategori || !destinasi) {
      setError("Mohon isi semua informasi terlebih dahulu.");
      return;
    }

    const jangkaWaktuHari = parseInt(jangkaWaktu.split(" ")[0]);
    const notAvailableDate = addDays(startDate, jangkaWaktuHari);

    const available_at = format(startDate, "yyyy-MM-dd");
    const not_available_at = format(notAvailableDate, "yyyy-MM-dd");

    const searchParams = {
      tanggal: startDate,
      jamPenjemputan: value,
      jangkaWaktu: jangkaWaktu,
      kategori: kategori,
      destinasi: destinasi,
      destination_id: formData.destination_id,
      selisihJangkaWaktuDestinasi: selisihJangkaWaktuDestinasi,
      biayaJamJemput: formData.biayaJamJemput,
    };

    navigate(
      `/hasil-pencarian?available_at=${available_at}&not_available_at=${not_available_at}&kategori=${kategori}&destination_id=${formData.destination_id}`,
      { state: searchParams }
    );
  };

  return (
    <>
      <section className="box-search-booking">
        <Container>
          <Row>
            <Col md={12} xs={12}>
              <div className="box-search shadow-sm">
                <div className="item-search item-search-2">
                  <label className="item-search-label">Tanggal</label>
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => {
                      setStartDate(date);
                      if (error) setError("");
                    }}
                    dateFormat={"dd MMMM yyyy"}
                    locale={id} //tambahkan locale Indonesia
                    minDate={new Date()}
                  />
                </div>
                <div className="item-search">
                  <label className="item-search-label">Jam Penjemputan</label>
                  <TimePicker
                    onChange={(val) => {
                      // Jika ada nilai yang dipilih, pastikan menitnya selalu 00 dan jam tidak lebih dari 23
                      if (val) {
                        const hour = parseInt(val.split(":")[0]);
                        if (hour > 23) {
                          const finalTime = "23:00";
                          onChange(finalTime);
                          setFormData((prev) => ({
                            ...prev,
                            biayaJamJemput: calculatePickupTimeCharge(finalTime),
                          }));
                        } else {
                          const formattedTime = `${hour
                            .toString()
                            .padStart(2, "0")}:00`;
                          onChange(formattedTime);
                          setFormData((prev) => ({
                            ...prev,
                            biayaJamJemput: calculatePickupTimeCharge(formattedTime),
                          }));
                        }
                      } else {
                        onChange(val);
                        setFormData((prev) => ({
                          ...prev,
                          biayaJamJemput: 0,
                        }));
                      }
                      if (error) setError("");
                    }}
                    value={value}
                    format="HH:mm"
                    disableClock={true}
                    clearIcon={null}
                    maxDetail="hour"
                    maxTime="23:00"
                  />
                </div>
                <div className="item-search">
                  <CustomDropdown
                    label="Destinasi"
                    onSelect={selectedDestinasi}
                    options={destinationData.map((dest) => dest.name)}
                  />
                </div>
                <div className="item-search">
                  <CustomDropdown
                    label="Kategori"
                    onSelect={selectedKategori}
                    options={["VIP", "Reguler"]}
                  />
                </div>
                <div className="item-search">
                  <CustomDropdown
                    label="Jangka Waktu"
                    onSelect={selectedJangkaWaktu}
                    options={Array.from(
                      { length: 7 - minJangkaWaktu + 1 },
                      (_, i) => `${i + minJangkaWaktu} Hari`
                    )}
                  />
                </div>
                <div className="item-search bd-none">
                  <Button
                    className="primaryBtn flex-even d-flex justify-content-center"
                    onClick={handleSearch}
                  >
                    <i className="bi bi-search me-2"></i> Cari Mobil
                  </Button>
                  {error && (
                    <div style={{ color: "red", marginTop: "8px" }}>
                      {error}
                    </div>
                  )}
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default BookingSearch;

  // Function to calculate pickup time charge
  const calculatePickupTimeCharge = (time) => {
    const hour = parseInt(time.split(":")[0]);
    
    switch (hour) {
      case 5:
        return 50000;
      case 4:
        return 100000;
      case 3:
        return 150000;
      case 2:
        return 200000;
      case 1:
        return 250000;
      case 0:
        return 300000;
      default:
        return 0;
    }
  };
