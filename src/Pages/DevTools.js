import React from 'react'
import { useState } from 'react';
import { Button, Card} from 'react-bootstrap';

const DevTools = ({seats, updateSeats, setIsLoading, loading}) => {
    const [userInput1, setUserInput1] = useState('');
    const [userInput2, setUserInput2] = useState('');
    const [userInput3, setUserInput3] = useState('');
    const [userInput4, setUserInput4] = useState('');
   
   
    const makeSeatsAvailable = () => {
        setIsLoading(true);

        let delay = 0;
        seats.forEach((seat) => {
            delay += 800;
            setTimeout(() => {
                seat.seatAvailable = true;
                updateSeats(seat);

                // Check if this is the last seat
                if (seat === seats[seats.length - 1]) {
                    setIsLoading(false);
                }
                console.log(
                  "Seat " + seat.seatDescription + " is now available.");
            }, delay);
            
        });

        // alert('Made all seats available (MAY FAIL FOR REQUEST RATE LIMIT)');
    };

    const makeSeatsUnavailable = () => {
        
        setIsLoading(true);
        let delay = 0;
        seats.forEach((seat) => {
            delay += 800;
            setTimeout(() => {
                seat.seatAvailable = false;
                updateSeats(seat);
                // Check if this is the last seat
                if (seat === seats[seats.length - 1]) {
                    setIsLoading(false);
                }
                console.log(
                  "Seat " + seat.seatDescription + " is now unavailable. Delay: ",
                  delay
                );
            }, delay);
            
        });
        // alert('Made all seats unavailable (MAY FAIL FOR REQUEST RATE LIMIT)');

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
        alert('Made Seat ' + id + ' Disabled');
    }

    const makeSeatNotDisabled = (description) => {
        setIsLoading(true);
        const seat = seats.find(seat => seat.seatDescription === description);
        if (!seat) {
            alert('Seat not found');
            return;
        }
        seat.disabled = false;
        updateSeats(seat);
        setIsLoading(false);
        alert('Made Seat ' + description + ' Not Disabled');
    }
const makeSeatAvailable = (description) => {
    setIsLoading(true);
    const seat = seats.find(seat => seat.seatDescription === description);
    if (!seat) {
        alert('Seat not found');
        return;
    }
    seat.seatAvailable = true;
    updateSeats(seat);
    setIsLoading(false);
    alert('Made Seat ' + description + ' Available');
}
const makeSeatUnavailable = (description) => {
    setIsLoading(true);
    const seat = seats.find(seat => seat.seatDescription === description);
    if (!seat) {
        alert('Seat not found');
        return;
    }
    seat.seatAvailable = false;
    updateSeats(seat);
    setIsLoading(false);
    alert('Made Seat ' + description + ' Unavailable');
}

  

return (
<>
    
    
        <Card className='mb-3'>
          <Card.Body>
            <Card.Title>Make all seats available</Card.Title>
            <Button onClick={makeSeatsAvailable}>Make all seats available</Button>
          </Card.Body>
        </Card>
     

      
        <Card className='mb-3'>
          <Card.Body>
            <Card.Title>Make all seats unavailable</Card.Title>
             <Button onClick={makeSeatsUnavailable}>Make all seats unavailable</Button>
          </Card.Body>
        </Card>
    
       
            <Card className='mb-3'>
            <Card.Body>
                <Card.Title>Make a seat disabled</Card.Title>
                <input type='text' placeholder='Seat("A3", "B4", etc)' value={userInput1} onChange={(e) => setUserInput1(e.target.value)} />
                <Button onClick={() => makeSeatDisabled(userInput1)}>Make seat disabled</Button>
            </Card.Body>
            </Card>
      

       
            <Card className='mb-3'>
            <Card.Body>
                <Card.Title>Make a seat not disabled</Card.Title>
                <input type='text' placeholder='Seat("A3", "B4", etc)' value={userInput2} onChange={(e) => setUserInput2(e.target.value)} />
                <Button onClick={() => makeSeatNotDisabled(userInput2)}>Make seat not disabled</Button>
            </Card.Body>
            </Card>
       

     
            <Card className='mb-3'>
            <Card.Body>
                <Card.Title>Make a seat available</Card.Title>
                <input type='text' placeholder='Seat("A3", "B4", etc)' value={userInput3} onChange={(e) => setUserInput3(e.target.value)} />
                <Button onClick={() => makeSeatAvailable(userInput3)}>Make seat available</Button>
            </Card.Body>
            </Card>
     

     
            <Card className='mb-3'>
            <Card.Body>
                <Card.Title>Make a seat unavailable</Card.Title>
                <input type='text' placeholder='Seat("A3", "B4", etc)' value={userInput4} onChange={(e) => setUserInput4(e.target.value)} />
                <Button onClick={() => makeSeatUnavailable(userInput4)}>Make seat unavailable</Button>
            </Card.Body>
            </Card>
     

    
</>
  );
}

export default DevTools
