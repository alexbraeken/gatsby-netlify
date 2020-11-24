import React, {useState} from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "@reach/router";
import { Container } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import ReactBnbGallery from 'react-bnb-gallery';

class CustomSlide extends React.Component {
    render() {
      
      return (
        <div style={{backgroundImage: `url(${this.props.backgroundImage})`,
        height: "70vmin",
        margin: "0px auto",
        overflow: "hidden",
        position: "relative",
        backgroundSize:"cover",
        backgroundPosition:"center"}} 
        key={this.props.key? this.props.key : 0}>
          <h3></h3>
        </div>
      );
    }
  }


const PropCarousel = (props) => {

  const [isOpen, setIsOpen] = useState(false);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

      return (
        <>
        <ReactBnbGallery
          show={isOpen}
          photos={props.photos.map((photo,index)=>{return(photo.url)})}
          onClose={() => setIsOpen(false)}
        />
        <Slider {...settings} style={{position:"relative"}}>
            <CustomSlide backgroundImage={props.firstSlide} />
            {props.photos ? props.photos.map((photo, index)=> (
                <CustomSlide backgroundImage={photo.url} key={index} />
            )): null}
        </Slider>
        {props.photos ? 
          <div style={{position:"absolute",height:"100%",width:"100%"}}>
            <Container>
              <Button onClick={() => setIsOpen(true)}
              style={{position:"absolute", bottom:"2rem", right:"0", backgroundColor:"#000"}}>Gallery</Button>
            </Container>
          </div> : null }
        </>
      );
}

export default PropCarousel