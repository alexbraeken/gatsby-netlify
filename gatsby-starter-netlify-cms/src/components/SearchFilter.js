import React, {useState, useRef, useEffect} from 'react'
import DayPickerInput from 'react-day-picker/DayPickerInput'
import 'react-day-picker/lib/style.css'
import { Helmet } from 'react-helmet'
import Form from 'react-bootstrap/Form'
import { gsap } from "gsap"

import { formatDate, parseDate } from 'react-day-picker/moment'
import SubmitButton from './SubmitButton'
import Select from 'react-select'

const options = [
  { value: 'Tavira Suburb', label: 'Tavira Suburb' },
  { value: 'Tavira Centre', label: 'Tavira Centre' },
  { value: 'Tavira Rural', label: 'Tavira Rural' },
  { value: 'Cabanas de Tavira', label: 'Cabanas de Tavira' },
  { value: 'Vila Nova de Cacela', label: 'Vila Nova de Cacela' },
  { value: 'Castro Marim', label: 'Castro Marim' },
  { value: 'Altura', label: 'Altura' },
  { value: 'Vila Nova de Cacela', label: 'Vila Nova de Cacela' },
  { value: 'Conceição', label: 'Conceição' },
  { value: 'Fuseta', label: 'Fuseta' },
  { value: 'Moncarapacho', label: 'Moncarapacho' },
  { value: 'Santa Rita', label: 'Santa Rita' },
  { value: 'Santa Catarina', label: 'Santa Catarina' },
]

const customStyles = {
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? "#f5821e" : "#fff",
    color: state.isSelected ? '#fff' : '#000',
  }),
  container: () => ({
    margin: "5px auto",
    height: "50px",
    flex: "1 1 25%",
    display: "flex"
  }),
  control: () => ({
    width: "100%",
    height: "50px",
    backgroundColor: "#fff",
    margin: "auto",
    display: "flex",
    borderRadius: "4px"
  }),
  multiValue: (styles) => {
    return {
      ...styles,
      backgroundColor: "#f5821e",
      color: "#fff"
    };
  },
  multiValueLabel: (styles) => ({
    ...styles,
    color: "#fff",
  }),
  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = 'opacity 300ms';

    return { ...provided, opacity, transition };
  }
}

const SearchFilter = (props) => {

    const [dates, setDates] = useState({from:undefined, to: undefined})

    const toRef = useRef(null)
    const searchBar = useRef(null)
    const bedrooms = useRef(null)
    const multiselect = useRef(null)
  

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
      if(multiselect.current.state.value 
        || dates.from
        || dates.to
        || bedrooms.current.value) uri+= "?"
      if(multiselect.current.state.value){
        multiselect.current.state.value.forEach((location)=>{
          uri+="city="+location.value+"&"
        })
      }
      if(dates.from)uri+="from="+dates.from.toISOString()+"&"
      if(dates.to)uri+="to="+dates.to.toISOString()+"&"
      if(bedrooms.current.value)uri+="bedrooms="+bedrooms.current.value+"&"
      uri = encodeURI(uri)
      if(window) window.location.href= uri
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
        multiselectContainer: {
        flex: "1 1 25%",
        margin: "auto",
        height:"50px",
        minWidth: "200px"
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
            fontSize: "1rem"
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
        <Select 
        options={options}
        styles={customStyles}
        isMulti
        closeMenuOnSelect={false}
        ref={multiselect}
        placeholder="Select Locations"/>
        <div className="InputFromTo" style={{display: "flex",
            justifyContent: "center",
            position: "relative",
            margin: "5px auto",
            height:"50px",
            minWidth: "200px"}}>
        <DayPickerInput
          value={from}
          placeholder="Arrival Date"
          format="LL"
          formatDate={formatDate}
          parseDate={parseDate}
          dayPickerProps={{
            selectedDays: [from, { from, to }],
            disabledDays: { after: to },
            toMonth: to,
            numberOfMonths: 2,
            modifiers,
            modifiersStyles
          }}
          onDayChange={handleFromChange}
        style={{height:"100%", zIndex:"10"}}/>
        <span className="InputFromTo-to">
          <DayPickerInput
            ref={toRef}
            value={to}
            placeholder="Departure Date"
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
            style={{height:"100%", zIndex:"10"}}/>
        </span>
        </div>
        <Form.Group className="input-guests">
            <Form.Control as="select" className="home-search-dropdown" style={{height:"100%"}} ref={bedrooms}>
                <option value="">Bedrooms</option>
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
        <div onClick={submitSearch}>
        <SubmitButton text="See What We Have!" />
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
  .DayPickerInput-OverlayWrapper{
    z-index: 100;
  }
`}</style>
        </Helmet>
        </div>
    )
}

export default SearchFilter