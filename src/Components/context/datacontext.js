import { createContext } from "react";

export const DataContext = createContext({
    


    movies: [],
    setMovies: () => {},
    
    movieID: 0,
    setMovieID: () => {},


    theaters: [],
    setTheaters: () => {},

    theaterID: 0,
    setTheaterID: () => {},

    showtimes: [],
    setShowtimes: () => {}

    

});