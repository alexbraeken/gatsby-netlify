import React from 'react'
import { Modal} from 'react-bootstrap'
import {useTranslation, useI18next} from 'gatsby-plugin-react-i18next';

const WinterLetInfoModal = (props) => {
    

    const {t} = useTranslation(['translation']);

    return(
        <Modal show={props.show} onHide={props.handleClose} centered dialogClassName="modal-container always-top">
            <Modal.Header closeButton style={{background: "#3f3f3f"}}>
                <Modal.Title style={{display: "flex", flexWrap:"nowrap"}}>
              <div style={{
                height:"50px", 
                width:"50px", 
                borderRadius:"50%", 
                backgroundImage:`url('${props.img}')`, 
                backgroundPosition:"center", 
                backgroundSize:"cover",
                margin: "auto 20px auto auto",
                flex: "0 0 50px"}}>
              </div>
              <div className="orangeText" style={{margin: "auto"}}>
                {props.propName} {t("Winter Let Info")}:
              </div>
              <div className="modal close modal-content modal-header enquiry-modal" style={{display: "none"}}>
              </div>
          </Modal.Title>
            </Modal.Header> 
            <Modal.Body>
                <p>{t("Winter Let Discount Paragraph pre price")}<b>{props.price}</b>{t("Winter Let Discount Paragraph post price")}
                    <br />
                    <small>
                    {t("Winter Let Discount Paragraph asterisk")}</small>
                </p>
            </Modal.Body>
        </Modal>
    )
}

export default WinterLetInfoModal