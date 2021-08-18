import React, {useState, useEffect} from 'react'
import { BsStarFill } from "@react-icons/all-files/bs/BsStarFill";
import { BsStar } from "@react-icons/all-files/bs/BsStar";
import Slider from "react-slick"

export default function Reviews(props) {

    const [slides, setSlides] = useState(null)

    useEffect(() => {
        setSlides(props.reviews)
        return () => {
            setSlides(null)
        }
    }, [])

    useEffect(() => {
        const heights = Array.from(document.getElementsByClassName('review-card')).map(elem => {
            return elem.offsetHeight
        })

        const maxHeight = Math.max(...heights)

        let reviewContainer = document.getElementById('reviews-container')
        let slickList = reviewContainer.querySelectorAll('.slick-list');

        slickList[0].style.height = `${maxHeight+50}px`
        
    }, [slides])

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
        <div className="reviews-container" id="reviews-container">
            <div className="slick-slider slick-track slick-slide"></div>
            <Slider {...settings}>
            {slides?.map((review, index) => (
                <div key={index}>
                    <div className="review-card">
                        <div className="star-rating">
                            {[...Array(5)].map((x, i) =>
                                i+1 > review.rating ? <BsStar key={i} className="review-star"/> : <BsStarFill key={i} className="review-star"/>
                            )}
                        </div>
                        <div className="review-header">
                            <h3>{review.title}</h3> 
                            <small>{review.date}</small>
                            <p>{review.author}</p>
                        </div>
                        <hr />
                        <p>{review.content}</p>  
                    </div>
                </div>
            ))
            }
            </Slider>
        </div>
    )
}
