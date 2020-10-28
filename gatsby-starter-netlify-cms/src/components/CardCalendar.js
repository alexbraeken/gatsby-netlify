import React, {useState, useEffect, useRef} from 'react';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import { gsap } from "gsap";

gsap.registerPlugin(gsap);

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
            array = JSON.parse(dates);
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
    />
  );
}

export default CardCalendar