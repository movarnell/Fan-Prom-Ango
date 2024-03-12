import React from 'react'
import { Form, Row, Col, Button, Card } from 'react-bootstrap';

const DevTools = ({movies, theaters, showtimes, updateShowtimes}) => {
    
    return (
        <div className='text-light'>

            <h1>Dev Tools</h1>
            <h2>Movies</h2>
            <pre>{JSON.stringify(movies, null, 2)}</pre>
            <h2>Theaters</h2>
            <pre>{JSON.stringify(theaters, null, 2)}</pre>
            <h2>Showtimes</h2>
            <pre>{JSON.stringify(showtimes, null, 2)}</pre>
            <Row>
                <Col>
                    <Card>
                        <Card.Body>
                            <Card.Title>Update Showtimes</Card.Title>
                            <Form>
                                <Form.Group as={Row} controlId="formPlaintextEmail">
                                    <Form.Label column sm="2">
                                        Showtime ID
                                    </Form.Label>
                                    <Col sm="10">
                                        <Form.Control type="text" placeholder="Showtime ID" />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} controlId="formPlaintextPassword">
                                    <Form.Label column sm="2">
                                        Seats
                                    </Form.Label>
                                    <Col sm="10">
                                        <Form.Control type="text" placeholder="Seats" />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} controlId="formPlaintextPassword">
                                    <Form.Label column sm="2">
                                        Accessible Seats
                                    </Form.Label>
                                    <Col sm="10">
                                        <Form.Control type="text" placeholder="Accessible Seats" />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} controlId="formPlaintextPassword">
                                    <Form.Label column sm="2">
                                        Price
                                    </Form.Label>
                                    <Col sm="10">
                                        <Form.Control type="text" placeholder="Price" />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} controlId="formPlaintextPassword">
                                    <Form.Label column sm="2">
                                        Time
                                    </Form.Label>
                                    <Col sm="10">
                                        <Form.Control type="datetime-local" placeholder="Time" />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} controlId="formPlaintextPassword">
                                    <Form.Label column sm="2">
                                        Movie ID
                                    </Form.Label>
                                    <Col sm="10">
                                        <Form.Control type="text" placeholder="Movie ID" />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} controlId="formPlaintextPassword">
                                    <Form.Label column sm="2">
                                        Theater ID
                                    </Form.Label>
                                    <Col sm="10">
                                        <Form.Control type="text" placeholder="Theater ID" />
                                    </Col>
                                </Form.Group>
                                <Button variant="primary" type="submit">
                                    Update
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>

                
            </Row>
        </div>
    )

};
export default DevTools
