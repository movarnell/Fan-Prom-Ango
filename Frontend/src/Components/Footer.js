import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import logo from '../Assets/logo.png'
const Footer = () => {
    return (
        <footer className="footer py-5">
            <Container>
                <Row>
                    <Col className="text-center text-light">
                        <hr/>
                        Fan-Prom-Ango - 2024<br/>
                        Student Built Project - <a className='' href="https://github.com/movarnell/Fan-Prom-Ango">GitHub</a><br/>
                        
                        <img src={logo} alt="Fan-Prom-Ango logo" width="40px" height="auto"/>
                    </Col>
                </Row>
            </Container>
        </footer>
    )
}

export default Footer
