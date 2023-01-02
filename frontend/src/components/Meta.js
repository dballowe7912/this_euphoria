import React from 'react'
import { Helmet } from 'react-helmet'

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='keyword' content={keywords} />
    </Helmet>
  )
}

Meta.defaultProps = {
  title: "Euphoria Botanical",
  description: "Here for all your botanical needs",
  keywords:
    "herbs, teas, jewelry, body sprays, room sprays, essential oils, oils, incense, gems, crystals, stones, skateboard, skateboards"
}

export default Meta
