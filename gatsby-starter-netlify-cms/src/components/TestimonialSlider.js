import React, {Component} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuoteRight } from '@fortawesome/free-solid-svg-icons';
import Slider from "react-slick"
import BackgroundImage from 'gatsby-background-image'

class TestimonialSlider extends Component {
  constructor(props) {
    super(props)
    this.state = {
      slides : this.props.slides
    }
  }
  render() {
    const settings = {
      infinite: true,
      dots: true,
      className: "center",
      centerPadding: "30px",
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      swipeToSlide: true,
      autoplay: false,
      autoplaySpeed: 4000,
    };
    return (
      <div className="testimonial-slider">
        <div className="slick-slider slick-track slick-slide slick-list"></div>
        <Slider {...settings}>
         {this.state.slides.edges?.map((testimonial, index) => (
           <div key={index}>
            <div className="testimonial-container">
            <BackgroundImage
              Tag="div"
              className={"testimonial-img"}
              fluid={testimonial.node.frontmatter.img ? testimonial.node.frontmatter.img.childImageSharp.gatsbyImageData : ''}
              backgroundColor={`#040e18`}
            >
              <div className="testimonial-img-overlay"></div>
            </BackgroundImage>
              <div className="testimonial-text-container">
                <svg fill="#fff" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <polygon points="50,0 100,0 50,100 0,100"></polygon>
                </svg>
                <div className="testimonial-text-box">
                  <div className="testimonial-text">
                  <FontAwesomeIcon icon={faQuoteRight} 
                  style={{position: "relative", 
                  margin:"auto", 
                  height: "10%",
                  width: "10%",
                  minHeight: "20px",
                  minWidth: "20px",
                  maxHeight: "40px",
                  maxWidth: "40px"}}/> <h3>{testimonial.node.frontmatter.author}</h3>
                  <br />
                  <p>{testimonial.node.frontmatter.quote}</p>
        <small>{testimonial.node.frontmatter.location}</small>
                  </div>
                  
                </div>
              </div>
            </div>
          </div>
  ))}
        </Slider>
      </div>
    );
  }
}

export default TestimonialSlider