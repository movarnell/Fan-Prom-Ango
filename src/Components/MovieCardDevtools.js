import React from "react";
import { Button, Card } from "react-bootstrap";
import { AddMovieForm } from "./AddMovieForm";

export function MovieCardDevtools({
  imagePrefix,
  format,
  setSelectedMovie,
  movie,
  days
}) {
  return <Card className="bg-light mb-3" key={movie.id}>
          <Card.Body>
            <Card.Img src={imagePrefix + movie.backdrop_path} alt={movie.title} />
            <Card.Title>{movie.title}</Card.Title>
            <Card.Text>{movie.overview}</Card.Text>
            <div className="row">
                <AddMovieForm format={format} days={days} movie={movie} />
              <div className="col-sm-12 col-md-4 col-lg-4">
                Movies scheduled go here
              </div>
            </div>

            <Button variant="primary" onClick={() => {
        setSelectedMovie(movie.id);
      }}>
              Select Movie for ShowingTime
            </Button>
          </Card.Body>
        </Card>;
}
  