import React from 'react'
import { Col, Row, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import collections from '../data/collections'

const Collections = () => {
  return (
    <>
      <Row>
        {collections.map((collection) => (
          <Col key={collection.name} sm={12} md={6} lg={4} xl={3}>
            <Card className="my-3 py-3">
              <Link to={`collection/${collection._id}`}>
                <Card.Img src={collection.image} variant="top"/>
              </Link>

              <Card.Body>
                <Link to={`collection/${collection._id}`}>
                  <Card.Title as="h4" style={{textAlign: 'center'}}>
                    <strong>{collection.name}</strong>
                  </Card.Title>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  )
}


export default Collections
