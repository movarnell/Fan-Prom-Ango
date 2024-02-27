import React from 'react'
import { useState } from 'react';
import { Button, Card, Col, Container, Form, Row} from 'react-bootstrap';
import DisabledSVG from '../Components/DisabledSVG';

const DevTools = ({seats, updateSeats, setIsLoading, isLoading}) => {
    const [userInput1, setUserInput1] = useState('');
    const [userInput2, setUserInput2] = useState('');
    const [userInput3, setUserInput3] = useState('');
    const [userInput4, setUserInput4] = useState('');

    const url = 'http://localhost:3001';
   

    const makeSeatsAvailable = () => {
        setIsLoading(true);
        seats.forEach((seat) => {
            seat.theaters.forEach((theater) => {
                theater.movies.forEach((movie) => {
                    movie.seatAvailable = true;
                });
            });updateSeats(seat);
        });
        
    };

    const makeSeatsUnavailable = () => {
        setIsLoading(true);
        seats.forEach((seat) => {
            seat.theaters.forEach((theater) => {
                theater.movies.forEach((movie) => {
                    movie.seatAvailable = false;
                });
            });updateSeats(seat);
        });
        
    };

    const makeSeatDisabled = (seatid, movieid, theaterid) => {
        setIsLoading(true);
        seats.forEach((seat) => {
            if (seat.seatDescription === seatid) {
                seat.theaters[theaterid - 1].movies[movieid - 1].disabled = true;
            }updateSeats(seat);
        });
        
    };

    const makeSeatNotDisabled = (seatid, movieid, theaterid) => {
        setIsLoading(true);
        seats.forEach((seat) => {
            if (seat.seatDescription === seatid) {
                seat.theaters[theaterid - 1].movies[movieid - 1].disabled = false;
            }updateSeats(seat);
        });
        
    };

    const makeSeatAvailable = (seatid, movieid, theaterid) => {
        setIsLoading(true);
        seats.forEach((seat) => {
            if (seat.seatDescription === seatid) {
                seat.theaters[theaterid - 1].movies[movieid - 1].seatAvailable = true;
            }
            updateSeats(seat);
        });
        
    };

    const makeSeatUnavailable = (seatid, movieid, theaterid) => {
        setIsLoading(true);
        seats.forEach((seat) => {
            if (seat.seatDescription === seatid) {
                seat.theaters[theaterid - 1].movies[movieid - 1].seatAvailable = false;
            }
        updateSeats(seat);
        });
    };

    const changeMoviePrice = (movieid, price) => {
        setIsLoading(true);
        seats.forEach((seat) => {
            seat.theaters.forEach((theater) => {
                theater.movies.forEach((movie) => {
                    if (movie.movieId === movieid) {
                        movie.seatPrice = parseFloat(price);
                    }
                });
            });
            updateSeats(seat);
        });
        
    };

const addTheater = async (name, address) => {
    setIsLoading(true);

    seats.forEach((seat) => {
        //set all seats available for new theater
        const moviesForNewTheater = seat.theaters[0].movies.map((movie) => { return { ...movie, seatAvailable: true } });

        seat.theaters.push({
            
            theaterId: seats[0].theaters.length,
            movies: moviesForNewTheater,
        });
        updateSeats(seat);
    });
    const response = await fetch(`${url}/theaters`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: name,
            location: address,
            id: seats[0].theaters.length,
        }),
    });
    const data = await response.json();
    //set all seats available for new theater
    
    console.log(data);
}

const removeTheater = async (theaterid) => {
    setIsLoading(true);
    seats.forEach((seat) => {
        seat.theaters = seat.theaters.filter((theater) => theater.theaterId !== theaterid);
        updateSeats(seat);
    });
    const response = await fetch(`${url}/theaters/${theaterid}`, {
        method: 'DELETE',
    });
    const data = await response.json();
    console.log(data);
}

const addMovie = async (title, description, imageurl, price) => {
    setIsLoading(true);
    seats.forEach((seat) => {
        seat.theaters.forEach((theater) => {
            theater.movies.push({
                movieId: theater.movies.length,
                seatPrice: parseFloat(price),
                seatAvailable: true,
                disabled: false,
            });
        });


        updateSeats(seat);
    });
    const response = await fetch(`${url}/movies`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            title: title,
            description: description,
            image: imageurl,
            id: seats[0].theaters[0].movies.length,
        }),
    });
}


return (

    <Container fluid className='bg-dark fade-in'>
    <Row>
        <Col>
            <h2 >Dev Tools</h2>
            <hr />
        </Col>
    </Row>

    <Row>
        <Col>
            <Card className='bg-light mb-3'>
                <Card.Body>
                    <Card.Title >Make All Seats Available</Card.Title>
                    <Card.Text>Make all seats available for all movies and theaters</Card.Text>
                    <Button variant='primary' onClick={makeSeatsAvailable}>Make Available</Button>
                </Card.Body>
            </Card>
        </Col>
        <Col>
            <Card className='bg-light mb-3'>
                <Card.Body>
                    <Card.Title >Make All Seats Unavailable</Card.Title>
                    <Card.Text>Make all seats unavailable for all movies and theaters</Card.Text>
                    <Button variant='primary' onClick={makeSeatsUnavailable}>Make Unavailable</Button>
                </Card.Body>
            </Card>
        </Col>
    </Row>
    <Row>
        <Col>
            <Card className='bg-light mb-3'>
                <Card.Body>
                    <Card.Title >Make Seat Available</Card.Title>
                    <Card.Text>Make a seat available for a specific movie and theater</Card.Text>
                    <Form>
                        <Form.Group className='mb-3'>
                            <Form.Label>Seat Description</Form.Label>
                            <Form.Control type='text' value={userInput1} onChange={(e) => setUserInput1(e.target.value)} placeholder='Seat Description' />
                        </Form.Group>
                        <Form.Group className='mb-3'>
                            <Form.Label>Movie ID</Form.Label>
                            <Form.Control type='text' value={userInput2} onChange={(e) => setUserInput2(e.target.value)} placeholder='Movie ID' />
                        </Form.Group>
                        <Form.Group className='mb-3'>
                            <Form.Label>Theater ID</Form.Label>
                            <Form.Control type='text' value={userInput3} onChange={(e) => setUserInput3(e.target.value)} placeholder='Theater ID' />
                        </Form.Group>
                    </Form>
                    <Button variant='primary' onClick={() => makeSeatAvailable(userInput1, userInput2, userInput3)}>Make Available</Button>
                </Card.Body>
            </Card>
        </Col>
        <Col>
            <Card className='bg-light mb-3'>
                <Card.Body>
                    <Card.Title >Make Seat Unavailable</Card.Title>
                    <Card.Text>Make a seat unavailable for a specific movie and theater</Card.Text>
                    <Form>
                        <Form.Group className='mb-3'>
                            <Form.Label>Seat Description</Form.Label>
                            <Form.Control type='text' value={userInput1} onChange={(e) => setUserInput1(e.target.value)} placeholder='Seat Description' />
                        </Form.Group>
                        <Form.Group className='mb-3'>
                            <Form.Label>Movie ID</Form.Label>
                            <Form.Control type='text' value={userInput2} onChange={(e) => setUserInput2(e.target.value)} placeholder='Movie ID' />
                        </Form.Group>
                        <Form.Group className='mb-3'>
                            <Form.Label>Theater ID</Form.Label>
                            <Form.Control type='text' value={userInput3} onChange={(e) => setUserInput3(e.target.value)} placeholder='Theater ID' />
                        </Form.Group>
                    </Form>
                    <Button variant='primary' onClick={() => makeSeatUnavailable(userInput1, userInput2, userInput3)}>Make Unavailable</Button>
                </Card.Body>
            </Card>
        </Col>
    </Row>
    <Row>
        <Col>
            <Card className='bg-light mb-3'>
                <Card.Body>
                    <Card.Title >Make Seat Disabled<DisabledSVG/></Card.Title>
                    <Card.Text>Make a seat disabled for a specific movie and theater</Card.Text>
                    <Form>
                        <Form.Group className='mb-3'>
                            <Form.Label>Seat Description</Form.Label>
                            <Form.Control type='text' value={userInput1} onChange={(e) => setUserInput1(e.target.value)} placeholder='Seat Description' />
                        </Form.Group>
                        <Form.Group className='mb-3'>
                            <Form.Label>Movie ID</Form.Label>
                            <Form.Control type='text' value={userInput2} onChange={(e) => setUserInput2(e.target.value)} placeholder='Movie ID' />
                        </Form.Group>
                        <Form.Group className='mb-3'>
                            <Form.Label>Theater ID</Form.Label>
                            <Form.Control type='text' value={userInput3} onChange={(e) => setUserInput3(e.target.value)} placeholder='Theater ID' />
                        </Form.Group>
                        <Button variant='primary' onClick={() => makeSeatDisabled(userInput1, userInput2, userInput3)}>Make Disabled</Button>
                    </Form>
                </Card.Body>
            </Card>
        </Col>
        <Col>
            <Card className='bg-light mb-3'>
                <Card.Body>
                    <Card.Title >Make Seat Not Disabled<DisabledSVG/></Card.Title>
                    <Card.Text>Make a seat not disabled for a specific movie and theater</Card.Text>
                    <Form>
                        <Form.Group className='mb-3'>
                            <Form.Label>Seat Description</Form.Label>
                            <Form.Control type='text' value={userInput1} onChange={(e) => setUserInput1(e.target.value)} placeholder='Seat Description' />
                        </Form.Group>
                        <Form.Group className='mb-3'>
                            <Form.Label>Movie ID</Form.Label>
                            <Form.Control type='text' value={userInput2} onChange={(e) => setUserInput2(e.target.value)} placeholder='Movie ID' />
                        </Form.Group>
                        <Form.Group className='mb-3'>
                            <Form.Label>Theater ID</Form.Label>
                            <Form.Control type='text' value={userInput3} onChange={(e) => setUserInput3(e.target.value)} placeholder='Theater ID' />
                        </Form.Group>
                        <Button variant='primary' onClick={() => makeSeatNotDisabled(userInput1, userInput2, userInput3)}>Make Not Disabled</Button>
                    </Form>
                </Card.Body>
            </Card>
        </Col>
    </Row>
    <Row>
        <Col>
            <Card className='bg-light mb-3'>
                <Card.Body>
                    <Card.Title >Change Movie Price</Card.Title>
                    <Card.Text>Change the price of a movie</Card.Text>
                    <Form>
                        <Form.Group className='mb-3'>
                            <Form.Label>Movie ID</Form.Label>
                            <Form.Control type='text' value={userInput1} onChange={(e) => setUserInput1(e.target.value)} placeholder='Movie ID' />
                        </Form.Group>
                        <Form.Group className='mb-3'>
                            <Form.Label>New Price</Form.Label>
                            <Form.Control type='text' value={userInput2} onChange={(e) => setUserInput2(e.target.value)} placeholder='New Price' />
                        </Form.Group>
                        <Button variant='primary' onClick={() => changeMoviePrice(userInput1, userInput2)}>Change Price</Button>
                    </Form>
                    
                </Card.Body>
            </Card>
        </Col>
        </Row>
    <Row>
        <Col>
            <Card className='bg-light mb-3'>
                <Card.Body>
                    <Card.Title >Add Theater</Card.Title>
                    <Card.Text>Add a new theater to the database</Card.Text>
                    <Form>
                        <Form.Group className='mb-3'>
                            <Form.Label>Theater Name</Form.Label>
                            <Form.Control type='text' value={userInput1} onChange={(e) => setUserInput1(e.target.value)} placeholder='Promineo Cinemas' />
                        </Form.Group>
                        <Form.Group className='mb-3'>
                            <Form.Label>Theater Address</Form.Label>
                            <Form.Control type='text' value={userInput2} onChange={(e) => setUserInput2(e.target.value)} placeholder='123 Blank St., Kansas City, KS' />
                        </Form.Group>
                        <Button variant='primary' onClick={() => addTheater(userInput1, userInput2)}>Add Theater</Button>
                    </Form>
                </Card.Body>
            </Card>
        </Col>
    </Row>
    <Row>
        <Col>
            <Card className='bg-light mb-3'>
                <Card.Body>
                    <Card.Title >Remove Theater</Card.Title>
                    <Card.Text>Remove a theater from the database</Card.Text>
                    <Form>
                        <Form.Group className='mb-3'>
                            <Form.Label>Theater ID</Form.Label>
                            <Form.Control type='text' value={userInput1} onChange={(e) => setUserInput1(e.target.value)} placeholder='Theater ID' />
                        </Form.Group>
                        <Button variant='primary' onClick={() => removeTheater(userInput1)}>Remove Theater</Button>
                    </Form>
                </Card.Body>
            </Card>
        </Col>
        <Col>
            <Card className='bg-light mb-3'>
                <Card.Body>
                    <Card.Title >Remove Movie</Card.Title>
                    <Card.Text>Remove a movie from the database</Card.Text>
                    <Form>
                        <Form.Group className='mb-3'>
                            <Form.Label>Movie ID</Form.Label>
                            <Form.Control type='text' value={userInput1} onChange={(e) => setUserInput1(e.target.value)} placeholder='Movie ID' />
                        </Form.Group>
                        <Button variant='primary' onClick={() => removeTheater(userInput1)}>Remove Movie</Button>
                    </Form>
                </Card.Body>
            </Card>
        </Col>
    </Row>

    <Row>
        <Col>
            <Card className='bg-light mb-3'>
                <Card.Body>
                    <Card.Title >Add Movie</Card.Title>
                    <Card.Text>Add a new movie to the database</Card.Text>
                    <Form>
                        <Form.Group className='mb-3'>
                            <Form.Label>Movie Title</Form.Label>
                            <Form.Control type='text' value={userInput1} onChange={(e) => setUserInput1(e.target.value)} placeholder='Movie Title' />
                        </Form.Group>
                        <Form.Group className='mb-3'>
                            <Form.Label>Movie Description</Form.Label>
                            <Form.Control type='text' value={userInput2} onChange={(e) => setUserInput2(e.target.value)} placeholder='Movie Description' />
                        </Form.Group>
                        <Form.Group className='mb-3'>
                            <Form.Label>Image URL</Form.Label>
                            <Form.Control type='text' value={userInput3} onChange={(e) => setUserInput3(e.target.value)} placeholder='Image URL' />
                        </Form.Group>
                        <Form.Group className='mb-3'>
                            <Form.Label>Price</Form.Label>
                            <Form.Control type='text' value={userInput4} onChange={(e) => setUserInput4(e.target.value)} placeholder='Price' />
                        </Form.Group>
                        <Button variant='primary' onClick={() => addMovie(userInput1, userInput2, userInput3, userInput4)}>Add Movie</Button>
                    </Form>
                </Card.Body>
            </Card>
        </Col>
    </Row>
    </Container>   
 
  );
}

export default DevTools
