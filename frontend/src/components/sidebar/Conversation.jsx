import React from 'react'

const Conversation = () => {
  return <>
    <div className='flex gap-2 items-center hover:bg-cyan-500 rounded-lg p-2 py-1 cursor-pointer'>
        <div className='avatar online'>
            <div className='w-12 rounded-full'>
                <img src='https://api.multiavatar.com/Binx Bond.png' alt='user avatar'></img>
            </div>
        </div>

      <div className='flex flex-col flex-1'>
        <div className='flex gap-3 justify-between'>
            <p className= 'text-white font-semibold'>Rohan Verma</p>
            <span className='text-xl'>🔱</span>
        </div>

      </div>
    </div>

    <div className='divider my-0 py-0 h-1'></div> 
    </>
}

export default Conversation

