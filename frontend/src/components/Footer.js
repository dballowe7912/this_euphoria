import React from 'react'
import { Link } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'

const Footer = () => {
  return (
    <footer>
      <Container>
        <Row>
          <Col md={3}></Col>
          <Col md={3} className="mx-3">
            <Row>
              <Link to="/">Home</Link>
            </Row>
            <Row>
              <Link to="/contact">Contact</Link>
            </Row>
            <Row>
              <Link to="/about">About Us</Link>
            </Row>
            <Row>
              <Link to="/terms-and-conditions">Terms and Conditions</Link>
            </Row>
            <Row>
              <Link to="/privacy-policy">Privacy Policy</Link>
            </Row>
          </Col>
          <Col md={3} className="mx-3">
            {/* <Row>
              <Link to="/">Dry Herbs</Link>
            </Row>
            <Row>
              <Link to="/">Bulk Teas</Link>
            </Row>
            <Row>
              <Link to="/">Essential Oils</Link>
            </Row>
            <Row>
              <Link to="/">Handmade Soaps</Link>
            </Row>
            <Row>
              <Link to="/">Jewelry</Link>
            </Row>
            <Row>
              <Link to="/">Room and Body Sprays</Link>
            </Row> */}
          </Col>
        </Row>
        <Row>
          <Col className="text-center py-3">
            Copyright &copy; Euphoria Botanical
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer
