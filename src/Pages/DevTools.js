import React from "react";
import { useState, useContext, useEffect } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { DataContext } from "../Components/context/datacontext.js";

//import DisabledSVG from "../Components/DisabledSVG";

const DevTools = ({ seats, updateSeats, setIsLoading, isLoading }) => {
  // const [userInput1, setUserInput1] = useState('');
  // const [userInput2, setUserInput2] = useState('');
  // const [userInput3, setUserInput3] = useState('');
  const [selectedMovie, setSelectedMovie] = useState("");
  const [selectedTheater, setSelectedTheater] = useState("");
  const [filteredShowtimes, setFilteredShowtimes] = useState([]);

  const SHOWTIME_ENDPOINT =
    "https://65bc1cf852189914b5bd9bf1.mockapi.io/showtimes";

  const {
    movies,
    theaters,
    theaterID,
    setMovieID,
    showtimes,
    setShowtimes,
    filterDatesAfterToday,
  } = useContext(DataContext);

  

  const imagePrefix = "https://image.tmdb.org/t/p/w500";
  return (
    <>
      <h2 className="fade-in text-light">Admin Tools</h2>
      {movies.map((movie, index) => (
        <Card className="bg-light mb-3" key={index}>
          <Card.Body>
            <Card.Img
              src={imagePrefix + movie.backdrop_path}
              alt={movie.title}
            />
            <Card.Title>{movie.title}</Card.Title>
            <Card.Text>{movie.overview}</Card.Text>
            <Button
              variant="primary"
              onClick={() => {
                setSelectedMovie(movie.id);
              }}
            >
              Select Movie for ShowingTime
            </Button>
          </Card.Body>
        </Card>
      ))}
    </>
  );

  //SECTION - OLD FUNCTIONS
  //MARK: Old Functions
  // const makeSeatsAvailable = () => {
  //     setIsLoading(true);
  //     seats.forEach((seat) => {
  //         seat.theaters.forEach((theater) => {
  //             theater.movies.forEach((movie) => {
  //                 movie.seatAvailable = true;
  //             });
  //         });updateSeats(seat);
  //     });

  // };

  // const makeSeatsUnavailable = () => {
  //     setIsLoading(true);
  //     seats.forEach((seat) => {
  //         seat.theaters.forEach((theater) => {
  //             theater.movies.forEach((movie) => {
  //                 movie.seatAvailable = false;
  //             });
  //         });updateSeats(seat);
  //     });

  // };

  // const makeSeatDisabled = (seatid, movieid, theaterid) => {
  //     setIsLoading(true);
  //     seats.forEach((seat) => {
  //         if (seat.seatDescription === seatid) {
  //             seat.theaters[theaterid - 1].movies[movieid - 1].disabled = true;
  //         }updateSeats(seat);
  //     });

  // };

  // const makeSeatNotDisabled = (seatid, movieid, theaterid) => {
  //     setIsLoading(true);
  //     seats.forEach((seat) => {
  //         if (seat.seatDescription === seatid) {
  //             seat.theaters[theaterid - 1].movies[movieid - 1].disabled = false;
  //         }updateSeats(seat);
  //     });

  // };

  // const makeSeatAvailable = (seatid, movieid, theaterid) => {
  //     setIsLoading(true);
  //     seats.forEach((seat) => {
  //         if (seat.seatDescription === seatid) {
  //             seat.theaters[theaterid - 1].movies[movieid - 1].seatAvailable = true;
  //         }
  //         updateSeats(seat);
  //     });

  // };

  // const makeSeatUnavailable = (seatid, movieid, theaterid) => {
  //     setIsLoading(true);
  //     seats.forEach((seat) => {
  //         if (seat.seatDescription === seatid) {
  //             seat.theaters[theaterid - 1].movies[movieid - 1].seatAvailable = false;
  //         }
  //     updateSeats(seat);
  //     });
  // };

  // const changeMoviePrice = (movieid, price) => {
  //     setIsLoading(true);
  //     seats.forEach((seat) => {
  //         seat.theaters.forEach((theater) => {
  //             theater.movies.forEach((movie) => {
  //                 if (movie.movieId === movieid) {
  //                     movie.seatPrice = parseFloat(price);
  //                 }
  //             });
  //         });
  //         updateSeats(seat);
  //     });

  // };
  //MARK:OLD FUNCTIONS
  //!SECTION - OLD FUNCTIONS

  //   return (
  //     <Container fluid className="bg-dark fade-in">
  //       <Row>
  //         <Col>
  //           <h2>Dev Tools</h2>
  //           <hr />
  //         </Col>
  //       </Row>

  {
    /* <Row>
        <Col>
          <Card className="bg-light mb-3">
            <Card.Body>
              <Card.Title>Make All Seats Available</Card.Title>
              <Card.Text>
                Make all seats available for all movies and theaters
              </Card.Text>
              <Button variant="primary" onClick={makeSeatsAvailable}>
                Make Available
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card className="bg-light mb-3">
            <Card.Body>
              <Card.Title>Make All Seats Unavailable</Card.Title>
              <Card.Text>
                Make all seats unavailable for all movies and theaters
              </Card.Text>
              <Button variant="primary" onClick={makeSeatsUnavailable}>
                Make Unavailable
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col>
          <Card className="bg-light mb-3">
            <Card.Body>
              <Card.Title>Make Seat Available</Card.Title>
              <Card.Text>
                Make a seat available for a specific movie and theater
              </Card.Text>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Seat Description</Form.Label>
                  <Form.Control
                    type="text"
                    value={userInput1}
                    onChange={(e) => setUserInput1(e.target.value)}
                    placeholder="Seat Description"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Movie ID</Form.Label>
                  <Form.Control
                    type="text"
                    value={userInput2}
                    onChange={(e) => setUserInput2(e.target.value)}
                    placeholder="Movie ID"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Theater ID</Form.Label>
                  <Form.Control
                    type="text"
                    value={userInput3}
                    onChange={(e) => setUserInput3(e.target.value)}
                    placeholder="Theater ID"
                  />
                </Form.Group>
              </Form>
              <Button
                variant="primary"
                onClick={() =>
                  makeSeatAvailable(userInput1, userInput2, userInput3)
                }
              >
                Make Available
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card className="bg-light mb-3">
            <Card.Body>
              <Card.Title>Make Seat Unavailable</Card.Title>
              <Card.Text>
                Make a seat unavailable for a specific movie and theater
              </Card.Text>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Seat Description</Form.Label>
                  <Form.Control
                    type="text"
                    value={userInput1}
                    onChange={(e) => setUserInput1(e.target.value)}
                    placeholder="Seat Description"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Movie ID</Form.Label>
                  <Form.Control
                    type="text"
                    value={userInput2}
                    onChange={(e) => setUserInput2(e.target.value)}
                    placeholder="Movie ID"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Theater ID</Form.Label>
                  <Form.Control
                    type="text"
                    value={userInput3}
                    onChange={(e) => setUserInput3(e.target.value)}
                    placeholder="Theater ID"
                  />
                </Form.Group>
              </Form>
              <Button
                variant="primary"
                onClick={() =>
                  makeSeatUnavailable(userInput1, userInput2, userInput3)
                }
              >
                Make Unavailable
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col>
          <Card className="bg-light mb-3">
            <Card.Body>
              <Card.Title>
                Make Seat Disabled
                <DisabledSVG />
              </Card.Title>
              <Card.Text>
                Make a seat disabled for a specific movie and theater
              </Card.Text>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Seat Description</Form.Label>
                  <Form.Control
                    type="text"
                    value={userInput1}
                    onChange={(e) => setUserInput1(e.target.value)}
                    placeholder="Seat Description"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Movie ID</Form.Label>
                  <Form.Control
                    type="text"
                    value={userInput2}
                    onChange={(e) => setUserInput2(e.target.value)}
                    placeholder="Movie ID"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Theater ID</Form.Label>
                  <Form.Control
                    type="text"
                    value={userInput3}
                    onChange={(e) => setUserInput3(e.target.value)}
                    placeholder="Theater ID"
                  />
                </Form.Group>
                <Button
                  variant="primary"
                  onClick={() =>
                    makeSeatDisabled(userInput1, userInput2, userInput3)
                  }
                >
                  Make Disabled
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card className="bg-light mb-3">
            <Card.Body>
              <Card.Title>
                Make Seat Not Disabled
                <DisabledSVG />
              </Card.Title>
              <Card.Text>
                Make a seat not disabled for a specific movie and theater
              </Card.Text>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Seat Description</Form.Label>
                  <Form.Control
                    type="text"
                    value={userInput1}
                    onChange={(e) => setUserInput1(e.target.value)}
                    placeholder="Seat Description"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Movie ID</Form.Label>
                  <Form.Control
                    type="text"
                    value={userInput2}
                    onChange={(e) => setUserInput2(e.target.value)}
                    placeholder="Movie ID"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Theater ID</Form.Label>
                  <Form.Control
                    type="text"
                    value={userInput3}
                    onChange={(e) => setUserInput3(e.target.value)}
                    placeholder="Theater ID"
                  />
                </Form.Group>
                <Button
                  variant="primary"
                  onClick={() =>
                    makeSeatNotDisabled(userInput1, userInput2, userInput3)
                  }
                >
                  Make Not Disabled
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col>
          <Card className="bg-light mb-3">
            <Card.Body>
              <Card.Title>Change Movie Price</Card.Title>
              <Card.Text>Change the price of a movie</Card.Text>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Movie ID</Form.Label>
                  <Form.Control
                    type="text"
                    value={userInput1}
                    onChange={(e) => setUserInput1(e.target.value)}
                    placeholder="Movie ID"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>New Price</Form.Label>
                  <Form.Control
                    type="text"
                    value={userInput2}
                    onChange={(e) => setUserInput2(e.target.value)}
                    placeholder="New Price"
                  />
                </Form.Group>
                <Button
                  variant="primary"
                  onClick={() => changeMoviePrice(userInput1, userInput2)}
                >
                  Change Price
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
        <Col></Col>
      </Row> */
  }
  //     </Container>
  //   );
  // };
};
export default DevTools;
