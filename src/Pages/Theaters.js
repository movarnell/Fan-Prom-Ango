import React, {useContext} from 'react'
import { Button, ListGroup } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import { DataContext } from '../Components/context/datacontext'

const Theaters = () => {
    
    const {theaters, movies, setTheaterID, movieID} = useContext(DataContext);

    const history = useHistory();
    const redirect = (path) =>{ 
        history.push(path);
      }

    return (
        <>
        {movieID?<h2 className='text-light'>Theaters Showing - <strong>{movies[movieID - 1]?.title || 'your movie'}</strong></h2>:<h2 className='fade-in text-light'>Choose a Theater</h2>}
        <ListGroup xl={6} className='fade-in'>
            {theaters.map((theater, index) => (
                <ListGroup.Item key={index}>
                    <h5>{theater.name}</h5>
                    <p>{theater.location}</p>
                    {movieID ? 
                            <Button variant='success' onClick={() => {setTheaterID(theater.id); redirect('/seat')} }>Select Seats</Button>
                                :<Button variant="primary" onClick={() => {setTheaterID(theater.id); redirect('/movies')} } >See Movies</Button>
                            }
                </ListGroup.Item>
            ))}
        </ListGroup></>
    )
}

export default Theaters