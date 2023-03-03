import React, {useState, useEffect} from 'react'
import RxData from './RxData'
import Axios from 'axios'

export default function PatientHistory({openPatientHistory, onClosePatientHistory, props}) {
    if(!openPatientHistory) return null
    const [openRxData, setOpenRxData] = useState(false)
    const [patient, setPatient] = useState([])
    const [records, setRecords] = useState([])
    const [selectedId, setSelectedId] = useState(null)
    
    useEffect(() => {
      Axios.post('https://mysql-npoc.herokuapp.com/patientbyid', {
        id:props.prop1
      }).then((response) => {
      setPatient(response.data);
      });
    }, [patient]);

    var todayDate = new Date(); 
    const [year, setYear] = useState(todayDate.getFullYear());
    const [displayYear, setDY] = useState(todayDate.getFullYear());
    const [negation, setNegation] = useState('');

      useEffect(() => {
      Axios.post('https://mysql-npoc.herokuapp.com/recordbyid', {
        id:props.prop1,
        dp:year,
        n:negation
      }).then((response) => {
      setRecords(response.data);
      });
    }, [records]);


    const getTime = (date) => {
      var myDate = new Date(date)
      let hours = myDate.getHours();
      if(myDate.getMinutes() < 10){
        var mins = '0' + myDate.getMinutes();
      }
      else{
        mins = myDate.getMinutes();
      }
      let ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12;
      return hours +":"+ mins + " " + ampm;
    }

    const getDate = (date) => {
      const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];
      var daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      var myDate = new Date(date)
      return monthNames[myDate.getMonth()] + " " + myDate.getDate() + ", " + myDate.getFullYear() + " (" + daysOfWeek[myDate.getDay()] + ")";
    }
  //Sorting Dates

  const propsToPass = {
    prop1: selectedId,
    prop2: props.prop2
  };
  return (
    <div className='bg-black/70 text-button-dblue fixed grid place-items-center w-full h-full z-20 top-0 left-0'>
        <div className={`flex flex-col justify-center items-center gap-5 w-5/6 h-fit rounded-lg shadow-lg px-10 py-5 bg-white ${openRxData ? 'hidden' : 'flex'}`}>
            <div className='text-lg self-start'>
                Patient History
            </div>

            <hr className='w-full border-black' />

            {/* Main Content */}
            <div className='py-5 grid grid-cols-3 gap-5 w-full place-items-center'>

              {/* Basic Info */}
              {patient.map((val,key) => {
                return(
              <div className='grid grid-cols-3 col-span-3 w-full place-items-center'>
                <div className='place-self-start text-2xl'>
                  {val.name}
                </div>
                <div className='place-self-start col-start-1'>
                  {val.address}
                </div>
                <div className='place-self-end row-start-1 col-start-3'>
                  {val.birthday}
                </div>
                <div className='place-self-end col-start-3'>
                  {val.phone}
                </div>
              </div>
                )
              })}
              {/* Year Selector */}
              <div className='col-span-3 flex w-full justify-around'>
                <button className='text-white rounded-full bg-button-dblue px-10 py-2 cursor-pointer hover:bg-gray-700' onClick={()=> {
                  setYear(todayDate.getFullYear())
                  setNegation('')
                  setDY(todayDate.getFullYear())
                  }}>
                  Current Year
                </button>
                <button className='text-white rounded-full bg-button-dblue px-10 py-2 cursor-pointer hover:bg-gray-700'onClick={()=> {
                  setYear(todayDate.getFullYear()-1)
                  setNegation('')
                  setDY(todayDate.getFullYear()-1)
                  }}>
                  Previous Year
                </button>
                <div className='text-white rounded-full bg-button-dblue px-10 py-2 cursor-pointer hover:bg-gray-700'onClick={()=> {
                  setYear(todayDate.getFullYear())
                  setNegation('not')
                  setDY((todayDate.getFullYear()-1) + " and below")
                  }}>
                  Past Year
                </div>
              </div>

              {/* History */}
              <div className='border-2 rounded-lg shadow-inner flex flex-col gap-3 w-full p-5 col-span-3'>
                <div className='flex w-full justify-between'>
                  <div>
                    History
                  </div>
                  <div>
                    {displayYear}
                  </div>
                </div>
                <div className='text-white flex flex-col gap-2 overflow-auto h-60'>
                {records.map((val,key) => {
                return(
                  <div
                    className='p-5 rounded cursor-pointer shadow-inner transition-all hover:bg-gray-700 flex w-full bg-button-lblue justify-between'
                    onClick={() => {setSelectedId(val.rID); setOpenRxData(true)}}
                    >
                    <p>
                      {getTime(val.createdAt)}
                    </p>
                    <p>
                      {getDate(val.createdAt)}
                    </p>
                  </div>
               )
              })}
                </div>
                 
              </div>
            </div>

            <hr className='w-full border-black' />


            <div
                className='w-1/4 bg-gray-500 self-start text-center cursor-pointer hover:bg-gray-700 border-gray-500 hover:border-gray-700 text-sm border-4 text-white py-1 px-10 rounded-xl shadow-lg'
                onClick={onClosePatientHistory}
                >
                Cancel
            </div>
        </div>
        <RxData props={propsToPass} open={openRxData} onClose={() => setOpenRxData(false)}/>
    </div>
  )
}
