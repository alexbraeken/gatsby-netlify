import React from 'react'
import PropTypes from 'prop-types'
import { graphql, StaticQuery } from 'gatsby'
import { v4 } from 'uuid'

const Testimonials = ({ data }) => {

  return(
  <div>
    {data.edges.map((testimonial) => (
      <article key={v4()} className="message">
        <div className="message-body">
          {testimonial.node.frontmatter.quote}
          <br />
    <cite> – {testimonial.node.frontmatter.author}, {testimonial.node.frontmatter.location}</cite>
        </div>
      </article>
    ))}
  </div>
)}

Testimonials.propTypes = {
  testimonials: PropTypes.arrayOf(
    PropTypes.shape({
      quote: PropTypes.string,
      author: PropTypes.string,
      location: PropTypes.string,
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
                }
              }
            }
          }
        }
      `}
      render={(data, count) => <Testimonials data={data.allMarkdownRemark} count={count}/>}
    />
  )
  
