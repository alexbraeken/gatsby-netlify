import React, {useState, useEffect} from 'react'
import DayPicker, { DateUtils } from 'react-day-picker';
import { Helmet } from 'react-helmet'
import 'react-day-picker/lib/style.css';

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

    return (
        <>
             <p>
          {!from && !to && 'Please select the first day.'}
          {from && !to && 'Please select the last day.'}
          {from &&
            to &&
            `Selected from ${from.toLocaleDateString()} to
                ${to.toLocaleDateString()}`}{' '}
          {from && to && (
            <button className="link" onClick={handleResetClick} style={{borderRadius:"5px",backgroundColor:"#fff0e5"}}>
              Reset
            </button>
          )}
        </p>
            <DayPicker
            className="Selectable"
            numberOfMonths= {2}
            initialMonth={new Date(startYear, startMonth)}
            disabledDays={
                disabledDays
            }
            selectedDays={[from,{from , to }]}
            modifiers={modifiers}
            modifiersStyles={modifiersStyles}
            onDayClick={handleDayClick}
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