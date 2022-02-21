import React, { useEffect } from "react"
import { authData } from "../authnetConstants/constants"
import { HostedForm } from "react-acceptjs"
import { Link } from "react-router-dom"
import { Row, Col, ListGroup, Image, Card, Button } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import Message from "../components/Message"
import Loader from "../components/Loader"
import {
  getOrderDetails,
  payOrder,
  deliverOrder,
} from "../actions/orderActions"
import {
  ORDER_PAY_RESET,
  ORDER_DELIVER_RESET,
} from "../constants/orderConstants"

import { APIContracts as ApiContracts } from "authorizenet"
import { APIControllers as ApiControllers } from "authorizenet"
import { Constants as SDKConstants } from "authorizenet"

const OrderScreen = ({ match, history }) => {
  const orderId = match.params.id

  const dispatch = useDispatch()

  const orderDetails = useSelector((state) => state.orderDetails)
  const { order, loading, error } = orderDetails

  const orderPay = useSelector((state) => state.orderPay)
  const { loading: loadingPay, success: successPay } = orderPay

  const orderDeliver = useSelector((state) => state.orderDeliver)
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  if (!loading) {
    //   Calculate prices
    const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2)
    }

    order.itemsPrice = addDecimals(
      order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    )
  }

  useEffect(() => {
    if (!userInfo) {
      history.push("/login")
    }

    if (!order || successPay || successDeliver || order._id !== orderId) {
      dispatch({ type: ORDER_PAY_RESET })
      dispatch({ type: ORDER_DELIVER_RESET })
      dispatch(getOrderDetails(orderId))
    }
  }, [
    dispatch,
    orderId,
    successPay,
    successDeliver,
    order,
    history,
    userInfo,
  ])

  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(orderId, paymentResult))
  }

  const deliverHandler = () => {
    dispatch(deliverOrder(order))
  }

  const handleSubmit = async (response) => {
    try {
      
      const merchantAuthenticationType =
        new ApiContracts.MerchantAuthenticationType()
        merchantAuthenticationType.setName(authData.apiLoginID)
        merchantAuthenticationType.setTransactionKey(authData.transactionKey)
        var opaqueData = response.opaqueData
  
      var paymentType = new ApiContracts.PaymentType()
      paymentType.setOpaqueData(opaqueData)
  
      // var orderDetails = new ApiContracts.OrderType()
      // orderDetails.setInvoiceNumber('1')
      // orderDetails.setDescription("Product Description")
  
      var tax = new ApiContracts.ExtendedAmountType()
  
      // GET TAX FROM ORDER
      tax.setAmount(order.taxPrice)
      tax.setName("Sales Tax")
  
      // GET SHIPPING COST
      var shipping = new ApiContracts.ExtendedAmountType()
      shipping.setAmount("10.00")
      shipping.setName("USPS")
      shipping.setDescription("Shipping flat rate")
  
      // GET BILL TO INFO FROM ORDER
      var billTo = new ApiContracts.CustomerAddressType()
      billTo.setFirstName(order.shippingAddress.firstName)
      billTo.setLastName(order.shippingAddress.lastName)
      billTo.setAddress(order.shippingAddress.address)
      billTo.setCity(order.shippingAddress.city)
      billTo.setState(order.shippingAddress.state)
      billTo.setZip(order.shippingAddress.postalCode)
      billTo.setCountry("USA")
      billTo.setEmail(userInfo.email)
  
      // GET SHIPPING INFO
      var shipTo = new ApiContracts.CustomerAddressType()
      shipTo.setFirstName(order.shippingAddress.firstName)
      shipTo.setLastName(order.shippingAddress.lastName)
      shipTo.setAddress(order.shippingAddress.address)
      shipTo.setCity(order.shippingAddress.city)
      shipTo.setState(order.shippingAddress.state)
      shipTo.setZip(order.shippingAddress.postalCode)
      shipTo.setCountry("USA")
  
      // GET ITEMS DETAILS
      const { orderItems } = order
  
      if (orderItems) {
        var lineItemList = []
        orderItems.forEach((item) => {
          var lineItem_id1 = new ApiContracts.LineItemType()
          lineItem_id1.setItemId(item._id)
          lineItem_id1.setName(item.name.slice(0, 30))
          // lineItem_id1.setDescription("cannes logo")
          lineItem_id1.setQuantity(item.qty)
          lineItem_id1.setUnitPrice(item.price)
          lineItemList.push(lineItem_id1)
        })
      }
  
      var lineItems = new ApiContracts.ArrayOfLineItem()
      lineItems.setLineItem(lineItemList)
  
      var transactionRequestType = new ApiContracts.TransactionRequestType()
      transactionRequestType.setTransactionType(
        ApiContracts.TransactionTypeEnum.AUTHCAPTURETRANSACTION
      )
      transactionRequestType.setPayment(paymentType)
      transactionRequestType.setAmount(order.totalPrice)
      transactionRequestType.setLineItems(lineItems)
      // transactionRequestType.setUserFields(userFields);
      // transactionRequestType.setOrder(orderDetails);
      transactionRequestType.setTax(tax)
      transactionRequestType.setShipping(shipping)
      transactionRequestType.setBillTo(billTo)
      transactionRequestType.setShipTo(shipTo)
      // transactionRequestType.setTransactionSettings(transactionSettings);
  
      var createRequest = new ApiContracts.CreateTransactionRequest()
      createRequest.setMerchantAuthentication(merchantAuthenticationType)
      createRequest.setTransactionRequest(transactionRequestType)
  
      //pretty print request
      console.log(createRequest.getJSON(), null, 2)
  
      var ctrl = new ApiControllers.CreateTransactionController(
        createRequest.getJSON()
      )
      //Defaults to sandbox
      ctrl.setEnvironment(SDKConstants.endpoint.sandbox);
  
      ctrl.execute(function () {
        var apiResponse = ctrl.getResponse()
  
        var response = new ApiContracts.CreateTransactionResponse(apiResponse)
  
        //pretty print response
        console.log(JSON.stringify(response, null, 2))
  
        if (response != null) {
          if (
            response.getMessages().getResultCode() ===
            ApiContracts.MessageTypeEnum.OK
          ) {
            if (response.getTransactionResponse().getMessages() != null) {
              console.log(
                "Successfully created transaction with Transaction ID: " +
                  response.getTransactionResponse().getTransId()
              )
              console.log(
                "Response Code: " +
                  response.getTransactionResponse().getResponseCode()
              )
              console.log(
                "Message Code: " +
                  response
                    .getTransactionResponse()
                    .getMessages()
                    .getMessage()[0]
                    .getCode()
              )
              console.log(
                "Description: " +
                  response
                    .getTransactionResponse()
                    .getMessages()
                    .getMessage()[0]
                    .getDescription()
              )
            } else {
              console.log("Failed Transaction.")
              if (response.getTransactionResponse().getErrors() != null) {
                console.log(
                  "Error Code: " +
                    response
                      .getTransactionResponse()
                      .getErrors()
                      .getError()[0]
                      .getErrorCode()
                )
                console.log(
                  "Error message: " +
                    response
                      .getTransactionResponse()
                      .getErrors()
                      .getError()[0]
                      .getErrorText()
                )
              }
            }
          } else {
            console.log("Failed Transaction. ")
            if (
              response.getTransactionResponse() != null &&
              response.getTransactionResponse().getErrors() != null
            ) {
              console.log(
                "Error Code: " +
                  response
                    .getTransactionResponse()
                    .getErrors()
                    .getError()[0]
                    .getErrorCode()
              )
              console.log(
                "Error message: " +
                  response
                    .getTransactionResponse()
                    .getErrors()
                    .getError()[0]
                    .getErrorText()
              )
            } else {
              console.log(
                "Error Code: " + response.getMessages().getMessage()[0].getCode()
              )
              console.log(
                "Error message: " +
                  response.getMessages().getMessage()[0].getText()
              )
            }
          }
        } else {
          console.log("Null Response.")
        }
  
        successPaymentHandler(response)
      })
    } catch (error) {
      console.log(error)
    }
  }

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <>
      <h1>Order {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Name: </strong> {order.user.name}
              </p>
              <p>
                <strong>Email: </strong>{" "}
                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
              </p>
              <strong>Address:</strong>
              <p>
                {order.shippingAddress.firstName}
                {order.shippingAddress.lastName}
                <br />
                {order.shippingAddress.address}
                <br />
                {order.shippingAddress.city}, {order.shippingAddress.state}
                {order.shippingAddress.postalCode}
                <br />
                {order.shippingAddress.country}
              </p>
              {order.isDelivered ? (
                <Message variant="success">
                  Delivered on {order.deliveredAt}
                </Message>
              ) : (
                <Message variant="danger">Not Delivered</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                Credit Card
              </p>
              {order.isPaid ? (
                <Message variant="success">Paid on {order.paidAt}</Message>
              ) : (
                <Message variant="danger">Not Paid</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.orderItems.length === 0 ? (
                <Message>Order is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {order.orderItems.map((item, index) => {
                  return (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x ${item.price.toFixed(2)} = ${(item.qty * item.price).toFixed(2)}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}
                  )}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${order.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${order.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              {!order.isPaid && (
                <ListGroup.Item>
                  {loadingPay && <Loader />}
                  <HostedForm
                    buttonClassName="btn btn-block border"
                    authData={authData}
                    onSubmit={handleSubmit}
                    formButtonText="Pay Now"
                    formHeaderText="Enter Credit Card Info"
                  />
                </ListGroup.Item>
              )}
              {loadingDeliver && <Loader />}
              {userInfo &&
                userInfo.isAdmin &&
                order.isPaid &&
                !order.isDelivered && (
                  <ListGroup.Item>
                    <Button
                      type="button"
                      className="btn btn-block"
                      onClick={deliverHandler}
                    >
                      Mark As Delivered
                    </Button>
                  </ListGroup.Item>
                )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default OrderScreen