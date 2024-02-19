import React from 'react'
import { useState } from 'react';
import { Button, Card, Carousel, Col, Container} from 'react-bootstrap';

const DevTools = ({seats, updateSeats, setIsLoading, loading}) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [userInput1, setUserInput1] = useState('');
    const [userInput2, setUserInput2] = useState('');
    const [userInput3, setUserInput3] = useState('');
    const [userInput4, setUserInput4] = useState('');
   
   
    const  makeSeatsAvailable = () => {
        setIsLoading(true);
        seats.forEach((seat) => {
            seat.seatAvailable = true;
            updateSeats(seat);
        });
        setIsLoading(false);
    }

    const makeSeatsUnavailable = () => {
        seats.forEach((seat) => {
            seat.seatAvailable = false;
            updateSeats(seat);
        });
    }

    const makeSeatDisabled = (id) => {
        setIsLoading(true);
        const seat = seats.find(seat => seat.seatDescription === id);
        if (!seat) {
            alert('Seat not found');
            return;
        }
        seat.disabled = true;
        updateSeats(seat);
        setIsLoading(false);
    }

    const makeSeatNotDisabled = (description) => {
        setIsLoading(true);
        const seat = seats.find(seat => seat.seatDescription === description);
        seat.disabled = false;
        updateSeats(seat);
        setIsLoading(false);
    }
const makeSeatAvailable = (description) => {
    setIsLoading(true);
    const seat = seats.find(seat => seat.seatDescription === description);
    seat.seatAvailable = true;
    updateSeats(seat);
    setIsLoading(false);
}
const makeSeatUnavailable = (description) => {
    setIsLoading(true);
    const seat = seats.find(seat => seat.seatDescription === description);
    seat.seatAvailable = false;
    updateSeats(seat);
    setIsLoading(false);
}

  

return (
<>
    
    
        <Card className='mb-3'>
          <Card.Body>
            <Card.Title>Make all seats available</Card.Title>
            {!loading && <Button onClick={makeSeatsAvailable}>Make all seats available</Button>}
          </Card.Body>
        </Card>
     

      
        <Card className='mb-3'>
          <Card.Body>
            <Card.Title>Make all seats unavailable</Card.Title>
            {!loading && <Button onClick={makeSeatsUnavailable}>Make all seats unavailable</Button>}
          </Card.Body>
        </Card>
    
       
            <Card className='mb-3'>
            <Card.Body>
                <Card.Title>Make a seat disabled</Card.Title>
                <input type='text' placeholder='Seat("A3", "B4", etc)' value={userInput1} onChange={(e) => setUserInput1(e.target.value)} />
                {!loading && <Button onClick={() => makeSeatDisabled(userInput1)}>Make seat disabled</Button>}
            </Card.Body>
            </Card>
      

       
            <Card className='mb-3'>
            <Card.Body>
                <Card.Title>Make a seat not disabled</Card.Title>
                <input type='text' placeholder='Seat("A3", "B4", etc)' value={userInput2} onChange={(e) => setUserInput2(e.target.value)} />
                {!loading && <Button onClick={() => makeSeatNotDisabled(userInput2)}>Make seat not disabled</Button>}
            </Card.Body>
            </Card>
       

     
            <Card className='mb-3'>
            <Card.Body>
                <Card.Title>Make a seat available</Card.Title>
                <input type='text' placeholder='Seat("A3", "B4", etc)' value={userInput3} onChange={(e) => setUserInput3(e.target.value)} />
                {!loading && <Button onClick={() => makeSeatAvailable(userInput3)}>Make seat available</Button>}
            </Card.Body>
            </Card>
     

     
            <Card className='mb-3'>
            <Card.Body>
                <Card.Title>Make a seat unavailable</Card.Title>
                <input type='text' placeholder='Seat("A3", "B4", etc)' value={userInput4} onChange={(e) => setUserInput4(e.target.value)} />
                {!loading && <Button onClick={() => makeSeatUnavailable(userInput4)}>Make seat unavailable</Button>}
            </Card.Body>
            </Card>
     

    
</>
  );
}

export default DevTools
