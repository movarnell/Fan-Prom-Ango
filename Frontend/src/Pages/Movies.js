import React from 'react'
import { Card, Button, Row, Col } from 'react-bootstrap'
import { useHistory } from 'react-router-dom';

const Movies = ({theaterID, setMovieID, movies, theaters}) => {
    
const history = useHistory();
    const redirect = (path) =>{ 
        history.push(path);
      }

    return (
        <>
        <Row className='fade-in text-light'>
            <h2>Now Showing {theaterID > 0 && ['At ', theaters[theaterID-1].name]}</h2>
        </Row>
        <Row xs={1} md={2} xl={3} className="fade-in g-4">
            {movies.map((movie, index) => (
                <Col  key={index}>
                    <Card>
                        
                        
                        <Card.Body>
                            <Card.Title>{movie.title}</Card.Title>
                            <Card.Text>{movie.description}</Card.Text>
                            {theaterID>0 ? 
                            <Button variant='success' onClick={() => {setMovieID(movie.id); redirect('/seat')} }>Select Seats</Button>
                                :<Button variant="primary" onClick={() => {setMovieID(movie.id); redirect('/theaters')}} >Select a Theater</Button>
                            }
                        </Card.Body>
                    </Card>
                </Col>
            ))}
        </Row>
        </>
    )
}

export default Movies