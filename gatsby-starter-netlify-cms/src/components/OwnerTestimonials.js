import React from 'react'
import PropTypes from 'prop-types'
import { graphql, StaticQuery } from 'gatsby'

import TestimonialSlider from '../components/TestimonialSlider'


const OwnerTestimonials = ({ data }) => {

  return(
    <TestimonialSlider slides={data} />

)}

OwnerTestimonials.propTypes = {
  testimonials: PropTypes.arrayOf(
    PropTypes.shape({
      quote: PropTypes.string,
      author: PropTypes.string,
      location: PropTypes.string,
      img: PropTypes.oneOfType([PropTypes.object, PropTypes.string])
    })
  ),
}

export default (props) => (
    <StaticQuery
      query={graphql`query OnwerTestimonials {
  allMarkdownRemark(
    filter: {frontmatter: {templateKey: {eq: "ownerTestimonial"}}}
  ) {
    edges {
      node {
        id
        frontmatter {
          author
          templateKey
          quote
          location
          img {
            childImageSharp {
              gatsbyImageData(placeholder: BLURRED, layout: FULL_WIDTH)
            }
            publicURL
          }
        }
      }
    }
  }
}
`}
      render={(data, count) => <OwnerTestimonials data={data.allMarkdownRemark} count={count}/>}
    />
  )
  
