import React from 'react'
import PropTypes from 'prop-types'
import { graphql, Link } from 'gatsby'
import Content, { HTMLContent } from '../components/Content'

export const TeamMemberTemplate = ({
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
  const MemberContent = contentComponent || Content

  return (
    <div className="flex-img-col">
    <div className="col-img-bg">
        <div style={{background:`url(${image ? image : null} `,
        backgroundSize: "cover",
        backgroundPosition: "50%;",
        height:"-webkit-fill-available"
        }} />
    
        <div className="col-img-overlay overlay"/>
    
        <div className="team-description">{description}
        </div>
    
        <div className="team-txt">
        <div className="full-width">
        <h2>{title}</h2>
        </div>
        
        <div className="full-width">{visibleLink}</div>
        </div>
    </div>
    </div>
  )
}

TeamMemberTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  title: PropTypes.string,
  category: PropTypes.string,
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  link: PropTypes.string,
  visibleLink: PropTypes.string,
}

const TeamMember = ({ data }) => {
  const { markdownRemark: post } = data

  return (
    <>
      <TeamMemberTemplate
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

TeamMember.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
}

export default TeamMember

export const pageQuery = graphql`
  query TeamMemberByID($id: String!) {
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
