import React, {useState, useEffect} from 'react'
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';

const CalendarWidget = (props) => {

    const [disabledDays, setDisabledDays] = useState([new Date(2020, 10, 25), new Date(2020, 11, 5)]);
    const startYear = new Date().getFullYear();
    const startMonth = new Date().getMonth();

    const uri = `https://platform.hostfully.com/api/notavailabledates_get_api.jsp?jsoncallback=jsonpCallbackGetNotAvailableDates&propertyUID=${props.id}&handleCheckInCheckOut=false`
    
    useEffect(() => {

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
            let disabledDates= array.map(date =>{
                return new Date (date.date)
            })
            setDisabledDays(disabledDates)
        })
    })

    return (
        <DayPicker
        initialMonth={new Date(startYear, startMonth)}
        disabledDays={
            disabledDays
        }
      />
    )
}

export default CalendarWidget