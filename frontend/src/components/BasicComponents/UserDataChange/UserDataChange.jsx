import React, { useRef, useEffect } from 'react';

export default function UserDataChange({ onClose }) {
  const modalRef = useRef();

  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  return (
    <div
      style={{
        height: '300px',
        width: '400px',
        backgroundColor: 'blue',
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 999,
      }}
      ref={modalRef}
    >
      UserDataChange
    </div>
  );
}
