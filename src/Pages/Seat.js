import { Col, Button, Row } from 'react-bootstrap';
import Loading from '../Components/Loading';
import DisabledSVG from '../Components/DisabledSVG';
import SeatRow from '../Components/SeatRow';
import { useEffect, useState } from 'react';
import CartTimer from '../Components/CartTimer';

function Seat({seats, setSeats , updateSeats, cart, setCart, isLoading}) {

const [cartTimer, setCartTimer] = useState(0);
const [timerRunning, setTimerRunning] = useState(false);



useEffect(() => {
  const timerInterval = setInterval(() => {
    if (timerRunning) {
      setCartTimer((prev) => prev + 1);
      console.log('line 18 set' + cartTimer);
    }
    if (cartTimer === 300) {
      setTimerRunning(false);
      setCart([]);
      setCartTimer(0);
    }
  }, 1000);

  return () => clearInterval(timerInterval); // this will clear the interval when the component unmounts
}, [cartTimer, timerRunning, setCart]); // dependencies of the useEffect hook


  // NOTE The following code is used to filter the seats into rows. We have used the filter method to filter the seats
    let rowA = seats.filter(seat => seat.id < 6);
    let rowB = seats.filter(seat => seat.id > 5 && seat.id < 11);
    let rowC = seats.filter(seat => seat.id > 10 && seat.id < 16);
    let rowD = seats.filter(seat => seat.id > 15 && seat.id < 21);



// NOTE Make a method to 'hold' selected seats so others can't purchase them. possibly add a timer as well to release the seat if not purchased.

    const handleSeatClick = (e, seat) => {
      e.preventDefault();
      
     
      
      if(seat.seatAvailable && !isSeatInCart(seat)){ //if - seat is available, and not in cart -  add to cart
        setCart([...cart, seat]);
        if(!timerRunning) {
          setTimerRunning(true);
        }
        if(cart.length === 0) {
          
        }
      } else {//else - if is in cart - remove from cart
        //filter cart array for matching seat id and set cart accordingly
        const newCart = cart.filter((c) => c.id !== seat.id);
        if(newCart.length === 0) {
          setTimerRunning(false);
          setCartTimer(0);
        }
        setCart(newCart);
      }
      
      console.log('line 77 set' + timerRunning);
     //update seat in state to show new status   
     setSeats([...seats]);
  }
    
   const finalPurchase = (e) => {
    setTimerRunning(false);
        e.preventDefault();
   if (cart.length === 0) {
     alert("Please select a seat");
   } else if (cart.length > 0) {
     cart.forEach((seat) => {
       seat.seatAvailable = false;
       updateSeats(seat);
       setCart([]);
      });
    }
  };
   
const isSeatInCart = (seat) => cart.some((cartSeat) => cartSeat.id === seat.id);
// INFO we have added the grid of seats to the Seat component. We have also added the onClick event to the seats. We will use this to select the seats. We will also add the logic to select the seats in the next step.

// FIXME We haven't finished the timer logic and showing the timer when running. We will add this in the next step.
  return (
    <Col className='align-items-center justify-items-center'>
      <Row>
        <h2 className='text-light'>Total: ${cart.reduce((acc, seat) => acc + seat.seatPrice, 0).toFixed(2)}
          <Button
            onClick={(e) => finalPurchase(e)}
            className='btn btn-success m-2'
          >
              Ready to Purchase
          </Button>
        </h2>
        
        {cart.length > 0 && 
          <h4 className='text-light'>You have selected the following seat(s): {cart &&
            cart.map(
                (ticket) =>
                ticket.disabled
                ? [<span key={ticket.id}>{ticket.seatDescription + ' '}</span>, <DisabledSVG key={`${ticket.id}-disabled`} />, ", "]
                : <span key={ticket.id}>{ticket.seatDescription + ', '}</span>
             )}
          </h4>
        }
          
        {cart.length === 0 && 
          <h4 className='text-light'>
            Please select a seat
          </h4>
        }
        <hr className='text-light'/>
{timerRunning && (<CartTimer timer={cartTimer} />)}
        

        
        
      </Row>
      <SeatRow row={rowA} isSeatInCart={isSeatInCart} handleSeatClick={handleSeatClick} isLoading={isLoading} Loading={Loading}/>
      <SeatRow row={rowB} isSeatInCart={isSeatInCart} handleSeatClick={handleSeatClick} isLoading={isLoading} Loading={Loading}/>
      <SeatRow row={rowC} isSeatInCart={isSeatInCart} handleSeatClick={handleSeatClick} isLoading={isLoading} Loading={Loading}/>
      <SeatRow row={rowD} isSeatInCart={isSeatInCart} handleSeatClick={handleSeatClick} isLoading={isLoading} Loading={Loading}/>
    </Col>
  );
}


export default Seat