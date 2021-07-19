import React, {useState, useEffect, useRef} from 'react';
import DayPicker, { DateUtils } from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import { gsap } from "gsap";

gsap.registerPlugin(gsap);


//Property Card Calendar on properties list
const CardCalendar = (props) => {

    const [disabledDays, setDisabledDays] = useState([new Date(2020, 10, 25), new Date(2020, 11, 5)]);

    const calendar = useRef(null);

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
            array = JSON.parse(dates).checkIn;
            let disabledDates= array.map(date =>{
                return new Date (date.date)
            })
            setDisabledDays(disabledDates)
        })

        gsap.fromTo(calendar.current, {y:-50},{y:0, duration:1, ease: "Bounce.easeOut"})

        return function cleanup(){
            setDisabledDays(getInitialState);
        }
    }, [calendar])

    const getInitialState = () => {
        return {
          from: undefined,
          to: undefined,
        };
      }

      const today = new Date()
      let nextYear = DateUtils.addMonths(today, 12)
  
      const renderDay = (day) => {
          const dateDay = day.getDate()
          const dateMonth = day.getMonth()
          const dateYear = day.getFullYear()
          let date;
          //check if more than 1 year
          if(day >= nextYear){
            date = `${dateYear-1}-${dateMonth+1 > 9 ? dateMonth+1 : `0${dateMonth+1}`}-${dateDay > 9 ? dateDay : `0${dateDay}`}`
          }
          else{
            date = `${dateYear}-${dateMonth+1 > 9 ? dateMonth+1 : `0${dateMonth+1}`}-${dateDay > 9 ? dateDay : `0${dateDay}`}`
          }
          
          
          const dateStyle = {
            position: 'absolute',
            color: '#fff',
            top: 0,
            right: 0,
            fontSize: 10,
          };
          const priceStyle = { fontSize: '0.8em',fontWeight: 'bold', textAlign: 'left', position: 'absolute', bottom: '0', left: '0' };
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

    const modifiers = {disabledDays: disabledDays};
    const modifiersStyles = {
        disabledDays : {
            color: "#DCE0E0",
            textDecorationLine: "line-through",
            cursor: "default",
            backgroundColor: "#0000004d",
            borderRadius: "initial"
        },
    }

  return (
    <DayPicker ref={calendar}
      initialMonth={new Date(startYear, startMonth)}
      numberOfMonths= {1}
      disabledDays={
          disabledDays
      }
      modifiers={modifiers}
      modifiersStyles={modifiersStyles}
      renderDay={renderDay}
    />
  );
}

export default CardCalendar