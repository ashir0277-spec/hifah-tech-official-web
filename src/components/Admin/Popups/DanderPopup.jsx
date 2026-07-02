import React from 'react'
import warn from '../../../assets/icons/warn.svg'

const DangerPopup = ({text}) => {
  return (
    <div className='fixed shadow-xl rounded-lg top-16 right-10 z-50 bg-red-500'>
            <div className='rounded-lg w-[350px] sm:w-[450px] shadow-lg p-5'>
            <div className='flex items-center gap-4'>
                <img src={warn} alt="icon" />
                <div>
                    <h3 className='inter font-medium text-[15px] sm:text-[20px] text-[#fff]'>{text}</h3>
                </div>
            </div>
            </div>
        </div>
  )
}

export default DangerPopup