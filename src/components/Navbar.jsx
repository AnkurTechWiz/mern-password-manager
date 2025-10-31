import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-slate-800 text-white'>
      <div className="mycontainer  flex justify-between items-center h-14 py-5 px-4">

        <div className='logo cursor-pointer font-bold text-white text-2xl'>
          <span className='text-green-500'>&lt;</span>PassOp<span className='text-green-500'>/&gt;</span>
        </div>
       
        <button className='text-white bg-green-700 my-5 rounded-full flex justify-between ring-white ring-1 items-center' >
          <img className='invert w-10 p-1' src="icons/github.svg" alt="" />
          <span className='font-bold px-2' >Github</span>
        </button>

      </div>
    </nav>
  )
}

export default Navbar