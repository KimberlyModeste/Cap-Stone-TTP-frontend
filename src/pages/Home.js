import React from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
function Home() {
  return (
    <div style={{ background: "white" }}>
      <Container>
        <Row className="w-responsive text-center mx-auto p-3 mt-2">
          <Col>
            <img
              style={{ width: "50%" }}
              src="https://images.unsplash.com/photo-1610474821938-df60c236b0b0?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2734&q=80"
            />
          </Col>
          <Col>2 of 2</Col>
        </Row>
      </Container>
    </div>
  );
}
export default Home;
