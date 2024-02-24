import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Logo from "../Assets/logo.png";
import { Link } from 'react-router-dom';
function Navigation() {
  return (
    <Navbar sticky='top' expand='lg' className='bg-dark' data-bs-theme="dark">
      <Container>
        <Link to='/' className='navbar navbar-brand'><img src={Logo} alt="Fan-Prom-Ango logo" width="40px" height="auto"></img></Link>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='me-auto'>
            <Link to="/" className='nav-link'>Home</Link>
            <Link to="/DevTools" className='nav-link'>DevTools</Link>
            <NavDropdown title='Movies' id='basic-nav-dropdown'>
              <NavDropdown.Item href='/Movies'>Browse Movies</NavDropdown.Item>
              <NavDropdown.Item href='#action/3.2'>
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href='#action/3.3'>Something</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;