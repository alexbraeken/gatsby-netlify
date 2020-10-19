import React from 'react'
import Loading from '../components/Loading';
import { Modal, Button } from 'react-bootstrap'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const GalleryModal = (props) => {
/*
  const animateHero = (fromHero, toHero) => {
    
    let clone = fromHero.cloneNode(true);
        
    let from = calculatePosition(fromHero);
    let to = calculatePosition(toHero);
    
    TweenLite.set([fromHero, toHero], { visibility: "hidden" });
    TweenLite.set(clone, { position: "absolute", margin: 0 });
    
    body.appendChild(clone);  
        
    let style = {
      x: to.left - from.left,
      y: to.top - from.top,
      width: to.width,
      height: to.height,
      autoRound: false,
      ease: Power1.easeOut,
      onComplete: onComplete
    };
     
    TweenLite.set(clone, from);  
    TweenLite.to(clone, 0.3, style)
      
    const onComplete = () => {
      
      TweenLite.set(toHero, { visibility: "visible" });
      body.removeChild(clone);
    }
  }
  
  const calculatePosition = (element) => {
      
    let rect = element.getBoundingClientRect();
    
    let scrollTop  = window.pageYOffset || root.scrollTop  || body.scrollTop  || 0;
    let scrollLeft = window.pageXOffset || root.scrollLeft || body.scrollLeft || 0;
    
    let clientTop  = root.clientTop  || body.clientTop  || 0;
    let clientLeft = root.clientLeft || body.clientLeft || 0;
      
    return {
      top: Math.round(rect.top + scrollTop - clientTop),
      left: Math.round(rect.left + scrollLeft - clientLeft),
      height: rect.height,
      width: rect.width,
    };
  }

  https://codepen.io/yasirhaleem/pen/yLyvavQ
    */
    return (
        <Modal show={props.show} onHide={props.handleClose} centered dialogClassName="modal-90w">
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
    <Modal.Body>{props.photos ? 
      <Row>
        {props.photos.map((photo, index)=> (
          <Col lg={3} md={4} key={index}>
            <a href="#" className="d-block mb-4 h-100">
              <img className="img-fluid img-thumbnail" src={photo.url} alt="" alt=""/>
            </a>
          </Col>
        )
        )} 
      </Row>: <Loading />}</Modal.Body>
      </Modal>
    )
}

export default GalleryModal