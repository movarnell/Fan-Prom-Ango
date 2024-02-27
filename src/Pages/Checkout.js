import React, { useEffect } from 'react';
import { Button, Container, Row, Col, ListGroup, Form } from 'react-bootstrap';
import DisabledSVG from '../Components/DisabledSVG';
import { useHistory } from 'react-router-dom';

const Checkout = ({ cart, setTimerRunning, setCartTimer, updateSeats, setCart, movieID, theaterID, movies, theaters}) => {

  const history = useHistory();

  useEffect(() => {
  if(cart.length < 1) {
    history.go(-1);
  }
}, [cart, history]);

  const finalPurchase = (e) => {
    setTimerRunning(false);
    e.preventDefault();
    if (cart.length === 0) {
      alert("Please select a seat");
    } else if (cart.length > 0) {
      cart.forEach((seat) => {
        seat.theaters[theaterID - 1].movies[movieID - 1].seatAvailable = false;
        updateSeats(seat);
      });
      setCart([]);
    }
    redirect('/success');
  };

  
  
  const redirect = (path) =>{ 
    
    history.push(path);
  }

  return (
    <Container fluid className='text-light fade-in'>
      <h2>Checkout: {movies[movieID - 1]?.title} - {theaters[theaterID - 1]?.name} </h2>
      <hr />
      <Row>
        <Col>
        <h4>Your Tickets</h4>
          <ListGroup>
            {cart.map((seat, index) => (
              <ListGroup.Item key={index+'cart'}>
                <Row>
                  <Col sm={8}>
                    <span><strong>Seat {seat.seatDescription} </strong>{seat.theaters[theaterID - 1].movies[movieID - 1].disabled && [<DisabledSVG/>, <br/>, '(Handicap Accessible)']}</span>
                    <br />
                    <span>Price: ${seat.theaters[theaterID - 1].movies[movieID - 1].seatPrice.toFixed(2)}</span>
                  </Col>
                  <Col sm={4}>
                    {cart.length > 1 ?
                    <Button variant="danger" className='ml-auto' onClick={() => {
                      const newCart = cart.filter((c) => c.id !== seat.id);
                      setCart(newCart);
                    }}>Remove</Button> : 
                    <Button variant="danger" className='ml-auto' onClick={() => {
                      const newCart = cart.filter((c) => c.id !== seat.id);
                      setCart(newCart);
                      setTimerRunning(false);
                      setCartTimer(0);
                      redirect('/seat');
                      
                    }}>Remove</Button>}
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
          <Row className="my-3">
            <Col>
              <h4>Total: ${cart.reduce((acc, seat) => acc + seat.theaters[theaterID - 1].movies[movieID - 1].seatPrice, 0).toFixed(2)}</h4>
            </Col>
          </Row>
        </Col>
        <Col sm={12} md={6}>
          <h4>Billing Information</h4>
          <Form>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Enter your name" />
            </Form.Group>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Enter your email" />
            </Form.Group>
            <Form.Group>
              <Form.Label>Phone</Form.Label>
              <Form.Control type="tel" placeholder="Enter your phone number" />
            </Form.Group>
          </Form>
          
        </Col>
        <Button className='mt-3 mb-5' variant="success" onClick={finalPurchase}>Purchase</Button>
      </Row>
    </Container>
  );
}

export default Checkout;