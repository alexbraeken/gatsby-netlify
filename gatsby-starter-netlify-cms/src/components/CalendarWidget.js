import React, {useState, useEffect} from 'react'
import DayPicker, { DateUtils } from 'react-day-picker';
import { Helmet } from 'react-helmet'
import 'react-day-picker/lib/style.css';







//Calendar Widget in Property page
const CalendarWidget = (props) => {

    const [disabledDays, setDisabledDays] = useState([new Date(), new Date()]);
    const [range, setRange] = useState({
        from: undefined,
        to: undefined,
      });

    const startYear = new Date().getFullYear();
    const startMonth = new Date().getMonth();

    const uri = `https://platform.hostfully.com/api/notavailabledates_get_api.jsp?jsoncallback=jsonpCallbackGetNotAvailableDates&propertyUID=${props.id}&handleCheckInCheckOut=false`
    
    useEffect(() => {
        if(props.dates.from && props.dates.to)setRange({from:new Date(props.dates.from), to:new Date(props.dates.to)})

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
            let disabledDates= array.checkIn.map(date =>{
                return new Date (date.date)
            })
            setDisabledDays(disabledDates)
        }
        })
        return function cleanup(){
            setRange(getInitialState)
            setDisabledDays(getInitialState);
        }
    }, [])

    const getInitialState = () => {
        return {
          from: undefined,
          to: undefined,
        };
      }
    
    const handleDayClick = (day, modifiers = {}) => {
        if(modifiers.disabled){
            return;
        }
        const newRange = DateUtils.addDayToRange(day, range);
        for(let i=0;i<disabledDays.length;i++){
            if(disabledDays[i] > newRange.from && disabledDays[i] < newRange.to){
                return;
            }  
        }
        setRange(newRange);
        props.onChange(newRange);
      }
    
    const handleResetClick =() => {
        setRange(getInitialState());
      }

    const from = range.from;
    const to = range.to;
    const modifiers = {start: from, end: to, disabledDays: disabledDays};
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
        }
    }

    const today = new Date()
    let nextYear = DateUtils.addMonths(today, 12)
    let limitDate = DateUtils.addMonths(today, 24)

    const renderDay = (day) => {
        const dateDay = day.getDate()
        const dateMonth = day.getMonth()
        const dateYear = day.getFullYear()
        let date;
        if(day > nextYear){
          date = `${dateYear-1}-${dateMonth+1 > 9 ? dateMonth+1 : `0${dateMonth+1}`}-${dateDay > 9 ? dateDay : `0${dateDay}`}`
        }
        else{
          date = `${dateYear}-${dateMonth+1 > 9 ? dateMonth+1 : `0${dateMonth+1}`}-${dateDay > 9 ? dateDay : `0${dateDay}`}`
        }
        
        //check if more than 1 year
        const dateStyle = {
          position: 'absolute',
          color: '#ff6600',
          top: 0,
          right: 0,
          fontSize: 10,
        };
        const priceStyle = { fontSize: '0.8em', fontWeight: 'bold', textAlign: 'left', position: 'absolute', bottom: '0', left: '0' };
        const cellStyle = {
          height: 30,
          width: 30,
          position: 'relative',
          margin: 'auto',
        };
        return (
          <div style={cellStyle}>
            <div style={dateStyle}>{day.getDate()}</div>
            {props.pricingPeriods?.[date] &&
                <div style={priceStyle}>
                  {props.pricingPeriods[date].amount}€
                </div>
                }
          </div>
        );
    }

    return (
        <>
             <p>
          {!from && !to && 'Please select the first day.'}
          {from && !to && 'Please select the last day.'}
          {from &&
            to &&
            <span>{`Selected from ${from.toLocaleDateString()} to ${to.toLocaleDateString()}`}{' '}</span>}
          {from && to && (
            <button className="link" onClick={handleResetClick} style={{borderRadius:"5px",backgroundColor:"#fff0e5"}}>
              Clear
            </button>
          )}
        </p>
            <DayPicker
            className="Selectable"
            numberOfMonths= {2}
            initialMonth={new Date(startYear, startMonth)}
            disabledDays={[
                disabledDays,
                {before: new Date(),
                after: limitDate}
            ]}
            selectedDays={[from,{from , to }]}
            modifiers={modifiers}
            modifiersStyles={modifiersStyles}
            onDayClick={handleDayClick}
            renderDay={renderDay}
            />

      <Helmet>
      <style>{`
.Selectable .DayPicker-Day--selected:not(.DayPicker-Day--start):not(.DayPicker-Day--end):not(.DayPicker-Day--outside) {
background-color: #fff0e5 !important;
color: #000;
}
.Selectable .DayPicker-Day {
border-radius: 0 !important;
}
.Selectable .DayPicker-Day--start {
border-top-left-radius: 50% !important;
border-bottom-left-radius: 50% !important;
}
.Selectable .DayPicker-Day--end {
border-top-right-radius: 50% !important;
border-bottom-right-radius: 50% !important;
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