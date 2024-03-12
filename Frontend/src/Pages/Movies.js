import React from 'react'
import { useContext } from 'react'
import { DataContext } from '../Components/context/datacontext'
import { Button, Row, Carousel, Image } from 'react-bootstrap'
import { useParams }  from 'react-router-dom'
import {useHistory} from 'react-router-dom'



const Movies = () => {
  const history = useHistory();
    const redirect = (path) =>{ 
        history.push(path);
      }
  const theaterID = useParams().theaterID;
  const {movies, theaters, showtimes} = useContext(DataContext);

  const showtimesByTheater = showtimes.filter(showtime => parseInt(theaterID) === 0 || showtime.theaterId === parseInt(theaterID));
  console.log('showtimesByTheater', showtimesByTheater);

  const moviesByTheater = movies.filter(movie => showtimesByTheater.some(showtime => showtime.movieId === movie.id));
  console.log('moviesByTheater', moviesByTheater);
 

return (
    <div className='fade-in text-light'>
      <Row>
        <h1>
        Now Showing {theaterID > 0 && `at ${theaters[theaterID - 1]?.name || 'loading...'}`}
        {parseInt(theaterID) === 0 && 'at all theaters'}
        </h1>
      </Row>
        {/* if theaterID is zero, carosuel contains all movies, and links go to theaters/movieID otherwise, carosuel contains moviesbytheater, and links go to /seat/movieID/theaterID */}
  <Row className="justify-content-md-center">
            <Carousel>
            {theaterID == 0 && movies.map((movie, index) => {
              return (
                <Carousel.Item>
                  <Image
                            className="d-block w-100 rounded"
                            src={movie.image}
                            alt={movie.title}
                            style={{height: '500px', objectFit: 'cover'}}
                        />
                  <Carousel.Caption style={{backgroundColor: 'rgba(0, 0, 0, 0.5)', color: 'white', borderRadius: '5px', textOverflow: 'ellipsis', animation: 'fadeIn 1s ease-in'}}>
                    <h3>{movie.title}</h3>
                    <p>{movie.description}</p>
                    <Button variant="light" href={`/theaters/${movie.id}`}>Get Tickets</Button>
                  </Carousel.Caption>
                </Carousel.Item>
              )

            } )}

            {theaterID > 0 && moviesByTheater.map((movie, index) => {
              return (
                <Carousel.Item>
                  <Image
                            className="d-block w-100 rounded"
                            src={movie.image}
                            alt={movie.title}
                            style={{height: '500px', objectFit: 'cover'}}
                        />
                  <Carousel.Caption style={{backgroundColor: 'rgba(0, 0, 0, 0.5)', color: 'white', borderRadius: '5px', textOverflow: 'ellipsis', animation: 'fadeIn 1s ease-in'}}>
                    <h3>{movie.title}</h3>
                    <p>{movie.description}</p>
                    <Button variant="light" href={`/showtimes/${movie.id}/${theaterID}`}>See showtimes</Button>
                  </Carousel.Caption>
                </Carousel.Item>
              )

            } )}
            </Carousel>

            {moviesByTheater.length === 0 && (<h1>No movies playing at this theater</h1>)}

          </Row>
    </div>
  )
}

export default Movies


