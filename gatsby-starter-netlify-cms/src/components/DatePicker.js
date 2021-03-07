import React, {useEffect, useState, useRef} from 'react'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import CalendarModal from '../components/CalendarModal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const DatePicker = (props) => {

    const [dates, setDates] = useState({from:undefined, to: undefined})
    const [showCalendar, setShowCalendar] = useState(false)


    const handleClose = () => setShowCalendar(false);
    const handleShowCalendar = () => setShowCalendar(true);
    
    

    useEffect(() => {
        let from = new Date(props.from)
        let to = new Date(props.to)

        setDates({from:from, to:to})
        return () => {
            setDates({from:undefined, to: undefined})
        }
    }, [])

    useEffect(()=>{
        if(dates.from && dates.to){
            const diffTime = Math.abs(dates.to - dates.from)
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
            props.handleTotalDays(diffDays)
        }   
    },[dates])
   

    return (
        <div className="top-date-picker" style={props.style}>
            <Container>
                <Row>
            <div className="top-date-picker-text" onClick={handleShowCalendar}>
    <small className="text-muted">From {dates.from && dates.from.toLocaleDateString()} - To {dates.to && dates.to.toLocaleDateString()}</small>
    <FontAwesomeIcon icon={faSearch} style={{margin:"auto 5px"}} className="search-icon"/>
            </div>
            </Row>
        </Container>
        <CalendarModal show={showCalendar} handleClose={handleClose} dates={dates} setDates={setDates} handleNewIds={props.handleNewIds} />
        </div>
    )
}

export default DatePicker