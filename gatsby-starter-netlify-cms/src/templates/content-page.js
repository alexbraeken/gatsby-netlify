import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'

export const ContentPageTemplate = ({ title, content, contentComponent, hero, heroTitle }) => {
  const PageContent = contentComponent || Content

  const [loaded, setLoaded] = useState(false);

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
          {title}
        </h2>
      </div> }
        <div className="container">
          <div className="columns">
            <div className="column is-10 is-offset-1">
              <div className="section">
                {!hero && <h2 className="title is-size-3 has-text-weight-bold is-bold-light">
                  {title}
                </h2>}
                <PageContent className="content" content={content} />
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

ContentPageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  hero: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  content: PropTypes.string,
  contentComponent: PropTypes.func,
}

const ContentPage = ({ data }) => {
  const { markdownRemark: post } = data

  return (
    <Layout>
      <ContentPageTemplate
        contentComponent={HTMLContent}
        title={post.frontmatter.title}
        hero={post.frontmatter.hero}
        content={post.html}
      />
    </Layout>
  )
}

ContentPage.propTypes = {
  data: PropTypes.object,
}

export default ContentPage

export const ContentPageQuery = graphql`
  query ContentPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        hero {
          childImageSharp {
            fluid(maxWidth: 2048, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
          publicURL
        }
      }
    }
  }
`
