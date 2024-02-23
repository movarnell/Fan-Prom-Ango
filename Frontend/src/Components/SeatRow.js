import React from 'react';

function SeatRow({ row, isSeatInCart, handleSeatClick, isLoading, Loading }) {
  return (
    <div className='row mt-2'>
      <h2 className='text-light'>Row {row[0]?.seatDescription?.charAt(0)||''}</h2>
      {isLoading ? <Loading/> : row.map((seat) => (
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
  );
}

export default SeatRow;