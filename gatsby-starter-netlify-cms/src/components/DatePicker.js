import React, {useState} from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import CalendarModal from '../components/CalendarModal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

//Date picker to open calendar modal component to change/clear dates on properties page
const DatePicker = (props) => {

    const [showCalendar, setShowCalendar] = useState(false)

    const handleClose = () => setShowCalendar(false);
    const handleShowCalendar = () => setShowCalendar(true);
      

    return (
        <div className="top-date-picker" style={props.style}>
            <div className="top-date-picker-container">
                <svg fill="#fff" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="none" style={{
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
                <div className="top-date-picker-text" onClick={handleShowCalendar}>
        {props.from ?
            <small className="text-muted">From {props.from && new Date(props.from).toLocaleDateString()} - To {props.to && new Date(props.to).toLocaleDateString()}</small>
            :
            <small>Search Dates</small>
        }
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