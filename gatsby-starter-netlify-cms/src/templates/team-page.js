import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Features from '../components/Features'
import PreviewCompatibleImage from '../components/PreviewCompatibleImage'
import TeamRoll from '../components/TeamRoll'
import { Container } from 'react-bootstrap';

export const MeetTheTeamPageTemplate = ({
  image,
  title,
  heading,
  description,
  intro,
}) => {
  const [loaded, setLoaded] = useState(false);
    
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
            {title}
          </h1>
        </div>
        <section className="section">
          <Container>
            <div className="content">
                <section style={{marginBottom:"50px"}}>
                    {intro.description}
                    <br />
                    <h3>{heading}</h3>
                    <p>{description}</p>
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
  heading: PropTypes.string,
  description: PropTypes.string,
  intro: PropTypes.shape({
    description: PropTypes.string,
  }),
}

const MeetTheTeamPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark

  return (
    <Layout>
      <MeetTheTeamPageTemplate
        image={frontmatter.image}
        title={frontmatter.title}
        heading={frontmatter.heading}
        description={frontmatter.description}
        intro={frontmatter.intro}
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
  query MeetTheTeamPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      frontmatter {
        title
        image {
          childImageSharp {
            fluid(maxWidth: 2048, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        heading
        description
        intro {
          heading
          description
        }
      }
    }
  }
`
