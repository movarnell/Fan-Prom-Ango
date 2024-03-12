const url = "http://localhost:3001";

export const getMovies = async () => {
    const response = await fetch(`${url}/movies`);
    return response.json();
    }

export const getTheaters = async () => {
    const response = await fetch(`${url}/theaters`);
    return response.json();
    }

export const getShowtimes = async () => {
    const response = await fetch(`${url}/showtimes`);
    return response.json();
    }

export const updateSeat = async (seat, id) => {
    const response = await fetch(`${url}/showtimes/${id}/seat`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(seat)
    });
    return response.json();
    }