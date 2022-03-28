import React, {useEffect, useState, useRef} from 'react'
import DayPickerInput from 'react-day-picker/DayPickerInput'
import {useTranslation, useI18next} from 'gatsby-plugin-react-i18next';
import 'react-day-picker/lib/style.css'
import { Helmet } from 'react-helmet'
import { formatDate, parseDate } from 'react-day-picker/moment'
import { Modal} from 'react-bootstrap'

const LANGUAGES = ['en', 'pt', 'fr', 'es']

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
  fr: [
    'Dimanche',
     'Lundi',
     'Mardi',
     'Mercredi',
     'Jeudi',
     'Vendredi',
     'Samedi',
  ],
  es: [
    'Domingo',
     'Lunes',
     'Martes',
     'Miércoles',
     'Jueves',
     'Viernes',
     'Sábado',
  ]
};
const WEEKDAYS_SHORT = {
  en: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
  pt: ['D', '1', '2', '3', '4', '5', 'S'],
  fr: ['DIM', 'LUN', 'MAR', 'MER', 'JEU', 'VEN', 'SAM'],
  es: ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab']
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
  fr: [
    'Janvier',
    'Février',
    'Mars',
    'Avril',
    'Mai',
    'Juin',
    'Juillet',
    'Août',
    'Septembre',
    'Octobre',
    'Novembre',
    'Décembre',
  ],
  es: [
    'Enero',
     'Febrero',
     'Marzo',
     'Abril',
     'Mayo',
     'Junio',
     'Julio',
     'Agosto',
     'Septiembre',
     'Octubre',
     'Noviembre',
     'Diciembre',
  ]
};

const FIRST_DAY = {
  en: 0,
  pt: 0,
  fr: 0,
  es: 0
};

//Calendar Modal on properties page to change/clear dates and update results
const CalendarModal = (props) => {

    const [dates, setDates] = useState({from: null, to: null});
    const [message, setMessage ] = useState(null)
    const [datesWidth, setDatesWidth] = useState("500px")



    const toRef = useRef(null)
    const fromToContainer = useRef(null)

    const {t} = useTranslation(['properties', 'translation', 'calendar']);
    const { language } = useI18next()

    //Set default dates from props
    useEffect(() => {
      if(props.dates.to & props.dates.from){
        setDates(props.dates)
      }

      if(fromToContainer.current)setDatesWidth(fromToContainer.current.clientWidth)

      return () => {
        setDates({from: null, to: null})
        setDatesWidth("500px")
      }
    }, [])

  //Show from month if 'to' date changes
    useEffect(() => {
      if(dates.to)showFromMonth()
  }, [dates.to])

  //Message
    useEffect(() => {
      const timeout = setTimeout(()=>setMessage(null), 4000)

      return () => clearTimeout(timeout);
    }, [message])


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
          setDates({ from: new Date(fromDate), to: dates.to })
        }
        else{
          setDates({from: new Date(fromDate), to:undefined})
        }
      }
    
    

    const handleToChange = (toDate) => {
        if(dates.from)
        setDates({ from: dates.from, to: new Date(toDate) });
        else
        setDates({from:undefined, to:new Date(toDate)})
      }
    
    const handleClear = () => {
      setDates({from: null, to: null})
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


    const submitSearch = () => {

      if(dates.to && dates.from){
        const dateTo = typeof dates.to !== 'string' ?  dates.to.toISOString() : dates.to
        const dateFrom = typeof dates.from !== 'string' ?  dates.from.toISOString() : dates.from
  
        props.handleDateChange({to: dateTo, from: dateFrom})
  
          const uri = `https://api.hostfully.com/v2/properties?checkInDate=${dateFrom}&checkOutDate=${dateTo}&limit=100&agencyUid=ab8e3660-1095-4951-bad9-c50e0dc23b6f`
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
      else{
        setMessage("Select Dates")
      } 
    }

    const from = dates.from
    const to = dates.to
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
        <Modal show={props.show} onHide={props.handleClose} centered dialogClassName="modal-container always-top">
        <Modal.Header closeButton>
          <Modal.Title>{t("Choose New Dates")}</Modal.Title>
        </Modal.Header>
    <Modal.Body className="calendar-modal">
        <div className="InputFromTo" style={{display: "flex",
              justifyContent: "center",
              position: "relative",
              margin: "5px auto",
              height:"50px",
              minWidth: "200px"}}
              ref={fromToContainer}>
        <DayPickerInput
          value={from}
          placeholder={t("From")}
          format="LL"
          formatDate={formatDate}
          parseDate={parseDate}
          dayPickerProps={{
            selectedDays: [from, { from, to }],
            disabledDays: [{before: new Date()},{ after: to }],
            toMonth: to,
            numberOfMonths: 2,
            modifiers,
            modifiersStyles,
            locale:language,
            localeUtils:localeUtils
          }}
          onDayChange={handleFromChange}
        />
        <span className="InputFromTo-to">
          <DayPickerInput
            ref={toRef}
            value={to}
            placeholder={t("To")}
            format="LL"
            formatDate={formatDate}
            parseDate={parseDate}
            dayPickerProps={{
              selectedDays: [from, { from, to }],
              disabledDays: { before: from },
              modifiers,
              modifiersStyles,
              month: from || new Date(),
              fromMonth: from || new Date(),
              numberOfMonths: 2,
              locale:language,
              localeUtils:localeUtils
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
        <br />
        {message && 
        <>
          <span className="min-warning visible" style={{minWidth: "100%"}}>{t("Select Dates")}</span>
          <br /> 
        </>
        }
        <div className="new-date-btn-container">
        <div role="button" tabindex="0" aria-label="Submit Search" className="submit-search-btn" onClick={submitSearch} onKeyDown={(e)=>{if(e.key === 'Enter'){submitSearch()}}}>
            <a>
                <svg className="icon-arrow before">
                    <use xlinkHref="#arrow" />
                </svg>
                <span className="label">{t("See What We Have!")}</span>
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
        <div role="button" tabindex="0" aria-label="Clear Search" className="submit-search-btn" onClick={()=>{handleClear(); props.handleClose(); props.handleClearDates();}} onKeyDown={(e)=>{if(e.key === 'Enter'){handleClear(); props.handleClose(); props.handleClearDates()}}}>
            <a style={{background:"#3F3F3F", color:"#f5821e", borderColor:"#f5821e"}}>
                <svg className="icon-arrow before" style={{fill: "#f5821e"}}>
                    <use xlinkHref="#arrow" />
                </svg>
                <span className="label" style={{ color:"#f5821e"}}>{t("Clear Dates")}</span>
                <svg className="icon-arrow after" style={{fill: "#f5821e"}}>
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
        </div>
        <div className="always-top" style={{display:"none"}}></div>
        </Modal.Body>
      </Modal>
    )
}

export default CalendarModal