import React, { useState } from 'react';
import DropDownComponent from './DropDownComponent';
import './createrequestPage.css'

const RequestPage = () => {
  const [eventCoordinator, setEventCoordinator] = useState('');
  const [eventCoordinatorContact, setEventCoordinatorContact] = useState('');
  const [aboutTheEvent, setAboutTheEvent] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventTime, setEventTime] = useState('');
  const [eventPlace, setEventPlace] = useState('');
  const [eventVenue, setEventVenue] = useState('');
  const [departmentName, setDepartmentName] = useState('');
  const [remarks, setRemarks] = useState('');
  const [guests, setGuests] = useState([]);

  const handleGuestChange = (e) => {
    const { name, checked } = e.target;
    if (checked) {
      setGuests([...guests, name]);
    } else {
      setGuests(guests.filter((guest) => guest !== name));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      eventCoordinator,
      eventCoordinatorContact,
      aboutTheEvent,
      eventDate,
      eventTime,
      eventPlace,
      eventVenue,
      departmentName,
      remarks,
      guests,
    });
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
            <th className="p-3">About the Event </th>
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
            <th className="p-3">Department Name </th>
            <td className="p-3">
              <input
                type="text"
                name="eventDepartment"
                placeholder="Enter Department"
                value={departmentName}
                onChange={(e) => setDepartmentName(e.target.value)}
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
                <DropDownComponent className="drop-down"/>
            </td>
          </tr>
        </table>

        <div className="mt-4">
          <button type="submit" className="btn btn-primary">
            Request Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default RequestPage;