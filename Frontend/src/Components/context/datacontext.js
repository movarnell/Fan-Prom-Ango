import { createContext } from "react";

export const DataContext = createContext({
    


    movies: [],
    setMovies: () => {},

    theaters: [],
    setTheaters: () => {},

    showtimes: [],
    setShowtimes: () => {},

    showtimeID: 0,
    setShowtimeID: () => {},

    updateSeat: () => {},
    
    loading: false,
    setLoading: () => {},

});