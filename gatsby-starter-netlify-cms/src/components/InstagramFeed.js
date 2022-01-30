import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { graphql, StaticQuery } from 'gatsby'
import Img from "gatsby-image"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fab } from '@fortawesome/free-brands-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
import Slider from "react-slick";

library.add(fab)

class SimpleSlider extends Component {
    constructor(props) {
      super(props)
      this.state = {
        slides : this.props.data
      }
    }
    render() {
      const settings = {
        className: "center",
      centerMode: true,
      infinite: true,
      centerPadding: "10px",
      slidesToShow: 1,
      speed: 500,
      rows: 3,
      slidesPerRow: 3,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              infinite: true,
              rows: 2,
              slidesPerRow: 2,
              dots: true
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              initialSlide: 2,
              rows: 2,
              slidesPerRow: 2,
              dots: false
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              rows: 1,
              slidesPerRow: 1,
              dots: false
            }
          }
        ]
      };
      return (
          <Slider {...settings}>
          {this.state.slides.allInstagramContent.edges.map((post, index)=> {
                return index < 24 ?
                <div key={index}> 
                    <a href={post.node.permalink} target="_blank" rel="noreferrer" className="insta-post">
                        <div className="insta-icon">
                            <FontAwesomeIcon icon={['fab', 'instagram']} />
                        </div>
                        <Img fluid={post.node.localImage?.childImageSharp.fluid} imgStyle={{borderRadius: "5px", margin: "10px", transition:"all 0.3s"}} style={{width: "100%"}}  draggable={false}/>
                    </a>
                </div> 
                    : null
            })}
          </Slider>
      );
    }
  }

const InstagramFeed = (props) => {
    const { data } = props
    return (
        <div className="instagram-feed">
            <SimpleSlider data={data}/>
        </div>
      )
}


InstagramFeed.propTypes = {
    data: PropTypes.shape({
      allMarkdownRemark: PropTypes.shape({
        edges: PropTypes.array,
      }),
    }),
  }

export default () => {
  return(
    <StaticQuery
      query={graphql`
      query InstagramQuery {
        allInstagramContent {
          edges {
            node {
              localImage {
                childImageSharp {
                  fluid(maxWidth: 350, quality: 90) {
                    ...GatsbyImageSharpFluid
                  }
                }
             }
             permalink
          }
        }
      }
    }
    `}
      render={(data, count) => <InstagramFeed data={data} count={count} />}
    />
  )
  }