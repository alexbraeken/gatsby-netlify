import React, {useState, useEffect} from 'react'
import {Link, Trans, useTranslation, useI18next} from 'gatsby-plugin-react-i18next';
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'

export const ContentPageTemplate = ({ title, langTitles, content, contentComponent, hero, heroTitle, html }) => {

  const [loaded, setLoaded] = useState(false);

  const {language} = useI18next();
  

  const PageContent = contentComponent || Content

      useEffect(() => {
        setTimeout(()=>{
          setLoaded(true)}, 1000
          )
        return () => {
          setLoaded(false)
        }
      }, [])

  return (
    <div className="content">
      {hero &&
      <div
        className="full-width-image-container margin-top-0 gradient-bg"
        style={{
          backgroundImage: `url(${
            hero.publicURL
          })`,
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      >
        <h2
        className={`has-text-weight-bold is-size-1 content-header ${loaded? "loaded" : ""}`}
        style={{color: "white"}}>
          {langTitles[language]}
        </h2>
      </div> }
        <div className="container">
          <div className="columns">
            <div className="column is-10 is-offset-1">
              <div className="section">
                {!hero && <h2 className="title is-size-3 has-text-weight-bold is-bold-light">
                  {langTitles[language]}
                </h2>}
                <PageContent className="content" content={html[language] && html[language].length > 0 ? html[language] : content} />
              </div>
            </div>
          </div>
        </div>
        <section
    className="last"></section>
    </div>
  )
}

ContentPageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  langTitles: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  hero: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  content: PropTypes.string,
  contentComponent: PropTypes.func,
  html: PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.string])
}

const ContentPage = ({ data }) => {
  const post = data.pageData
  const {t} = useTranslation(['translation']);

  return (
    <Layout propTitle={post.frontmatter.title}>
      <ContentPageTemplate
        contentComponent={HTMLContent}
        title={post.frontmatter.title}
        langTitles={post.frontmatter.langTitles}
        hero={post.frontmatter.hero}
        content={post.html}
        html={post.frontmatter.html}
      />
    </Layout>
  )
}

ContentPage.propTypes = {
  data: PropTypes.object,
}

export default ContentPage

export const ContentPageQuery = graphql`
  query ContentPage($id: String!, $language: String!) {
    pageData: markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title 
        langTitles{
          en
          pt
          fr
          es
        }
        hero {
          childImageSharp {
            fluid(maxWidth: 2048, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
          publicURL
        }
        html {
          en
          pt
          fr
          es
        }
      }
    }
    locales: allLocale(filter: {ns: {in: ["translation"]},language: {eq: $language}}) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
  }
`
