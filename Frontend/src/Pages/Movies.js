import React from 'react'
import { Carousel, Button } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'

const Movies = ({ theaterID, setMovieID, movies, theaters }) => {
    const history = useHistory()
    const redirect = (path) => {
        history.push(path)
    }

    return (
        <>
            <h2 className='fade-in text-light'>
                Now Showing {theaterID > 0 && ['At ', theaters[theaterID - 1].name]}
            </h2>
            <Carousel className="fade-in">
                {movies.map((movie, index) => (
                    <Carousel.Item key={index}>
                        <img
                            className="d-block w-100"
                            src={`https:picsum.photos/800/400?random=${index}`}
                            alt={movie.title}
                        />
                        <Carousel.Caption style={{backgroundColor: 'rgba(0, 0, 0, 0.5)', color: 'white', borderRadius: '5px'}}>
                            <h3>{movie.title}</h3>
                            <p style={{textOverflow:'ellipsis'}}>{movie.description}</p>
                            {theaterID > 0 ? (
                                <Button
                                    variant='light'
                                    onClick={() => {
                                        setMovieID(movie.id)
                                        redirect('/seat')
                                    }}
                                >
                                    Select Seats
                                </Button>
                            ) : (
                                <Button
                                    variant="light"
                                    onClick={() => {
                                        setMovieID(movie.id)
                                        redirect('/theaters')
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
    )
}

export default Movies