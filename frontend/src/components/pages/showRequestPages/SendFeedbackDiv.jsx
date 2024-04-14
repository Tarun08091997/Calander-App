import React, { useEffect, useRef, useState } from 'react';
import './sendFeedbackdiv.css'
import axios from 'axios'
import Popup from '../../alerts/Popup';
export default function SendFeedbackDiv({ request, setVisible , visible }) {
    const modalRef = useRef(null);
    const [remark,setRemark] = useState("");
    const [popmsg , setPopmsg] = useState(["","",0]);
    
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                setVisible(false);
            }
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    const handleClose = () => {
        setVisible(false);
    };

    const handleSend = async () => {
        try {
          await axios.post(`http://localhost:4000/api/v1/${request}/`, {
            comment: remark,
            resDate: new Date(),
            request_id: request
          });
        } catch (error) {
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            const { data } = error.response;
            const errorMessage = data.message;
            setPopmsg(["warning", errorMessage, popmsg[2] + 1]);
          } else if (error.request) {
            // The request was made but no response was received
            console.log(error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log("Error", error.message);
          }
        }
      };

    return (
        <div className="feedback-container" ref={modalRef}>
            <div className="content">
                <span className="cross_btn" onClick={handleClose}>&times;</span>
                <h2>Remarks / Feedback</h2>
                <textarea onChange={(e) => setRemark(e.target.value)} className="feedback-textarea" placeholder="Type your feedback here..."></textarea>
                <div className="fbdiv-button-container">
                    <button className='cancel_btn' onClick={handleClose}>Cancel</button>
                    <button className='send_btn' onClick={handleSend}>Send</button>
                </div>
            </div>
            <Popup key={popmsg[2]} type={popmsg[0]} message = {popmsg[1]}/>
        </div>
    );
}
