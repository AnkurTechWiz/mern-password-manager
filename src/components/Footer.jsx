import React from 'react'

const Footer = () => {
  return (
    <div className='bg-slate-800 text-white flex flex-col justify-center items-center mt-auto w-full'>

      <div className='logo cursor-pointer  font-bold text-white text-2xl'>
        <span className='text-green-500'>&lt;</span>PassOp<span className='text-green-500'>/&gt;</span>
      </div>

      <div className='flex  justify-center items-center'>Created with <img className='w-7 mx-2 ' src="icons/heart.png" alt="heart" />by Ankur Sahu</div>
    </div>
  )
}

export default Footer