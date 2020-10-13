import React from 'react'
import Loading from '../components/Loading';
import { Modal, Button } from 'react-bootstrap'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const GalleryModal = (props) => {
    
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
            <img className="img-fluid img-thumbnail" src={photo.url} alt="" />
          </a>
        </Col>
      )
      )} 
    </Row>: <Loading />}</Modal.Body>
      </Modal>
    )
}

export default GalleryModal