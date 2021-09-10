import React from "react";
import { Container, Row, Col } from "react-bootstrap";

function ContentWrapper({ children }) {
  return (
    <div>
      <Container className="p-4 mx-0">
        <Row>
          <Col className="col-md-auto">{children}</Col>
        </Row>
      </Container>
    </div>
  );
}

export default ContentWrapper;
