import React, {useEffect, useState} from 'react'
import {useTranslation} from 'gatsby-plugin-react-i18next';
import PropTypes from 'prop-types'
import {Card, Accordion, Button} from 'react-bootstrap'
import { graphql, StaticQuery } from 'gatsby'
import BackgroundImage from 'gatsby-background-image'
import convertToBgImage from "../Helpers/images"
import { getImage } from "gatsby-plugin-image"
import { IoIosArrowDropdown } from "react-icons/io";



const FoodPackCard = ({foodPack, language, t}) => {
  const [showDescription, setShowDescription] = useState(false);
  const [showImage, setShowImage] = useState(false);

  const image = getImage(foodPack.node.frontmatter.img.childImageSharp)
  


  return (
    <div className="food-card-container" style={{position:"relative", margin: "20px auto auto", flex:"1 1 300px", padding:"20px", maxWidth:"100%"}}>
      <Accordion >
      <Card className="text-white" style={{backgroundColor:"#333333", width:"300px", maxWidth:"90%", margin: "60px auto", zIndex:"1", boxShadow: "0px 20px 20px -10px black", overflow:"visible"}}>
        <Card.Img style={{maxWidth:"100vw", scale:"1.2", boxShadow: "0px 20px 20px -10px black", objectFit: "cover", width: "100%", height: "250px"}} variant="top" srcSet={image.images.fallback.srcSet} sizes={image.images.fallback.sizes} src={image.images.fallback.src}/>
        <Card.Body style={{position:"relative", backgroundColor: "rgb(51, 51, 51)"}}>
          <Accordion.Toggle as={Card.Title} variant="link" eventKey="0" className="orangeText" style={{cursor: "pointer"}}>
            {foodPack.node.frontmatter.foodPackName[language]}
          </Accordion.Toggle>
          <Card.Text>
            <span className="orangeText">{t("Description")}: </span><span dangerouslySetInnerHTML={{__html: foodPack.node.frontmatter.description[language]}} />
          </Card.Text>
          <Accordion.Collapse eventKey="0">
            <Card.Text><span dangerouslySetInnerHTML={{__html: foodPack.node.frontmatter.extraInfo[language]}} /></Card.Text>
          </Accordion.Collapse>
          <Accordion.Toggle as={Card.Subtitle} variant="link" eventKey="0" className="mb-2 price-tag" style={{position:"absolute", bottom:"0", right:"0", borderRadius:"50%", padding:"20px", backgroundColor:"#ff6600", aspectRatio:"1 / 1", display: "flex", boxShadow: "0px 20px 20px -10px black", cursor: "pointer"}}>
            <p style={{margin:"auto", maxWidth:"100px", textAlign:"center", color: "#fff"}}>{foodPack.node.frontmatter.price}</p>
          </Accordion.Toggle>
          <div style={{display:"flex"}}>
            <Accordion.Toggle as={IoIosArrowDropdown} eventKey="0" variant="link" style={{margin:"auto", width:"auto", height:"30px", cursor: "pointer"}} />
          </div>
        </Card.Body>
      </Card>
      </Accordion>
    </div>
  )
}


class FoodPackRoll extends React.PureComponent {
    render() {
      const { data, language, t} = this.props
      const { edges: foodPacks } = data.allMarkdownRemark

      const slideImages = foodPacks.map(foodPack => {
        let tempImg = getImage(foodPack.node.frontmatter.img.childImageSharp)
        return tempImg
      })

      return (
            <>
              {foodPacks && foodPacks.length > 0 ?
              foodPacks.sort((a, b) => a.node.frontmatter.order - b.node.frontmatter.order).map((foodPack, index) => {
              return (
                <FoodPackCard foodPack={foodPack} language={language} t={t} key={`foodpack-${index}`}/>
              )
              })
            :
            <h3>{t("We're sorry to say there are no Food Packs available at the moment but check back soon!")}</h3>
            } 

            </>
      )
    }
  }
  
  FoodPackRoll.propTypes = {
    data: PropTypes.shape({
      allMarkdownRemark: PropTypes.shape({
        edges: PropTypes.array,
      }),
    }),
  }
  
  export default (props) => (
    <StaticQuery
      query={graphql`
        query FoodPackRollQuery {
          allMarkdownRemark(
            filter: { 
              frontmatter: { 
                templateKey: { 
                  eq: "food-pack" 
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
                  foodPackName {
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
                  price
                  img {
                    childImageSharp {
                      gatsbyImageData(placeholder: BLURRED, layout: FULL_WIDTH)
                    }
                    publicURL
                  }
                  order
                  extraInfo {
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
      render={(data) => <FoodPackRoll data={data} language={props.language} t={props.t}/>}
    />
  )
  