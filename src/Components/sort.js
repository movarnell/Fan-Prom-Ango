// INFO - Functions for use sorting different arrays of objects in our project






// Filters out showtimes that are before today
  const filterDatesAfterToday = (showtimes) => {
    let today = new Date();
    today.setHours(0, 0, 0, 0);
    return showtimes.filter((showtime) => {
      let showDate = new Date(showtime.dateTime);
      return showDate >= today;
    });
  };

  // Filters out showtimes by selected theater
  const filterTheShowtimesByTheater = (showtimes, selectedTheater) => {
    filterDatesAfterToday(showtimes);
    const filtered = showtimes.filter((showtime) => {
      return showtime.theaterID === selectedTheater;
    });
    return filtered;
  };

  // Filters out showtimes by selected movie
  const filterTheShowtimesByMovie = (showtimes, selectedMovie) => {
    filterDatesAfterToday(showtimes);
    const filtered = showtimes.filter((showtime) => {
      return showtime.movieID === selectedMovie;
    });
    return filtered;
    };

    // Filters by showtimes today
    const filteredShowtimesOnToday = (showtimes) => {
        let today = new Date();
        today.setHours(0, 0, 0, 0);
        return showtimes.filter((showtime) => {
          let showDate = new Date(showtime.dateTime);
          return showDate >= today;
        });
      }

    //Return showtimes for today, at selected theater, and for selected movie
    const filterShowtimes = (showtimes, selectedTheater, selectedMovie) => {
        let filtered = filterDatesAfterToday(showtimes);
        if (selectedTheater > 0) {
          filtered = filterTheShowtimesByTheater(filtered, selectedTheater);
        }
        if (selectedMovie > 0) {
          filtered = filterTheShowtimesByMovie(filtered, selectedMovie);
        }
        filtered = sortShowtimesByDate(filtered);
        return filtered;
      };

    // Sorts showtimes by date
    const sortShowtimesByDate = (showtimes) => {
     return showtimes.sort((a, b) => {
        let dateA = new Date(a.dateTime);
        let dateB = new Date(b.dateTime);
        return dateA - dateB;
      });
    };

