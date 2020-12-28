import React, {useState} from 'react'
import Carousel from 'react-bootstrap/Carousel'
import BedBathPax from '../components/BedBathPax'
import { Link, graphql, StaticQuery } from 'gatsby'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

class CustomSlide extends React.Component {
    render() {
      
      return (
        <div style={{backgroundImage: `url(${this.props.slide.frontmatter.featuredimage.childImageSharp.fluid.src})`,
        minHeight: "400px",
        height: "50vh",
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
                <h2 className="slide__text-heading">{this.props.slide.frontmatter.title}</h2>
                <p className="slide__text-desc">{this.props.slide.frontmatter.description}</p>
                <a className="slide__text-link" href={this.props.slide.frontmatter.link}>{this.props.slide.frontmatter.visibleLink}</a></div>
                </div>
          <h3></h3>
      <p></p>
        </div>
      );
    }
  }

const AlgarveCarousel = (props) => {

    const { data } = props
    const { edges: algarveSlides } = data.allMarkdownRemark

    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
      };

    const nextIcon = <span aria-hidden="true" className="carousel-control-next-icon feature-next-icon" />
    const prevIcon = <span aria-hidden="true" className="carousel-control-prev-icon feature-prev-icon" />

    return (
        <Carousel activeIndex={index} onSelect={handleSelect} indicators={false}>
             {algarveSlides &&
          algarveSlides.map(({ node: slide }, index) => {
                return<Carousel.Item key={index}>
                    <Row>
                        <CustomSlide slide={slide} key={index}/>
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
            sort: { order: DESC, fields: [frontmatter___date] }
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
                  description
                  link
                  visibleLink  
                  templateKey
                  date(formatString: "MMMM DD, YYYY")
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