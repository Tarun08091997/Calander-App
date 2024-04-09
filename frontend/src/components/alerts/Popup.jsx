import React, { useState, useEffect } from 'react';
import './Popup.css'; // Create Popup.css file for styling

const Popup = ({ type, message, duration = 500 }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  const getBorderColor = () => {
    switch (type) {
      case 'success':
        return 'lightgreen';
      case 'warning':
        return 'yellow';
      case 'error':
        return 'red';
      default:
        setVisible(false);
        return 'transparent';
    }
  };

  return (
    visible && (
      <div
        className="popup"
        style={{ borderColor: getBorderColor() }}
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        onClick={()=>setVisible(false)}
      >
        <span className="message">{message}</span>
        
      </div>
    )
  );
};

export default Popup;





