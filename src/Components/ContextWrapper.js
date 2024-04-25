import React from "react";
import { DataContext } from "./context/datacontext";
import { CartContext } from "./context/cartcontext";
import { useState } from "react";
import { useEffect } from "react";
import CartTimer from "./CartTimer";
const ContextWrapper = ({ children }) => {
  const [showTimes, setShowtimes] = useState([]);
  const [movies, setMovies] = useState([]);
  const SHOWTIME_ENDPOINT =
  "https://65bc1cf852189914b5bd9bf1.mockapi.io/showtimes";

  const getShowtimes = async () => {
    let response = await fetch(SHOWTIME_ENDPOINT);
    let data = await response.json();

    setShowtimes(data);
  };

  

  useEffect(() => {
    
  }, []);

  useEffect(() => {
    getShowtimes();
    getMovies();
  }, []);

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhN2Y0ZTAyYmNjNjBjZTI4NThiNTIyZTA0MDZjNzVmYyIsInN1YiI6IjY0MTc1ZDY5MzEwMzI1MDBlOGEyNGUxNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.vqS903rTtu9_RXuOvldMCRQnIDI15fEypp2rxApIi60",
    },
  };
  const getMovies = async () => {
    let response = await fetch(
      "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
      options
    );
    let data = await response.json();
    setMovies(data.results);
  };

  console.log(movies);

  const [theaters] = useState([
    {
      name: "Promineo Cinema",
      location: "123 ACDC St., Thundertown, WI",
      id: "1",
    },
    {
      name: "Local Hometown Theater",
      location: "87 Hamilton Row, Potatoville, ID",
      id: "2",
    },
    {
      name: "Awesome Stage",
      location: "32 Cool St., AwesomeVille, OH",
      id: "3",
    },
  ]);
  const [movieID, setMovieID] = useState(0);
  const [theaterID, setTheaterID] = useState(0);

  const [cartTimer, setCartTimer] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const [cart, setCart] = useState([]);
  useEffect(() => {
    const timerLogic = () => {
      if (timerRunning) {
        setCartTimer((prev) => prev + 1);
        console.log("line 18 set" + cartTimer);
      }
      if (cartTimer === 300) {
        setTimerRunning(false);
        setCart([]);
        setCartTimer(0);
      }
    };

    const timerInterval = setInterval(timerLogic, 1000);

    return () => clearInterval(timerInterval); // this will clear the interval when the component unmounts
  }, [cartTimer, timerRunning, setCart, setCartTimer, setTimerRunning]);

  return (
    <div>
      <CartContext.Provider
        value={{
          cart,
          setCart,
          cartTimer,
          setCartTimer,
          timerRunning,
          setTimerRunning,
        }}
      >
        <DataContext.Provider
          value={{
            movies,
            setMovies,
            theaters,
            movieID,
            setMovieID,
            theaterID,
            setTheaterID,
            showTimes,
            setShowtimes,
          }}
        >
          {timerRunning && <CartTimer timer={cartTimer} />}
          {children}
        </DataContext.Provider>
      </CartContext.Provider>
    </div>
  );
};

export default ContextWrapper;
