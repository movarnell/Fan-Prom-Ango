import "./App.css";
import Header from "./Components/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import Navigation from "./Components/Navigation";
import { useEffect, useState } from "react";
import Seat from "./Components/Seat";
// import { Row } from "react-bootstrap";

function App() {
  const [seats, setSeats] = useState([]);
  const [totalSales, setTotalSales] = useState(0);
  const [cart, setCart] = useState([]);

  const URL = "https://65bc1cf852189914b5bd9bf1.mockapi.io/seats/";

  useEffect(() => {
    getSeats();
  }, []);

  const getSeats = async () => {
    const response = await fetch(URL);
    const data = await response.json();
    setSeats(data);
  };

  const updateSeats = async (seat) => {
    const response = await fetch(`${URL}/${seat.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(seat),
    });
    const data = await response.json();
    const newSeats = seats.map((s) => (s.id === data.id ? data : s));
    setSeats(newSeats);
    if (seat.seatAvailable === false) {
      setTotalSales(totalSales + seat.seatPrice);
    } else if (seat.seatAvailable === true) {
      setTotalSales(totalSales - seat.seatPrice);
    }
  };

  return (
    <div className='container-fluid bg-dark'>
      <Navigation />
      <Header />
      <h2 className='text-light'>Total Sales: ${totalSales.toFixed(2)}</h2>
      <div className='container'>
        <Seat seats={seats} setSeats={setSeats} updateSeats={updateSeats} cart={cart} setCart={setCart} />
      </div>
    </div>
  );
}

export default App;
