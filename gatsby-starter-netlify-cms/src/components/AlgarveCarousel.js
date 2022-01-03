import React, {useState} from 'react'
import {Link, Trans, useTranslation, useI18next} from 'gatsby-plugin-react-i18next';
import Carousel from 'react-bootstrap/Carousel'
import { graphql, StaticQuery } from 'gatsby'
import Row from 'react-bootstrap/Row'

class CustomSlide extends React.Component {
    render() {
      
      return (
        <div style={{backgroundImage: `url(${this.props.slide.frontmatter.featuredimage.childImageSharp.fluid.src})`,
        minHeight: "400px",
        height: "70vh",
        width:"100vw",
        margin: "0px auto",
        overflow: "hidden",
        position: "relative",
        backgroundSize:"cover",
        backgroundPosition:"center",
        padding: "40px"}}>
            <div className="slide__content">
                <svg className="slide__overlay" preserveAspectRatio="xMaxYMax slice" viewBox="0 0 720 405"> 
                <path className="slide__overlay-path" d="M0,0 150,0 500,405 0,405"></path> 
                </svg>
                <div className="slide__text">
                <h2 className="slide__text-heading">{this.props.slide.frontmatter.langTitles[this.props.lang]}</h2>
                <p className="slide__text-desc">{this.props.slide.frontmatter.description[this.props.lang]}</p>
                <a className="slide__text-link" href={this.props.slide.frontmatter.link}>{this.props.slide.frontmatter.visibleLink}</a></div>
                </div>
        </div>
      );
    }
  }

const AlgarveCarousel = (props) => {

    const { data } = props
    const { edges: algarveSlides } = data.allMarkdownRemark
    
    const {language} = useI18next();

    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
      };


    return (
        <Carousel activeIndex={index} onSelect={handleSelect} indicators={false}>
             {algarveSlides &&
          algarveSlides.map(({ node: slide }, index) => {
                return<Carousel.Item key={index}>
                    <Row>
                        <CustomSlide slide={slide} key={index} lang={language}/>
                    </Row>
        </Carousel.Item>
            })}
        </Carousel>
    )
}

export default () => (
    <StaticQuery
      query={graphql`
        query AlgarveCarouselQuery {
          allMarkdownRemark(
            sort: { order: DESC, fields: [frontmatter___title] }
            filter: { frontmatter: { templateKey: { eq: "algarve-slide" } } }
          ) {
            edges {
              node {
                id
                fields {
                  slug
                }
                frontmatter {
                  title 
                  langTitles{
                    en
                    pt
                    fr
                    es
                  }
                  description{
                    en
                    pt
                    fr
                    es
                  }
                  link
                  visibleLink  
                  templateKey
                  featuredimage {
                    childImageSharp{
                      fluid{
                        src
                      }
                    }
                    publicURL
                  }
                }
              }
            }
          }
        }
      `}
      render={(data, count) => <AlgarveCarousel data={data} count={count} />}
    />
  )