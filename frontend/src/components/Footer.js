import React from 'react'
import { Link } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'

const Footer = () => {
  return (
    <footer>
      <Container>
        <Row style={{ alignItems: "center", justifyContent: "center" }}>
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
            <Row>
              <Link to="/collection/herbs">Dry Herbs</Link>
            </Row>
            <Row>
              <Link to="/collection/teas">Bulk Teas</Link>
            </Row>
            <Row>
              <Link to="/collection/oils">Essential Oils</Link>
            </Row>
            <Row>
              <Link to="/collection/soaps">Handmade Soaps</Link>
            </Row>
            <Row>
              <Link to="/collection/jewelry">Jewelry</Link>
            </Row>
            <Row>
              <Link to="/collection/crystals-and-stones">
                Crystals and Stones
              </Link>
            </Row>
            <Row>
              <Link to="/collection/skateshop">
                Skateboards and Accessories
              </Link>
            </Row>
          </Col>
          <Col md={3} className="mx-3">
            <Row>
              <Link to="https://www.instagram.com/euphoriabotanical/">
                <i className="fab fa-instagram-square instagram-icon footer-icon"></i>
              </Link>
            </Row>
            <Row>
              <Link to="https://www.facebook.com/EUPHORIABOTANICALS/">
                <i className="fab fa-facebook-square facebook-icon footer-icon"></i>
              </Link>
            </Row>
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
