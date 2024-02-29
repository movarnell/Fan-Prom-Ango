import React, { useContext } from 'react';
import { Row } from 'react-bootstrap';
import {TheaterContext} from './context/theaterContext';

function SeatRow({ row, isSeatInCart, handleSeatClick, isLoading, Loading, movieID, theaterID}) {
  const {movies} = useContext(TheaterContext);
  console.log(`Seat Row: `, movies)
  
  return (
    <Row className='row mt-2'>
      <h2 className='text-light'>Row {row[0]?.seatDescription?.charAt(0)||''}</h2>
      {isLoading ? <Loading/> : row.map((seat) => (
        <div
          key={seat.id}
          className={
            isSeatInCart(seat)
              ? "seat seat-in-cart col-2 m-2"
              : !seat?.theaters[theaterID - 1]?.movies[movieID - 1]?.seatAvailable
                ? "seat seat-taken col-2 m-2"
                : seat?.theaters[theaterID - 1]?.movies[movieID - 1]?.disabled
                  ? "seat seat-disabled col-2 m-2"
                  : "seat seat-available col-2 m-2"
          }
          onClick={(e) => handleSeatClick(e, seat)}
        >
          {seat.seatDescription}
        </div>
      ))}
    </Row>
  );
}

export default SeatRow;