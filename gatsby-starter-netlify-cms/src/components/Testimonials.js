import React from 'react'
import PropTypes from 'prop-types'
import { graphql, StaticQuery } from 'gatsby'
import TestimonialSlider from '../components/TestimonialSlider'


const Testimonials = ({ data }) => {

  return(
    <TestimonialSlider slides={data} />

)}

Testimonials.propTypes = {
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
      query={graphql`
        query Testimonials {
          allMarkdownRemark(
            filter: { frontmatter: { templateKey: { eq: "testimonial" } } } ) {
            edges {
              node {
                id
                frontmatter {
                  author
                  templateKey
                  quote
                  location
                  img {
                    childImageSharp{
                      fluid{
                        src
                      }
                    }
                    publicURL
                  }
                }
              }
            }
          }
        }
      `}
      render={(data, count) => <Testimonials data={data.allMarkdownRemark} count={count}/>}
    />
  )
  
