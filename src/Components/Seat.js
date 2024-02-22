import { Col, Button, Row } from 'react-bootstrap';
import Loading from './Loading';
import DisabledSVG from './DisabledSVG';
import SeatRow from './SeatRow';
function Seat({seats, setSeats , updateSeats, cart, setCart, isLoading, timerRunning, setTimerRunning, purchaseTimer }) {
  // NOTE The following code is used to filter the seats into rows. We have used the filter method to filter the seats
    let rowA = seats.filter(seat => seat.id < 6);
    let rowB = seats.filter(seat => seat.id > 5 && seat.id < 11);
    let rowC = seats.filter(seat => seat.id > 10 && seat.id < 16);
    let rowD = seats.filter(seat => seat.id > 15 && seat.id < 21);




// NOTE Make a method to 'hold' selected seats so others can't purchase them. possibly add a timer as well to release the seat if not purchased.

    const handleSeatClick = (e, seat) => {
      e.preventDefault();
      
      //if - seat is available, and not in cart -  add to cart
      //else - if is in cart - remove from cart
      if(seat.seatAvailable && !isSeatInCart(seat)){
        timerRunning = true;
        setCart([...cart, seat]);
      } else {
        //filter cart array for matching seat id and set cart accordingly
        const newCart = cart.filter((c) => c.id !== seat.id);
        if(cart.length < 1){
          setTimerRunning(false);
        }
        setCart(newCart);
      }
      
      
     //update seat in state to show new status   
     setSeats([...seats]);
  
      }
    
    //THIS IS CURRENTLY ONLY WAY TO CHANGE SEAT STATE IN DB, NEED WAY FOR DEVS OR ADMINS TO CHANGE SEAT STATE
   const finalPurchase = (e) => {
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
        <h2 className='text-light'>Total: ${cart.reduce((acc, seat) => acc + seat.seatPrice, 0).toFixed(2)}</h2>
        
        <h2 className='text-light'>Timer: {Math.floor(purchaseTimer / 60)}:{purchaseTimer % 60}</h2>
        <hr className='text-light'/>

        {cart.length > 0 && 
          <h4 className='text-light'>You have selected the following seats: {cart &&
            cart.map(
                (ticket) =>
                ticket.disabled
                ? [<span key={ticket.id}>{ticket.seatDescription + ' '}</span>, <DisabledSVG key={`${ticket.id}-disabled`} />, ", "]
                : <span key={ticket.id}>{ticket.seatDescription + ', '}</span>
             )}
          </h4>}

        {cart.length === 0 && <h4 className='text-light'>Please select a seat</h4>}
        
        <Button
          onClick={(e) => finalPurchase(e)}
          className='btn btn-success m-2'
        >
          Ready to Purchase
        </Button>
      </Row>
      <SeatRow row={rowA} isSeatInCart={isSeatInCart} handleSeatClick={handleSeatClick} isLoading={isLoading} Loading={Loading}/>
      <SeatRow row={rowB} isSeatInCart={isSeatInCart} handleSeatClick={handleSeatClick} isLoading={isLoading} Loading={Loading}/>
      <SeatRow row={rowC} isSeatInCart={isSeatInCart} handleSeatClick={handleSeatClick} isLoading={isLoading} Loading={Loading}/>
      <SeatRow row={rowD} isSeatInCart={isSeatInCart} handleSeatClick={handleSeatClick} isLoading={isLoading} Loading={Loading}/>
    </Col>
  );
}


export default Seat