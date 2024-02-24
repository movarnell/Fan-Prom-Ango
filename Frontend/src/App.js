import "./App.css";
import Header from "./Components/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import Navigation from "./Components/Navigation";
import CartTimer from "./Components/CartTimer";
import { useEffect, useState } from "react";
import Seat from "./Pages/Seat";
import DevTools from "./Pages/DevTools";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Checkout from "./Pages/Checkout";
import { Container } from "react-bootstrap";
import Footer from "./Components/Footer";
function App() {
  const [seats, setSeats] = useState([]);
  const [totalSales, setTotalSales] = useState(0);
  const [cart, setCart] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [cartTimer, setCartTimer] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const URL = "http://localhost:3001/seats";


  useEffect(() => {
    setIsLoading(true);
    getSeats();
  }, []);

  useEffect(() => {
    const timerLogic = () => {
      if (timerRunning) {
        setCartTimer((prev) => prev + 1);
        console.log('line 18 set' + cartTimer);
      }
      if (cartTimer === 300) {
        setTimerRunning(false);
        setCart([]);
        setCartTimer(0);
      }
    };
  
    const timerInterval = setInterval(timerLogic, 1000);
  
    return () => clearInterval(timerInterval); // this will clear the interval when the component unmounts
  }, [cartTimer, timerRunning, setCart, setCartTimer, setTimerRunning]); // dependencies of the useEffect hook

  const getSeats = async () => {
    setIsLoading(true);
    const response = await fetch(URL);
    const data = await response.json();
    setSeats(data);
    setIsLoading(false)
  };

  const updateSeats = async (seat) => {
    setIsLoading(true);
    console.log("Update Seats Ran")
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
      console.log("seat set to false")
    } else if (seat.seatAvailable === true) {
      setTotalSales(totalSales - seat.seatPrice);
      console.log("seat set to true")
    }
    setIsLoading(false);
  };
console.log(seats);


  return (<Router>
  <Container fluid className="bg-dark min-vh-100">
  
    
      <Navigation />
      <Header />
      {timerRunning && (<CartTimer timer={cartTimer} />)}
      <div className='container'>
        
       
          <Switch>
            <Route exact path='/' render={() => <Seat seats={seats} setSeats={setSeats} cart={cart} setCart={setCart} isLoading={isLoading} setCartTimer={setCartTimer} timerRunning={timerRunning} setTimerRunning={setTimerRunning}/>} />
            <Route path='/devtools' render={() => <DevTools seats={seats} updateSeats={updateSeats} setIsLoading={setIsLoading} isLoading={isLoading}/>} />
            <Route path='/checkout' render={() => <Checkout cart={cart} setCart={setCart} isLoading={isLoading} setIsLoading={setIsLoading} cartTimer={cartTimer} setCartTimer={setCartTimer} setTimerRunning={setTimerRunning} updateSeats={updateSeats} />} />
          </Switch>
       
          
          
      </div>
    
      <Footer/>
    </Container>
    </Router> 
  );
}

export default App;
