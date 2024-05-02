import React, { useContext, useEffect, useState } from 'react';
import './frontpagecalander.css'
import axios from 'axios'
import { UserContext } from '../../../contexts/UserContext';
import ShowRequestsByDate from './ShowRequestsByDate';
const api = process.env.API_LINK;


const CalanderDay = ({ day , pending , accepted , rejected , showRequestsbyDate , allRequestbyDay}) => {

    const classname = () =>{
        if(pending.def && !accepted.def){
            return 'calander-day req-pending';
        }
        if(pending.def && accepted.def){
            return 'calander-day req-clash';
        }

        return 'calander-day';
    }

    const closeRequestWindow = ()=>{
        allRequestbyDay([...pending.arr , ...accepted.arr , ...rejected.arr]);
        showRequestsbyDate(true);
    }
    return (
        <div className= {classname()} onClick={closeRequestWindow}>
            <h4>{day}</h4>
            {pending.def && <div>
                <span style = {{color:'blue'}} >Pending : </span> <span>{pending.arr.length}</span>   
            </div>}
            {accepted.def && <div>
                <span style = {{color:'green'}} >Accepted : </span> <span>{accepted.arr.length}</span>   
            </div>}
            {rejected.def && <div>
                <span style = {{color:'red'}} >Rejected : </span> <span>{rejected.arr.length}</span>   
            </div>}
        </div>
    );
};

const FrontPageCalander = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [acceptedEventList , setAcceptedEventList] = useState([]);
    const [rejectedEventList , setRejectedEventList] = useState([]);
    const [pendingEventList , setPendingEventList] = useState([]);
    const {loginUser} = useContext(UserContext);

    const [showRequestsbyDate , setShowRequestsByDate] = useState(false);
    const [allRequestbyDay , setAllRequestByDate] = useState([]);

    const getdata = async () =>{
        if(loginUser.isLoggedIn){
            const response = await axios.get(`http://localhost:4000/api/v1/${loginUser.userInfo.username}/getAllTypesRequestbyUser`);
            setAcceptedEventList(response.data.acceptedRequests);
            setRejectedEventList(response.data.rejectedRequests);
            setPendingEventList(response.data.pendingRequests);
        }
    }

    function hasResponseWithDate(responseArray, targetDate) {
        const arr = [];
        let def = false;
        const targetISODate = targetDate.toISOString().split('T')[0];
        // Iterate over each response in the array
        for (const response of responseArray) {
            // Extract the ceremony date from the response
            const ceremonyDateISO = new Date(response.ceremonyDate).toISOString().split('T')[0];           
            // Compare the ceremony date with the target date
            if (ceremonyDateISO === targetISODate) {
                // If the dates match, return true
                def = true;
                arr.push(response);
            }
        }
        // If no match is found, return false
        return {def , arr};
    }

    useEffect(()=>{
        getdata();
        console.log(api);
    },[loginUser.isLoggedIn])


    const daysInMonth = (month, year) => {
        return new Date(year, month + 1, 0).getDate();
    };

    const startingDayOfMonth = (month, year) => {
        return new Date(year, month, 1).getDay();
    };

    const prevMonth = () => {
        const newDate = new Date(currentDate);
        newDate.setMonth(newDate.getMonth() - 1);
        setCurrentDate(newDate);
    };

    const nextMonth = () => {
        const newDate = new Date(currentDate);
        newDate.setMonth(newDate.getMonth() + 1);
        setCurrentDate(newDate);
    };

    const renderCalendar = () => {
        const days = daysInMonth(currentDate.getMonth(), currentDate.getFullYear());
        const startingDay = startingDayOfMonth(currentDate.getMonth(), currentDate.getFullYear());
        const calendar = [];
    
        let day = 1;
        for (let i = 0; i < Math.ceil((startingDay + days) / 7); i++) {
            const week = [];
            for (let j = 0; j < 7; j++) {
                if ((i === 0 && j < startingDay) || day > days) {
                    // Render an empty cell if before the first day of the month or after the last day
                    week.push(<td key={`${i}-${j}`}></td>);
                } else {
                    // Calculate the current day and check if there's an event on that day
                    const currentDay = day;
                    const currentDateObj = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDay + 1);
                    const pendingEventOnDay = hasResponseWithDate(pendingEventList, currentDateObj);
                    const acceptedEventOnDay = hasResponseWithDate(acceptedEventList, currentDateObj);
                    const rejectedEventOnDay = hasResponseWithDate(rejectedEventList, currentDateObj);
                    
                    // Push the CalendarDay component to the week array
                    week.push(
                        <td key={`${i}-${j}`}>
                            {loginUser.isLoggedIn ?  <CalanderDay key={currentDay} day={currentDay} pending={pendingEventOnDay}  accepted = {acceptedEventOnDay} rejected = {rejectedEventOnDay} showRequestsbyDate ={setShowRequestsByDate} allRequestbyDay ={setAllRequestByDate}/>
                            : <div>{currentDay}</div>}
                        </td>
                    );
                    // Increment the day counter
                    day++;
                }
            }
            // Push the week array to the calendar array
            calendar.push(<tr key={i}>{week}</tr>);
        }
    
        // Return the calendar array
        return calendar;
    };
    
    

    return (
        <div className="calander-container">
            <div className="calendar-header">
                <h2 className="text-header">
                    {`${currentDate.toLocaleString('default', { month: 'long' })} ${currentDate.getFullYear()}`}
                </h2>
                <div className="calendar-buttons">
                    <button className="prev btn" onClick={prevMonth}>Previous Month</button>
                    <button className="next btn" onClick={nextMonth}>Next Month</button>
                </div>
            </div>

            <table className="calander-table">
                <thead className="header">
                    <tr>
                        <th className="text-center">Sun</th>
                        <th className="text-center">Mon</th>
                        <th className="text-center">Tue</th>
                        <th className="text-center">Wed</th>
                        <th className="text-center">Thu</th>
                        <th className="text-center">Fri</th>
                        <th className="text-center">Sat</th>
                    </tr>
                </thead>
                <tbody>{renderCalendar()}</tbody>
            </table>
            {showRequestsbyDate && <ShowRequestsByDate showRequestsbyDate ={setShowRequestsByDate} allRequestbyDay = {allRequestbyDay} loginUser={loginUser}/>}
        </div>
    );
};

export default FrontPageCalander;