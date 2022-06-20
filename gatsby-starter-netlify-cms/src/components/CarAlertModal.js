import React from 'react'
import { Modal} from 'react-bootstrap'
import {useTranslation, useI18next} from 'gatsby-plugin-react-i18next';

const CarAlertModal = (props) => {
    

    const {t} = useTranslation(['translation']);

    return(
        <Modal show={props.show} onHide={props.handleClose} centered dialogClassName="modal-container always-top">
            <Modal.Header closeButton>
                <Modal.Title>{t("No Availabilities")}</Modal.Title>
            </Modal.Header> 
            <Modal.Body>
                {t("No Availabilities of any class vehicles till 31st August 2022")}
            </Modal.Body>
        </Modal>
    )
}

export default CarAlertModal