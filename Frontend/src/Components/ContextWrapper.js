import React from 'react'
import { DataContext } from './context/datacontext'
import { CartContext } from './context/cartcontext'
import { useState, useEffect } from 'react'
import CartTimer from './CartTimer'
import { getMovies, getShowtimes, getTheaters, updateSeat} from "../utils/api";

const ContextWrapper = ({children}) => {

    const [showtimes, setShowtimes] = useState([]);
  const [movies, setMovies] = useState([]);
  const [theaters, setTheaters] = useState([]);

  const [showtimeID, setShowtimeID] = useState(0);

    const [isLoading, setIsLoading] = useState(false);
    const [cart, setCart] = useState([]);
    const [cartTimer, setCartTimer] = useState(0);
    const [timerRunning, setTimerRunning] = useState(false);
    

    useEffect(() => {
        setIsLoading(true);
        getData();
      }, [] );
    
      useEffect(() => {
        const timerLogic = () => {
          if (timerRunning) {
            setCartTimer((prev) => prev + 1);
          }
          if (cartTimer === 300) {
            setTimerRunning(false);
            setCart([]);
            setCartTimer(0);
          }
        };
      
        const timerInterval = setInterval(timerLogic, 1000);
      
        return () => clearInterval(timerInterval); // this will clear the interval when the component unmounts
      }, [cartTimer, timerRunning, setCart, setCartTimer, setTimerRunning]);// dependencies of the useEffect hook


      const getData = async () => {
        setIsLoading(true);
        const moviesData = await getMovies();
        const theatersData = await getTheaters();
        const showtimesData = await getShowtimes();
        setMovies(moviesData);
        setTheaters(theatersData);
        setShowtimes(showtimesData);
        setIsLoading(false);
      }
      

  
  return (
    <div>
        <CartContext.Provider value={{cart, setCart, cartTimer, setCartTimer, timerRunning, setTimerRunning}}>
           <DataContext.Provider value={{movies, setMovies, theaters, setTheaters, showtimes, setShowtimes, updateSeat, showtimeID, setShowtimeID, isLoading, setIsLoading}}>
           {timerRunning && <CartTimer timer={cartTimer} />}
                {children}
           </DataContext.Provider>
        </CartContext.Provider>
    </div>
  )
}

export default ContextWrapper
