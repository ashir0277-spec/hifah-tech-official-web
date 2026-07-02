import React from 'react'
import loaderIcon from '../../../assets/icons/tick-white.svg'

const SuccessPopup = ({text}) => {
    
  return (
    <div className='fixed shadow-xl rounded-lg top-16 right-10 z-50 bg-green-500'>
        <div className='rounded-lg w-[350px] sm:w-[450px] shadow-lg p-5'>
        <div className='flex items-center gap-4'>
            <img src={loaderIcon} alt="icon" />
            <div>
                <h3 className='inter font-medium text-[15px] sm:text-[20px] text-[#fff]'>{text}</h3>
            </div>
        </div>
        </div>
    </div>
  )
}

export default SuccessPopup