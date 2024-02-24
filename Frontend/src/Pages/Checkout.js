import React from 'react';
import { Button, Container, Row, Col, ListGroup, Form } from 'react-bootstrap';
import DisabledSVG from '../Components/DisabledSVG';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
const Checkout = ({ cart, isLoading, setIsLoading, setTimerRunning, setCartTimer, updateSeats, setCart }) => {
  const finalPurchase = (e) => {
    setTimerRunning(false);
    e.preventDefault();
    if (cart.length === 0) {
      alert("Please select a seat");
    } else if (cart.length > 0) {
      cart.forEach((seat) => {
        seat.seatAvailable = false;
        updateSeats(seat);
        setCart([]);
      });
    }
  };

  return (
    <Container fluid className='text-light fade-in'>
      <h2>Checkout</h2>
      <hr />
      <Row>
        <Col>
        <h4>Your Tickets</h4>
          <ListGroup>
            {cart.map((seat, index) => (
              <ListGroup.Item key={index}>
                <Row>
                  <Col sm={8}>
                    <span><strong>Seat {seat.seatDescription} </strong>{seat.disabled && [<DisabledSVG/>, <br/>, '(Handicap Accessible)']}</span>
                    <br />
                    <span>Price: ${seat.seatPrice.toFixed(2)}</span>
                  </Col>
                  <Col sm={4}>
                    {cart.length > 1 ?
                    <Button variant="danger" onClick={() => {
                      const newCart = cart.filter((c) => c.id !== seat.id);
                      setCart(newCart);
                      if (newCart.length === 0) {
                        setTimerRunning(false);
                        setCartTimer(0);

                      }
                    }}>Remove</Button> : <Link className='btn btn-warning' to='/'>Remove</Link>}
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
          <Row className="my-3">
            <Col>
              <h4>Total: ${cart.reduce((acc, seat) => acc + seat.seatPrice, 0).toFixed(2)}</h4>
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
        <Button className='mt-3' variant="success" onClick={finalPurchase}>Purchase</Button>
      </Row>
    </Container>
  );
}

export default Checkout;