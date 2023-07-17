import React, {useEffect} from 'react'
import {useTranslation} from 'gatsby-plugin-react-i18next';
import PropTypes from 'prop-types'
import {Card} from 'react-bootstrap'
import { graphql, StaticQuery } from 'gatsby'

class HiringRoll extends React.PureComponent {
    render() {
      const { data } = this.props
      const { edges: jobs } = data.allMarkdownRemark

      return (
            <>
              {jobs && jobs.length > 0 ?
              jobs.map((job, index) => {
              return (
                <div style={{position:"relative"}}>
                  <h2 className="prop-section-title orangeText" style={{top:"-20px", zIndex:"0", fontSize:"8rem", opacity:"0.1"}}>{job.node.frontmatter.jobName[this.props.language]}</h2>
                  <Card className="text-white" style={{backgroundColor:"#333333", maxWidth:"900px", margin: "60px auto", zIndex:"1", boxShadow: "0px 20px 20px -10px black"}}>
                    
                     <Card.Body>
                      <Card.Title className="orangeText">
                        {job.node.frontmatter.jobName[this.props.language]}
                      </Card.Title>
                      <Card.Subtitle className="mb-2 text-muted">
                        {job.node.frontmatter.location}
                      </Card.Subtitle>
                      <Card.Text>
                        <span className="orangeText">{this.props.t("Description")}: </span>{job.node.frontmatter.description[this.props.language]}
                      </Card.Text>
                      <Card.Text>
                        <span className="orangeText">{this.props.t("Qualifications")}: </span>{job.node.frontmatter.qualifications[this.props.language]}
                      </Card.Text>
                      <Card.Text className="mb-2 text-muted">
                        {job.node.frontmatter.hours}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </div>
              )
              })
            :
            <h3>{this.props.t("We're sorry to say there are no job openings at the moment but check back soon!")}</h3>
            } 

            </>
      )
    }
  }
  
  HiringRoll.propTypes = {
    data: PropTypes.shape({
      allMarkdownRemark: PropTypes.shape({
        edges: PropTypes.array,
      }),
    }),
  }
  
  export default (props) => (
    <StaticQuery
      query={graphql`
        query HiringRollQuery {
          allMarkdownRemark(
            filter: { 
              frontmatter: { 
                templateKey: { 
                  eq: "job-listing" 
                } 
              } 
            }, 
          sort: {
            fields: frontmatter___position, 
            order: ASC
          }
          ) {
            edges {
              node {
                id
                fields {
                  slug
                }
                frontmatter {
                  templateKey
                  jobName {
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
                  location
                  hours
                  qualifications {
                    en
                    pt
                    fr
                    es
                  }
                }
              }
            }
          }
        }
      `}
      render={(data) => <HiringRoll data={data} language={props.language} t={props.t}/>}
    />
  )
  