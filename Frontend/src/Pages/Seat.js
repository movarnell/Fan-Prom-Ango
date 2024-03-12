import { Col, Row} from 'react-bootstrap';
import Loading from '../Components/Loading';
import DisabledSVG from '../Components/DisabledSVG';
import SeatRow from '../Components/SeatRow';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import {useParams} from 'react-router-dom';
import { useContext } from 'react';
import { DataContext } from '../Components/context/datacontext';
import { CartContext } from '../Components/context/cartcontext';

function Seat() {
  const {movies, theaters, showtimes, isLoading} = useContext(DataContext);
  const {cart, setCart, setCartTimer, timerRunning, setTimerRunning} = useContext(CartContext);

const {movieID, theaterID, showtimeID} = useParams();

const seats = showtimes[showtimeID - 1]?.seats;

  console.log(`
  showtimes: ${showtimes}
  our showtime: ${showtimes[showtimeID - 1]}
  seats: ${seats}
  `);
const history = useHistory();
useEffect(() => {
  if(movieID === 0 || theaterID === 0) {
    history.push('/');
}
},[history, movieID, theaterID] );





  // NOTE The following code is used to filter the seats into rows. We have used the filter method to filter the seats
  let rowA, rowB, rowC, rowD;

  if (seats) {
      rowA = seats.filter(seat => seat.id < 6);
      rowB = seats.filter(seat => seat.id > 5 && seat.id < 11);
      rowC = seats.filter(seat => seat.id > 10 && seat.id < 16);
      rowD = seats.filter(seat => seat.id > 15 && seat.id < 21);
  }
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
      
      console.log('cart', cart);
  
  }
   
const isSeatInCart = (seat) => cart.some((cartSeat) => cartSeat.id === seat.id);

const time = showtimes[showtimeID - 1]?.time;
const date = new Date(time).toLocaleDateString();
const timeString = new Date(time).toLocaleTimeString('en-US', {hour: 'numeric', minute: 'numeric', hour12: true});
const dateTime = `${date} ${timeString}`;

  return (
    //  if no seats are available, display a message to the user
    

    <Col className='align-items-center justify-items-center fade-in'>
      <Row>
        <h2 className='text-light'>Total: $
         {(cart.length * showtimes[showtimeID - 1]?.price).toFixed(2) || 0}   
        </h2>
        
        {cart.length > 0 && 
          <h4 className='text-light'>You have selected the following seat(s): {cart &&
            cart.map(
                (ticket) =>
                showtimes[showtimeID - 1]?.accessibleSeats.includes(ticket.id)
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
        Showing seats for <strong>{movies[movieID - 1]?.title || 'your movie'}</strong> at <strong>{theaters[theaterID - 1]?.name || 'your theater'}</strong> on <strong>{dateTime}</strong>
        </h2>
        {cart.length>0 && 
          <Link className="btn btn-success fade-in" to={`/checkout/${movieID}/${theaterID}/${showtimeID}`}>
            Ready to Purchase
          </Link>
        }
      </Row>
      {isLoading && <Loading/>}
      {!isLoading &&
      [<SeatRow row={rowA} isSeatInCart={isSeatInCart} handleSeatClick={handleSeatClick} isLoading={isLoading}  movieID={movieID} theaterID={theaterID} showtimes={showtimes} showtimeID={showtimeID}/>,
      <SeatRow row={rowB} isSeatInCart={isSeatInCart} handleSeatClick={handleSeatClick} isLoading={isLoading}  movieID={movieID} theaterID={theaterID} showtimes={showtimes} showtimeID={showtimeID}/>,
      <SeatRow row={rowC} isSeatInCart={isSeatInCart} handleSeatClick={handleSeatClick} isLoading={isLoading}  movieID={movieID} theaterID={theaterID} showtimes={showtimes} showtimeID={showtimeID}/>,
      <SeatRow row={rowD} isSeatInCart={isSeatInCart} handleSeatClick={handleSeatClick} isLoading={isLoading}  movieID={movieID} theaterID={theaterID} showtimes={showtimes} showtimeID={showtimeID}/>]
      }
    </Col>
  );
}


export default Seat