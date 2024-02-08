import "./App.css";
import Header from "./Components/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import Navigation from "./Components/Navigation";
import { useEffect, useState } from "react";
import Seat from "./Components/Seat";
// import { Row } from "react-bootstrap";

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
       <Seat seats={seats} />
      </div>
    </div>
  );
}

export default App;
