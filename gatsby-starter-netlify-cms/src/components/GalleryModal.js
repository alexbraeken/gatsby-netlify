import React, {useState, useEffect} from 'react'
import Loading from '../components/Loading';
import { Modal } from 'react-bootstrap'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { gsap } from "gsap";

const GalleryModal = (props) => {

  const img = React.createRef();
  const srcImg = React.createRef();

  const [focusImg, setFocusImg] = useState(null);
  const [coords, setCoords ] = useState({width:0, height:0, x:0, y:0});


  useEffect(() => {
    if(focusImg){
      gsap.fromTo(img.current, {x:coords.x, y:coords.y, width:coords.width, height:coords.height, opacity:0.1}, { width:"100%", height:"unset", opacity:1, duration: 0.7, ease:"ease-in"})
    }
    return () => {
    }
  }, [img, coords, focusImg])

  const handleClick = (src) => {
    setCoords(calculatePosition(srcImg))
    setFocusImg(src);
  }

  const calculatePosition = (element) => {
    var root  = document.documentElement;
    var body  = document.body;
    
    var rect = element.current.getBoundingClientRect();
    
    var scrollTop  = window ? window.pageYOffset: false || root.scrollTop  || body.scrollTop  || 0;
    var scrollLeft = window ? window.pageXOffset: false || root.scrollLeft || body.scrollLeft || 0;
    
    var clientTop  = root.clientTop  || body.clientTop  || 0;
    var clientLeft = root.clientLeft || body.clientLeft || 0;
      
    return {
      top: Math.round(rect.top + scrollTop - clientTop),
      left: Math.round(rect.left + scrollLeft - clientLeft),
      height: rect.height,
      width: rect.width,
    };
  }

    return (
        <Modal show={props.show} onHide={props.handleClose} centered dialogClassName="modal-90w">
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
    <Modal.Body>{props.photos ? 
      <Row>{!!focusImg ? 
      <img src={focusImg} tabindex="0" alt="Featured" ref={img} onClick={()=>setFocusImg(null)} onKeyDown={(e)=>{if(e.key="Enter"){setFocusImg(null)}}} /> 
      :
        <>
          {props.photos.map((photo, index)=> (
            <Col lg={3} md={4} key={index} >
              <div className="gallery-modal--close" style={{display:"none"}}></div>
              <a href="#" className="d-block mb-4 h-100">
                <div ref={srcImg}>
                  <img className="img-fluid img-thumbnail" tabindex="0" src={photo.url} alt="" onClick={()=>handleClick(photo.url)} onKeyDown={(e)=>{if(e.key="Enter"){handleClick(photo.url)}}} />
                </div>
              </a>
            </Col>
          ))
          }
        </>
        } 
      </Row>: <Loading />}</Modal.Body>
      </Modal>
    )
}

export default GalleryModal