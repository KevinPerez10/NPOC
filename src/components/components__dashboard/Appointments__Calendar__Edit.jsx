import React, {useState} from 'react'
import Appointments__Calendar from './Appointments__Calendar'
import axios from 'axios'

export default function Appointments__Calendar__Edit({open, onClose}) {
  if(!open) return null
  //Inserting data
  const [isOpen, setIsOpen] = useState(false)
  const [selected, setSelected] = useState('whole')
  const [date1, setDate1] = useState("");
  const [date2, setDate2] = useState("");
  const [flag, setFlag] = useState(0);


  const setCalendar= () => {

    var myDate1 = new Date(date1);
    var myDate2 = new Date(date2);
    var tod = new Date();
    
    if (tod.getTime() >= myDate1.getTime()) {
      // alert("Cannot access past date.")
      setPopupStatus(false)
      setPopup('Cannot access past date.')
      setTimeout(() => setPopup(''), 5000)
    }
    else if(myDate1.getTime() > myDate2.getTime()){
      // alert("The start date must come first before end date.")
      setPopupStatus(false)
      setPopup('The start date must come first before end date.')
      setTimeout(() => setPopup(''), 5000)
    }
    else{
      const datesArr = getDatesInRange(myDate1, myDate2).map(date => date.toLocaleDateString());
      for (const date of datesArr) {
      checkStatus(date)
      }
      setPopupStatus(true)
      setPopup('Changes has been saved!')
      setTimeout(() => {
        setPopup('')
      }, 5000)
    }
  };
  //function to set an array with dates
  function getDatesInRange(startDate, endDate) {
    const dates = [];
    let currentDate = new Date(startDate);
  
    while (currentDate <= new Date(endDate)) {
      dates.push(new Date(currentDate));
      currentDate = new Date(currentDate.getTime() + 24 * 60 * 60 * 1000);
    }
  
    return dates;
  }
  const CloseDate = (date) => {
    axios.post('https://mysql-npoc.herokuapp.com/availability', {
      d: formatDate(date),
      s:selected
      }).then(()=>{
        setFlag(flag + 1)
      })
  }
  const UpdateDate = (id) => {
    axios.post('https://mysql-npoc.herokuapp.com/updateavailability', {
      id:id,
      s: selected
      }).then(()=>{
        setFlag(flag + 1)
      })
  }
  function formatDate(dateString) {
    const dateParts = dateString.split('/');
    const year = dateParts[2];
    const month = dateParts[0].padStart(2, '0');
    const day = dateParts[1].padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  }
  const checkStatus = (d) => {
    axios.post('https://mysql-npoc.herokuapp.com/checkexistingappt', {
      d:formatDate(d)
    }).then((response) => {
    if(response.data == false){
      CloseDate(d)
    }
    else{
      UpdateDate(response.data[0].aID)
    }
    });
}
   //if-else for isOpen
   const pathWay = () => {
    if(isOpen==false){
      setCalendar();
    }
    else{
      OpenCalendar();
    }
   }

   const OpenCalendar= () => {

    var myDate1 = new Date(date1);
    var myDate2 = new Date(date2);
    var tod = new Date();
    
    if (tod.getTime() >= myDate1.getTime()) {
      // alert("Cannot access past date.")
      setPopupStatus(false)
      setPopup('Cannot access past date.')
      setTimeout(() => setPopup(''), 5000)
      
    }
    else if(myDate1.getTime() > myDate2.getTime()){
      // alert("The start date must come first before end date.")
      setPopupStatus(false)
      setPopup('The start date must come first before end date.')
      setTimeout(() => setPopup(''), 5000)
    }
    else{
      const datesArr = getDatesInRange(myDate1, myDate2).map(date => date.toLocaleDateString());
      for (const date of datesArr) {
      checkOpenStatus(date)
      }
      setPopupStatus(true)
      setPopup('Changes has been saved!')
      setTimeout(() => {
        setPopup('')
      }, 5000)
    }
  };
  const checkOpenStatus = (d) => {
    axios.post('https://mysql-npoc.herokuapp.com/checkexistingappt', {
      d:formatDate(d)
    }).then((response) => {
    if(response.data == false){
    }
    else{
      if (selected == 'whole') {
        OpenAllWhole(response.data[0].aID)
      }
      else if (selected == 'afternoon') {
        UpdateOpen(response.data[0].aID,'morning')
      }
      else if (selected == 'morning') {
        UpdateOpen(response.data[0].aID,'afternoon')
      }
    }
    });
}
const UpdateOpen = (id,p) => {
  axios.post('https://mysql-npoc.herokuapp.com/updateavailability', {
    id:id,
    s: p
    }).then(()=>{
      setFlag(flag + 1)
    })
}
  const OpenAllWhole = (id) => {
      axios.post('https://mysql-npoc.herokuapp.com/deleteclosed', {
            s: id
          }).then(()=>{
            setFlag(flag + 1)
          })
  }

  const [popup, setPopup] = useState('')
  const [popupStatus, setPopupStatus] = useState()

  return (

    <div className='bg-black/70 fixed grid place-items-center w-full h-full z-20 top-0 left-0'>
      {popupStatus ? (
        <div
          className={`z-20 bg-green-500 text-white p-3 rounded-lg absolute top-3 left-1/2 transform -translate-x-1/2 transition-all ${popup=='' ? 'hidden' : ''}`}
        >
          {popup}
        </div>
          ) : (
        <div
          className={`z-20 bg-red-500 text-white p-3 rounded-lg absolute top-3 left-1/2 transform -translate-x-1/2 transition-all ${popup=='' ? 'hidden' : ''}`}
        >
          {popup}
        </div>
        )}
        <div className='flex flex-col justify-center items-center gap-5 w-5/6 h-fit rounded-lg shadow-lg px-10 py-5 bg-white'>
            <div className='text-3xl'>Edit Calendar</div>
            <div className='flex w-full justify-between'>
              <Appointments__Calendar prop={flag}/>
              <div className='w-full grid place-items-center'>
                <div className='rounded-xl shadow-inner border-2 p-3 flex flex-col w-4/5 items-center gap-5 h-4/5'>
                  <p className='text-xl self-start'>
                    Availability:
                  </p>
                  <p className='text-sm self-start'>
                    Select a date to close.
                  </p>

                  <div className='flex gap-3'>
                    <label>From:</label>
                    <input className='text-link border-b-2' type="date" onChange={(event) => (
                        setDate1(event.target.value)
                    )}/>
                    <label>To:</label>
                    <input className='text-link border-b-2' type="date" onChange={(event) => (
                        setDate2(event.target.value)
                    )}/>
                  </div>
                  <div className='flex bg-gray-300 items-center text-center rounded-full w-fit shadow-inner'>
                    <div
                      className={`${selected === 'whole'? 'bg-link' : 'bg-gray-300'} rounded-l-full px-3 py-1 text-black hover:cursor-pointer transition duration-500 ease-in-out transform`}
                      onClick={() => setSelected('whole')}
                      >
                      Whole Day
                    </div>
                    <div
                      className={`${selected === 'morning'? 'bg-morning' : 'bg-gray-300'} px-3 py-1 text-black hover:cursor-pointer transition duration-500 ease-in-out transform`}
                      onClick={() => setSelected('morning')}
                      >
                      Morning
                    </div>
                    <div
                      className={`${selected === 'afternoon'? 'bg-afternoon' : 'bg-gray-300'} rounded-r-full px-3 py-1 text-black hover:cursor-pointer transition duration-500 ease-in-out transform`}
                      onClick={() => setSelected('afternoon')}
                      >
                      Afternoon
                    </div>
                  </div>
                  <div className='flex bg-gray-300 rounded-full shadow-inner'>
                    <div
                      className={`px-4 py-2 rounded-full text-center cursor-pointer transition duration-500 ease-in-out transform ${isOpen ? 'bg-link text-black' : 'bg-gray-300 text-gray-700'}`}
                      onClick={() => setIsOpen(true)}
                      >
                      Open
                    </div>
                    <div
                      className={`px-4 py-2 rounded-full text-center cursor-pointer transition duration-500 ease-in-out transform ${!isOpen ? 'bg-gray-500 text-red-500' : 'bg-gray-300 text-red-500'}`}
                      onClick={() => setIsOpen(false)}
                      >
                      Close
                    </div>
                  </div>

                </div>
              </div>
            </div>
            <div className='flex w-full items-center justify-between'>
              <button onClick={onClose} className='w-1/4 bg-gray-500 hover:bg-gray-700 border-gray-500 hover:border-gray-700 text-sm border-4 text-white py-1 px-10 rounded-xl shadow-lg'>
                  Close
              </button>
              <button onClick={()=>{
               pathWay();
              }} className='w-1/4 bg-button-dblue hover:bg-gray-700 border-button-dblue hover:border-gray-700 text-sm border-4 text-white py-1 px-10 rounded-xl shadow-lg'>
                  Save
              </button>
            </div>
        </div>
    </div>
  )
}
