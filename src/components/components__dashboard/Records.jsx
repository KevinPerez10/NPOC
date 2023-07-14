
import React, {useState, useEffect} from 'react'
import AddRxData from '../components__records/AddRxData'
import PatientHistory from '../components__records/PatientHistory'
import Axios from 'axios'

export default function ComponentsRecords() {
  const [openAddRxData, setOpenAddRxData] = useState(false)
  const [openPatientHistory, setOpenPatientHistory] = useState(false)
  const [patientList, setPatientList] = useState([])
  const [selectedId, setSelectedId] = useState(null)
  const [search, setSearch] = useState("")

  useEffect(() => {
    Axios.post('http://localhost:5174/patients', {
      s:search
    }).then((response) => {
    setPatientList(response.data);
    });
  }, [search]);

  const propsToPass = {
    prop1: selectedId,
    prop2: 0
  };
  return (
    <div className='flex flex-col bg-white px-5 md:mx-10 md:rounded-xl shadow-md h-full'>
      <h1 className='font-gilmer py-5'>Patient Record List</h1>
      {/* Search Bar */}
      <div className='flex gap-2 items-center'>
        <input
          className='flex justify-between text-gray-400 p-3 w-fit rounded-full shadow-lg px-5 py-2 my-3'
          placeholder='Search' onChange={(event)=>{setSearch("where name like '%" + event.target.value + "%'")}}
        />
        <div className='p-3 flex justify-center rounded-full shadow-lg cursor-pointer'>
          <ion-icon name="search-outline"></ion-icon>
        </div>
      </div>
      {/* Table */}
      <div className='overflow-auto rounded-lg w-full shadow-md md:self-center'>
        <table className='table-auto w-full h-full'>
          <thead className='bg-gray-50 border-b-2 border-gray-200 top-0 sticky'>
            <tr>
              <th className='text-gray-400 p-3'> Name </th>
              <th className='text-gray-400 p-3'> Age </th>
              <th className='text-gray-400 p-3'> Address </th>
              <th className='text-gray-400 p-3'> Date of Appointment </th>
              <th className='text-gray-400 p-3'> Phone Number </th>
            </tr>
          </thead>
          <tbody
            className='text-center'
            onClick={() => setOpenPatientHistory(true)}
            >
            {patientList.map((val,key) => {
              return (
                <tr className='transition-all hover:cursor-pointer hover:text-white hover:bg-button-lblue' 
                onClick={()=>{setSelectedId(val.patientID); setOpenPatientHistory(true)}}
                >
                  <td className='p-3'>{val.name}</td>
                  <td className='p-3'>{val.age}</td>
                  <td className='p-3'>{val.address}</td>
                  <td className='p-3'>{val.date}</td>
                  <td className='p-3'>{val.phone}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <div className='font-gilmer mx-5 flex flex-col xs:flex-row-reverse pt-5 mt-auto mb-5'>

        <button to='' onClick={() => setOpenAddRxData(true)} className='px-5 py-2 hover:bg-gray-700 shadow-md xs:px-10 xs:ml-auto bg-button-dblue text-white rounded-full transition-all'>Add</button>
      </div>
      <AddRxData open={openAddRxData} onClose={() => setOpenAddRxData(false)}/>
      <PatientHistory  props={propsToPass} openPatientHistory={openPatientHistory} onClosePatientHistory={() => setOpenPatientHistory(false)}/>
    </div>
  )
}