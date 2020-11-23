import React, {useState, useRef, useEffect} from 'react'
import { Multiselect } from 'multiselect-react-dropdown'
import DayPickerInput from 'react-day-picker/DayPickerInput'
import 'react-day-picker/lib/style.css'
import { Helmet } from 'react-helmet'
import Form from 'react-bootstrap/Form'
import { gsap } from "gsap"

import { formatDate, parseDate } from 'react-day-picker/moment'

const SearchFilter = (props) => {

    const [dates, setDates] = useState({from:undefined, to: undefined})

    const toRef = useRef(null)
    const searchBar = useRef(null)
    const multiselect = useRef(null)
    const guests = useRef(null)

  

    useEffect(() => {
        gsap.fromTo(searchBar.current, 1, {opacity:0, y: -200}, {opacity: 1, y: 0, ease:"power4.out", delay: 4})
        return () => {
        }
    }, [searchBar])

    const searchOnSelect = () =>{
      
    }
    
    const searchOnRemove = () => {
      
    }


    const submitSearch = () => {
      
      let uri = "/properties"

      if(multiselect.current.state.selectedValues.length>0 || dates.from || dates.to || guests.current.value) uri+="?"
      console.log(multiselect.current.state.selectedValues)
      if(multiselect.current.state.selectedValues.length>0){
        multiselect.current.state.selectedValues.forEach(city=>{uri+="city="+city.name+"&"})
      }
      if(dates.from)uri+="from="+dates.from.toISOString()+"&"
      if(dates.to)uri+="to="+dates.to.toISOString()+"&"
      if(guests.current.value)uri+="guests="+guests.current.value+"&"
      uri = encodeURI(uri)
      window.location.href= uri
    }


    const showFromMonth = () => {
        const { from, to } = dates;
        if (!from) {
          return;
        }
        if ((to.getFullYear()-from.getFullYear()*12)+(to.getMonth()-from.getMonth()) < 2) {
          toRef.current.getDayPicker().showMonth(from);
        }
      }
    
    const handleFromChange = (from) => {
        console.log(from)
        if(dates.to)
        setDates({ from: from, to: dates.to });
        else
        setDates({from:from, to:undefined})
      }
    
    useEffect(() => {
        showFromMonth()
    }, [dates.to])

    const handleToChange = (to) => {
        if(dates.from)
        setDates({ from: dates.from, to: to });
        else
        setDates({from:undefined, to:to})
      }

    const { from, to } = dates;
    const modifiers = { start: from, end: to };


    const styles = {
        multiselectContainer: { flex: "1 1 25%",
        margin: "auto",
        height:"100%"
        },
        searchBox: { 
          border: "none",
          fontSize: "10px",
          minHeight: "50px",
          background: "#fff",
          display: "flex",
          cursor: "pointer"
        },
        inputField: { 
            margin: "5px",
            fontSize: "1.2rem"
        },
        chips: { 
          background: "#f5821e",
          margin: "auto 5px"
        },
        optionContainer: { 
          border: "1px solid",
          background: "#fff"
        },
        option: { 
          color: "#000"
        }
      }

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
        <div className="home-search-container" ref={searchBar}>
        <Multiselect
                    options={[
                      {name:"Tavira", id:0}, 
                      {name: "Faro", id:1}, 
                      {name: "Cabanas de Tavira", id: 2},
                      {name: "Castro Marim", id: 3},
                      {name: "Altura", id: 4},
                      {name: "Vila Nova de Cacela", id: 5},
                      {name: "Conceição", id: 6},
                      {name: "Fuseta", id: 7},
                      {name: "Moncarapacho", id: 8}]} 
                    onSelect={searchOnSelect} 
                    onRemove={searchOnRemove} 
                    displayValue="name" 
                    avoidHighlightFirstOption={true}
                    style={styles}
                    placeholder="Choose A Destination"
                    ref={multiselect}/>
        <div className="InputFromTo" style={{display: "flex",
            flex: "1 1 20%",
            justifyContent: "center",
            position: "relative",
            margin: "auto",height:"100%"}}>
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
        style={{height:"100%"}}/>
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
            style={{height:"100%"}}/>
        </span>
        </div>
        <Form.Group className="input-guests">
            <Form.Control as="select" className="home-search-dropdown" style={{height:"100%"}} ref={guests}>
                <option value="">Guests</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
            </Form.Control>
        </Form.Group>
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
    )
}

export default SearchFilter