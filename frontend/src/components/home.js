import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

const Home = () => {
  return (
    <Container>
      <Row>
        <Col>
          <h2>Home</h2>
        </Col>
      </Row>
      <Row>
        <Col>
          <img src="/rb-logo.png" alt="Banner" style={{ width: '100%', height: '100%' }} />
        </Col>
      </Row>
    </Container>
  )
}

export default Home