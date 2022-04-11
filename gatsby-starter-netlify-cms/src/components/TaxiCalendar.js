import React, {useState, useEffect} from 'react'
import DayPicker, { DateUtils } from 'react-day-picker';
import {Link, Trans, useTranslation, useI18next} from 'gatsby-plugin-react-i18next';
import { Helmet } from 'react-helmet'
import 'react-day-picker/lib/style.css';
import TaxiEnquiryModal from './TaxiEnquiryModal.js'

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





//Calendar Widget in Property page
const TaxiCalendar = (props) => {

    const [selectedDay, setSelectedDay] = useState(null);
    const [total, setTotal] = useState(0)
    const [showModal, setShowModal] = useState(false)

    const {t} = useTranslation(['translation']);
    const { language } = useI18next()
    
    const handleDayClick = (day, modifiers = {}) => {

      if(modifiers.disabledDays || modifiers.disabled){
        return;
      }
      if(day.valueOf() === selectedDay){
        handleResetClick();
        return;
      }
      setSelectedDay(day)
    }
    

    const handleResetClick =() => {
      setSelectedDay(null);
      }

    const handleBook = () => {
        setShowModal(true)
    }

    const handleClose = () => {
        setShowModal(false)
    }

    const modifiers = {
      selected: selectedDay
    };

    const modifiersStyles = {
        disabledDays : {
            backgroundColor: '#dedcdc',
            color: '#fff',
            fontSize: '75%'
        },
        selected: {
          backgroundColor: '#ff6600',
          color: '#fff',
          fontWeight: "bold"
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

    const today = new Date()
    let limitDate = DateUtils.addMonths(today, 24)

    const renderDay = (day) => {

        //check if more than 1 year
        const dateStyle = {
          position: 'absolute',
          top: 0,
          right: 0,
          fontSize: 10,
        };
        const priceStyle = { 
          fontSize: '0.8em', 
          fontWeight: 'bold', 
          textAlign: 'left', 
          position: 'absolute', 
          bottom: '0', 
          left: '0' 
        };
        const cellStyle = {
          height: 30,
          width: 30,
          position: 'relative',
          margin: 'auto',
        };
        return (
          <div style={cellStyle} data-price={props.price}>
            <div className={`cell-date`} style={dateStyle}>{day.getDate()}</div>
                <div style={priceStyle}>
                  {props.price}€
                </div>
                
          </div>
        );
    }

    return (
        <>
        <div style={{display: "flex", flexWrap:"wrap"}}>
          <div style={{display: "flex", margin: "auto auto auto 0", minWidth:"300px"}}>
          {!selectedDay&& <span style={{margin:"auto 0"}}>{t("Select day")}.</span>}
          {selectedDay &&
          <span style={{margin:"auto 0"}}>
            <br />
            <small>{t("Selected")} {selectedDay.toLocaleDateString()}</small></span>}
          </div>
          {selectedDay && (
            <div style={{display: "flex", flexWrap:"nowrap", minWidth:"200px"}}>
              <button className="calendar-btn main" onClick={handleBook}>
              {t("Get a Quote")}
              </button>
              
              <button className="calendar-btn clear" onClick={handleResetClick}>
              {t("Clear")}
              </button>
            </div>
          )}

        </div>
            <DayPicker
            className="Range"
            numberOfMonths= {1}
            mode="single"
            initialMonth={new Date(today.getFullYear(), today.getMonth())}
            disabledDays={[
                {before: new Date(),
                after: limitDate}
            ]}
            modifiersStyles={modifiersStyles}
            selected={selectedDay}
            onSelect={setSelectedDay}
            onDayClick={handleDayClick}
            renderDay={renderDay}
            locale={language} 
            localeUtils={localeUtils}
            modifiers={modifiers}
            modifiersClassNames={{
              selected: 'day-selected',
            }}
            />
            <TaxiEnquiryModal show={showModal} handleClose={handleClose} price={props.price} date={selectedDay?.toLocaleDateString()} />

      <Helmet>
      <style>{`
      .DayPicker-Day--selected:not(.DayPicker-Day--start):not(.DayPicker-Day--end):not(.DayPicker-Day--outside) .cell-date {
          color: #000;
        }

.Range .cell-date{
  color: #ff6600
}

.Range .DayPicker-Day--start .cell-date, .Range .DayPicker-Day--end .cell-date{
  color: #000
}

.DayPicker-Caption{
color: #ff6600;
}

.DayPicker{
    width: 100%;
}
`}</style>
    </Helmet>
    </>
    )
}

export default TaxiCalendar