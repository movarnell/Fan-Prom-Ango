import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import cartsvg from "../Assets/CartLight.svg";
import Logo from "../Assets/logo.png";
import { Link, useLocation } from 'react-router-dom';
import { Image } from "react-bootstrap";
import { useContext, useEffect } from "react";
import { CartContext } from "./context/cartcontext";

function Navigation() {
  const cart = useContext(CartContext).cart;
  const location = useLocation();
  const movieID = location.pathname.split('/')[2];
  const theaterID = location.pathname.split('/')[3];
  const showtimeID = location.pathname.split('/')[4];

  useEffect(() => {
    console.log('location', location);
    console.log(`
    IDs
    ---------
    movieID: ${movieID}
    theaterID: ${theaterID}
    showtimeID: ${showtimeID}`)
  }, [location]);


  return (
    <Navbar sticky='top' expand='lg' className='bg-dark' data-bs-theme="dark">
      <Container>
        <Link to='/' className='navbar navbar-brand'><img src={Logo} alt="Fan-Prom-Ango logo" width="40px" height="auto"></img></Link>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='me-auto'>
            <Link to="/" className='nav-link'>Home</Link>
            
            <NavDropdown title='Movies' id='basic-nav-dropdown'>
              <Link to={`/movies/0`} className='dropdown-item'>Browse Movies</Link>
              <Link to='/Theaters/0' className='dropdown-item'>Browse Theaters</Link>
            </NavDropdown>
            
          </Nav>
          {cart.length > 0  &&<Nav className='ml-auto mr-5'><Link to={`/checkout/${movieID}/${theaterID}/${showtimeID}`} className='nav-link fade-in'>Checkout({cart.length}) <Image src={cartsvg} /></Link></Nav>}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;