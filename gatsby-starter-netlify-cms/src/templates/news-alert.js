import React from 'react'
import {Link, Trans, useTranslation, useI18next} from 'gatsby-plugin-react-i18next';
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

export const NewsAlertTemplate = ({
  title,
  langTitles,
  news
}) => {
  
  const {language} = useI18next();

  return (
    <div className="flex-img-col">
    <h4>{langTitles[language]}</h4>: {news[language]}
    </div>
  )
}

NewsAlertTemplate.propTypes = {
  title: PropTypes.string,
  langTitles: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  news: PropTypes.string,
  link: PropTypes.string,
}

const NewsAlert = ({ data }) => {
  const { markdownRemark: news } = data

  return (
    <>
      <NewsAlertTemplate
        title={news.frontmatter.title}
        langTitles={news.frontmatter.langTitles}
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
        langTitles{
          en
          pt
          fr
          es
        }
        news {
          en
          pt
          fr
          es
        }
        link
      }
    }
  }
`
