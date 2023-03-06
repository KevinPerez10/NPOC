import React, {useState, useEffect} from 'react'
import Main__Reports from './Main__Reports'
import Axios from 'axios'

export default function ComponentsDashboard() {
    const [prop, setProp] = useState([]);
    const [openReport, setOpenReport] = useState(false)
    const [patientList, setPatientList] = useState([])
    const [appointmentList, setAppointmentList] = useState([])
    const [recordList, setRecordList] = useState([])
    const [withBalance, setWithBalance] = useState([])
    const [search, setSearch] = useState("");
    const [salesThisMonth, setSalesThisMonth] = useState([])
    const [salesLastMonth, setSalesLastMonth] = useState([])
    const [salesThisYear, setSalesThisYear] = useState([])
    const [salesLastYear, setSalesLastYear] = useState([])
    const [first, setFirst] = useState("MONTH(records.createdAt) = MONTH(CURRENT_DATE - INTERVAL 0 MONTH) AND ")
    const [second, setSecond] = useState("0 MONTH")
    const [one, setOne] = useState("MONTH(createdAt) = MONTH(CURRENT_DATE - INTERVAL 0 MONTH) AND ")
    const [two, setTwo] = useState("0 MONTH")
    const [amount, setAmount] = useState([])

    const [recordCount, setRecordCount] = useState([])
    const [newpatients, setNewPatients] = useState([])
    const [newRecord, setNewRecord] = useState([])
    const [visits, setVisits] = useState([])
    useEffect(() => {
        Axios.post('https://mysql-npoc.herokuapp.com/allpatients').then((response) => {
        setPatientList(response.data);
        });
      },[]);
      //Visits
      useEffect(() => {
        Axios.post('https://mysql-npoc.herokuapp.com/visits').then((response) => {
        setVisits(response.data);
        });
      },[]);
      useEffect(() => {

        //sales table
        Axios.post('https://mysql-npoc.herokuapp.com/allrecords', {
            f: first,
            s: second
        }).then((response) => {
        setRecordList(response.data);
        });
      },[first, second]);

    useEffect(()=>{

        //totals
        Axios.post('https://mysql-npoc.herokuapp.com/tableamount', {
            f: one,
            s: two
        }).then((response) => {
        setAmount(response.data[0]);
        });
    },[one,two])

    useEffect(() => {
        Axios.post('https://mysql-npoc.herokuapp.com/withbalance',{
            s:search
        }).then((response) => {
        setWithBalance(response.data);
        });
      }, [withBalance]);

      useEffect(() => {
        Axios.post('https://mysql-npoc.herokuapp.com/checkappointments').then((response) => {
        setAppointmentList(response.data);
        });
      },[]);
      //this month sales
      useEffect(()=>{
        Axios.post('https://mysql-npoc.herokuapp.com/monthsales', {
            f: "MONTH(createdAt) = MONTH(CURRENT_DATE - INTERVAL 0 MONTH) AND ",
            s: "0 MONTH"
        }).then((response) => {
        setSalesThisMonth(response.data[0]);
        });
      },[])
      //last month sales
      useEffect(()=>{
        Axios.post('https://mysql-npoc.herokuapp.com/monthsales', {
            f: "MONTH(createdAt) = MONTH(CURRENT_DATE - INTERVAL 1 MONTH) AND ",
            s: "1 MONTH"
        }).then((response) => {
        setSalesLastMonth(response.data[0]);
        });
      },[])
      //this year sales
      useEffect(()=>{
        Axios.post('https://mysql-npoc.herokuapp.com/yearsales', {
            c: 0
        }).then((response) => {
            setSalesThisYear(response.data[0]);
        });
      },[])
      //last year sales
      useEffect(()=>{
        Axios.post('https://mysql-npoc.herokuapp.com/yearsales', {
            c: 1
        }).then((response) => {
            setSalesLastYear(response.data[0]);
        });
      },[])
       //record count
       useEffect(()=>{
        Axios.post('https://mysql-npoc.herokuapp.com/recordcount', {
            add: ""
        }).then((response) => {
            setRecordCount(response.data);
        });
      },[])
      //new patients
      useEffect(()=>{
        Axios.post('https://mysql-npoc.herokuapp.com/newpatients', {
        }).then((response) => {
            setNewPatients(response.data[0]);
        });
      },[])
      //new records
      useEffect(()=>{
        Axios.post('https://mysql-npoc.herokuapp.com/recordcount', {
            add: "WHERE MONTH(createdAt) = MONTH(CURRENT_DATE()) AND YEAR(createdAt) = YEAR(CURRENT_DATE())"
        }).then((response) => {
            setNewRecord(response.data);
        });
      },[])
      function thisMonth(deduction){
        const monthNames = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
          ];
        const date = new Date()
        return monthNames[date.getMonth()-deduction]
      }

      function thisYear(deduction){
        const date = new Date()
        return (date.getFullYear()-deduction)
      }

    function displayLength(arr){
        if (arr.length < 10) {
            return '0' + arr.length
        } else {
            return arr.length
        }
    }
    const getDate = (date) => {
        const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
        var myDate = new Date(date)
        return monthNames[myDate.getMonth()] + " " + myDate.getDate() + ", " + myDate.getFullYear();
      }

      function addCommas(num) {
        if (num==undefined) {
            return 0;
        }
        else{
        let strNum = num.toString();

        let parts = strNum.split(".");
        let wholeNum = parts[0];
        let decimal = parts[1] ? "." + parts[1] : "";
        let numWithCommas = wholeNum.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return numWithCommas + decimal;
        }
      }

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


  return (
    <div>
        <div className='text-2xl md:px-5 grid lg:grid-cols-2 gap-4'>
                <div className='lg:col-span-1 col-span-2 font-gilmer text-button-lblue bg-white flex flex-col justify-center items-center py-20 rounded shadow-md'>
                    <div>All Patients</div>
                    <div>{displayLength(patientList)}</div>
                </div>
                <div className='lg:col-span-1 col-span-2 font-gilmer text-button-lblue bg-white flex flex-col justify-center items-center py-20 rounded shadow-md'>
                    <div>New Patients</div>
                    <div>({thisMonth(0)})</div>
                    <div>{newpatients.np<10?"0"+newpatients.np:newpatients.np}</div>
                </div>
                <div className='lg:col-span-1 col-span-2 font-gilmer text-button-lblue bg-white flex flex-col justify-center items-center py-20 rounded shadow-md'>
                    <div>All Records</div>
                    <div>{displayLength(recordCount)}</div>
                </div>
                <div className='lg:col-span-1 col-span-2 font-gilmer text-button-lblue bg-white flex flex-col justify-center items-center py-20 rounded shadow-md'>
                    <div>Recent Records</div>
                    <div>({thisMonth(0)})</div>
                    <div>{displayLength(newRecord)}</div>
                </div>
                <div className='col-span-2 font-gilmer text-button-lblue bg-white flex flex-col justify-center items-center py-20 rounded shadow-md'>
                    <div>Pending Appointments</div>
                    <div>{displayLength(appointmentList)}</div>
                </div>
                <br></br>
                {/* Pending Transactions Table */}
                <div className='col-span-2 flex flex-col items-center rounded shadow-md bg-white'>
                    <div className='font-gilmer text-button-lblue pt-10'>
                        Pending Transactions
                    </div>
                    {/* Search Bar */}
                    <div className='flex gap-2 items-center'>
                        <input
                        className='flex justify-between text-gray-400 p-3 w-fit rounded-full shadow-lg px-5 py-2 my-3'
                        placeholder='Search'
                        onChange={(event)=>{setSearch("and name like '%" + event.target.value + "%'")}}
                    />
                        <div className='p-3 flex justify-center rounded-full shadow-lg cursor-pointer'>
                        <ion-icon name="search-outline"></ion-icon>
                        </div>
                    </div>
                    {/* Table */}
                    <div className='lg:col-span-2 h-80 overflow-auto w-full shadow-md md:self-center'>
                        <table className='table-auto w-full'>
                            <thead className='w-full bg-gray-100 shadow-lg top-0 sticky'>
                                <tr>
                                    <th className='text-gray-400 p-3'> Name </th>
                                    <th className='text-gray-400 p-3'> Contact </th>
                                    <th className='text-gray-400 p-3'> Balance </th>
                                    <th className='text-gray-400 p-3'> Date </th>
                                </tr>
                            </thead>
                            <tbody
                                className='text-center'
                                onClick={() => setOpenReport(true)}
                            >
                                {withBalance.map((val,key) => {
                                return (
                                    <tr
                                        className='transition-all hover:cursor-pointer hover:bg-slate-200'
                                        onClick={()=>{setProp(val); setOpenReport(true)}}
                                    >
                                        <td className='p-3'>
                                            {val.name}
                                        </td>
                                        <td className='p-3'>
                                            {val.phone}
                                        </td>
                                        <td className='p-3'>
                                            {addCommas(val.balance)}
                                        </td>
                                        <td className='p-3'>
                                            {getDate(val.createdAt)}
                                        </td>
                                    </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
                <br></br>
                {/* Sales Report */}
                <div className='col-span-2 flex flex-col items-center rounded shadow-md bg-white'>
                    <div className='font-gilmer text-button-lblue py-10 flex flex-col gap-3 items-center justify-center w-full px-3'>
                        Sales Report
                        <div className='flex justify-around w-full gap-5'>
                            <div onClick={()=>{
                                setFirst("MONTH(records.createdAt) = MONTH(CURRENT_DATE - INTERVAL 0 MONTH) AND ");
                                setSecond("0 MONTH");
                                setOne("MONTH(createdAt) = MONTH(CURRENT_DATE - INTERVAL 0 MONTH) AND ");
                                setTwo("0 MONTH");
                            }} className='hover:bg-slate-200 transition-all w-full font-gilmer text-button-lblue bg-white flex flex-col justify-center items-center py-20 rounded-lg shadow-md'>
                                This Month
                                <div className='flex flex-col items-center text-sm text-gray-400'>
                                    <div>
                                        {thisMonth(0)} {thisYear(0)}
                                    </div>
                                    <div>
                                        {addCommas(salesThisMonth.total_amount)}
                                    </div>
                                </div>
                            </div>
                            <div 
                            onClick={()=>{
                                setFirst("MONTH(records.createdAt) = MONTH(CURRENT_DATE - INTERVAL 1 MONTH) AND ");
                                setSecond("1 MONTH");
                                setOne("MONTH(createdAt) = MONTH(CURRENT_DATE - INTERVAL 1 MONTH) AND ");
                                setTwo("1 MONTH");
                            }}
                            className='hover:bg-slate-200 transition-all w-full font-gilmer text-button-lblue bg-white flex flex-col justify-center items-center py-20 rounded-lg shadow-md'>
                                Last Month
                                <div className='flex flex-col items-center text-sm text-gray-400'>
                                    <div>
                                        {thisMonth(1)} {thisYear(0)}
                                    </div>
                                    <div>
                                        {addCommas(salesLastMonth.total_amount)}
                                    </div>
                                </div>
                            </div>
                            <div 
                            onClick={()=>{
                                setFirst("");
                                setSecond("0 YEAR");
                                setOne("");
                                setTwo("0 YEAR");
                            }}
                            className='hover:bg-slate-200 transition-all w-full font-gilmer text-button-lblue bg-white flex flex-col justify-center items-center py-20 rounded-lg shadow-md'>
                                This Year
                                <div className='flex flex-col items-center text-sm text-gray-400'>
                                    <div>
                                        {thisYear(0)}
                                    </div>
                                    <div>
                                        {addCommas(salesThisYear.total_amount)}
                                    </div>
                                </div>
                            </div>
                            <div 
                            onClick={()=>{
                                setFirst("");
                                setSecond("1 YEAR");
                                setOne("");
                                setTwo("1 YEAR");
                            }}
                            className='hover:bg-slate-200 transition-all w-full font-gilmer text-button-lblue bg-white flex flex-col justify-center items-center py-20 rounded-lg shadow-md'>
                                Last Year
                                <div className='flex flex-col items-center text-sm text-gray-400'>
                                    <div>
                                        {thisYear(1)}
                                    </div>
                                    <div>
                                        {addCommas(salesLastYear.total_amount)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Table */}
                    <div className='lg:col-span-2 h-80 overflow-auto w-full shadow-md md:self-center'>
                        <table className='table-auto w-full'>
                            <thead className='w-full bg-gray-100 shadow-lg top-0 sticky'>
                                <tr>
                                    <th className='text-gray-400 p-3'> Name </th>
                                    <th className='text-gray-400 p-3'> Frame </th>
                                    <th className='text-gray-400 p-3'> Lens </th>
                                    <th className='text-gray-400 p-3'> Price </th>
                                    <th className='text-gray-400 p-3'> Payment </th>
                                    <th className='text-gray-400 p-3'> Balance </th>
                                    <th className='text-gray-400 p-3'> Date </th>
                                </tr>
                            </thead>
                            <tbody
                                className='text-center'
                            >
                                 {recordList.map((val,key) => {
                                return (
                                    <tr
                                        className='transition-all hover:cursor-pointer hover:bg-slate-200 text-sm'
                                    >
                                        <td className='p-3'>
                                            {val.name}
                                        </td>
                                        <td className='p-3'>
                                            {val.fr}
                                        </td>
                                        <td className='p-3'>
                                            {val.ln}
                                        </td>
                                        <td className='p-3'>
                                            {addCommas(val.amount)}
                                        </td>
                                        <td className='p-3'>
                                            {addCommas(val.payment)}  
                                        </td>
                                        <td className='p-3'>
                                            {addCommas(val.balance)}
                                        </td>
                                        <td className='p-3'>
                                            {getDate(val.createdAt)}
                                        </td>
                                    </tr>
                                    )
                                    })} 
                            </tbody>
                            <thead className='w-full bg-gray-100 shadow-lg bottom-0 border-t-2 sticky'>
                                <tr>
                                    <th className='text-gray-400 p-3'> Total </th>
                                    <th className='text-gray-400 p-3'>  </th>
                                    <th className='text-gray-400 p-3'> </th>
                                    <th className='text-gray-400 p-3'> {addCommas(amount.total_amount)} </th>
                                    <th className='text-gray-400 p-3'> {addCommas(amount.total_payment)} </th>
                                    <th className='text-gray-400 p-3'> {addCommas(amount.total_balance)} </th>
                                    <th className='text-gray-400 p-3'> </th>
                                </tr>
                            </thead>
                        </table>
                    </div>
                </div>
                
                <Main__Reports props={prop} open={openReport} onClose={() => setOpenReport(false)}/>
                
                {/* Recent Visits */}
                <br></br>
                 <div className='bg-white flex flex-col justify-center items-center py-20 rounded shadow-md col-span-2'>
                    <div className='font-gilmer text-button-lblue mb-3'>Recent Visits</div>
                    <div className='text-sm lg:text-xl flex flex-col text-white w-5/6 h-60 overflow-auto'>
                    {visits.map((val,key) => {
                                return (
                        <div className='bg-button-lblue flex flex-col sm:flex-row sm:justify-between items-center py-5 px-10 my-2'>
                            <div>{getTime(val.createdAt)}</div>
                            <div>{getDate(val.createdAt)}</div>
                            <div>
                                {val.name}
                            </div>
                            <div>{val.role}</div>
                        </div>
                            )
                            })} 
                        
                    </div>
                </div>
        </div>
    </div>
  )
}
