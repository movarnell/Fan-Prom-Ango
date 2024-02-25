import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap'
import { useHistory } from 'react-router-dom';
const PurchaseSuccess = () => {

    useEffect(() => {
        
        const timer = setTimeout(() => {
            history.push('/');
        }, 10000);
        return () => clearTimeout(timer);
    }
    , []);
const history = useHistory();
    return (
        
            <Row>
               
                    <Card className="text-center">
                        <Card.Header as="h2">Thank You!</Card.Header>
                        <Card.Body>
                            <Card.Title>Successful Purchase</Card.Title>
                            <Card.Text>
                                Your purchase was successful. We appreciate your business and hope you enjoy your movie!
                            </Card.Text>
                            <Card.Text>
                                You will be redirected to the home page in {10} seconds.
                            </Card.Text>
                        </Card.Body>
                    </Card>
              
            </Row>
        
    )
}

export default PurchaseSuccess
