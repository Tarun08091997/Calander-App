import React, { useContext, useState } from 'react';
import DropDownComponent from './DropDownComponent';
import './createrequestPage.css'
import { UserContext } from '../../../contexts/UserContext';
import axios from 'axios';
import Popup from '../../alerts/Popup';

const CreateRequestPage = () => {
  const [eventCoordinator, setEventCoordinator] = useState('');
  const [eventCoordinatorContact, setEventCoordinatorContact] = useState('');
  const [aboutTheEvent, setAboutTheEvent] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventTime, setEventTime] = useState('');
  const [eventPlace, setEventPlace] = useState('');
  const [eventVenue, setEventVenue] = useState('');
  const [remarks, setRemarks] = useState('');
  const [guests, setGuests] = useState([]);
  const {loginUser,setLoginUser} = useContext(UserContext);


  const [popmsg , setPopmsg] = useState(["","",0]);

  const handleSubmit = async (e) => {
    try{
      e.preventDefault();
    
      const response= await axios.post(`http://localhost:4000/api/v1/${loginUser.userInfo.username}/CreateRequest`, {
        from: loginUser.userInfo.username,
        to: guests,
        title: aboutTheEvent,
        message: remarks,
        ceremonyDate: new Date(eventDate + ' ' + eventTime), // Assuming eventDate and eventTime are in appropriate formats
        reqDate: new Date(),
        reqStatus: 'pending',
        coordinatorName: eventCoordinator,
        CoordinatorNumber: eventCoordinatorContact,
        vanue:eventVenue,
        saved: false
      });

      if(response.data.requests.length != 0){
        setPopmsg(["success", "Request Created",popmsg[2]+1]);
      }


    }
    catch (error) {
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
    

  };

  return (
    <div className="event-details">
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
          <tr>
            <th className="p-3">Select Guest </th>
            <td>
                <DropDownComponent className="drop-down" setGuests={setGuests}/>
            </td>
          </tr>
        </table>

        <div className="mt-4">
          <button type="submit" className="btn btn-primary">
            Request Send
          </button>
        </div>
      </form>

      <Popup key={popmsg[2]} type={popmsg[0]} message = {popmsg[1]}/>
    </div>
  );
};

export default CreateRequestPage;