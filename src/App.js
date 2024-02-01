import "./App.css";
import Header from "./Components/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import Navigation from "./Components/Navigation";
import { useEffect, useState } from "react";

function App() {
  const [seats, setSeats] = useState([]);

  useEffect(() => {
    getSeats();
  }, []);

  const getSeats = async () => {
    const response = await fetch(
      "https://65bc1cf852189914b5bd9bf1.mockapi.io/seats"
    );
    const data = await response.json();
    setSeats(data);
  };

  return (
    <div className='container-fluid bg-dark'>
      <Navigation />
      <Header />
      <div className='container'>
        <div className='row'>
          {seats.map((seat) => (
            <div className='col-4 border border-1 m-1 text-white' key={seat.id}>
              <p>Seat Number:{seat.seatDescription}</p>
              <p>Available: {seat.seatAvailable ? "Yes": "Sold"}</p>
              <p>Price: ${seat.seatPrice}</p>
              <p>{seat.disabled ? "Disabled": ""}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
