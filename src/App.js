import "./App.css";
import Header from "./Components/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import Navigation from "./Components/Navigation";
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
import ContextWrapper from "./Components/ContextWrapper";
//import MovieDB from "./Components/MovieDB";

function App() {
  const [seats, setSeats] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [movies, setMovies] = useState([])
  console.log(movies)
  
  const URL = "https://august-now-406001.wm.r.appspot.com/seats";

  useEffect(() => {
    setIsLoading(true);
    getSeats();
  }, []);

   // dependencies of the useEffect hook

  const getSeats = async () => {
    setIsLoading(true);
    const response = await fetch(URL);
    const data = await response.json();
    setSeats(data);
    setIsLoading(false);
  };

  const updateSeats = async (seat) => {
    setIsLoading(true);
    console.log("Update Seats Ran");
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

  return (
    <ContextWrapper>
      <Router>
        <Container fluid className="bg-dark min-vh-100">
          <Navigation />
          <Header />
          <div className="container">
            {/* <MovieDB movies={movies} setMovies={setMovies} /> */}
            <Switch>
              <Route exact path="/" render={() => <Home />} />
              <Route
                path="/devtools"
                render={() => (
                  <DevTools
                    seats={seats}
                    updateSeats={updateSeats}
                    setIsLoading={setIsLoading}
                    isLoading={isLoading}
                  />
                )}
              />
              <Route
                path="/checkout"
                render={() => (
                  <Checkout
                    isLoading={isLoading}
                    setIsLoading={setIsLoading}
                    updateSeats={updateSeats}
                  />
                )}
              />
              <Route
                path="/seat"
                render={() => (
                  <Seat
                    seats={seats}
                    setSeats={setSeats}
                    isLoading={isLoading}
                  />
                )}
              />
              <Route path="/movies" render={() => <Movies />} />
              <Route path="/theaters" render={() => <Theaters />} />
              <Route path="/success" render={() => <PurchaseSuccess />} />
            </Switch>
          </div>

          <Footer />
        </Container>
      </Router>
    </ContextWrapper>
  );
}

export default App;
