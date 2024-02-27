import { Col, Row} from 'react-bootstrap';
import Loading from '../Components/Loading';
import DisabledSVG from '../Components/DisabledSVG';
import SeatRow from '../Components/SeatRow';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';


function Seat({seats, setSeats, cart, setCart, isLoading, setCartTimer, timerRunning, setTimerRunning, movieID, theaterID, theaters, movies}) {

const history = useHistory();
useEffect(() => {
  if(movieID === 0 || theaterID === 0) {
    history.push('/');
}
},[history, movieID, theaterID] );





  // NOTE The following code is used to filter the seats into rows. We have used the filter method to filter the seats
    let rowA = seats.filter(seat => seat.id < 6);
    let rowB = seats.filter(seat => seat.id > 5 && seat.id < 11);
    let rowC = seats.filter(seat => seat.id > 10 && seat.id < 16);
    let rowD = seats.filter(seat => seat.id > 15 && seat.id < 21);



// NOTE Make a method to 'hold' selected seats so others can't purchase them. possibly add a timer as well to release the seat if not purchased.

    const handleSeatClick = (e, seat) => {
      e.preventDefault();
      
     
      
      if(seat.theaters[theaterID - 1].movies[movieID - 1].seatAvailable && !isSeatInCart(seat)){ //if - seat is available, and not in cart -  add to cart
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
   
const isSeatInCart = (seat) => cart.some((cartSeat) => cartSeat.id === seat.id);


  return (
    //  if no seats are available, display a message to the user
    

    <Col className='align-items-center justify-items-center fade-in'>
      <Row>
        <h2 className='text-light'>Total: $
         {cart.reduce((acc, seat) => acc + seat?.theaters[theaterID - 1]?.movies[movieID - 1]?.seatPrice || 0, 0).toFixed(2)}   
        </h2>
        
        {cart.length > 0 && 
          <h4 className='text-light'>You have selected the following seat(s): {cart &&
            cart.map(
                (ticket) =>
                ticket.theaters[theaterID - 1].movies[movieID - 1].disabled
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
</Row>

      

      <Row>
      
        <h2 className='text-light'>
        Showing seats for <strong>{movies[movieID - 1]?.title || 'your movie'}</strong> at <strong>{theaters[theaterID - 1]?.name || 'your theater'}</strong>
        </h2>
        {cart.length>0 && 
          <Link className="btn btn-success fade-in" to='/checkout'>
            Ready to Purchase
          </Link>
        }
      </Row>
      <SeatRow row={rowA} isSeatInCart={isSeatInCart} handleSeatClick={handleSeatClick} isLoading={isLoading} Loading={Loading} movieID={movieID} theaterID={theaterID}/>
      <SeatRow row={rowB} isSeatInCart={isSeatInCart} handleSeatClick={handleSeatClick} isLoading={isLoading} Loading={Loading} movieID={movieID} theaterID={theaterID}/>
      <SeatRow row={rowC} isSeatInCart={isSeatInCart} handleSeatClick={handleSeatClick} isLoading={isLoading} Loading={Loading} movieID={movieID} theaterID={theaterID}/>
      <SeatRow row={rowD} isSeatInCart={isSeatInCart} handleSeatClick={handleSeatClick} isLoading={isLoading} Loading={Loading} movieID={movieID} theaterID={theaterID}/>
      
    </Col>
  );
}


export default Seat