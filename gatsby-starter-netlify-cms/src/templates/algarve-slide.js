import React from 'react'
import PropTypes from 'prop-types'
import { graphql, Link } from 'gatsby'
import Content, { HTMLContent } from '../components/Content'

export const AlgarveSlideTemplate = ({
  contentComponent,
  description,
  title,
  image,
  link,
  visibleLink
}) => {
  const PostContent = contentComponent || Content

  return (
    <div style={{background:`url('${image}')`}}>
        <h2>{title}</h2>
        <p>{description}</p>
    </div>
  )
}

AlgarveSlideTemplate.propTypes = {
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  title: PropTypes.string,
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  link: PropTypes.string,
  visibleLink: PropTypes.string,
}

const AlgarveSlide = ({ data }) => {
  const { markdownRemark: slide } = data

  return (
    <>
      <AlgarveSlideTemplate
        contentComponent={HTMLContent}
        description={slide.frontmatter.description}
        title={slide.frontmatter.title}
        image={slide.frontmatter.full_image}
        link={slide.frontmatter.link}
        visibleLink={slide.frontmatter.visibleLink}
      />
    </>
  )
}

AlgarveSlide.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
}

export default AlgarveSlide

export const pageQuery = graphql`
  query AlgarveSlideByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        title
        description
        link
        visibleLink
        image {
            childImageSharp {
              fluid(maxWidth: 2048, quality: 100) {
                ...GatsbyImageSharpFluid
              }
            }
          }
      }
    }
  }
`
