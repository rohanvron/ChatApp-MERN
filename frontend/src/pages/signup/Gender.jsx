import React from 'react'

const Gender = () => {
  return (
    <div className='flex mt-2'>
        <div className='form-control mr-3'>
        <label className={"label gap-2 cursor-pointer"}>
            <span className='label-text text-white'>Male</span>
            <input type='checkbox' className="checkbox checkbox-info border-gray-300 "></input>
        </label>
        </div>

        <div className='form-control'>
        <label className={"label gap-2 cursor-pointer"}>
            <span className='label-text text-white'>Female</span>
            <input type='checkbox' className="checkbox checkbox-secondary border-gray-300"></input>
        </label>
        </div>
      
    </div>
  )
}

export default Gender
