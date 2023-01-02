import asyncHandler from "express-async-handler"

// @desc    Add auth to front
// @route   get /api/capture
// @access  Private

const addAuth = asyncHandler(async (req, res) => {
    res.send({
      apiLoginID: process.env.REACT_APP_AUTHORIZE_API_LOGIN_ID,
      clientKey: process.env.REACT_APP_AUTHORIZE_API_CLIENT_KEY,
    })
})

// @desc    Create new payment request
// @route   POST /api/capture
// @access  Private

const chargeCreditCard = (token, amount) => {
  return new Promise((resolve, reject) => {
    const apiLoginKey = process.env.REACT_APP_AUTHORIZE_API_LOGIN_ID
    const transactionKey = process.env.REACT_APP_AUTHORIZE_TRANSACTION_KEY

    const merchantAuthType = new APIContracts.MerchantAuthenticationType()
    const opaqueData = new APIContracts.OpaqueDataType()
    const paymentType = new APIContracts.PaymentType()
    const transactionRequestType = new APIContracts.TransactionRequestType()
    const createRequest = new APIContracts.CreateTransactionRequest()

    merchantAuthType.setName(apiLoginKey)
    merchantAuthType.setTransactionKey(transactionKey)

    opaqueData.setDataDescriptor(token.dataDescriptor)
    opaqueData.setDataValue(token.dataValue)

    paymentType.setOpaqueData(opaqueData)

    transactionRequestType.setTransactionType(
      APIContracts.TransactionTypeEnum.AUTHCAPTURETRANSACTION
    )
    transactionRequestType.setPayment(paymentType)
    transactionRequestType.setAmount(amount)

    createRequest.setMerchantAuthentication(merchantAuthType)
    createRequest.setTransactionRequest(transactionRequestType)

    const control = new APIControllers.CreateTransactionController(
      createRequest.getJSON()
    )

    control.execute(() => {
      const apiResponse = control.getResponse()
      const response = new APIContracts.CreateTransactionResponse(apiResponse)

      if (response != null) {
        if (
          response.getMessages().getResultCode() ==
            APIContracts.MessageTypeEnum.OK &&
          response.getTransactionResponse().getResponseCode() == "1"
        ) {
          console.log(
            "Transaction ID:",
            response.getTransactionResponse().getTransId()
          )
          resolve(response.getTransactionResponse().getTransId())
        } else {
          console.log("Result Code:" + response.getMessages().getResultCode())
          console.log(
            "Transaction Response Code:" +
              response.getTransactionResponse().getResponseCode()
          )
          console.log(
            "Error Code: " + response.getMessages().getMessage()[0].getCode()
          )
          console.log(
            "Error message: " + response.getMessages().getMessage()[0].getText()
          )
          reject(response.getMessages().getMessage()[0].getCode())
        }
      } else {
        reject("No response from Credit Card Processor")
      }
    })
  })
}

export { chargeCreditCard, addAuth }

//  const merchantAuthenticationType =
//    new ApiContracts.MerchantAuthenticationType()
//  merchantAuthenticationType.setName(authData.apiLoginID)
//  merchantAuthenticationType.setTransactionKey(authData.transactionKey)
//  var opaqueData = response.opaqueData

//  var paymentType = new ApiContracts.PaymentType()
//  paymentType.setOpaqueData(opaqueData)

// NOT USED next 3 lines!!!
 // var orderDetails = new ApiContracts.OrderType()
 // orderDetails.setInvoiceNumber(orderId)
 // orderDetails.setDescription("Product Description")
//NOT USED above 3 lines!!!

//  var tax = new ApiContracts.ExtendedAmountType()

 // GET TAX FROM ORDER
//  tax.setAmount(order.taxPrice)
//  tax.setName("Sales Tax")

 // GET SHIPPING COST
//  var shipping = new ApiContracts.ExtendedAmountType()
//  shipping.setAmount("10.00")
//  shipping.setName("USPS")
//  shipping.setDescription("Shipping flat rate")

 // GET BILL TO INFO FROM ORDER
//  var billTo = new ApiContracts.CustomerAddressType()
//  billTo.setFirstName(order.shippingAddress.firstName)
//  billTo.setLastName(order.shippingAddress.lastName)
//  billTo.setAddress(order.shippingAddress.address)
//  billTo.setCity(order.shippingAddress.city)
//  billTo.setState(order.shippingAddress.state)
//  billTo.setZip(order.shippingAddress.postalCode)
//  billTo.setCountry("USA")
//  billTo.setEmail(userInfo.email)

 // GET SHIPPING INFO
//  var shipTo = new ApiContracts.CustomerAddressType()
//  shipTo.setFirstName(order.shippingAddress.firstName)
//  shipTo.setLastName(order.shippingAddress.lastName)
//  shipTo.setAddress(order.shippingAddress.address)
//  shipTo.setCity(order.shippingAddress.city)
//  shipTo.setState(order.shippingAddress.state)
//  shipTo.setZip(order.shippingAddress.postalCode)
//  shipTo.setCountry("USA")

 // GET ITEMS DETAILS
//  const { orderItems } = order

//  if (orderItems) {
//    var lineItemList = []
//    orderItems.forEach((item) => {
//      var lineItem_id1 = new ApiContracts.LineItemType()
//      lineItem_id1.setItemId(item._id)
//      lineItem_id1.setName(item.name.slice(0, 30))
//      // lineItem_id1.setDescription("cannes logo")
//      lineItem_id1.setQuantity(item.qty)
//      lineItem_id1.setUnitPrice(item.price)
//      lineItemList.push(lineItem_id1)
//    })
//  }

//  var lineItems = new ApiContracts.ArrayOfLineItem()
//  lineItems.setLineItem(lineItemList)

//  var transactionRequestType = new ApiContracts.TransactionRequestType()
//  transactionRequestType.setTransactionType(
//    ApiContracts.TransactionTypeEnum.AUTHCAPTURETRANSACTION
//  )
//  transactionRequestType.setPayment(paymentType)
//  transactionRequestType.setAmount(order.totalPrice)
//  transactionRequestType.setLineItems(lineItems)

 //NEXT 2 LINEs NOT USED!!!
 // transactionRequestType.setUserFields(userFields);
 // transactionRequestType.setOrder(orderDetails);


//  transactionRequestType.setTax(tax)
//  transactionRequestType.setShipping(shipping)
//  transactionRequestType.setBillTo(billTo)
//  transactionRequestType.setShipTo(shipTo)

 //NEXT LINE NOT USED!!!
 // transactionRequestType.setTransactionSettings(transactionSettings);

//  var createRequest = new ApiContracts.CreateTransactionRequest()
//  createRequest.setMerchantAuthentication(merchantAuthenticationType)
//  createRequest.setTransactionRequest(transactionRequestType)

 //pretty print request
//  console.log(createRequest.getJSON(), null, 2)

//  var ctrl = new ApiControllers.CreateTransactionController(
//    createRequest.getJSON()
//  )
 //Defaults to sandbox
//  ctrl.setEnvironment(SDKConstants.endpoint.sandbox)

//  ctrl.execute(function () {
//    var apiResponse = ctrl.getResponse()

//    var response = new ApiContracts.CreateTransactionResponse(apiResponse)

   //pretty print response
//    console.log(JSON.stringify(response, null, 2))

//    if (response != null) {
    //  if (
//        response.getMessages().getResultCode() ===
//        ApiContracts.MessageTypeEnum.OK
//      ) {
//        if (response.getTransactionResponse().getMessages() != null) {
//          console.log(
//            "Successfully created transaction with Transaction ID: " +
//              response.getTransactionResponse().getTransId()
//          )
//          console.log(
//            "Response Code: " +
//              response.getTransactionResponse().getResponseCode()
//          )
//          console.log(
//            "Message Code: " +
//              response
//                .getTransactionResponse()
//                .getMessages()
//                .getMessage()[0]
//                .getCode()
//          )
//          console.log(
//            "Description: " +
//              response
//                .getTransactionResponse()
//                .getMessages()
//                .getMessage()[0]
//                .getDescription()
//          )
//        } else {
//          console.log("Failed Transaction.")
//          if (response.getTransactionResponse().getErrors() != null) {
//            console.log(
//              "Error Code: " +
//                response
//                  .getTransactionResponse()
//                  .getErrors()
//                  .getError()[0]
//                  .getErrorCode()
//            )
//            console.log(
//              "Error message: " +
//                response
//                  .getTransactionResponse()
//                  .getErrors()
//                  .getError()[0]
//                  .getErrorText()
//            )
//          }
//        }
//      } else {
//        console.log("Failed Transaction. ")
//        if (
//          response.getTransactionResponse() != null &&
//          response.getTransactionResponse().getErrors() != null
//        ) {
//          console.log(
//            "Error Code: " +
//              response
//                .getTransactionResponse()
//                .getErrors()
//                .getError()[0]
//                .getErrorCode()
//          )
//          console.log(
//            "Error message: " +
//              response
//                .getTransactionResponse()
//                .getErrors()
//                .getError()[0]
//                .getErrorText()
//          )
//        } else {
//          console.log(
//            "Error Code: " + response.getMessages().getMessage()[0].getCode()
//          )
//          console.log(
//            "Error message: " + response.getMessages().getMessage()[0].getText()
//          )
//        }
//      }
//    } else {
//      console.log("Null Response.")
//    }
//  })