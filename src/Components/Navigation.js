import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import cartsvg from "../Assets/CartLight.svg";
import Logo from "../Assets/logo.png";
import { Link } from 'react-router-dom';
import { Image } from "react-bootstrap";

function Navigation({ cart }) {
  return (
    <Navbar sticky='top' expand='lg' className='bg-dark' data-bs-theme="dark">
      <Container>
        <Link to='/' className='navbar navbar-brand'><img src={Logo} alt="Fan-Prom-Ango logo" width="40px" height="auto"></img></Link>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='me-auto'>
            <Link to="/" className='nav-link'>Home</Link>
            
            <NavDropdown title='Movies' id='basic-nav-dropdown'>
              <NavDropdown.Item href='/Movies'>Browse Movies</NavDropdown.Item>
              <NavDropdown.Item href='/Theaters'>
                Browse Theaters
              </NavDropdown.Item>
            </NavDropdown>
            
          </Nav>
          {cart.length > 0 && <Nav className='ml-auto mr-5'><Link to="/Checkout" className='nav-link fade-in'>Checkout({cart.length}) <Image src={cartsvg} /></Link></Nav>}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;