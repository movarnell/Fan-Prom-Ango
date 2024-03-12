import React, { useEffect, useState } from "react";
import { Row, Card } from "react-bootstrap";
import { useHistory } from "react-router-dom";

const PurchaseSuccess = () => {
  const [redirectTimer, setRedirectTimer] = useState(10);
  const history = useHistory();

  useEffect(() => {
      const intervalId = setInterval(() => {
        setRedirectTimer((prevTimer) => prevTimer - 1);
      }, 1000);

      return () => {
        clearInterval(intervalId);
      };
    }, []);

  useEffect(() => {
    if (redirectTimer === 0) {
      history.push("/");
    }
  }, [redirectTimer, history]);

  return (
    <Row>
      <Card className="text-center">
        <Card.Header as="h2">Thank You!</Card.Header>
        <Card.Body>
          <Card.Title>Successful Purchase</Card.Title>
          <Card.Text>
            Your purchase was successful. We appreciate your business and hope
            you enjoy your movie!
          </Card.Text>
          <Card.Text>
            You will be redirected to the home page in {redirectTimer} seconds.
          </Card.Text>
        </Card.Body>
      </Card>
    </Row>
  );
};

export default PurchaseSuccess;
