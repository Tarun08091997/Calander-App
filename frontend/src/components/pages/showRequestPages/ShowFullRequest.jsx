import React, { useContext, useEffect, useRef, useState } from 'react';
import './showfullrequest.css';
import { UserContext } from '../../../contexts/UserContext';
import axios from 'axios'

function ShowFeedback({ feedback }) {
    const { loginUser } = useContext(UserContext);

    // Determine border and box shadow color based on feedback seen status
    const borderColor = feedback.seen ? 'green' : 'red';
    const boxShadowColor = feedback.seen ? 'rgba(0, 128, 0, 0.5)' : 'rgba(255, 0, 0, 0.5)';

    // Determine whether to show the OK button based on user role and feedback seen status
    const showOkButton = !(loginUser.userInfo.role === 'admin' || feedback.seen);

    return (
       
        <div className='showfeedback' style={{ width: '90%', border: `1px solid ${borderColor}`, borderRadius: '10px', boxShadow: `0 0 10px ${boxShadowColor}` ,minHeight:'20px'}}>
            <div className='feedback-message'>{feedback.comment}</div>
            {true && (
                <button className='ok-button' onClick={()=>{console.log(loginUser)}}>OK</button>
            )}
        </div>
    );
}

export default function ShowFullRequest({ request, setVisible }) {
    const modalRef = useRef(null);
    const [feedbacks , setFeedbacks] = useState([]);

    const getFeedbackData = async () => {
        try {
            const response = await axios.get(`http://localhost:4000/api/v1/${request._id}/GetFeedback`);
            setFeedbacks(response.data);
        } catch (error) {
            console.error('Error fetching feedback data:', error.message);
            // Handle error as needed, such as setting an error state or showing a message to the user
        }
    };
    
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                setVisible(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [setVisible]);

    useEffect(()=>{
        getFeedbackData();
    },[])

    const handleClose = () => {
        setVisible(false);
    };
    const formatDateString = (dateString) => {
        const date = new Date(dateString);
        const options = { day: '2-digit', month: 'long', year: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    };

    return (
        <div className="full-request-container" ref={modalRef}>
        <div className="content">
            <span className="cross_btn" onClick={handleClose}>&times;</span>
            <h2 style={{color:"blue"}}>{request.title}</h2>
            <div className="request-details">
                <div className="grid-container">
                    <div className="column">
                        <p><strong>From:</strong> {request.from}</p>
                        <p><strong>Coordinator Name:</strong> {request.coordinatorName}</p>
                        <p><strong>Place:</strong> {request.place}</p>
                        <p><strong>Request Status:</strong> {request.reqStatus}</p>
                    </div>
                    <div className="column">
                        <p><strong>Ceremony Date:</strong> <span style={{color:"red"}}>{formatDateString(request.ceremonyDate)}</span></p>
                        <p><strong>Coordinator Number:</strong> {request.CoordinatorNumber}</p>
                        <p><strong>Venue:</strong> {request.vanue}</p>
                        <p><strong>Request Date:</strong> {formatDateString(request.ceremonyDate)}</p>
                    </div>
                </div>
                <div className="message">
                    <p><strong>Message:</strong> {request.message}</p>
                </div>
            </div>
                <div style={{marginTop:'20px' , display:'flex', flexDirection:'column'}}>
                    {
                        feedbacks.map((feedback) => (
                            <ShowFeedback feedback = {feedback} />
                        ))
                    }
                </div>


        </div>
    </div>
    );
}
