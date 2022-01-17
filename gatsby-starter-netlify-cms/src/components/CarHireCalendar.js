import React, {useState, useEffect} from 'react'
import DayPicker, { DateUtils } from 'react-day-picker';
import {Link, Trans, useTranslation, useI18next} from 'gatsby-plugin-react-i18next';
import { Helmet } from 'react-helmet'
import 'react-day-picker/lib/style.css';
import CarEnquiryModal from '../components/CarEnquiryModal'

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
    'Peut',
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
const CarHireCalendar = (props) => {

    const [range, setRange] = useState({
        from: undefined,
        to: undefined,
      });
    const [startMonthYear, setStartMonthYear] = useState({startYear: null, startMonth: null})
    const [pricingPeriods, setPricingPeriods] = useState({})
    const [total, setTotal] = useState(0)
    const [showModal, setShowModal] = useState(false)

    const {t} = useTranslation(['translation']);
    const { language } = useI18next()
    
    useEffect(() => {
        /*if(props.dates.from && props.dates.to){
          setRange({from:new Date(props.dates.from), to:new Date(props.dates.to), enteredTo: new Date(props.dates.to)})
          setStartMonthYear({startYear: new Date(props.dates.from).getFullYear(), startMonth: new Date(props.dates.from).getMonth()})
        }else{
          
        }*/
        setStartMonthYear({startYear: new Date().getFullYear(), startMonth: new Date().getMonth()})


        return function cleanup(){
            setRange(getInitialState)
        }
    }, [props.pricingPeriods])

    useEffect(() => {

    }, [pricingPeriods])


    const getInitialState = () => {
        return {
          from: undefined,
          to: undefined,
        };
      }

    const  isSelectingFirstDay = (from, to, day) => {
      const isBeforeFirstDay = from && DateUtils.isDayBefore(day, from);
      const isRangeSelected = from && to;
      return !from || isBeforeFirstDay || isRangeSelected;
    }
    
    const handleDayClick = (day, modifiers = {}) => {
      const { from, to } = range;

      if(modifiers.disabledDays || modifiers.disabled){
        return;
      }


      if (from && to && day >= from && day <= to) {
        handleResetClick();
        return;
      }
      if (isSelectingFirstDay(from, to, day)) {
        if(day)
        setRange({
          from: day,
          to: null,
          enteredTo: null,
        });
      } else {
        if(day.valueOf() === from.valueOf()){
          handleResetClick();
          return;
        }
  
        setRange({
          from: from,
          to: day,
          enteredTo: day,
        });
      }
    }

    useEffect(() => {
        
        let count = 0;
        let selected = document.getElementsByClassName("DayPicker-Day--selected")
        if(selected.length > 0){
            for (const el of selected) {
                if(el.firstChild)count += parseInt(el.firstChild.getAttribute("data-price"))
              }
        }
        setTotal(count)

        return () => {
            setTotal(0)
        }
    }, [range])

    const handleDayMouseEnter = (day) => {
      const { from, to } = range

      if (!isSelectingFirstDay(from, to, day)) {
        setRange({
          from: from,
          to: to,
          enteredTo: day,
        });
      }
    }
    

    const handleResetClick =() => {
        setRange(getInitialState());
      }

    const handleBook = () => {
        setShowModal(true)
    }

    const handleClose = () => {
        setShowModal(false)
    }


    const from = range.from;
    const to = range.to;
    const enteredTo = range.enteredTo
    const modifiers = {start: from, end: enteredTo};
    const modifiersStyles = {
        disabledDays : {
            backgroundColor: '#dedcdc',
            color: '#fff'
        },
        start : {
          backgroundColor: '#ff6600',
          color: '#fff'
        },
        end : {
          backgroundColor: '#ff6600',
          color: '#fff'
        },
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
    let nextYear = DateUtils.addMonths(today, 12)
    let limitDate = DateUtils.addMonths(today, 24)

    const renderDay = (day, modifiers) => {
        const dateDay = day.getDate()
        const dateMonth = day.getMonth()
        const dateYear = day.getFullYear()

        Date.prototype.addDays = function(days) {
            var date = new Date(this.valueOf())
            date.setDate(date.getDate() + days)
            return date
        }
        
        
        let date = day.addDays(-365*(dateYear - today.getFullYear()))
        
        let price = props.pricingPeriods?.[props.pricingPeriods?.length-1].price || ""


        for(let j = 0; j<props.pricingPeriods.length; j++){
            if(date >= new Date(props.pricingPeriods[j].date) && date < (new Date(props.pricingPeriods[j+1]?.date || props.pricingPeriods[props.pricingPeriods.length-1].date))){
                price = props.pricingPeriods[j].price
                j = props.pricingPeriods.length
            }
        }

     
        
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
          <div style={cellStyle} data-price={price}>
            <div className={`cell-date`} style={dateStyle}>{day.getDate()}</div>
                <div style={priceStyle}>
                  {price}€
                </div>
                
          </div>
        );
    }

    return (
        <>
        <div style={{display: "flex", flexWrap:"wrap"}}>
          <div style={{display: "flex", margin: "auto auto auto 0", minWidth:"300px"}}>
          {!from && !to && <span style={{margin:"auto 0"}}>{t("Please select the first day")}.</span>}
          {from && !to && <span style={{margin:"auto 0"}}>{t("Please select the last day")}.</span>}
          {from &&
            to &&
          <span style={{margin:"auto 0"}}><span className="orangeText">{total}€ - {(to - from)/(1000*60*60*24)} {t("Days")}</span> 
            <br />
            <small>{t("Selected from")} {from.toLocaleDateString()} to {to.toLocaleDateString()}</small></span>}
          </div>
          {from && to && (
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
            numberOfMonths= {2}
            initialMonth={new Date(today.getFullYear(), today.getMonth())}
            month={new Date(startMonthYear.startYear, startMonthYear.startMonth)}
            disabledDays={[
                {before: new Date(),
                after: limitDate}
            ]}
            selectedDays={[from, { from, to: enteredTo }]}
            modifiers={modifiers}
            modifiersStyles={modifiersStyles}
            onDayClick={handleDayClick}
            onDayMouseEnter={handleDayMouseEnter}
            renderDay={renderDay}
            locale={language} 
            localeUtils={localeUtils}
            />
            <CarEnquiryModal show={showModal} handleClose={handleClose} carClass={props.carClass} price={total} from={from?.toLocaleDateString()} to={to?.toLocaleDateString()} includes={props.includes}/>

      <Helmet>
      <style>{`
.Range .DayPicker-Day--selected:not(.DayPicker-Day--start):not(.DayPicker-Day--end):not(.DayPicker-Day--outside) {
background-color: #fff0e5 !important;
color: #000;
}
.Range .DayPicker-Day {
border-radius: 0 !important;
}
.Range .DayPicker-Day--start {
border-top-left-radius: 50% !important;
border-bottom-left-radius: 50% !important;
}
.Range .DayPicker-Day--end {
border-top-right-radius: 50% !important;
border-bottom-right-radius: 50% !important;
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

export default CarHireCalendar