import React from "react"
import { Carousel } from 'react-bootstrap';

const HeaderCarousel = () => {
    return (
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/carousel-photos/center-table.jpg"
            alt="Carousel slide of store front, with candles, incense, sage, etc"
          />
          <Carousel.Caption>
            <h3
              style={{
                color: "white",
                width: "100%",
                backgroundColor: "black",
                opacity: "0.6",
              }}
            >
              Euphoria Botanical
            </h3>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/carousel-photos/potpourri.jpg"
            alt="Photo slide of potpourri and incense"
          />

          <Carousel.Caption>
            <h3
              style={{
                color: "white",
                width: "100%",
                backgroundColor: "black",
                opacity: "0.6",
              }}
            >
              Here for all of you skate and botanical needs
            </h3>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/carousel-photos/skate-board.jpg"
            alt="Photo of skate boards and accessories"
          />

          <Carousel.Caption>
            <h3
              style={{
                color: "white",
                width: "100%",
                backgroundColor: "black",
                opacity: "0.6",
              }}
            >
              Come pay us a visit today!
            </h3>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    )
}

export default HeaderCarousel
