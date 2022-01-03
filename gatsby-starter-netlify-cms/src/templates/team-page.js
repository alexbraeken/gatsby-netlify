import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import {useTranslation, useI18next} from 'gatsby-plugin-react-i18next';
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import TeamRoll from '../components/TeamRoll'
import { Container } from 'react-bootstrap';

export const MeetTheTeamPageTemplate = ({
  image,
  title,
  langTitles,
  heading,
  description,
  intro,
}) => {
  const [loaded, setLoaded] = useState(false);

  const {t} = useTranslation();
  const {language } = useI18next();
    
      useEffect(() => {
        setTimeout(()=>{
          setLoaded(true)}, 1000
          )
        return () => {
          setLoaded(false)
        }
      }, [])
  return(
<>
        <div
          className="full-width-image-container margin-top-0"
          style={{
            backgroundImage: `url(${ !!image.childImageSharp ? image.childImageSharp.fluid.src : image })`,
          }}
        >
          <h1
        className={`has-text-weight-bold is-size-1 content-header ${loaded? "loaded" : ""}`}
        style={{color: "white"}}>
            {langTitles[language]}
          </h1>
        </div>
        <section className="section">
          <Container>
            <div className="content">
                <section style={{marginBottom:"50px"}}>
                    {intro.description[language]}
                    <br />
                    <h3>{heading[language]}</h3>
                    <p>{description[language]}</p>
                </section>
                <section>
                    <TeamRoll />
                </section>
            </div>
          </Container>
        </section>
</>
)}

MeetTheTeamPageTemplate.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  title: PropTypes.string,
  langTitles: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  heading: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  description: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  intro: PropTypes.shape({
    description: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  }),
}

const MeetTheTeamPage = ({ data }) => {

  const  post = data.pageData
  const {language } = useI18next();


  return (
    <Layout propTitle={post.frontmatter.langTitles[language]}>
      <MeetTheTeamPageTemplate
        image={post.frontmatter.image}
        title={post.frontmatter.title}
        langTitles={post.frontmatter.langTitles}
        heading={post.frontmatter.heading}
        description={post.frontmatter.description}
        intro={post.frontmatter.intro}
      />
    </Layout>
  )
}

MeetTheTeamPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
}

export default MeetTheTeamPage

export const MeetTheTeamPageQuery = graphql`
  query MeetTheTeamPage($id: String!, $language: String!) {
    pageData: markdownRemark(id: { eq: $id }) {
      frontmatter {
        title 
        langTitles{
          en
          pt
          fr
          es
        }
        image {
          childImageSharp {
            fluid(maxWidth: 2048, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        heading {
          en
          pt
          fr
          es
        }
        description {
          en
          pt
          fr
          es
        }
        intro {
          heading {
            en
            pt
            fr
            es
          }
          description {
            en
            pt
            fr
            es
          }
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
