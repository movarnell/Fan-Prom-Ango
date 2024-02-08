import { Col } from 'react-bootstrap'

function Seat({seats}) {
  // NOTE The following code is used to filter the seats into rows. We have used the filter method to filter the seats
    let rowA = seats.filter(seat => seat.id < 6);
    let rowB = seats.filter(seat => seat.id > 5 && seat.id < 11);
    let rowC = seats.filter(seat => seat.id > 10 && seat.id < 16);
    let rowD = seats.filter(seat => seat.id > 15 && seat.id < 21);
    
    
   
   


// INFO we have added the grid of seats to the Seat component. We have also added the onClick event to the seats. We will use this to select the seats. We will also add the logic to select the seats in the next step.


  return (
    <Col className='align-items-center justify-items-center'>
      <div className='row'>
        <h2 className='text-light'>Row A</h2>
        {rowA.map((seat) => (
          <div
            className={
              seat.seatAvailable
                ? seat.seatAvailable && seat.disabled
                  ? "seat seat-disabled col-2 m-2"
                  : " seat seat-available col-2 m-2"
                : "seat seat-taken col-2 m-2"
            }
          >
            {seat.seatDescription}
          </div>
        ))}
      </div>
      <div className='row'>
        <h2 className='text-light'>Row B</h2>
        {rowB.map((seat) => (
          <div
            className={
              seat.seatAvailable
                ? seat.seatAvailable && seat.disabled
                  ? "seat seat-disabled col-2 m-2"
                  : " seat seat-available col-2 m-2"
                : "seat seat-taken col-2 m-2"
            }
          >
            {seat.seatDescription}
          </div>
        ))}
      </div>
      <div className='row'>
        <h2 className='text-light'>Row C</h2>
        {rowC.map((seat) => (
          <div
            className={
              seat.seatAvailable
                ? seat.seatAvailable && seat.disabled
                  ? "seat seat-disabled col-2 m-2"
                  : " seat seat-available col-2 m-2"
                : "seat seat-taken col-2 m-2"
            }
          >
            {seat.seatDescription}
          </div>
        ))}
      </div>
      <div className='row'>
        <h2 className='text-light'>Row D</h2>
        {rowD.map((seat) => (
          <div
            className={
              seat.seatAvailable
                ? seat.seatAvailable && seat.disabled
                  ? "seat seat-disabled col-2 m-2"
                  : " seat seat-available col-2 m-2"
                : "seat seat-taken col-2 m-2"
            } onClick={() => console.log(seat)}
          >
            {seat.seatDescription}
          </div>
        ))}
      </div>
    </Col>
  );
}

export default Seat