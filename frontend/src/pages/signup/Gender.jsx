import React from 'react'

const Gender = ({onCheckboxChange, selectedGender}) => {
  return (
    <div className='flex mt-2'>
        <div className='form-control mr-3'>
        <label className={`label gap-2 cursor-pointer ${selectedGender ==='male'? 'selected' : ''}`}>
            <span className='label-text text-white'>Male</span>
            <input type='checkbox' className="checkbox checkbox-info border-gray-300 "
              checked={selectedGender === "male"}
              onChange={() => onCheckboxChange("male")}
              ></input>
        </label>
        </div>

        <div className='form-control'>
        <label className={`label gap-2 cursor-pointer ${selectedGender ==='female'? 'selected' : ''}`}>
            <span className='label-text text-white'>Female</span>
            <input type='checkbox' className="checkbox checkbox-secondary border-gray-300 "
            checked={selectedGender === "female"}
            onChange={() => onCheckboxChange("female")}
            ></input>
        </label>
        </div>
      
    </div>
  )
}

export default Gender
