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
  const [cart, setCart] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [cartTimer, setCartTimer] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const [movies, setMovies] = useState([]);
  const [theaters, setTheaters] = useState([]);
  const moviesArr = [
    { title: 'Avatar', description: 'Step into the mesmerizing world of Pandora where bioluminescent forests glow with ethereal beauty and towering floating mountains defy gravity. "Avatar" immerses you in a breathtaking epic of alien landscapes, thrilling adventure, and the timeless clash between nature and technology. Journey with Jake Sully as he discovers the wonders of the Navi, faces the perils of corporate greed, and ultimately finds his destiny amidst the splendor of Pandoras vibrant ecosystems.', image: 'path/to/image1.jpg', id: 1},
    { title: 'Shawshank Redemption', description: 'In the heart of Shawshank State Penitentiary lies a story of resilience, friendship, and the unyielding human spirit. "Shawshank Redemption" is a cinematic masterpiece that takes you on a riveting journey through the depths of despair and the triumph of hope. Follow Andy Dufresne and Red as they navigate the harsh realities of prison life, forging bonds that defy the confines of their captivity. With its stirring narrative and powerful performances, "Shawshank Redemption" captivates audiences with its timeless tale of redemption and the enduring power of the human soul.', image: 'path/to/image2.jpg', id: 2},
    { title: 'Wonder Woman', description: 'Experience the awe-inspiring power of Amazonian warriors and the courage of one woman who defies destiny to become a symbol of hope and strength. "Wonder Woman" transports you to the mythical realm of Themyscira, where fierce battles and ancient legends collide in a breathtaking spectacle of heroism and wonder. Join Diana Prince as she embarks on a daring journey into the world of mortals, confronting the horrors of war and the darkness within humanity. With heart-pounding action and a fierce spirit of justice, "Wonder Woman" inspires audiences to believe in the power of compassion and the triumph of love over evil.', image: 'path/to/image3.jpg', id: 3},
];
const theatersArr = [
  { name: 'Promineo Cinema', location: '123 ACDC St., Thundertown, WI', id: '1'},
  { name: 'Local Hometown Theater', location: '87 Hamilton Row, Potatoville, ID', id: '2' },
  { name: 'Awesome Stage', location: '32 Cool St., AwesomeVille, OH', id: '3' },
]
  const URL = "http://localhost:3001/seats";


  useEffect(() => {
    setIsLoading(true);
    getSeats();
    setMovies(moviesArr);
    setTheaters(theatersArr);
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
    setIsLoading(false);
  };
console.log(seats);


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
