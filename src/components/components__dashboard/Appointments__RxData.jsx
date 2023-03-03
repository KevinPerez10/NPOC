import React, {useState} from 'react'
import axios from 'axios'
import { useEffect } from 'react';

export default function Appointments__RxData({open, onClose, props}) {
    //patient info

      const recordInfo = () => {
        const name = props.name;
        const bd = changeformat(props.birthday);
      
        return new Promise((resolve, reject) => {
          axios.post('https://mysql-npoc.herokuapp.com/addinfo', {
            f: name,
            ad: props.address,
            p: props.phone,
            b: bd
          })
            .then(() => {
              console.log("success");
              resolve();
            })
            .catch((error) => {
              reject(error);
            });
        });
      };
      
    function changeformat(d){
        const tdate = new Date(d)
        return (tdate.getFullYear() + "-" + (tdate.getMonth()+1) + "-" + tdate.getDate())
    }

    async function getpatientID(){
        let response = await axios.post('https://mysql-npoc.herokuapp.com/patientid')
        return (response.data[0].patientID);
    };

    //patient rx
    const [oculusDextrus, setOculusDextrus] = useState("");
    const [oculusSinister, setOculusSinister] = useState("");
    const [sphere1_1, setSphere1_1] = useState("");
    const [sphere1_2, setSphere1_2] = useState("");
    const [sphere2_1, setSphere2_1] = useState("");
    const [sphere2_2, setSphere2_2] = useState("");
    const [pupillaryDistance, setPupillaryDistance] = useState("");
    const [addLP, setAddLP] = useState("");
    const [frame, setFrame] = useState("");
    const [lens, setLens] = useState("");
    const [tint, setTint] = useState("");

    //add record
    const recordRx= (patientID) => {
        axios.post('https://mysql-npoc.herokuapp.com/addrecord', {
            f:props.name,
            p:props.phone,
            od:oculusDextrus,
            os:oculusSinister,
            sp1_1:sphere1_1,
            sp1_2:sphere1_2,
            sp2_1:sphere2_1,
            sp2_2:sphere2_2,
            pd:pupillaryDistance,
            alp:addLP,
            fr:frame,
            ln:lens,
            tn:tint,
            pid: patientID
        }).then(()=>{
            console.log("success");
        })
    };

    //add transaction
    const [amount, setAmount] = useState(0);
    const [payment, setPayment] = useState(0);
    const [balance, setBalance] = useState(0);

    const recordTransaction= (patientID) => {
        axios.post('https://mysql-npoc.herokuapp.com/transaction', {
         a:amount,
         p:payment,
         b:balance,
         pi: patientID
        }).then(()=>{
            console.log("success");
        })
    };

    //date
    var today = new Date();

    const getDate = (date) => {
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"];
        var daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        var myDate = new Date(date)
        return monthNames[myDate.getMonth()] + " " + myDate.getDate() + ", " + myDate.getFullYear() + " (" + daysOfWeek[myDate.getDay()] + ")";
    }

    const clearRx= () => {
        setOculusDextrus("");
        setOculusSinister("");
        setSphere1_1("");
        setSphere1_2("");
        setSphere2_1("");
        setSphere2_2("");
        setPupillaryDistance("");
        setAddLP("");
        setFrame("");
        setLens("");
        setTint("");
    }

    const clearTransaction= () => {
        setAmount(0);
        setPayment(0);
        setBalance(0);
    }
    function deleteRow(id) {
        axios.post('https://mysql-npoc.herokuapp.com/deleteappointment', {
              s: id
            }).then(()=>{
                onClose()
            })
      }
    async function recordSubmit()
    {
        await recordInfo()
        const pid = await getpatientID()
        console.log(pid)
        recordRx((pid-1)+"4")
        recordTransaction((pid-1)+"4")
        clearRx()
        clearTransaction()
        deleteRow(props.id)
    }

    function isEmpty(){
        if ((amount>2147483647)||(payment>2147483647)||(balance>2147483647)) {
            alert("Amount of transaction must not exceed to 2,147,483,647");
        }
        else if ((!Number.isInteger(Number(amount)))||(!Number.isInteger(Number(payment)))||(!Number.isInteger(Number(balance)))) {
          alert("Amount must be an integer");
        }
        else if (payment>amount) {
            alert("payment must be lower or exact to the price");
          }
        else {
            recordSubmit();
        }
      }

const getFormat = (date) => {
      const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];
      var myDate = new Date(date)
      return monthNames[myDate.getMonth()] + " " + myDate.getDate() + ", " + myDate.getFullYear();
    }

    useEffect(()=>{
        setBalance(amount-payment)
      },[amount, payment])

    if(!open) return null
  return (
    <div>
        <div className='overlay bg-black/70 fixed w-full h-full z-10 top-0 left-0'>
        <div className='grid place-items-center h-full'>
            <div className='text-xs h-fit w-5/6 flex flex-col justify-center items-center rounded-lg shadow-lg px-10 py-5 bg-white'>
            <h2 className="text-lg text-center mb-4 self-start"> New Patient </h2>
            <hr className='w-full border-black'/>

            {/* Form Group */}
            <div className='py-5'>
                <form className='grid grid-cols-3 w-full'>
                        {/* Name */}
                        <div className="col-span-1 items-center border-b border-gray-400 py-2">
                        <div className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none">
                        {props.name}
                        </div>
                        </div>
                        {/* Date */}
                        <div className="col-start-3 items-center text-right text-gray-400 border-gray-400 py-2">
                        {getDate(today)}
                        </div>
                        {/* Address */}
                        <div className="col-start-1 flex items-center border-b border-gray-400 py-2">
                        <div className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                            >
                        {props.address}
                        </div>
                        </div>
                        {/* Date of Birth */}
                        <div className="col-start-1 flex items-center border-b border-gray-400 py-2">
                        <div className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                            >
                        {getFormat(props.birthday)}
                         </div>
                        </div>
                        {/* Phone */}
                        <div className="col-start-3 row-start-2 flex text-right items-center border-b border-gray-400 py-2">
                            <div className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none">
                        {props.phone}
                            </div>
                        </div>
                        
                        {/* Rx  */}
                        <h1 className='col-start-1 text-button-dblue text-6xl'>Rx</h1>
                </form>
                <form className='grid grid-cols-3 gap-6 w-full'>
                {/* oculus group */}
                <div className='flex flex-col'>
                    {/* Oculus Dextrus */}
                    <div className="flex items-center border-b border-gray-400 py-2">
                    <input className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                        type="text"
                        placeholder="Oculus Dextrus"
                        aria-label="oculusDextrus"
                        onChange={(event) => (
                        setOculusDextrus(event.target.value)
                        )}/>
                    </div>
                    {/* Oculus Sinister */}
                    <div className="flex items-center border-b border-gray-400 py-2">
                    <input className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                        type="text"
                        placeholder="Oculus Sinister"
                        aria-label="oculusSinister"
                        onChange={(event) => (
                        setOculusSinister(event.target.value)
                        )}/>
                    </div>
                    {/* Additional Lens Power */}
                    <div className="flex items-center border-b border-gray-400 py-2">
                    <input className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                        type="text"
                        placeholder="Additional Lens Power"
                        aria-label="oculusSinister"
                        onChange={(event) => (
                        setAddLP(event.target.value)
                        )}/>
                    </div>
                    {/* Frame */}
                    <div className="flex items-center border-b border-gray-400 py-2">
                    <input className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                        type="text"
                        placeholder="Frame"
                        aria-label="frame"
                        onChange={(event) => (
                        setFrame(event.target.value)
                        )}/>
                    </div>
                    {/* Lens */}
                    <div className="flex items-center border-b border-gray-400 py-2">
                    <input className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                        type="text"
                        placeholder="Lens"
                        aria-label="lens"
                        onChange={(event) => (
                        setLens(event.target.value)
                        )}/>
                    </div>
                    {/* Tint */}
                    <div className="flex items-center border-b border-gray-400 py-2">
                    <input className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                        type="text"
                        placeholder="Tint"
                        aria-label="tint"
                        onChange={(event) => (
                        setTint(event.target.value)
                        )}/>
                    </div>
                </div>
                {/* sph and pupil group */}
                <div className='flex flex-col'>
                    <div className="flex justify-between">
                    {/* Sphere Power 1.1 */}
                    <div className="mx-3 before:self-start before:content-['Sphere_Power_1'] before:text-gray-700 flex flex-col items-center border-b border-gray-400 py-2">
                        <input className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                        type="text"
                        placeholder=""
                        aria-label="spherePower1.1"
                        onChange={(event) => (
                            setSphere1_1(event.target.value)
                        )}/>
                    </div>
                    {/* Sphere Power 1.2 */}
                    <div className="mx-3 flex items-center border-b border-gray-400 py-2">
                        <input className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                        type="text"
                        placeholder=""
                        aria-label="spherePower1.2"
                        onChange={(event) => (
                            setSphere1_2(event.target.value)
                        )}/>
                    </div>
                    </div>
                    <div className="flex justify-between">
                    {/* Sphere Power 1.1 */}
                    <div className="mx-3 before:self-start before:content-['Sphere_Power_2'] before:text-gray-700 flex flex-col items-center border-b border-gray-400 py-2">
                        <input className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                        type="text"
                        placeholder=""
                        aria-label="spherePower1.1"
                        onChange={(event) => (
                            setSphere2_1(event.target.value)
                        )}/>
                    </div>
                    {/* Sphere Power 1.2 */}
                    <div className="mx-3 flex items-center border-b border-gray-400 py-2">
                        <input className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                        type="text"
                        placeholder=""
                        aria-label="spherePower1.2"
                        onChange={(event) => (
                            setSphere2_2(event.target.value)
                        )}/>
                    </div>
                    </div>
                    {/* Pupillary Distance */}
                    <div className="col-span-2 flex items-center border-b border-gray-400 py-2">
                    <input className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                        type="text"
                        placeholder="Pupillary Distance"
                        aria-label="pupillaryDistance"
                        onChange={(event) => (
                        setPupillaryDistance(event.target.value)
                        )}/>
                    </div>
                </div>
                {/* amount group */}
                <div className='flex flex-col'>
                    {/* Amount */}
                    <div className="flex items-center border-b border-gray-400 py-2">
                    <input className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                        type="number"
                        placeholder="Price"
                        aria-label="amount"
                        onChange={(event) => (
                        event.target.value == ''? setAmount(0) : setAmount(event.target.value)
                        )}/>
                    </div>
                    {/* Payment */}
                    <div className="flex items-center border-b border-gray-400 py-2">
                    <input className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                        type="number"
                        placeholder="Payment"
                        aria-label="Payment"
                        onChange={(event) => (
                        event.target.value == ''? setPayment(0) : setPayment(event.target.value)
                        )}/>
                    </div>
                    {/* Balance */}
                    <div className="flex items-center border-b border-gray-400 py-2">
                    <input className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                        type="text"
                        placeholder="Balance"
                        aria-label="balance"
                        value={"Balance: " + balance}
                    disabled/>
                    </div>
                </div>
                </form>
            </div>
            <hr className='w-full border-black'/>    
            {/* Buttons */}
            <div className="flex justify-between w-full mt-5">
                <button onClick={()=>{
              onClose()
              clearTransaction()
              clearRx()
              }} className="border-none col-start-1 border-4 text-white bg-gray-500 hover:bg-gray-700 hover:text-red-500 text-sm py-1 px-10 rounded-full">
                    Cancel
                </button>
                <button className="border-none bg-button-dblue hover:bg-gray-700 text-sm border-4 text-white py-2 px-10 rounded-full shadow-lg"
                        type="submit" onClick={isEmpty}>
                    Add
                </button>
            </div>
            </div>
        </div>
        </div>
    </div>
  )
}
