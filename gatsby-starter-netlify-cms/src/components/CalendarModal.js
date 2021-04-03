import React, {useEffect, useState, useRef} from 'react'
import Loading from '../components/Loading';
import DayPickerInput from 'react-day-picker/DayPickerInput'
import 'react-day-picker/lib/style.css'
import { Helmet } from 'react-helmet'
import { formatDate, parseDate } from 'react-day-picker/moment'
import { Modal, Button } from 'react-bootstrap'

const CalendarModal = (props) => {

    const [dates, setDates] = useState({from: null, to: null});
    const [test, setTest] = useState(null)



    const toRef = useRef(null)

    useEffect(() => {
      setDates(props.dates)
      return () => {
        setDates({from: null, to: null})
      }
    }, [])


    useEffect(() => {
      showFromMonth()
  }, [dates.to])

    const showFromMonth = () => {
        const from = new Date(dates.from)
        const to = new Date(dates.to)

        if (!from) {
          return;
        }
        if (to && ((to.getFullYear()-from.getFullYear()*12)+(to.getMonth()-from.getMonth()) < 2) && toRef.current !== null) {
          toRef.current.getDayPicker().showMonth(from);
        }
      }
    
    const handleFromChange = (fromDate) => {

        if(dates.to){
          setTest('stuff')
          console.log(test)
          setDates({ from: new Date(fromDate), to: dates.to })
          console.log(dates)
        }
        else{
          setDates({from: new Date(fromDate), to:undefined})
          console.log(dates)
        }
      }
    
    

    const handleToChange = (toDate) => {
        if(dates.from)
        setDates({ from: dates.from, to: new Date(toDate) });
        else
        setDates({from:undefined, to:new Date(toDate)})
      }


    const submitSearch = () => {

      props.handleDateChange({to: dates.to.toISOString(), from: dates.from.toISOString()})

        let fromDate = dates.from.toISOString()
        let toDate = dates.to.toISOString()
        const uri = `https://api.hostfully.com/v2/properties?checkInDate=${fromDate}&checkOutDate=${toDate}&limit=100&agencyUid=ab8e3660-1095-4951-bad9-c50e0dc23b6f`
        
        fetch(uri, {
        headers:{
        "X-HOSTFULLY-APIKEY": process.env.GATSBY_HOSTFULLY_API_KEY
            }
        })
                .then(response => {
                    
                    return response.text()
                })
                .then(data => {
                props.handleNewIds(JSON.parse(data).propertiesUids)
                props.handleClose()
                })
    }

    const from = new Date(dates.from)
    const to = new Date(dates.to)
    const modifiers = { start: from, end: to };

      const modifiersStyles = {
        start : {
            backgroundColor: '#ff6600',
            color: '#fff'
        },
        end : {
            backgroundColor: '#ff6600',
            color: '#fff'
        }
    }

    return (
        <Modal show={props.show} onHide={props.handleClose} centered dialogClassName="modal-container">
        <Modal.Header closeButton>
          <Modal.Title>Choose New Dates</Modal.Title>
        </Modal.Header>
    <Modal.Body className="calendar-modal">
        <div className="InputFromTo">
        <DayPickerInput
          value={from}
          placeholder="From"
          format="LL"
          formatDate={formatDate}
          parseDate={parseDate}
          dayPickerProps={{
            selectedDays: [from, { from, to }],
            disabledDays: { after: to },
            toMonth: to,
            numberOfMonths: 2,
            modifiers,
            modifiersStyles,
            onDayClick: () => console.log(toRef.current.getInput().focus())
          }}
          onDayChange={handleFromChange}
        />
        <span className="InputFromTo-to">
          <DayPickerInput
            ref={toRef}
            value={to}
            placeholder="To"
            format="LL"
            formatDate={formatDate}
            parseDate={parseDate}
            dayPickerProps={{
              selectedDays: [from, { from, to }],
              disabledDays: { before: from },
              modifiers,
              modifiersStyles,
              month: from,
              fromMonth: from,
              numberOfMonths: 2,
            }}
            onDayChange={handleToChange}
            />
        </span>
        <Helmet>
          <style>{`
  .InputFromTo .DayPicker-Day--selected:not(.DayPicker-Day--start):not(.DayPicker-Day--end):not(.DayPicker-Day--outside) {
    background-color: #fff0e5 !important;
    color: #000;
  }
  .InputFromTo .DayPicker-Day {
    border-radius: 0 !important;
  }
  .InputFromTo .DayPicker-Day--start {
    border-top-left-radius: 50% !important;
    border-bottom-left-radius: 50% !important;
  }
  .InputFromTo .DayPicker-Day--end {
    border-top-right-radius: 50% !important;
    border-bottom-right-radius: 50% !important;
  }
  .InputFromTo .DayPickerInput-Overlay {
    width: 550px;
  }
  .InputFromTo-to .DayPickerInput-Overlay {
    margin-left: -198px;
  }
`}</style>
        </Helmet>
        </div>
        <br />
        <div className="submit-search-btn" onClick={submitSearch}>
            <a>
                <svg className="icon-arrow before">
                    <use xlinkHref="#arrow" />
                </svg>
                <span className="label">See What We Have!</span>
                <svg className="icon-arrow after">
                    <use xlinkHref="#arrow"/>
                </svg>
            </a>
            <svg style={{display: "none"}}>
            <defs>
                <symbol id="arrow" viewBox="0 0 35 15">
                    <title>Arrow</title>
                    <path d="M27.172 5L25 2.828 27.828 0 34.9 7.071l-7.07 7.071L25 11.314 27.314 9H0V5h27.172z "/>
                </symbol>
            </defs>
            </svg>
        </div>
        </Modal.Body>
      </Modal>
    )
}

export default CalendarModal