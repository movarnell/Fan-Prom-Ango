import React from 'react'
import { Button, Container, Row, Col } from 'react-bootstrap'

const Home = () => {
    return (
        <div>
            <Container fluid className="fade-in p-3 text-light text-center">
                <h1>Welcome to Our Cinema!</h1>
                <p>
                    Experience the best movies in the best theaters.
                </p>
                <Container className='mt-5'>
                    <Row className="justify-content-md-center">
                        <Col md="auto" className='px-5 py-5'>
                            <h2>Now Showing</h2>
                            <p>Discover the latest movies and classics.</p>
                            <Button variant="primary" href="/movies">Browse Movies</Button>
                        </Col>
                        <Col md="auto" className='px-5 py-5'>
                            <h2>Choose a Theater</h2>
                            <p>Find the perfect theater for your movie experience.</p>
                            <Button variant="primary" href="/theaters">Choose a Theater</Button>
                        </Col>
                    </Row>
                </Container>
            </Container>
            
        </div>
    )
}

export default Home