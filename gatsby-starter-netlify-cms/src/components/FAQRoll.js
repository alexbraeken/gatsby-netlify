import React, {useEffect, useState} from 'react'
import {useTranslation} from 'gatsby-plugin-react-i18next';
import PropTypes from 'prop-types'
import { graphql, StaticQuery } from 'gatsby'
import Collapse from 'react-bootstrap/Collapse';
import { BsPlus } from "react-icons/bs";


const CollapseQuestion = ({question, answer, language}) => {

    const [open, setOpen] = useState(false);

  return (
    <>
      <div
        onClick={() => setOpen(!open)}
        aria-controls={question[language]}
        aria-expanded={open}
        className="collapse-parent"
      >
        <div className="collapse-header" >
          <h4>- {question[language]}</h4>
        </div>
        <div className="collapse-icon">
        <BsPlus />
        </div>
      </div>
      <Collapse in={open}>
        <div className="collapse-body">
          <p>
            {answer[language]}
          </p>
        </div>
      </Collapse>
    </>
  );
  
}

class FAQRoll extends React.PureComponent {
    render() {
      const { data } = this.props
      const { edges: questions } = data.allMarkdownRemark
      return (
            <>
              {questions && questions.length > 0 ?
              questions.map((question, index) => {
              return (
                  <CollapseQuestion question={question.node.frontmatter.question} answer={question.node.frontmatter.answer} language={[this.props.language]} key={index}/>
              )
              })
            :
            <h3>{this.props.t("We're sorry to say there are no question openings at the moment but check back soon!")}</h3>
            } 

            </>
      )
    }
  }
  
  FAQRoll.propTypes = {
    data: PropTypes.shape({
      allMarkdownRemark: PropTypes.shape({
        edges: PropTypes.array,
      }),
    }),
  }
  
  export default (props) => (
    <StaticQuery
      query={graphql`
        query FAQRollQuery {
          allMarkdownRemark(
            filter: { 
              frontmatter: { 
                templateKey: { 
                  eq: "fa-question" 
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
                  question {
                    en
                    pt
                    fr
                    es
                  }
                  answer {
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
      render={(data) => <FAQRoll data={data} language={props.language} t={props.t}/>}
    />
  )
  