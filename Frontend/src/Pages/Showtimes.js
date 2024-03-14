import React from 'react'
import { DataContext } from '../Components/context/datacontext'
import { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { Button, Card, Col, Row } from 'react-bootstrap'


const Showtimes = () => {
  const {movies, theaters, showtimes} = useContext(DataContext);
  const {movieID, theaterID} = useParams();

  //find all showtimes for the selected movie and theater
  const showtimesByTheater = showtimes.filter(showtime => parseInt(theaterID) === 0 || showtime.theaterId === parseInt(theaterID));
  const showtimesByMovie = showtimesByTheater.filter(showtime => parseInt(movieID) === 0 || showtime.movieId === parseInt(movieID));



  return (
    <div>
      <h1 className='text-light'>Showtimes for {movies[movieID - 1]?.title || ''} at {theaters[theaterID - 1]?.name || ''} </h1>
      <div className='fade-in text-light'>
        {showtimesByMovie.map((showtime, index) => {

          const time = new Date(showtime.time);
          const dateandtime = time.toLocaleString('en-US', {weekday: 'long', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true});
          return (
            <Card key={index} className='mt-2'>
              <Row>
              <Card.Body>
                <Col>
                <Card.Title>{dateandtime}</Card.Title>
                <Card.Text>
                  <strong>Price: ${showtime.price}</strong>
                </Card.Text>
                <Card.Text>
                  <strong>Seats Available: {showtime.seats.filter(seat => {return seat.seatAvailable === true}).length}</strong>
                </Card.Text>
                <Card.Text>
                  <strong>Handicap Accessible: {showtime.accessibleSeats.length}</strong>
                </Card.Text>
                </Col>
                <Col>
                <Button variant='success' href={`/seat/${movieID}/${theaterID}/${showtime.showTimeId}`}>Select Showtime</Button>
                </Col>
              </Card.Body>
              </Row>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

export default Showtimes;
