import React, {useEffect, useState, useRef} from 'react'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import CalendarModal from '../components/CalendarModal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const DatePicker = (props) => {

    const [showCalendar, setShowCalendar] = useState(false)

    const handleClose = () => setShowCalendar(false);
    const handleShowCalendar = () => setShowCalendar(true);
      

    return (
        <div className="top-date-picker" style={props.style}>
            <div className="top-date-picker-container">
                <Container>
                    <Row>
                <div className="top-date-picker-text" onClick={handleShowCalendar}>
        <small className="text-muted">From {props.from && new Date(props.from).toLocaleDateString()} - To {props.to && new Date(props.to).toLocaleDateString()}</small>
        <FontAwesomeIcon icon={faSearch} style={{margin:"auto 5px"}} className="search-icon"/>
                </div>
                </Row>
            </Container>
            <CalendarModal show={showCalendar} handleClose={handleClose} dates={{from: props.from, to: props.to}} handleDateChange={props.handleDateChange} handleNewIds={props.handleNewIds} handleClearDates={props.handleClearDates}/>
            </div>
        </div>
    )
}

export default DatePicker