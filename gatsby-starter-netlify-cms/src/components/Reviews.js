import React, {useState, useEffect} from 'react'
import { BsStarFill } from "@react-icons/all-files/bs/BsStarFill";
import { BsStar } from "@react-icons/all-files/bs/BsStar";
import Masonry from 'react-masonry-component';

export default function Reviews(props) {

    const [slides, setSlides] = useState(null)

    useEffect(() => {
        setSlides(props.reviews)
        return () => {
            setSlides(null)
        }
    }, [])


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
            <Masonry
                className={''} // default ''
                elementType={'div'} // default 'div'
                
                disableImagesLoaded={false} // default false
                updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
                
            >
            {slides?.map((review, index) => (
                    <div className="review-card" key={index}>
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
            ))
            }
            </Masonry>
        </div>
    )
}
