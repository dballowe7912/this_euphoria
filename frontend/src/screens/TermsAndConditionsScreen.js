import React, { useEffect } from "react"

function TermsAndConditionsScreen() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="terms-conditions">
      <h1>Terms and Conditions</h1>
      <p>
        Euphoria Botanical LLC are not medical professionals. The products
        available, along with statements, opinions, views expressed, ideas, or
        suggestions are our opinions, and are meant for informational purposes
        only! They are not meant to be used to diagnose, treat, prescribe,
        prevent or cure a disease or to administer in any manner to any physical
        ailments and are not intended for the substitute for the medical advise
        of a trained healthcare professional. We cannot be held liable for the
        decisions and choices you make and or the outcome of those decisions and
        choices. You are encouraged to do your own research and consult your
        health care professional before treating yourself or anyone else. Herbs
        are immensely powerful and if they are misused, can be harmful. Herbs
        can also cause allergic reactions, interfere with traditional
        medications, by blocking their effectiveness, or reacting with them in a
        harmful way. Always check with your healthcare provider before using
        herbs, or herbal products. Do not use herbal products if you are
        pregnant, nursing, taking medications or undergoing treatment for
        medical conditions with out consulting your healthcare professional.
      </p>
      <p>
        By accessing euphoriabotanical.com, you are agreeing to be bound by
        these Terms and Conditions of use, all applicable laws and regulations,
        and agree that you are responsible for compliance with any applicable
        local laws. If you do not agree with any of these terms, you are
        prohibited from using or accessing euphoriabotanical.com. The materials
        contained in this web site are protected by applicable copyright and
        trade mark law.
      </p>
      <h1>Returns and Refunds</h1>
      <p className="returns-refunds">
        In order to be eligible for a return, items must have been either
        damaged in shipment or the wrong item was shipped. Claims must to be
        submitted within 48 hours of receiving, and if the wrong item was
        shipped, a photo of the item needs to be sent within 48 hours upon
        receiving. If either condition is met, item will be replaced, or a
        refund will be issued.
      </p>
    </div>
  )
}

export default TermsAndConditionsScreen
