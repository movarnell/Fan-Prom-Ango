import React, { useContext } from "react";
import { Carousel, Button, Image } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { DataContext } from "../Components/context/datacontext";

const Movies = () => {
  const { movies, theaters, theaterID, setMovieID } = useContext(DataContext);

  const history = useHistory();
  const redirect = (path) => {
    history.push(path);
  };
const imagePrefix = "https://image.tmdb.org/t/p/w500";
  return (
    <>
      <h2 className="fade-in text-light">
        Now Showing {theaterID > 0 && ["At ", theaters[theaterID - 1].name]}
      </h2>
      <Carousel className="rounded fade-in">
        {movies.map((movie, index) => (
          <Carousel.Item key={index}>
            <Image
              className="rounded d-block w-100"
              src={imagePrefix + movie.backdrop_path}
              alt={movie.title}
              style={{ height: "500px", objectFit: "cover" }}
            />
            <Carousel.Caption
              style={{
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                color: "white",
                borderRadius: "5px",
                textOverflow: "ellipsis",
                animation: "fadeIn 1s ease-in",
              }}
            >
              <h3>{movie.title}</h3>
              <p style={{ textOverflow: "ellipsis" }}>{movie.overview}</p>
              {theaterID > 0 ? (
                <Button
                  variant="light"
                  onClick={() => {
                    setMovieID(movie.id);
                    redirect("/seat");
                  }}
                >
                  Select Seats
                </Button>
              ) : (
                <Button
                  variant="light"
                  onClick={() => {
                    setMovieID(movie.id);
                    redirect("/theaters");
                  }}
                >
                  Select a Theater
                </Button>
              )}
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </>
  );
};

export default Movies;
