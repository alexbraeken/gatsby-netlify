import React, {useEffect, useState} from 'react'
import {useTranslation} from 'gatsby-plugin-react-i18next';
import PropTypes from 'prop-types'
import {Card, Button} from 'react-bootstrap'
import { graphql, StaticQuery } from 'gatsby'
import BackgroundImage from 'gatsby-background-image'
import convertToBgImage from "../Helpers/images"
import { getImage } from "gatsby-plugin-image"


const FoodPackCard = ({foodPack, language, t}) => {
  const [showDescription, setShowDescription] = useState(false);
  const [showImage, setShowImage] = useState(false);

  const image = getImage(foodPack.node.frontmatter.img.childImageSharp)

  return (
    <div className="food-card-container" style={{position:"relative", margin: "20px auto auto", flex:"1 1 300px", padding:"20px", maxWidth:"100%"}}>
      <Card className="text-white" style={{backgroundColor:"#333333", width:"300px", maxWidth:"90%", margin: "60px auto", zIndex:"1", boxShadow: "0px 20px 20px -10px black"}}>
        <Card.Img style={{maxWidth:"100vw", scale:"1.2", boxShadow: "0px 20px 20px -10px black", objectFit: "cover", width: "100%", height: "250px"}} variant="top" srcSet={image.images.fallback.srcSet} sizes={image.images.fallback.sizes} src={image.images.fallback.src}/>
        <Card.Body style={{position:"relative", backgroundColor: "rgb(51, 51, 51)"}}>
          <Card.Title className="orangeText" onClick={() => setShowDescription(!showDescription)}>
            {foodPack.node.frontmatter.foodPackName[language]}
          </Card.Title>
          <Card.Text>
            <span className="orangeText">{t("Description")}: </span>{foodPack.node.frontmatter.description[language]}
          </Card.Text>
          <div style={{ maxHeight: showDescription ? '100vh' : '0', overflow: 'hidden', transition: 'max-height 0.5s ease-in-out' }}>
            <Card.Text>{foodPack.node.frontmatter.description[language]}</Card.Text>
          </div>
          <Card.Subtitle onClick={() => setShowDescription(!showDescription)} className="mb-2 price-tag" style={{position:"absolute", bottom:"0", right:"0", borderRadius:"50%", padding:"20px", backgroundColor:"#ff6600", aspectRatio:"1 / 1", display: "flex", boxShadow: "0px 20px 20px -10px black"}}>
            <p style={{margin:"auto", maxWidth:"100px", textAlign:"center", color: "#fff"}}>{foodPack.node.frontmatter.price}</p>
          </Card.Subtitle>
        </Card.Body>
      </Card>
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
              foodPacks.map((foodPack, index) => {
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
                }
              }
            }
          }
        }
      `}
      render={(data) => <FoodPackRoll data={data} language={props.language} t={props.t}/>}
    />
  )
  