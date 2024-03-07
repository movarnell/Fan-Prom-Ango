import React from 'react'
import { DataContext } from './context/datacontext'
import { CartContext } from './context/cartcontext'
import { useState } from 'react'
import { useEffect } from 'react'
import CartTimer from './CartTimer'
const ContextWrapper = ({children}) => {

    

    const [movies, setMovies] = useState([
        {
          title: "Avatar",
          description:
            'Step into the mesmerizing world of Pandora where bioluminescent forests glow with ethereal beauty and towering floating mountains defy gravity. "Avatar" immerses you in a breathtaking epic of alien landscapes, thrilling adventure, and the timeless clash between nature and technology...',
          image:
            "https://pyxis.nymag.com/v1/imgs/51b/28a/622789406b8850203e2637d657d5a0e0c3-avatar-rerelease.2x.rsocial.w600.jpg",
          id: 1,
        },
        {
          title: "Shawshank Redemption",
          description:
            'In the heart of Shawshank State Penitentiary lies a story of resilience, friendship, and the unyielding human spirit. "Shawshank Redemption" is a cinematic masterpiece that takes you on a riveting journey through...',
          image:
            "https://m.media-amazon.com/images/M/MV5BMTQ5NTI4NDAxMV5BMl5BanBnXkFtZTcwMTQxNDY3Mw@@._V1_.jpg",
          id: 2,
        },
        {
          title: "Wonder Woman",
          description:
            'Experience the awe-inspiring power of Amazonian warriors and the courage of one woman who defies destiny to become a symbol of hope and strength. "Wonder Woman" transports you to the mythical realm of...',
          image:
            "https://m.media-amazon.com/images/M/MV5BZWVhYzE0NzgtM2U1Yi00OWM1LWJlZTUtZmNkNWZhM2VkMDczXkEyXkFqcGdeQW1yb3NzZXI@._V1_.jpg",
          id: 3,
        },
      ]);
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
        <CartContext.Provider value={{cart, setCart, cartTimer, setCartTimer, timerRunning, setTimerRunning}}>
            <DataContext.Provider value={{movies, setMovies, theaters, movieID, setMovieID, theaterID, setTheaterID}}>
            {timerRunning && <CartTimer timer={cartTimer} />}
                {children}
            </DataContext.Provider>
        </CartContext.Provider>
    </div>
  )
}

export default ContextWrapper
