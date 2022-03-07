import React, {useState, useEffect} from 'react'
import DayPicker, { DateUtils } from 'react-day-picker';
import {Link, Trans, useTranslation, useI18next} from 'gatsby-plugin-react-i18next';
import { Helmet } from 'react-helmet'
import { GiLockedDoor } from "@react-icons/all-files/gi/GiLockedDoor";
import 'react-day-picker/lib/style.css';

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
const CalendarWidget = (props) => {

    const [disabledDays, setDisabledDays] = useState([new Date(), new Date()]);
    const [disabledCheckinDays, setDisabledCheckinDays] = useState([])
    const [range, setRange] = useState({
        from: undefined,
        to: undefined,
      });
    const [minStayAlert, setMinStayAlert] = useState(false)
    const [startMonthYear, setStartMonthYear] = useState({startYear: null, startMonth: null})

    const {t} = useTranslation(['calendar', 'translation']);
    const { language } = useI18next()

    const uri = `https://platform.hostfully.com/api/notavailabledates_get_api.jsp?jsoncallback=jsonpCallbackGetNotAvailableDates&propertyUID=${props.id}&handleCheckInCheckOut=false`
    
    useEffect(() => {
        if(props.dates.from && props.dates.to){
          setRange({from:new Date(props.dates.from), to:new Date(props.dates.to), enteredTo: new Date(props.dates.to)})
          setStartMonthYear({startYear: new Date(props.dates.from).getFullYear(), startMonth: new Date(props.dates.from).getMonth()})
        }else{
          setStartMonthYear({startYear: new Date().getFullYear(), startMonth: new Date().getMonth()})
        }

        fetch(uri)
        .then(response => {
            
            return response.text()
        })
        .then(data => {
            const patt = /\(([^)]+)\)/;
            let dates, array;
            data = String(data);
            dates = patt.exec(data);
            dates = dates[0].slice(1, -1)
            array = JSON.parse(dates);
            if(Array.isArray(array.checkIn)){
            let disabledDates = []
            let disabledCheckins = []
            array.checkIn.forEach(date =>{
                if(date.reason === "rule"){
                  disabledCheckins.push(new Date (date.date))
                }
                else {
                  disabledDates.push(new Date (date.date))
                }
            })
            setDisabledDays(disabledDates)
            setDisabledCheckinDays(disabledCheckins)
        }
        })
        return function cleanup(){
            setRange(getInitialState)
            setDisabledDays([new Date(), new Date()])
            setDisabledCheckinDays([])
        }
    }, [])

    useEffect(() => {
      props.onChange(range)
    }, [range])

    useEffect(() => {
      const timeout = setTimeout(()=>setMinStayAlert(false), 4000)

      return () => clearTimeout(timeout);
    }, [minStayAlert])

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

      if(modifiers.disabledDays || (modifiers.checkinDisallowed && isSelectingFirstDay(from, to, day))){
        return;
      }

      const newRange = DateUtils.addDayToRange(day, range);
      for(let i=0;i<disabledDays.length;i++){
          if(disabledDays[i] > newRange.from && disabledDays[i] < newRange.to){
              return;
          }  
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
        if(props.minDays){
          let minDate = new Date(from.valueOf())
          minDate.setDate(minDate.getDate() + props.minDays)
          if(day < minDate){
            triggerMinStayAlert()
            return
          }
        }
  
        setRange({
          from: from,
          to: day,
          enteredTo: day,
        });
      }
    }

    const handleDayMouseEnter = (day) => {
      const { from, to } = range

      let minDate
      if(from && props.minDays){
        minDate = new Date(from.valueOf())
        minDate.setDate(minDate.getDate() + props.minDays)
      }

      if (!isSelectingFirstDay(from, to, day)) {
        const newRange = DateUtils.addDayToRange(day, range);
        for(let i=0;i<disabledDays.length;i++){
            if(disabledDays[i] > newRange.from && disabledDays[i] < newRange.to){
                return;
            }  
        }
      
        if(day < minDate)return

        setRange({
          from: from,
          to: to,
          enteredTo: day,
        });
      }
    }
    
    const triggerMinStayAlert = () => {
      setMinStayAlert(true)
    }

    const handleResetClick =() => {
        setRange(getInitialState());
      }

    const handleQuoteClick = () => {
      const bookingWidget = document.getElementById("leadWidget")
      const nameField = document.getElementsByName("email")
      if(window && bookingWidget)
      window.scrollTo(bookingWidget)
      nameField[0].focus()
    }

    const from = range.from;
    const to = range.to;
    const enteredTo = range.enteredTo
    const modifiers = {start: from, end: enteredTo, disabledDays: disabledDays, checkinDisallowed: disabledCheckinDays};
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
        checkinDisallowed : {
          backgroundColor: from ? '#fff' : '#ffbebe',
          color: '#000'
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
    let limitDate = DateUtils.addMonths(today, 30)

    const renderDay = (day, modifiers) => {
        const dateDay = day.getDate()
        const dateMonth = day.getMonth()
        const dateYear = day.getFullYear()
        let date= `${dateYear}-${dateMonth+1 > 9 ? dateMonth+1 : `0${dateMonth+1}`}-${dateDay > 9 ? dateDay : `0${dateDay}`}`
        let earlier = `${dateYear-1}-${dateMonth+1 > 9 ? dateMonth+1 : `0${dateMonth+1}`}-${dateDay > 9 ? dateDay : `0${dateDay}`}`

        
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
        const checkinIcon = { 
          position: 'absolute',
          top: 0,
          left: 0,
          fontSize: 10, 
          color: "red",
          display: from ? "none" : "block"
        };
        const cellStyle = {
          height: 30,
          width: 30,
          position: 'relative',
          margin: 'auto',
        };
        return (
          <div style={cellStyle}>
            <div className={`cell-date`} style={dateStyle}>{day.getDate()}</div>
            {modifiers.checkinDisallowed &&
              <div className="icon-info" style={checkinIcon}>
               <GiLockedDoor />
               <span className="tooltiptext">{t("No Checkin Allowed")}</span>
              </div>
            }
            {props.pricingPeriods?.[date] &&
                <div style={priceStyle}>
                  {props.pricingPeriods[date]? props.pricingPeriods[date].amount : props.pricingPeriods[earlier].amount}{props.currSymbol}
                </div>
                }
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
            <span style={{margin:"auto 0"}}><span className="orangeText">{(to - from)/(1000*60*60*24)} {t("Nights")}</span> 
            <br />
            <small>Selected from {from.toLocaleDateString()} to {to.toLocaleDateString()}</small></span>}
          </div>
          {from && to && (
            <div style={{display: "flex", flexWrap:"nowrap", minWidth:"200px"}}>
              <button className="calendar-btn main" onClick={handleQuoteClick}>
              {t("Get a quote")}
              </button>
              
              <button className="calendar-btn clear" onClick={handleResetClick}>
              {t("Clear")}
              </button>
            </div>
          )}
          <span className={`min-warning ${minStayAlert? 'visible': ''}`} style={{minWidth:"100%"}}>{t("Min stay")}: {props.minDays} {t("Nights")}</span>

        </div>
            <DayPicker
            className="Range"
            numberOfMonths= {2}
            initialMonth={new Date(today.getFullYear(), today.getMonth())}
            month={new Date(startMonthYear.startYear, startMonthYear.startMonth)}
            disabledDays={[
                disabledDays,
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
`}</style>
    </Helmet>
    </>
    )
}

export default CalendarWidget