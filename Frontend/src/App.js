import "./App.css";
import Header from "./Components/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import Navigation from "./Components/Navigation";
import { useEffect, useState } from "react";
import Seat from "./Pages/Seat";
import DevTools from "./Pages/DevTools";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Checkout from "./Pages/Checkout";
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


  return (<div className='container-fluid bg-dark'>
  <Router>
    
      <Navigation />
      <Header />
      <div className='container'>
        
       
          <Switch>
            <Route exact path='/' render={() => <Seat seats={seats} setSeats={setSeats} updateSeats={updateSeats} cart={cart} setCart={setCart} isLoading={isLoading} cartTimer={cartTimer} setCartTimer={setCartTimer} timerRunning={timerRunning} setTimerRunning={setTimerRunning}/>} />
            <Route path='/devtools' render={() => <DevTools seats={seats} updateSeats={updateSeats} setIsLoading={setIsLoading} isLoading={isLoading}/>} />
            <Route path='/checkout' render={() => <Checkout cart={cart} setCart={setCart} isLoading={isLoading} setIsLoading={setIsLoading} timerRunning={timerRunning} setTimerRunning={setTimerRunning} updateSeats={updateSeats} />} />
          </Switch>
       
          
          
      </div>
    
    </Router></div> 
  );
}

export default App;