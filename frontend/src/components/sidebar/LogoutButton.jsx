import React, { useState } from 'react'
import { RiLogoutCircleLine } from 'react-icons/ri'
import useLogout from '../../hooks/useLogout'
import LogoutPopUp from '../popup/LogoutPopUp'

const LogoutButton = () => {
  const { logout, loading } = useLogout();
  const [showPopup, setShowPopup] = useState(false);

  const handleLogoutClick = () => {
    setShowPopup(true);
  };

  const handleConfirmLogout = () => {
    logout();
    setShowPopup(false);
  };

  return (
    <div className='mt-auto'>
      {!loading ? (
        <RiLogoutCircleLine 
          className='w-6 h-6 text-white cursor-pointer'
          onClick={handleLogoutClick} 
        />
      ) : (
        <span className='loading loading-spinner'></span>
      )}
      <LogoutPopUp
        isOpen={showPopup}
        onClose={() => setShowPopup(false)}
        onConfirm={handleConfirmLogout}
        message="Are you sure you want to logout?"
      />
    </div>
  )
}

export default LogoutButton
