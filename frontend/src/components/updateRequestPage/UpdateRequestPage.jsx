import React, { useContext, useEffect, useRef, useState } from 'react'
import "./updaterequest.css"
import DropDownComponent from '../pages/createRequestPage/DropDownComponent';
import Popup from '../alerts/Popup';
import { UserContext } from '../../contexts/UserContext';
import axios from "axios"
export default function UpdateRequestPage({request , setUpdateReq }) {
    const [eventCoordinator, setEventCoordinator] = useState(request.coordinatorName);
    const [eventCoordinatorContact, setEventCoordinatorContact] = useState(request.CoordinatorNumber);
    const [aboutTheEvent, setAboutTheEvent] = useState(request.title);
    const [eventDate, setEventDate] = useState("");
    const [eventTime, setEventTime] = useState("");
    const [eventPlace, setEventPlace] = useState(request.place);
    const [eventVenue, setEventVenue] = useState(request.vanue);
    const [remarks, setRemarks] = useState(request.message);
    const [guests, setGuests] = useState(request.guests);
    const {loginUser,setLoginUser} = useContext(UserContext);

    const [popmsg , setPopmsg] = useState(["","",0]);
    const modalRef = useRef(null);

    useEffect(()=>{
        if (request.ceremonyDate) {
            const ceremonyDate = new Date(request.ceremonyDate);
            setEventDate(ceremonyDate.toISOString().split('T')[0]); // Extracting date in YYYY-MM-DD format
            setEventTime(ceremonyDate.toTimeString().split(' ')[0]); // Extracting time in HH:MM:SS format
        }
    },[])
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                setUpdateReq (false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [setUpdateReq]);

    const handleSubmit = async (e) => {
      try{
        e.preventDefault();
        const response= await axios.put(`http://localhost:4000/api/v1/${request._id}/UpdateRequest`, {
        title: aboutTheEvent,
        message: remarks,
        ceremonyDate: new Date(eventDate + ' ' + eventTime), // Assuming eventDate and eventTime are in appropriate formats
        coordinatorName: eventCoordinator,
        CoordinatorNumber: eventCoordinatorContact,
        place:eventPlace,
        vanue:eventVenue
      });
      
      if(response.data){
        setPopmsg(["success", "Request Created",popmsg[2]+1]);
      }
      }
      catch(error){
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          const { data } = error.response;
          const errorMessage = data.message;
          setPopmsg(["warning",errorMessage, popmsg[2] + 1]);
        } else if (error.request) {
          // The request was made but no response was received
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
      }
      
    }
    return (
        <div className="update-event-details" ref={modalRef}>
          <h1 className="event-detail-text">Event Details</h1>
    
          <form onSubmit={handleSubmit}>
            <table className="w-full">
              <tr>
                <th className="p-3">Event Coordinator</th>
                <td className="p-3">
                  <input
                    type="text"
                    name="eventCoordinator"
                    placeholder="Enter Coordinator Name"
                    value={eventCoordinator}
                    onChange={(e) => setEventCoordinator(e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <th className="p-3">Event Coordinator Contact Number </th>
                <td className="p-3">
                  <input
                    type="number"
                    name="eventCoordinator"
                    placeholder="Enter Coordinator Contact  Number"
                    value={eventCoordinatorContact}
                    onChange={(e) => setEventCoordinatorContact(e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <th className="p-3">Event Title </th>
                <td className="p-3">
                  <input
                    type="text"
                    name="eventCoordinator"
                    placeholder="Enter Event Details"
                    value={aboutTheEvent}
                    onChange={(e) => setAboutTheEvent(e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <th className="p-3">Date</th>
                <td className="p-3">
                  <input type="date" name="eventDate" value={eventDate} onChange={(e) => setEventDate(e.target.value)} />
                </td>
              </tr>
              <tr>
                <th className="p-3">Time</th>
                <td className="p-3">
                  <input type="time" name="eventTime" value={eventTime} onChange={(e) => setEventTime(e.target.value)} />
                </td>
              </tr>
              <tr>
                <th className="p-3">Place</th>
                <td className="p-3">
                  <input
                    type="text"
                    name="eventPlace"
                    placeholder="Enter Place"
                    value={eventPlace}
                    onChange={(e) => setEventPlace(e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <th className="p-3">Venue</th>
                <td className="p-3">
                  <input
                    type="text"
                    name="eventVenue"
                    placeholder="Enter Venue"
                    value={eventVenue}
                    onChange={(e) => setEventVenue(e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <th className="p-3">Remarks </th>
                <td className="p-3">
                  <input
                    type="text"
                    name="eventDepartment"
                    placeholder="Add Remarks"
                    value={remarks}
                    onChange={(e) => setRemarks(e.target.value)}
                  />
                </td>
              </tr>
            </table>
    
            <div className="mt-4">
              <button type="submit" className="btn btn-primary" >
                Update Requets
              </button>
            </div>
          </form>
    
          <Popup key={popmsg[2]} type={popmsg[0]} message = {popmsg[1]}/>
        </div>
      );
}
