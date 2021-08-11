import React from 'react'
import { BsStarFill } from "@react-icons/all-files/bs/BsStarFill";
import { BsStar } from "@react-icons/all-files/bs/BsStar";

export default function Reviews(props) {

    return (
        <div className="reviews-container">
        {props.reviews.map((review, index) => {
            return (
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
            )
        })
        }
        </div>
    )
}
