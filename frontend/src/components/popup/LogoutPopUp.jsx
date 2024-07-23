import React from 'react';
import ReactDOM from 'react-dom';

const LogoutPopUp = ({ isOpen, onClose, onConfirm, message }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 p-10 rounded-lg">
        <p className="text-white mb-10">{message}</p>
        <div className="flex justify-center">
          <button
            className="btn btn-outline btn-error px-3 py-2 mr-10 rounded"
            onClick={onConfirm}
          >
            Logout
          </button>
          <button
            className="btn btn-outline px-4 py-2 rounded"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>,
    document.getElementById('popup-root')
  );
};

export default LogoutPopUp;
