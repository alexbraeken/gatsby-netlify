import React, {useEffect, useState, useRef} from 'react'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import CalendarModal from '../components/CalendarModal'

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

   

    return (
        <div className="top-date-picker" >
            <Container>
                <Row>
            <div className="top-date-picker-text" onClick={handleShowCalendar}>
    <small className="text-muted">From {dates.from && dates.from.toLocaleDateString()}- To {dates.to && dates.to.toLocaleDateString()}</small>
            </div>
            </Row>
        </Container>
        <CalendarModal show={showCalendar} handleClose={handleClose} dates={dates} setDates={setDates} handleNewIds={props.handleNewIds}/>
        </div>
    )
}

export default DatePicker