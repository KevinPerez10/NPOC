import React, {useState, useEffect} from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import Axios from 'axios'

const localizer = momentLocalizer(moment)
export default function Appointments__Calendar(props) {

 const [whole, setWhole] = useState([])
 const [morning, setMorning] = useState([])
 const [afternoon, setAfternoon] = useState([])
 const [errorMessage, setErrorMessage] = useState(null);
 const fetchEvents = () => {
  //whole
  Axios.post('https://mysql-npoc.herokuapp.com/calendarwhole')
    .then((response) => {
      setWhole(
        response.data.map((date) => {
          return {
            start: new Date(date.date),
            end: new Date(date.date),
            title: 'Closed',
          };
        })
      );
    })
    .catch((error) => {
      console.error(error);
      setErrorMessage('There was an error loading the calendar events.');
    });
  //morning
  Axios.post('https://mysql-npoc.herokuapp.com/calendarmorning')
    .then((response) => {
      setMorning(
        response.data.map((date) => {
          return {
            start: new Date(date.date),
            end: new Date(date.date),
            title: 'Morning',
          };
        })
      );
    })
    .catch((error) => {
      console.error(error);
      setErrorMessage('There was an error loading the calendar events.');
    });
  //Afternoon
  Axios.post('https://mysql-npoc.herokuapp.com/calendarafternoon')
    .then((response) => {
      setAfternoon(
        response.data.map((date) => {
          return {
            start: new Date(date.date),
            end: new Date(date.date),
            title: 'Afternoon',
          };
        })
      );
    })
    .catch((error) => {
      console.error(error);
      setErrorMessage('There was an error loading the calendar events.');
    });

    console.log("+3 queries")
};

useEffect(()=>{
  fetchEvents();
}, [props])

  return (
    <div className='flex flex-col overflow-hidden w-full'>
      {errorMessage && <div>{errorMessage}</div>}
      <Calendar
        localizer={localizer}
        events={[...whole, ...morning, ...afternoon]}
        views={['month']}
        startAccessor="start"
        endAccessor="end"
        style={{height: 500}}
        eventPropGetter={event => {
          let newStyle = {};
          if (event.title === 'Closed') {
            newStyle = {
              backgroundColor: 'maroon',
              color: 'white'
            };
          } else if (event.title === 'Morning') {
            newStyle = {
              backgroundColor: '#FACB13',
              color: 'white'
            };
          }else if (event.title === 'Afternoon') {
            newStyle = {
              backgroundColor: '#F96B00',
              color: 'white'
            };
          }
          return {
            className: "",
            style: newStyle
          };
        }}      
      />
	  </div>
  )
}
