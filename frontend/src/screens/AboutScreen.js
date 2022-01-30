import React, { useEffect } from "react"

const AboutScreen = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="about-page custom-font bg-light">
      <div className=" about-main-container container" role="main">
        <h1 className="about-title">Euphoria Botanical</h1>
        <p className="about-text">
          Euphoria Botanical is an Herb Shop located downtown in Kilgore, Texas.
          We have a large selection of fresh herbs as well as a large variety
          of teas. Come check out our Essential Oils, Handmade Jewelry,
          Insence, Sage, Stones, Crystals, Handmade Soaps and even a Tea Lounge!
          Our local Euphoria Skate Shop offers Skate Clinics, Trejo Boards,
          Houston Skateboards and other skate gear and apparel.
        </p>
      </div>
    </div>
  )
}

export default AboutScreen
