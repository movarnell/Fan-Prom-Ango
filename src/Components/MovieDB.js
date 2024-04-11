import { useEffect } from "react";

function MovieDB({ movies, setMovies }) {
  const imagePrefix = "https://image.tmdb.org/t/p/w500";

  useEffect(() => {
    getMovies();
  }, []);

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhN2Y0ZTAyYmNjNjBjZTI4NThiNTIyZTA0MDZjNzVmYyIsInN1YiI6IjY0MTc1ZDY5MzEwMzI1MDBlOGEyNGUxNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.vqS903rTtu9_RXuOvldMCRQnIDI15fEypp2rxApIi60",
    },
  };
  const getMovies = async () => {
    let response = await fetch(
      "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
      options
    );
    let data = await response.json();
    setMovies(data.results);
  };

  console.log(movies);
  return (
    <div className="row">
      <h1>Movie Database</h1>
      {movies.map((movie) => (
        <div class='text-light col-sm-12 col-md-4'>
        <p>{movie.id}</p>
          <img src={imagePrefix + movie.poster_path} alt={movie.original_title} width="200px"/>
          <h2>{movie.original_title}</h2>
          <p>{movie.overview}</p>
        </div>
      ))}
    </div>
  );
}
export default MovieDB;
