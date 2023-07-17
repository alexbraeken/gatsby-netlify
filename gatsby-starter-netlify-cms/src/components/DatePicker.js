import React, {useState} from 'react'
import {useTranslation} from 'gatsby-plugin-react-i18next';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import CalendarModal from '../components/CalendarModal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faArrowRight } from '@fortawesome/free-solid-svg-icons';

//Date picker to open calendar modal component to change/clear dates on properties page
const DatePicker = (props) => {

    const {t} = useTranslation(['properties', 'translation', 'calendar']);

    return (
        <div className="top-date-picker" style={props.style}>
            <div className="top-date-picker-container">
                <svg fill="#f5821e" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="none" style={{
              width: "100%",
              left: "0",
              top: "0",
              height: "100%",
              position: "absolute",
            }}> 
            <path d="M0 0 a 1 2 180 1 0 100 0"></path> 
            </svg>
                <Container>
                    <Row>
                <div role="button" tabindex="0" aira-label="Pick Dates" className="top-date-picker-text" onClick={()=>props.handleShowCalendar()} onKeyDown={(e)=>{if(e.key === 'Enter'){props.handleShowCalendar(e)}}}>
        {props.from ?
            <small>{props.from && new Date(props.from).toLocaleDateString()}<FontAwesomeIcon icon={faArrowRight} style={{margin:"auto 5px", padding: "2px 0"}} className="search-icon"/>  {props.to && new Date(props.to).toLocaleDateString()}</small>
            :
            <small>{t("Search Dates")}</small>
        }
        <FontAwesomeIcon icon={faSearch} style={{margin:"auto 5px"}} className="search-icon"/>
                </div>
                </Row>
            </Container>
            </div>
        </div>
    )
}

export default DatePicker