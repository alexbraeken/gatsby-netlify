import React, {useState, useRef, useEffect} from 'react'
import { graphql } from 'gatsby'
import {Link, Trans, useTranslation, useI18next} from 'gatsby-plugin-react-i18next';
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

const bedroomSelectStyle = {
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? "#f5821e" : "#fff",
    color: state.isSelected ? '#fff' : '#000',
  }),
  container: () => ({
    margin: "5px auto",
    height: "50px",
    flex: "1 1 10%",
    display: "flex",
    position: "relative",
    minWidth: "200px"
  }),
  
  control: () => ({
    width: "100%",
    height: "50px",
    backgroundColor: "#fff",
    margin: "auto",
    display: "flex",
    borderRadius: "4px"
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

const LANGUAGES = ['en', 'pt']

const WEEKDAYS_LONG = {
  en: [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ],
  pt: [
    'Domigo',
     'Segunda-feira',
     'Terça',
     'Quarta-feira',
     'Quinta-feira',
     'Sexta-feira',
     'Sábado',
  ],
};
const WEEKDAYS_SHORT = {
  en: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
  pt: ['D', '1', '2', '3', '4', '5', 'S'],
};
const MONTHS = {
  en: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],
  pt: [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ],
};

const FIRST_DAY = {
  en: 0,
  pt: 0,
};

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
    const { language } = useI18next()
  
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
        || bedrooms.current.state.value) uri+= "?"
      if(multiselect.current.state.value){
        multiselect.current.state.value.forEach((location)=>{
          uri+="city="+location.value+"&"
        })
      }
      if(dates.from)uri+="from="+dates.from.toISOString()+"&"
      if(dates.to)uri+="to="+dates.to.toISOString()+"&"
      if(bedrooms.current.state.value)uri+="bedrooms="+bedrooms.current.state.value.value+"&"
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

    function formatDay(d, locale = 'en') {

      let loc = LANGUAGES.includes(locale) ? locale : 'en'
      return `${WEEKDAYS_LONG[loc][d.getDay()]}, ${d.getDate()} ${
        MONTHS[loc][d.getMonth()]
      } ${d.getFullYear()}`;
    }
    
    function formatMonthTitle(d, locale = 'en') {
      let loc = LANGUAGES.includes(locale) ? locale : 'en'
      return `${MONTHS[loc][d.getMonth()]} ${d.getFullYear()}`;
    }
    
    function formatWeekdayShort(i, locale = 'en') {
      let loc = LANGUAGES.includes(locale) ? locale : 'en'
      return WEEKDAYS_SHORT[loc][i];
    }
    
    function formatWeekdayLong(i, locale = 'en') {
      let loc = LANGUAGES.includes(locale) ? locale : 'en'
      return WEEKDAYS_SHORT[loc][i];
    }
    
    function getFirstDayOfWeek(locale = 'en') {
      let loc = LANGUAGES.includes(locale) ? locale : 'en'
      return FIRST_DAY[loc];
    }
    
    const localeUtils = {
      formatDay,
      formatMonthTitle,
      formatWeekdayShort,
      formatWeekdayLong,
      getFirstDayOfWeek,
    };

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
              modifiersStyles,
              locale:language,
              localeUtils:localeUtils
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
                locale:language,
                localeUtils:localeUtils
              }}
              onDayChange={handleToChange}
              style={{height:"100%", zIndex:"10"}}/>
          </span>
        </div>
        <Select options={[
          {value: 1, label: 1}, 
          {value: 2, label: 2},
          {value: 3, label: 3},
          {value: 4, label: 4},
          {value: 5, label: 5},
          {value: 6, label: 6},
          {value: 7, label: 7},
          {value: 8, label: 8},
          {value: 9, label: 9},
          {value: 10, label: 10},]}
          styles={bedroomSelectStyle}
          closeMenuOnSelect={true}
          ref={bedrooms}
          placeholder={t("Bedrooms")}/>
        
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
