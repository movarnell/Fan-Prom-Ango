import React from "react";
import { useState, useContext, useEffect } from "react";
import { Button, Card, FormGroup } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

import { DataContext } from "../Components/context/datacontext.js";
import { format } from "date-fns";

//import DisabledSVG from "../Components/DisabledSVG";

const DevTools = ({ seats, updateSeats, setIsLoading, isLoading }) => {
  
  const [selectedMovie, setSelectedMovie] = useState("");
  const [selectedTheater, setSelectedTheater] = useState("");
  const [filteredShowtimes, setFilteredShowtimes] = useState([]);

  const SHOWTIME_ENDPOINT =
    "https://65bc1cf852189914b5bd9bf1.mockapi.io/showtimes";

  let currentDate = new Date();
  let fCurrentDate = format(currentDate, "yyyy-MM-dd");
  console.log(fCurrentDate);

  const {
    movies,
    theaters,
    theaterID,
    setMovieID,
    showtimes,
    setShowtimes,
    filterDatesAfterToday,
  } = useContext(DataContext);

  const handleClick = (movie) => {
    setMovieID(movie.id);
    let newMovie = {
      movieID: movie.id,
      theaterID: theaterID,
      dateTime: fCurrentDate,
    };
  };

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
            <div className="row">
              <div className="col-sm-12 col-md-4 col-lg-4">
                <Form>
                  <Form.Group className="mb-3">
                    <Form.Check // prettier-ignore
                      className="mx-1"
                      type="radio"
                      id={`7pm-${movie.id}`}
                      name={`showtime-${movie.id}`}
                      label={`7:00 PM`}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Check // prettier-ignore
                      className="mx-1"
                      type="radio"
                      id={`9pm-${movie.id}`}
                      name={`showtime-${movie.id}`}
                      label={`9:00 PM`}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Check // prettier-ignore
                      className="mx-1"
                      type="radio"
                      id={`11pm-${movie.id}`}
                      name={`showtime-${movie.id}`}
                      label={`11:00 PM`}
                    />
                  </Form.Group>
                </Form>
              </div>
              <div className="col-sm-12 col-md-4 col-lg-4">
                {/* checkboxes for day of the week */}
                <Form>
                  <Form.Group className="mb-3">
                    <Form.Check // prettier-ignore
                      className="mx-1"
                      type="checkbox"
                      id={`monday-${movie.id}`}
                      label={`Monday`}
                    />

                    <Form.Check // prettier-ignore
                      className="mx-1"
                      type="checkbox"
                      id={`tuesday-${movie.id}`}
                      label={`Tuesday`}
                    />

                    <Form.Check // prettier-ignore
                      className="mx-1"
                      type="checkbox"
                      id={`wednesday-${movie.id}`}
                      label={`Wednesday`}
                    />

                    <Form.Check // prettier-ignore
                      className="mx-1"
                      type="checkbox"
                      id={`thursday-${movie.id}`}
                      label={`Thursday`}
                    />

                    <Form.Check // prettier-ignore
                      className="mx-1"
                      type="checkbox"
                      id={`friday-${movie.id}`}
                      label={`Friday`}
                    />

                    <Form.Check // prettier-ignore
                      className="mx-1"
                      type="checkbox"
                      id={`saturday-${movie.id}`}
                      label={`Saturday`}
                    />

                    <Form.Check // prettier-ignore
                      className="mx-1"
                      type="checkbox"
                      id={`sunday-${movie.id}`}
                      label={`Sunday`}
                    />



                  </Form.Group>
                </Form>

              </div>
               <div className="col-sm-12 col-md-4 col-lg-4">
                Movies scheduled go here
               </div>
            </div>

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
};
export default DevTools;
