import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Logo from "../Assets/logo.png";

function Navigation() {
  return (
    <Navbar sticky='top' expand='lg' className='bg-dark' data-bs-theme="dark">
      <Container>
        <Navbar.Brand href='#home'><img src={Logo} alt="Fan-Prom-Ango logo" width="40px" height="auto"></img></Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='me-auto'>
            <Nav.Link href='#home'>Home</Nav.Link>
            <Nav.Link href='#link'>Cart</Nav.Link>
            <NavDropdown title='Movies' id='basic-nav-dropdown'>
              <NavDropdown.Item href='#action/3.1'>Browse Movies</NavDropdown.Item>
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