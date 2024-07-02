import React from 'react'

const Message = () => {
  return (
    <div className='chat chat-end'>
        <div className='chat-image avatar'>
            <div className='w-10 rounded-full'>
                <img 
                    alt='chat-bubble-avatar'
                    src={'https://api.multiavatar.com/Binx Bond.png'}>
                </img>
            </div>
        </div>
            <div className={'chat-bubble text-white bg-blue-500'}>Hi! Valo @8:00pm ?</div>
            <div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>06:56 PM</div>
    </div>
  )
}

export default Message
