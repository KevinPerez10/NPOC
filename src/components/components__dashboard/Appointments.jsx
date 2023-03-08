import React, {useState, useEffect} from 'react'
import Appointments__RxData from './Appointments__RxData'
import PatientHistory from '../components__records/PatientHistory'
import Confirmation from '../Confirmation'
import Confirmation__Comment from '../Confirmation__Comment'
import Axios from 'axios'

export default function ComponentsAppointments() {

  function timeZone(date){
    const dt = new Date(date);
    dt.setUTCHours(dt.getUTCHours() - 8);
    const singaporeTime = dt.toLocaleString('en-US', { timeZone: 'Asia/Singapore' });
    return singaporeTime;
}

  const [confirm, setConfirm] = useState(false)
  const [confirmComment, setConfirmComment] = useState(false)
  const [selectedId, setSelectedId] = useState(null)
  const [openPatientHistory, setOpenPatientHistory] = useState(false)
  const [openAddRxData, setOpenAddRxData] = useState(false)
  const [appointmentList, setAppointmentList] = useState([])
  const [userList, setUserList] = useState([])
  const [patientID, setPatientID] = useState(null)
  const [flag, setFlag] = useState(0)
  const [n, setN] = useState("")
  const [p, setP] = useState("")
  const [b, setB] = useState("")
  const [a, setA] = useState("")


  useEffect(() => {
    Axios.post('https://mysql-npoc.herokuapp.com/checkappointments').then((response) => {
    setAppointmentList(response.data);
    });
  }, [flag, openAddRxData, openPatientHistory]);

  useEffect(() => {
    Axios.post('https://mysql-npoc.herokuapp.com/checkusers').then((response) => {
    setUserList(response.data);
    });
  }, []);

  
  const getDate = (pardate) => {
    const monthNames = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    const myDate = new Date(pardate);
    const date = myDate.getDate();

    return (date + " " + monthNames[myDate.getMonth()] + ' ' + myDate.getFullYear());
  };

const getNameById = (id) => {
  const user = userList.find((user) => user.userID === id);
  if (user) {
    return user.firstName + " " + user.lastName;
  }
};

const getEmailById = (id) => {
  const user = userList.find((user) => user.userID === id);
  if (user) {
    return user.email;
  }
};
const getContactById = (id) => {
  const user = userList.find((user) => user.userID === id);
  if (user) {
    return user.phone;
  }
};
const getBirthdayById = (id) => {
  const user = userList.find((user) => user.userID === id);
  if (user) {
    return user.birthday;
  }
};
const getAddressById = (id) => {
  const user = userList.find((user) => user.userID === id);
  if (user) {
    return user.address;
  }
};
function convertTimeToString(pardate) {
  const time = new Date(pardate)
  const hours = time.getHours();
  const minutes = time.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const formattedHours = hours % 12 || 12; // convert 0 to 12
  const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
  return `${formattedHours}:${formattedMinutes} ${ampm}`;
}

const checkStatus = (fn,uid) => {
    Axios.post('https://mysql-npoc.herokuapp.com/checkpatients', {
      fn:fn
    }).then((response) => {
    if(response.data == false){
      setOpenAddRxData(true)
      setSelectedId(uid); 
    }
    else{
      setPatientID(response.data[0].patientID)
      setOpenPatientHistory(true)
      setSelectedId(uid); 
    }
    });
 
}

function deleteRow(id) {
  Axios.post('https://mysql-npoc.herokuapp.com/deleteappointment', {
        s: id
      }).then(()=>{
        setFlag(flag+1)
      })
}

const propsToPass = {
  prop1: patientID,
  prop2: selectedId
};
const propsToPass2 = {
  id: selectedId,
  name: n,
  phone: p,
  birthday: b, 
  address: a
};

  return (
    <div className='bg-white font-poppins flex flex-col gap-10 justify-between items-center px-5 md:mx-10 md:rounded-xl md:shadow-md h-fit'>
      <div className='flex flex-col md:flex-row justify-around gap-5 w-full mt-10'>
        <div className='bg-bg-dashboard px-20 py-5 flex flex-col items-center rounded-lg shadow-inner'>
          <p className=''>Pending Appointments</p>
          <p className='text-5xl text-button-lblue'>{appointmentList.length < 10? '0'+ appointmentList.length: appointmentList.length}</p>
        </div>
        {/*<div className='bg-bg-dashboard px-20 py-5 flex flex-col items-center rounded-lg shadow-inner'>
          <div>Cancelled</div>
          <p className='text-5xl text-button-lblue'>03</p>
      </div>*/}
      </div>
      
      {/* Appointments */}
      <div className='grid grid-cols-3 w-full gap-3 mb-5'>
        <p className='text-3xl place-self-center col-span-3'> Appointments: </p>
        {/*here */}
        {appointmentList.map((val,key) => {
              return (
        <div className='grid grid-cols-2 place-items-center gap-2 border-2 px-5 py-3 rounded-xl'>
          <p className='text-2xl col-span-2'>
            {getNameById(val.userID)}
          </p>
          <p className='col-start-1 col-span-2'>
            {getEmailById(val.userID)}
          </p>
          <p className='col-start-1 col-span-2'>
            {getContactById(val.userID)}
          </p>
          <p className='col-start-1'>
            {getDate(timeZone(val.date))}
          </p>
          <p>
            {convertTimeToString(timeZone(val.date))}
          </p>
          <div
            onClick={()=> {
              //const confirmed = window.confirm("Are you sure you want to cancel this patient's appointment?")
              //confirmed ? deleteRow(val.userID) : null
              setConfirm(true)
            }}
            className='bg-gray-500 hover:bg-gray-700 w-full text-center text-white px-3 py-1 rounded-full hover:cursor-pointer'
          >
            Cancel
          </div>
          <div
            onClick={()=> {
              checkStatus(getNameById(val.userID),val.userID)
              setN(getNameById(val.userID))
              setP(getContactById(val.userID))
              setB(getBirthdayById(val.userID))
              setA(getAddressById(val.userID))
            }}
            className='bg-button-dblue hover:bg-gray-700 w-full text-center text-white px-3 py-1 rounded-full hover:cursor-pointer'
          >
            Confirm
          </div>
        </div>
          )
        })}
        <Confirmation open={confirm} onClose={() => setConfirm(false)} onConfirm={() => setConfirmComment(true)} message={`Are you sure you want to cancel this patient's appointment?`}/>
        <Confirmation__Comment open={confirmComment} onClose={() => setConfirmComment(false)}/>
        {/*up to here */}

      <Appointments__RxData props={propsToPass2} open={openAddRxData} onClose={() => setOpenAddRxData(false)}/>
      <PatientHistory props={propsToPass} openPatientHistory={openPatientHistory} onClosePatientHistory={() => setOpenPatientHistory(false)}/>

      </div>
      
    </div>
  )
}
