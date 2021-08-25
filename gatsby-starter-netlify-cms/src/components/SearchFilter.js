import React, {useState, useRef, useEffect} from 'react'
import { graphql } from 'gatsby'
import {Link, Trans, useTranslation} from 'gatsby-plugin-react-i18next';
import DayPickerInput from 'react-day-picker/DayPickerInput'
import 'react-day-picker/lib/style.css'
import { Helmet } from 'react-helmet'
import Form from 'react-bootstrap/Form'
import { gsap } from "gsap"

import { formatDate, parseDate } from 'react-day-picker/moment'
import SubmitButton from './SubmitButton'
import Select from 'react-select'
import { FirestoreDocument } from '@react-firebase/firestore'

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
  menu: () => ({
    position: "absolute",
    top: "55px",
    left: "0",
    zIndex: "20",
    width: "100%"

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
  },
  placeholder: (styles) => {
    return{
      ...styles,
      color: "#495057;"
    }
  }
}

const SearchFilter = (props) => {

    const [dates, setDates] = useState({from:undefined, to: undefined})
    const [datesWidth, setDatesWidth] = useState("500px")
    const [locationArray, setLocationArray] = useState([]);
    const [locationData, setLocationData] = useState(null);

    const toRef = useRef(null)
    const searchBar = useRef(null)
    const bedrooms = useRef(null)
    const multiselect = useRef(null)
    const fromToContainer = useRef(null)

    const {t} = useTranslation();
  
    useEffect(() => {
      setDatesWidth(fromToContainer.current.clientWidth)
      return () => {
        setDatesWidth("500px")
      }
    }, [])



    useEffect(() => {
        gsap.fromTo(searchBar.current, 1, {opacity:0, y: -200}, {opacity: 1, y: 0, ease:"power4.out", delay: 4})
        return () => {
        }
    }, [searchBar])


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

    useEffect(() => {

      let locations = []
      if(locationData?.length > 0){
        locationData.forEach((location, index) => {
          locations.push({ value: location, label: location })
        })
        setLocationArray(locations)
      }
      
      return () => {
        setLocationArray([])
      }

    }, [locationData])



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
          <FirestoreDocument path="/Navbar/Nav">
            {d => {
                    return (!d.isLoading && d.value) ?  
                    <>{setLocationData(d.value.Locations)}</> 
                    : 
                    null
                  }
            }
          </FirestoreDocument>
          <Select 
          options={locationArray}
          styles={customStyles}
          isMulti
          closeMenuOnSelect={false}
          ref={multiselect}
          placeholder={t('Select Locations')}/>
          <div className="InputFromTo" style={{display: "flex",
              justifyContent: "center",
              position: "relative",
              margin: "5px auto",
              height:"50px",
              minWidth: "200px"}}
              ref={fromToContainer}>
          <DayPickerInput
            value={from}
            placeholder={t('Arrival Date')}
            format="LL"
            formatDate={formatDate}
            parseDate={parseDate}
            dayPickerProps={{
              selectedDays: [from, { from, to }],
              disabledDays: [{before: new Date()},{ after: to }],
              toMonth: to,
              numberOfMonths: 2,
              onDayClick: () => toRef.current.getInput().focus(),
              modifiers,
              modifiersStyles
            }}
            onDayChange={handleFromChange}
          style={{height:"100%", zIndex:"10"}}/>
          <span className="InputFromTo-to">
            <DayPickerInput
              ref={toRef}
              value={to}
              placeholder={t("Departure Date")}
              format="LL"
              formatDate={formatDate}
              parseDate={parseDate}
              dayPickerProps={{
                selectedDays: [from, { from, to }],
                disabledDays: { before: from || new Date() },
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
                <option value="">{t("Bedrooms")}</option>
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
        <div role="button" tabindex="0" onClick={submitSearch} onKeyDown={(e)=>{if(e.key==="Enter"){submitSearch()}}}>
        <SubmitButton text={t("See What We Have!")}/>
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
    display: flex;
    flex-wrap: nowrap;
    width: ${datesWidth}px;
    max-width: 550px;
    border-radius: 5px;
  }

  .InputFromTo-to .DayPickerInput-Overlay {
    right: 0;
    left: auto;
  }

  .DayPicker{
    width: 100%;
    font-size: 0.8rem;
  }
  .DayPicker-wrapper{
    max-width: 100%;
  }
  .DayPickerInput-OverlayWrapper{
    z-index: 100;
  }
  .DayPicker-Months {
    max-width: 100%;
    display: flex;
  }
  .DayPicker-Month {
    flex: 1 1 40%;
    min-width: 150px;
    width: calc(${datesWidth/2}px - 2em);
    max-width: 230px;
  }
`}</style>
        </Helmet>
        </div>
    )
}

export default SearchFilter
