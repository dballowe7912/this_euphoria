import React, { useEffect } from 'react'

const ShippingDetailsScreen = () => {

    useEffect(() => {
    window.scrollTo(0, 0)
    }, [])

  return (
    <div className="shipping-details">
      <h1>Euphoria Botanical's Shipping Policy</h1>
      <hr />
      <div className="shipping">
        <h2>Shipping rates & costs</h2>
        <p>
            Shipping rates carry a flat fee of $12. For oversized items such as
            skateboards or bulk orders can carry a fee of $25.
        </p>
        <h2>Shipping methods and delivery times</h2>
        <p>
            Orders are shipped using USPS and will arrive in 1-3 days after items
            are shipped.
        </p>
        <h2>Shipping restrictions</h2>
            <p>
                Shipping is limited to within the United States, but can be arranged.
                Please call 903-983-0213 or email{" "}
                <span>
                    <a href="mailto:support@euphoriabotanical.com">
                    support@euphoriabotanical.com
                    </a>{" "}
                </span>
                for more information.
            </p>
        <h2>Missing, damaged or lost packages</h2>
        <p>
          Euphoria Botanical is not liable for any products damaged or lost
          during shipping. If you received your order damaged, please contact
          the shipment carrier or our support team directly to file a claim.
          Please save all packaging material and damaged goods before filing a
          claim.
        </p>
        <h2>International shipping</h2>
        <p>
            For orders outside of the United States please call{" "}
            <span className="email-or-phone-number">903-983-0213</span> or email{" "}
            <span>
                <a
                    className="email-or-phone-number"
                    href="mailto:support@euphoriabotanical.com"
                >
                    support@euphoriabotanical.com
                </a>
            </span>{" "}
            for a shipping quote.
        </p>
      </div>
    </div>
  )
}

export default ShippingDetailsScreen