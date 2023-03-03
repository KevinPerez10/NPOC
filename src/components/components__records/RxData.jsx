import React, {useState, useEffect} from 'react'
import Axios from 'axios'

export default function RxData({open, onClose, props}) {
    //Alert
    const handleAlert = () => {
        alert('Success! Changes have been saved.')
    }

    //Open Edit
    if(!open) return null
    const [openEdit, setOpenEdit] = useState(false)

    //Form
    const [dirtyForm, setDirtyForm] = useState(false)
    const markFormDirty = () => setDirtyForm(true)


    // Data
    const [name, setName] = useState('')
    const [date, setDate] = useState('')
    const [address, setAddress] = useState('')
    const [dateOfBirth, setDateOfBirth] = useState('')
    const [phone, setPhone] = useState('')

    const [oculusDextrus, setOculusDextrus] = useState('')
    const [oculusSinister, setOculusSinister] = useState('')
    const [lensPower, setLensPower] = useState('')
    const [frame, setFrame] = useState('')
    const [lens, setLens] = useState('')
    const [tint, setTint] = useState('')

    const [sphP11, setSphP11] = useState('')
    const [sphP12, setSphP12] = useState('')
    const [sphP21, setSphP21] = useState('')
    const [sphP22, setSphP22] = useState('')
    const [pupillaryDistance, setPD] = useState('')

    const [pid, setpid] = useState()

    useEffect(() => {
        Axios.post('https://mysql-npoc.herokuapp.com/recordbyrid', {
          id: props.prop1
        }).then((response) => {
        setOculusDextrus(response.data[0].od);
        setOculusSinister(response.data[0].os);
        setLensPower(response.data[0].addLP);
        setFrame(response.data[0].fr);
        setLens(response.data[0].ln);
        setTint(response.data[0].tn);
        setSphP11(response.data[0].sphere1_1);
        setSphP12(response.data[0].sphere1_2);
        setSphP21(response.data[0].sphere2_1);
        setSphP22(response.data[0].sphere2_2);
        getProfile(response.data[0].patientID);
        setpid(response.data[0].patientID);

        });
      }, []);
      const getProfile = (e) => {
        Axios.post('https://mysql-npoc.herokuapp.com/patientbyid', {
        id:e
      }).then((response) => {
      setName(response.data[0].name);
      setDate(response.data[0].createdAt);
      setAddress(response.data[0].address);
      setDateOfBirth(response.data[0].birthday);
      setPhone(response.data[0].phone)
      });
      } 
      const [amount, setAmount] = useState(0)
      const [payment, setPayment] = useState(0)
      const [balance, setBalance] = useState(0)
  
      useEffect(() => {
        Axios.post('https://mysql-npoc.herokuapp.com/transactionbytid', {
          id:props.prop1
        }).then((response) => {
            setAmount(response.data[0].amount);
            setPayment(response.data[0].payment);
            setBalance(response.data[0].balance);
        });
      }, []);

    // This is for the computation of balance
    // const handleAmountChange = (event => {
    //     setAmount(event.target.value)
    // })

    // const handleDepositChange = (event => {
    //     setDeposit(event.target.value)
    // })
    
    // const handleSubmit = (event => {
    //     event.preventDefault()
    //     setBalance(amount - deposit)
    //     setTotal(amount - deposit+ total)
    // })
    //add record

    const recordRx= (patientID) => {
    Axios.post('https://mysql-npoc.herokuapp.com/addrecord', {
     f:name,
     p:phone,
     od:oculusDextrus,
     os:oculusSinister,
     sp1_1:sphP11,
     sp1_2:sphP12,
     sp2_1:sphP21,
     sp2_2:sphP22,
     pd:pupillaryDistance,
     alp:lensPower,
     fr:frame,
     ln:lens,
     tn:tint,
     pid: patientID
    }).then(()=>{
        console.log("success");
    })
     };
     //add transaction
     const recordTransaction= (patientID) => {
        Axios.post('https://mysql-npoc.herokuapp.com/transaction', {
         a:amount,
         p:payment,
         b:balance,
         pi: patientID
        }).then(()=>{
            console.log("success");
        })
         };
    //update patient profile
    const updatePatient= (patientID) => {
        Axios.post('https://mysql-npoc.herokuapp.com/updatepatientprofile', {
         id:patientID,
         n:name,
         ad:address,
         p:phone,
        }).then(()=>{
            console.log("success");
        })
         };

    function deleteRow(id) {
        Axios.post('https://mysql-npoc.herokuapp.com/deleteappointment', {
            s: id
            })
        }
    const checkDelete = () => {
        if(props.prop2 != 0){
            deleteRow(props.prop2)
        }
    }

    const isEmpty = () => {
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
            recordRx(pid)
            recordTransaction(pid)
            updatePatient(pid)
            onClose()
            handleAlert()
            checkDelete()
        }
        
    }

        //Function of amount, deposit, balance, and total
        useEffect(()=>{
            setBalance(amount-payment)
          },[amount, payment])
  return (
    <div className='fixed grid place-items-center w-full h-full z-20 top-0 left-0'>
        <div className='w-5/6 h-4/5 flex flex-col gap-3 rounded-lg border-2 text-button-dblue shadow-lg px-10 py-5 bg-white'>
            
            {/* Form Group */}
            
            <div
                className='h-full overflow-y-auto overflow-x-hidden'
                onChange={markFormDirty}
            >
                <form
                    className='grid grid-cols-3 w-full'
                >
                        {/* Name */}
                        <div className="col-span-1 items-center border-gray-400 pb-2">
                            <label className='text-gray-300'>
                                Name
                            </label>
                                <p className='text-2xl'>
                                    {name}
                                </p>
                            
                        </div>
                        {/* Date */}
                        <div className="col-start-3 items-center text-right text-gray-400 border-gray-400 pb-2">
                            <label className='text-gray-300 text-left'>
                                Date Created
                            </label>
                            <p>
                                {date}
                            </p>
                        </div>
                        {/* Address */}
                        <div className="col-start-1 items-center border-gray-400 py-2">
                            <label className='text-gray-300'>
                                Address
                            </label>
                                <p>
                                    {address}
                                </p>
                           
                        </div>
                        {/* Date of Birth */}
                        <div className="col-start-1 items-center border-gray-400 py-2">
                            <label className='text-gray-300'>
                                Date of Birth
                            </label>
                                <p>
                                    {dateOfBirth}
                                </p>
                            
                        </div>
                        {/* Phone */}
                        <div className="col-start-3 row-start-2 text-right border-gray-400 py-2">
                            <label className='text-gray-300'>
                                Phone number
                            </label>
                                <p>
                                    {phone}
                                </p>
                            
                        </div>
                        {/* Rx  */}
                        <h1 className='col-start-1 text-button-dblue text-6xl'>Rx</h1>
                </form>
                <form className='grid grid-cols-3 gap-6 w-full'>
                    {/* oculus group */}
                    <div className='flex flex-col w-full'>
                        {/* Oculus Dextrus */}
                        <div className="items-center border-gray-400 py-2">
                            <label className='text-gray-300'>
                                Oculus Dextrus
                            </label>
                            {openEdit ? (
                                <input className={`appearance-none bg-transparent border-b-2 text-gray-700/60 w-full mr-3 py-1 px-2 leading-tight focus:outline-none`}
                                    type="text"
                                    placeholder=''
                                    aria-label='Oculus Dextrus'
                                    value={oculusDextrus}
                                    onChange = {(event) => setOculusDextrus(event.target.value)}
                                />
                                ) : (
                                <p>
                                    {oculusDextrus}
                                </p>
                            )}
                        </div>
                        {/* Oculus Sinister */}
                        <div className="items-center border-gray-400 py-2">
                            <label className='text-gray-300'>
                                Oculus Sinister
                            </label>
                            {openEdit ? (
                                <input className={`appearance-none bg-transparent border-b-2 text-gray-700/60 w-full mr-3 py-1 px-2 leading-tight focus:outline-none`}
                                    type="text"
                                    placeholder=''
                                    aria-label='Oculus Sinister'
                                    value={oculusSinister}
                                    onChange = {(event) => setOculusSinister(event.target.value)}
                                />
                                ) : (
                                <p>
                                    {oculusSinister}
                                </p>
                            )}
                        </div>
                        {/* Additional Lens Power */}
                        <div className="items-center border-gray-400 py-2">
                            <label className='text-gray-300'>
                                Additional Lens Power
                            </label>
                            {openEdit ? (
                                <input className={`appearance-none bg-transparent border-b-2 text-gray-700/60 w-full mr-3 py-1 px-2 leading-tight focus:outline-none`}
                                    type="text"
                                    placeholder=''
                                    aria-label='Additional Lens Power'
                                    value={lensPower}
                                    onChange = {(event) => setLensPower(event.target.value)}
                                />
                                ) : (
                                    <p>
                                    {lensPower}
                                </p>
                            )}
                        </div>
                        {/* Frame */}
                        <div className="flex flex-col border-gray-400 py-2">
                            <label className='text-gray-300'>
                                Frame
                            </label>
                            {openEdit ? (
                                <input className={`appearance-none bg-transparent border-b-2 text-gray-700/60 w-full mr-3 py-1 px-2 leading-tight focus:outline-none`}
                                    type="text"
                                    aria-label='Frame'
                                    value={frame}
                                    onChange = {(event) => setFrame(event.target.value)}
                                />
                                ) : (
                                <p>
                                    {frame}
                                </p>
                            )}
                        </div>
                        {/* Lens */}
                        <div className="flex flex-col border-gray-400 py-2">
                            <label className='text-gray-300'>
                                Lens
                            </label>
                            {openEdit ? (
                                <input className={`appearance-none bg-transparent border-b-2 text-gray-700/60 w-full mr-3 py-1 px-2 leading-tight focus:outline-none`}
                                    type="text"
                                    aria-label='Lens'
                                    value={lens}
                                    onChange = {(event) => setLens(event.target.value)}
                                />
                                ) : (
                                <p>
                                    {lens}
                                </p>
                            )}
                        </div>
                        {/* Tint */}
                        <div className="flex flex-col border-gray-400 py-2">
                            <label className='text-gray-300'>
                                Tint
                            </label>
                            {openEdit ? (
                                <input className={`appearance-none bg-transparent border-b-2 text-gray-700/60 w-full mr-3 py-1 px-2 leading-tight focus:outline-none`}
                                    type="text"
                                    aria-label='Tint'
                                    value={tint}
                                    onChange = {(event) => setTint(event.target.value)}
                                />
                                ) : (
                                <p>
                                    {tint}
                                </p>
                            )}
                        </div>
                    </div>
                    {/* sph and pupil group */}
                    <div className='flex flex-col justify-around w-full'>
                        {/* SPHERE POWER 1 */}
                        <div className="flex flex-col justify-between w-full">
                            <label className='text-gray-300'>
                                Sphere Power 1
                            </label>
                            <div className='flex w-full justify-around'>
                                {/* Sphere Power 1.1 */}
                                <div className="mx-3 w-1/2 flex flex-col items-center border-gray-400 py-2">
                                    {openEdit ? (
                                        <input className={`appearance-none bg-transparent border-b-2 text-gray-700/60 w-full mr-3 py-1 px-2 leading-tight focus:outline-none`}
                                            type="text"
                                            aria-label='Sphere Power 1.1'
                                            value={sphP11}
                                            onChange = {(event) => setSphP11(event.target.value)}
                                        />
                                        ) : (
                                        <p>
                                            {sphP11}
                                        </p>
                                    )}
                                </div>
                                {/* Sphere Power 1.2 */}
                                <div className="mx-3 w-1/2 flex items-center border-gray-400 py-2">
                                    {openEdit ? (
                                        <input className={`appearance-none bg-transparent border-b-2 text-gray-700/60 w-full mr-3 py-1 px-2 leading-tight focus:outline-none`}
                                            type="text"
                                            aria-label='Sphere Power 1.2'
                                            value={sphP12}
                                            onChange = {(event) => setSphP12(event.target.value)}
                                        />
                                        ) : (
                                        <p>
                                            {sphP12}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                        {/* SPHERE POWER 2 */}
                        <div className="flex flex-col justify-between w-full">
                            <label className='text-gray-300'>
                                Sphere Power 2
                            </label>
                            <div className='flex w-full justify-around'>
                                {/* Sphere Power 2.1 */}
                                <div className="mx-3 w-1/2 flex flex-col items-center border-gray-400 py-2">
                                    {openEdit ? (
                                        <input className={`appearance-none bg-transparent border-b-2 text-gray-700/60 w-full mr-3 py-1 px-2 leading-tight focus:outline-none`}
                                            type="text"
                                            aria-label='Sphere Power 2.1'
                                            value={sphP21}
                                            onChange = {(event) => setSphP21(event.target.value)}
                                        />
                                        ) : (
                                        <p>
                                            {sphP21}
                                        </p>
                                    )}
                                </div>
                                {/* Sphere Power 2.2 */}
                                <div className="mx-3 w-1/2 flex items-center border-gray-400 py-2">
                                    {openEdit ? (
                                        <input className={`appearance-none bg-transparent border-b-2 text-gray-700/60 w-full mr-3 py-1 px-2 leading-tight focus:outline-none`}
                                            type="text"
                                            aria-label='Sphere Power 2.2'
                                            value={sphP22}
                                            onChange = {(event) => setSphP22(event.target.value)}
                                        />
                                        ) : (
                                        <p>
                                            {sphP22}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                        {/* Pupillary Distance */}
                        <div className="items-center border-gray-400 py-2">
                            <label className='text-gray-300'>
                                Pupillary Distance
                            </label>
                            {openEdit ? (
                                <input className={`appearance-none bg-transparent border-b-2 text-gray-700/60 w-full mr-3 py-1 px-2 leading-tight focus:outline-none`}
                                    type="text"
                                    aria-label='Pupillary Distance'
                                    value={pupillaryDistance}
                                    onChange = {(event) => setPD(event.target.value)}
                                />
                                ) : (
                                    <p>
                                    {pupillaryDistance}
                                </p>
                            )}
                        </div>
                    </div>
                    {/* Amount group */}
                    <div className='flex flex-col place-self-center w-full'>
                        {/* Amount */}
                        <div className="flex flex-col border-gray-400 py-2">
                            <label className='text-gray-300'>
                                Price
                            </label>
                            {openEdit ? (
                                <input className={`appearance-none bg-transparent border-b-2 text-gray-700/60 w-full mr-3 py-1 px-2 leading-tight focus:outline-none`}
                                    type="number"
                                    placeholder='0'
                                    aria-label='Amount'
                                    value={amount}
                                    onChange = {(event) => (
                                        event.target.value == ''? setAmount(0) : setAmount(event.target.value)
                                      )}
                                />
                            ) : (
                                <p>
                                    {amount}
                                </p>
                            )}
                        </div>
                        {/* Deposit */}
                        <div className="flex flex-col border-gray-400 py-2">
                            <label className='text-gray-300'>
                                Payment
                            </label>
                            {openEdit ? (
                                <input className={`appearance-none bg-transparent border-b-2 text-gray-700/60 w-full mr-3 py-1 px-2 leading-tight focus:outline-none`}
                                    type="number"
                                    placeholder='0'
                                    aria-label='Payment'
                                    value={payment}
                                    onChange = {(event) => (
                                        event.target.value == ''? setPayment(0) : setPayment(event.target.value)
                                      )}
                                />
                            ) : (
                                <p>
                                    {payment}
                                </p>
                            )}
                        </div>
                        {/* Balance */}
                        <div className="flex flex-col border-gray-400 py-2">
                            <label className='text-gray-300'>
                                Balance
                            </label>
                            {openEdit ? (
                                <input className={`appearance-none bg-transparent border-b-2 text-gray-700/60 w-full mr-3 py-1 px-2 leading-tight focus:outline-none`}
                                    type="number"
                                    aria-label='Balance'
                                    value={balance}
                                    disabled
                                />
                            ) : (
                                <p>
                                    {balance}
                                </p>
                            )}
                        </div>
                    </div>
                </form>
            </div>

            {/* Button Group */}
            <div className='flex justify-between gap-2 w-full'>
                <div
                    className={`w-1/4 bg-gray-500 self-start text-center cursor-pointer hover:bg-gray-700 border-gray-500 hover:border-gray-700 text-sm border-4 text-white py-1 px-10 rounded-xl shadow-lg ${openEdit ? 'hidden' : ''}`}
                    onClick={onClose}
                    >
                    Cancel
                </div>
                <div
                    className={`w-1/4 mr-auto  bg-gray-500 self-start text-center cursor-pointer hover:bg-gray-700 border-gray-500 hover:border-gray-700 text-sm border-4 text-white py-1 px-10 rounded-xl shadow-lg ${openEdit ? '' : 'hidden'}`}
                    onClick={() => setOpenEdit(false)}
                    >
                    Cancel Add
                </div>
                <div
                    className={`w-1/4 bg-button-dblue border-button-dblue self-start text-center cursor-pointer hover:bg-gray-700 hover:border-gray-700 text-sm border-4 text-white py-1 px-10 rounded-xl shadow-lg
                        ${openEdit && dirtyForm ? '' : 'hidden'}
                    `}
                    onClick={() => {
                       isEmpty()
                    }}
                >
                    Save
                </div>
                <div
                    className={`ml-auto w-1/4 bg-button-dblue border-button-dblue self-start text-center cursor-pointer hover:bg-gray-700 hover:border-gray-700 text-sm border-4 text-white py-1 px-10 rounded-xl shadow-lg ${openEdit ? 'hidden' : ''}`}
                    onClick={() => setOpenEdit(true)}
                    >
                    Add
                </div>
                {/*<div
                    className={`w-10 grid place-items-center bg-button-dblue text-white rounded-full cursor-pointer hover:bg-gray-700 hover:border-gray-700 text-3xl ${openEdit ? 'hidden' : ''}`}
                    
                    >
                    <ion-icon name="print-outline"></ion-icon>
                </div>*/}
            </div>
        </div>
    </div>
  )
}
