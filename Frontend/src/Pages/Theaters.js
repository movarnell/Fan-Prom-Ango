import React from 'react'
import { Button, ListGroup } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import { DataContext } from '../Components/context/datacontext'
import { useContext } from 'react'
import { useParams } from 'react-router-dom'

const Theaters = () => {
    const {theaters, movies, showtimes} = useContext(DataContext);
    const movieID = useParams().movieID;

   //find all showtimes for selected movie
   const movietimes = showtimes.filter(showtime => parseInt(movieID) === 0 || showtime.movieId === parseInt(movieID));
    console.log('movietimes', movietimes);
    const theaterswithourmovie = movieID>0? movietimes.map(showtime => showtime.theaterId) : theaters.map(theater => theater.id);
    //remove any duplicate theaters
    const uniqueTheaters = [...new Set(theaterswithourmovie)];


    

    const history = useHistory();
    const redirect = (path) =>{ 
        history.push(path);
      }

    return (
        <>
        {movieID > 0?<h2 className='text-light'>Theaters Showing - <strong>{movies[movieID - 1]?.title || 'your movie'}</strong></h2>:<h2 className='fade-in text-light'>Choose a Theater</h2>}
        <ListGroup xl={6} className='fade-in'>
            {uniqueTheaters.map((theaterid, index) => (
                <ListGroup.Item key={index}>
                    <h5>{theaters[theaterid - 1].name}</h5>
                    <p>{theaters[theaterid - 1].location}</p>
                    {movieID > 0 ? 
                            <Button variant='success' onClick={() => {redirect(`/showtimes/${movieID}/${theaterid}`)} }>Select Showtime</Button>
                                :<Button variant="primary" onClick={() => {redirect(`/movies/${theaterid}`)} } >See Movies</Button>
                            }
                </ListGroup.Item>
            ))}

            {theaterswithourmovie.length === 0 && <ListGroup.Item>No theaters found</ListGroup.Item>}
        </ListGroup></>
    )
}

export default Theaters