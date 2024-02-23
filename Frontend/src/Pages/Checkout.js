import React from 'react'

const Checkout = ({cart, isLoading, setIsLoading, timerRunning, setTimerRunning, updateSeats, setCart}) => {
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

  return (
    <div className='text-light'>
      {cart.length}
    </div>
  )
}

export default Checkout
