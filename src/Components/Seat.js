import { Col, Button, Row } from 'react-bootstrap';
import Loading from './Loading';
import DisabledSVG from './DisabledSVG';
function Seat({seats, setSeats , updateSeats, cart, setCart, isLoading}) {
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
        setCart([...cart, seat]);
      } else {
        //filter cart array for matching seat id and set cart accordingly
        const newCart = cart.filter((c) => c.id !== seat.id);
        setCart(newCart);
      }
      
      
     //update seat in state to show new status   
     setSeats([...seats]);
    updateSeats(seat);

        console.log(seat, "This was sent to updateSeats")
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


  return (
    <Col className='align-items-center justify-items-center'>
      <Row>
      <h2 className='text-light'>Total: ${cart.reduce((acc, seat) => acc + seat.seatPrice, 0).toFixed(2)}</h2>
      <hr style={{color:'#fff'}}/>

      {cart.length > 0 && <h4 className='text-light'>You have selected the following seats: {cart &&
    cart.map(
        (ticket) =>
        ticket.disabled
        ? [<span key={ticket.id}>{ticket.seatDescription + ' '}</span>, <DisabledSVG key={`${ticket.id}-disabled`} />, ", "]
        : <span key={ticket.id}>{ticket.seatDescription + ', '}</span>
    )}</h4>}

      {cart.length === 0 && <h4 className='text-light'>Please select a seat</h4>}
      <h4 className='text-light'>
        {" "}
      </h4>
        
        <Button
          onClick={(e) => finalPurchase(e)}
          className='btn btn-success m-2'
        >
          Ready to Purchase
        </Button>
      </Row>
      <div className='row'>
        <h2 className='text-light'>Row A</h2>
        {isLoading ? <Loading/>:rowA.map((seat) => (
          <div
          key={seat.id}
          className={
            isSeatInCart(seat)
                ? "seat seat-in-cart col-2 m-2"
                : !seat.seatAvailable
                    ? "seat seat-taken col-2 m-2"
                    : seat.disabled
                        ? "seat seat-disabled col-2 m-2"
                        : "seat seat-available col-2 m-2"
        }
          onClick={(e) => handleSeatClick(e, seat)}
        >
          {seat.seatDescription}
        </div>
        ))}
      </div>
      <div className='row'>
        <h2 className='text-light'>Row B</h2>
        {isLoading ? <Loading/>:rowB.map((seat) => (
          <div
          key={seat.id}
          className={
            isSeatInCart(seat)
                ? "seat seat-in-cart col-2 m-2"
                : !seat.seatAvailable
                    ? "seat seat-taken col-2 m-2"
                    : seat.disabled
                        ? "seat seat-disabled col-2 m-2"
                        : "seat seat-available col-2 m-2"
        }
          onClick={(e) => handleSeatClick(e, seat)}
        >
          {seat.seatDescription}
        </div>
        ))}
      </div>
      <div className='row'>
        <h2 className='text-light'>Row C</h2>
        {isLoading ? <Loading/>:rowC.map((seat) => (
          <div
          key={seat.id}
          className={
            isSeatInCart(seat)
                ? "seat seat-in-cart col-2 m-2"
                : !seat.seatAvailable
                    ? "seat seat-taken col-2 m-2"
                    : seat.disabled
                        ? "seat seat-disabled col-2 m-2"
                        : "seat seat-available col-2 m-2"
        }
          onClick={(e) => handleSeatClick(e, seat)}
        >
          {seat.seatDescription}
        </div>
        ))}
      </div>
      <div className='row'>
        <h2 className='text-light'>Row D</h2>
        {isLoading ? <Loading/>:rowD.map((seat) => (
          <div
          key={seat.id}
          className={
            isSeatInCart(seat)
                ? "seat seat-in-cart col-2 m-2"
                : !seat.seatAvailable
                    ? "seat seat-taken col-2 m-2"
                    : seat.disabled
                        ? "seat seat-disabled col-2 m-2"
                        : "seat seat-available col-2 m-2"
        }
          onClick={(e) => handleSeatClick(e, seat)}
        >
          {seat.seatDescription}
        </div>
        ))}
      </div>
    </Col>
  );
}


export default Seat