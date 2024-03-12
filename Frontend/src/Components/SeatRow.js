import React from 'react';
import { Row } from 'react-bootstrap';
import Loading from './Loading';

function SeatRow({ row, isSeatInCart, handleSeatClick, isLoading, showtimes, showtimeID}) {
  console.log(`Row: ${row}`)
  if (!row) {
    return <h1>No seats found</h1>
  }
  return (
    
    <Row className='row mt-2'>
      <h2 className='text-light'>Row {row?.seatDescription?.charAt(0)||''}</h2>
      {isLoading ? <Loading/> : row.map((seat) => (
        <div
          key={seat.id}
          className={
            isSeatInCart(seat)
              ? "seat seat-in-cart col-2 m-2"
              : !seat?.seatAvailable
                ? "seat seat-taken col-2 m-2"
                : showtimes[showtimeID - 1]?.accessibleSeats.includes(seat.id)
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