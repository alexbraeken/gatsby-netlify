import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

export const NewsAlertTemplate = ({
  title,
  news
}) => {
  

  return (
    <div className="flex-img-col">
    <h4>{title}</h4>: {news}
    </div>
  )
}

NewsAlertTemplate.propTypes = {
  title: PropTypes.string,
  news: PropTypes.string,
  link: PropTypes.string,
}

const NewsAlert = ({ data }) => {
  const { markdownRemark: news } = data

  return (
    <>
      <NewsAlertTemplate
        title={news.frontmatter.title}
        news={news.frontmatter.news}
        link={news.frontmatter.link}
      />
    </>
  )
}

NewsAlert.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
}

export default NewsAlert

export const pageQuery = graphql`
  query NewsAlertByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        title
        news
        link
      }
    }
  }
`
