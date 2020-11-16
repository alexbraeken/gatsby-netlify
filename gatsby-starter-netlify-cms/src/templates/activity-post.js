import React from 'react'
import PropTypes from 'prop-types'
import { graphql, Link } from 'gatsby'
import Content, { HTMLContent } from '../components/Content'

export const ActivityPostTemplate = ({
  content,
  contentComponent,
  description,
  tags,
  title,
  image,
  category,
  link,
  visibleLink
}) => {
  const PostContent = contentComponent || Content

  return (
    <article class="card card--6">
<div class="card__img" style={{background:`url('${image}')`}}>&nbsp;</div>

<div class="card__img--hover" style={{background:`url('${image}')`}}>&nbsp;</div>

<div class="card__info"><span class="card__category">{category}</span>

  <h3 class="card__title">{title}</h3>
<span class="card__details">{description}<br />
  <a class="card__link" href={link}>{visibleLink}</a></span></div>
</article>
  )
}

ActivityPostTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  title: PropTypes.string,
  category: PropTypes.string,
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  link: PropTypes.string,
  visibleLink: PropTypes.string,
}

const ActivityPost = ({ data }) => {
  const { markdownRemark: post } = data

  return (
    <>
      <ActivityPostTemplate
        content={post.html}
        contentComponent={HTMLContent}
        description={post.frontmatter.description}
        tags={post.frontmatter.tags}
        title={post.frontmatter.title}
        image={post.frontmatter.full_image}
        category={post.frontmatter.category}
        link={post.frontmatter.link}
        visibleLink={post.frontmatter.visibleLink}
      />
    </>
  )
}

ActivityPost.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
}

export default ActivityPost

export const pageQuery = graphql`
  query ActivityPostByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        title
        description
        tags
        category
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
