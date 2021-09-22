import React from 'react'
import PropTypes from 'prop-types'
import {Link, Trans, useTranslation, useI18next} from 'gatsby-plugin-react-i18next';
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'

export const AboutPageTemplate = ({ title, langTitles, content, contentComponent }) => {
  const PageContent = contentComponent || Content

  const {language} = useI18next();

  return (
    <section className="section section--gradient">
      <div className="container">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <div className="section">
              <h2 className="title is-size-3 has-text-weight-bold is-bold-light">
                {langTitles[language]}
              </h2>
              <PageContent className="content" content={content} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

AboutPageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  langTitles: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  content: PropTypes.string,
  contentComponent: PropTypes.func,
}

const AboutPage = ({ data }) => {
  const { markdownRemark: post } = data

  return (
    <Layout propTitle={post.frontmatter.title}>
      <AboutPageTemplate
        contentComponent={HTMLContent}
        title={post.frontmatter.title}
        langTitles={post.frontmatter.langTitles}
        content={post.html}
      />
    </Layout>
  )
}

AboutPage.propTypes = {
  data: PropTypes.object.isRequired,
}

export default AboutPage

export const aboutPageQuery = graphql`
  query AboutPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title 
        langTitles{
          en
          pt
        }
      }
    }
  }
`
