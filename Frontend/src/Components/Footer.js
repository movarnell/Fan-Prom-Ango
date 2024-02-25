import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import logo from '../Assets/logo.png'
import { Link } from 'react-router-dom'
const Footer = () => {
    return (
        <footer className="footer py-5">
            <Container>
                <Row>
                    <Col className="text-center text-light">
                        <hr/>
                        Fan-Prom-Ango - Promineo Tech 2024<br/>
                        Class Built Project - <a className='' href="https://github.com/movarnell/Fan-Prom-Ango">GitHub</a><br/>
                        <Link to="/DevTools" className='nav-link'>DevTools</Link><br/>
                        
                        <Link to='/'><img src={logo} alt="Fan-Prom-Ango logo" width="40px" height="auto"/></Link>
                    </Col>
                </Row>
            </Container>
        </footer>
    )
}

export default Footer
