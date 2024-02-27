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
import Home from "./Pages/Home";
import Movies from "./Pages/Movies";
import Theaters from "./Pages/Theaters";
import PurchaseSuccess from "./Pages/PurchaseSuccess";
function App() {
  const [movieID, setMovieID] = useState(0);
  const [theaterID, setTheaterID] = useState(0);
  const [seats, setSeats] = useState([]);
  const [movies, setMovies] = useState([]);
  const [theaters, setTheaters] = useState([]);
  const [cart, setCart] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [cartTimer, setCartTimer] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  
  
  const URL = "http://localhost:3001";
 


  useEffect(() => {
    setIsLoading(true);
    getSeats();
    getMovies();
    getTheaters();
  }, [] );

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
    const response = await fetch(`${URL}/seats`);
    const data = await response.json();
    setSeats(data);
    setIsLoading(false)
  };

  const getMovies = async () => {
    setIsLoading(true);
    const response = await fetch(`${URL}/movies`);
    const data = await response.json();
    setMovies(data);
    setIsLoading(false);
  };

  const getTheaters = async () => {
    setIsLoading(true);
    const response = await fetch(`${URL}/theaters`);
    const data = await response.json();
    setTheaters(data);
    setIsLoading(false);
  };

  const updateSeats = async (seat) => {
    setIsLoading(true);
    console.log("Update Seats Ran")
    const response = await fetch(`${URL}/seats/${seat.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(seat),
    });
    const data = await response.json();
    const newSeats = seats.map((s) => (s.id === data.id ? data : s));
    setSeats(newSeats);
    setIsLoading(false);
  };



  return (<Router>
  <Container fluid className="bg-dark min-vh-100">
  
    
      <Navigation cart={cart}/>
      <Header />
      {timerRunning && (<CartTimer timer={cartTimer} />)}
      <div className='container'>
        
       
          <Switch>
            <Route exact path='/' render={() => <Home/>} />
            <Route path='/devtools' render={() => <DevTools seats={seats} updateSeats={updateSeats} setIsLoading={setIsLoading} isLoading={isLoading}/>} />
            <Route path='/checkout' render={() => <Checkout cart={cart} setCart={setCart} isLoading={isLoading} setIsLoading={setIsLoading} cartTimer={cartTimer} setCartTimer={setCartTimer} setTimerRunning={setTimerRunning} updateSeats={updateSeats} movieID={movieID} theaterID={theaterID} movies={movies} theaters={theaters} />} />
            <Route path='/seat' render={() => <Seat seats={seats} setSeats={setSeats} cart={cart} setCart={setCart} isLoading={isLoading} setCartTimer={setCartTimer} timerRunning={timerRunning} setTimerRunning={setTimerRunning} movieID={movieID} theaterID={theaterID} theaters={theaters} movies={movies} />} />
            <Route path='/movies' render={() => <Movies theaterID={theaterID} setMovieID={setMovieID} movies={movies} theaters={theaters}/>} />
            <Route path='/theaters' render={() => <Theaters movieID={movieID} setTheaterID={setTheaterID} theaters={theaters} movies={movies}/>} />
            <Route path='/success' render={() => <PurchaseSuccess/>} />
          </Switch>
       
          
          
      </div>
    
      <Footer/>
    </Container>
    </Router> 
  );
}

export default App;
