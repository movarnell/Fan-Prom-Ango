import { MovieCardDevtools } from './../Components/MovieCardDevtools';
import { AddMovieForm } from './../Components/AddMovieForm';
import React from "react";
import { useState, useContext, useEffect } from "react";
import { Button, Card, FormGroup } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

import { DataContext } from "../Components/context/datacontext.js";
import {
  format,
  nextMonday,
  nextTuesday,
  nextWednesday,
  nextThursday,
  nextFriday,
  nextSaturday,
  nextSunday,
} from "date-fns";

//import DisabledSVG from "../Components/DisabledSVG";

const DevTools = ({ seats, updateSeats, setIsLoading, isLoading }) => {
  const now = new Date();
  const days = [
    format(nextMonday(now),"EEEE MMMM, d"),
    format(nextTuesday(now),"EEEE MMMM, d"),
    format(nextWednesday(now), "EEEE MMMM, d"),
    format(nextThursday(now), "EEEE MMMM, d"),
    format(nextFriday(now), "EEEE MMMM, d"),
    format(nextSaturday(now), "EEEE MMMM, d"),
    format(nextSunday(now), "EEEE MMMM, d"),
  ];
  //days.map((day) => console.log(day));
  const [nextWeekDays, setNextWeekDays] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState("");
  const [selectedTheater, setSelectedTheater] = useState("");
  const [filteredShowtimes, setFilteredShowtimes] = useState([]);

  const [showtime, setShowtime] = useState({});
  const SHOWTIME_ENDPOINT =
    "https://65bc1cf852189914b5bd9bf1.mockapi.io/showtimes";

  let currentDate = new Date();
  let fCurrentDate = format(currentDate, "EEEE MMMM, d");
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
        <MovieCardDevtools days={days}  imagePrefix={imagePrefix} format={format} setSelectedMovie={setSelectedMovie} movie={movie} />
      ))}
    </>
  );
};  
export default DevTools;
