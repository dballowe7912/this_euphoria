import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Row, Col } from "react-bootstrap"
import { Link } from "react-router-dom"
import { listProducts } from "../actions/productActions.js"
import Product from "../components/Product"
import Loader from "../components/Loader"
import Message from "../components/Message"
import Paginate from "../components/Paginate.js"

const CollectionScreen = ({ match }) => {
  const keyword = match.params.keyword

  const dispatch = useDispatch()
  
  const productList = useSelector((state) => state.productList)
  const { loading, error, products, page, pages } = productList

  useEffect(() => {
    dispatch(listProducts())
  }, [dispatch])

  const orderedProducts = products.filter((product, index) => {
    return product.category === match.params.id
  })
    
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
        <>
          <Row>
            {orderedProducts.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          {/* <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ""}
          /> */}
        </>
      )}
    </>
  )
}

export default CollectionScreen
