import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onRequestClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-60 flex items-center justify-center'>
      <div className='absolute inset-0 bg-black opacity-50' onClick={onRequestClose} />
      <div className='relative bg-white p-6 rounded shadow-lg z-70'>
        {children}
        <button
          onClick={onRequestClose}
          className='mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'
        >
          확인
        </button>
      </div>
    </div>
  );
};

export default Modal;

// CSS styles for the modal
// .modal-content {
//   position: absolute;
//   top: 50%;
//   left: 50%;
//   right: auto;
//   bottom: auto;
//   marginRight: '-50%';
//   transform: 'translate(-50%, -50%)';
//   background: 'white';
//   padding: '20px';
//   borderRadius: '4px';
//   outline: 'none';
// }
// .modal-overlay {
//   position: 'fixed';
//   top: 0;
//   left: 0;
//   right: 0;
//   bottom: 0;
//   backgroundColor: 'rgba(0, 0, 0, 0.75)';
// }
