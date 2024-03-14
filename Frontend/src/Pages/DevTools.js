import React, { useState } from 'react'
import { Form, Row, Col, Button } from 'react-bootstrap';
import { addShowtime, addMovie } from '../utils/api';
import { DataContext } from '../Components/context/datacontext';
import { useContext } from 'react';

const DevTools = () => {
    const { showtimes, movies, theaters } = useContext(DataContext);
    const [theaterId, setTheaterId] = useState("");
    const [movieId, setMovieId] = useState("");
    const [time, setTime] = useState("");

    const addShowtimeHandler = async () => {
        const showtime = showtimes[0] ? showtimes[0] : {showTimeId: 0, theaterId: 0, movieId: 0, time: "", seats: [], accessibleSeats: []};
        const newShowtime = {...showtime};
        newShowtime.showTimeId = parseInt(showtime.showTimeId) + 1;
        newShowtime.theaterId = parseInt(theaterId);
        newShowtime.movieId = parseInt(movieId);
        newShowtime.time = time;
        newShowtime.seats.forEach(seat => seat.seatAvailable = true);
        await addShowtime(newShowtime);
    }

    const addMovieHandler = async (title, description, imageUrl) => {
        const movie = movies[0] ? movies[0] : {id: 0, title: "", description: "", image: ""};
        const newMovie = {...movie};
        newMovie.id = parseInt(movie.id) + 1;
        newMovie.title = title;
        newMovie.description = description;
        newMovie.image = imageUrl;
        await addMovie(newMovie);
    }

    return (
        <Row>
            <Col>
        <Form>
            <Form.Group as={Row} controlId="formPlaintextEmail">
                <Form.Label column sm="2">
                    Theater ID
                </Form.Label>
                <Col sm="10">
                    <Form.Control type="number" placeholder="Theater ID" value={theaterId} onChange={e => setTheaterId(e.target.value)} />
                </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="formPlaintextEmail">
                <Form.Label column sm="2">
                    Movie ID
                </Form.Label>
                <Col sm="10">
                    <Form.Control type="number" placeholder="Movie ID" value={movieId} onChange={e => setMovieId(e.target.value)} />
                </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="formPlaintextEmail">
                <Form.Label column sm="2">
                    Time
                </Form.Label>
                <Col sm="10">
                    <Form.Control type="datetime-local" placeholder="Time" value={time} onChange={e => setTime(e.target.value)} />
                </Col>
            </Form.Group>
            <Button onClick={addShowtimeHandler}>Add Showtime</Button>
        </Form>
        </Col>
        <Col>
        <Form>
            <Form.Group as={Row} controlId="formPlaintextEmail">
                <Form.Label column sm="2">
                    Title
                </Form.Label>
                <Col sm="10">
                    <Form.Control type="text" placeholder="Title" />
                </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="formPlaintextEmail">
                <Form.Label column sm="2">
                    Description
                </Form.Label>
                <Col sm="10">
                    <Form.Control type="text" placeholder="Description" />
                </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="formPlaintextEmail">
                <Form.Label column sm="2">
                    Image URL
                </Form.Label>
                <Col sm="10">
                    <Form.Control type="text" placeholder="Image URL" />
                </Col>
            </Form.Group>
            <Button onClick={addMovieHandler}>Add Movie</Button>
        </Form>
        </Col>
        </Row>
    )
};
export default DevTools