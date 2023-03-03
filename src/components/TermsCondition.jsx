import React from 'react'

export default function TermsCondition({openTerms, onCloseTerms}) {
    if(!openTerms) return null
  return (
    <div className='bg-black/70 text-button-dblue fixed grid place-items-center w-full h-full z-20 top-0 left-0'>
        <div className='w-5/6 flex flex-col gap-2 h-4/5 overflow-auto rounded-2xl shadow-lg px-10 py-5 bg-white'>
            <div className='text-2xl font-gilmer text-center'> Terms and Conditions </div>
            <div>
                <div className='font-gilmer'>Terms and Conditions Acceptance</div>
                <div className='text-sm text-gray-500'>
                    You accept to be bound by the terms and conditions shown below by using the Nolasco-Perez Optical Clinic web-based application software "Web-Based Patient Appointment and Consultation Management System for Nolasco Perez Optical Clinic". You are not permitted to use the Software if you disagree with the Terms and Conditions.
                </div>
            </div>
            <div>
                <div className='font-gilmer'>License</div>
                <div className='text-sm text-gray-500'>
                    You are granted a non-exclusive, non-transferable license by Nolasco-Perez Optical Clinic to use the Software solely for scheduling appointments and handling other patient-related matters at the facility.
                </div>
            </div>
            <div>
                <div className='font-gilmer'>Ownership</div>
                <div className='text-sm text-gray-500'>
                    The Nolasco-Perez Optical Clinic is the sole owner of the software and all associated intellectual property rights.
                </div>
            </div>
            <div>
                <div className='font-gilmer'>Disclaimer</div>
                <div className='text-sm text-gray-500'>
                    Nolasco-Perez Optical Clinic makes no guarantees that the software will fulfill your needs or that it will run without interruptions or errors.
                </div>
            </div>
            <div>
                <div className='font-gilmer'>Liability Limitation</div>
                <div className='text-sm text-gray-500'>
                    Nolasco-Perez Optical Clinic will never be held responsible for any losses, including but not limited to direct, indirect, special, incidental, or consequential damages that result from using or failure to use the software.
                </div>
            </div>
            <div>
                <div className='font-gilmer'>Data Privacy</div>
                <div className='text-sm text-gray-500'>
                    The privacy of the information you give through the Software is something that Nolasco-Perez Optical Clinic is committed to protecting. Your private information, including your medical history, will only be used for the purpose to manage records and give you the best patient care. Except as required by law, we won't disclose your information to any third party without your permission.
                </div>
            </div>
            <div>
                <div className='font-gilmer'>Modifications</div>
                <div className='text-sm text-gray-500'>
                    The Terms and Conditions are subject to change by Nolasco-Perez Optical Clinic at any moment and without prior notice. You have accepted the updated Terms and Conditions if you continue to use the Software after any such modification.
                </div>
            </div>
            <div>
                <div className='font-gilmer'>Regulation Law</div>
                <div className='text-sm text-gray-500'>
                    The laws of the Philippines shall be applicable to the interpretation and application of these Terms and Conditions.
                </div>
            </div>
            <div>
                <div className='font-gilmer'>Contact Information</div>
                <div className='text-sm text-gray-500'>
                    Use the information on our website to get in touch with Nolasco-Perez Optical Clinic if you have any questions about these terms and conditions.
                </div>
            </div>
            <div className='flex items-center text-center cursor-pointer mt-auto self-center lg:w-fit w-full'>
                <div onClick={onCloseTerms} className='w-full flex-shrink-0 bg-button-dblue hover:bg-gray-700 border-button-dblue hover:border-gray-700 text-sm border-4 text-white py-1 px-2 rounded-xl'>
                    Agree and Continue
                </div>
            </div>
        </div>
    </div>
  )
}
