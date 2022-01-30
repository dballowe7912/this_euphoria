import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Row, Col } from "react-bootstrap"
import { Link } from "react-router-dom"
import { listProducts } from "../actions/productActions.js"
import Product from "../components/Product"
import Loader from "../components/Loader"
import Message from "../components/Message"

const CollectionScreen = ({ match }) => {
  const dispatch = useDispatch()

  const productList = useSelector((state) => state.productList)
  const { loading, error, products } = productList

  useEffect(() => {
    dispatch(listProducts())
  }, [dispatch])

  const findProduct = products.filter(
    (product) => product.category === match.params.id
  )

  return (
    <>
      <Link to="/" className="btn btn-dark mb-3">
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          {findProduct.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
    </>
  )
}

export default CollectionScreen
