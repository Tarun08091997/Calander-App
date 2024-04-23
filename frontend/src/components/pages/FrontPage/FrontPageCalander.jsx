import React, { useEffect, useState } from 'react';
import './frontpagecalander.css'
import axios from 'axios'
const CalanderDay = ({ day , pending , accepted , rejected}) => {

    // function hasResponseWithDate(responseArray, targetDate) {
    //     const targetISODate = targetDate.toISOString().split('T')[0];
    //     // Iterate over each response in the array
    //     for (const response of responseArray) {
    //         console.log(response.ceremonyDate , "       ->>>      " , targetDate);
    //         // Extract the ceremony date from the response
    //         const ceremonyDateISO = new Date(response.ceremonyDate).toISOString().split('T')[0];     
    //         console.log(ceremonyDateISO , "    - >>>" , targetISODate)      
    //         // Compare the ceremony date with the target date
    //         if (ceremonyDateISO === targetISODate) {
    //             // If the dates match, return true
    //             return true;
    //         }
    //     }
    //     // If no match is found, return false
    //     return false;
    // }

    const classname = () =>{
        if(pending.def && !accepted.def){
            return 'calander-day req-pending';
        }
        if(pending.def && accepted.def){
            return 'calander-day req-clash';
        }

        return 'calander-day';
    }
    return (
        <div className= {classname} onClick={ () =>
            console.log(pending)
        }>
            <span>{day}</span>
            <div className='pending-div'>
                {pending.arr.map((item)=>(
                    <span key={item._id}>{item.title}</span>
                ))}
            </div>
            <div className='accepted-div'>
                {accepted.arr.map((item)=>(
                        <span key={item._id}>{item.title}</span>
                    ))}
            </div>
            <div className='rejected-div'>
                {rejected.arr.map((item)=>(
                        <span key={item._id}>{item.title}</span>
                    ))}
            </div>
        </div>
    );
};

const FrontPageCalander = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [acceptedEventList , setAcceptedEventList] = useState([]);
    const [rejectedEventList , setRejectedEventList] = useState([]);
    const [pendingEventList , setPendingEventList] = useState([]);

    const getdata = async () =>{
        const response = await axios.get("http://localhost:4000/api/v1/getAllTypesRequest");
        setAcceptedEventList(response.data.acceptedRequests);
        setRejectedEventList(response.data.rejectedRequests);
        setPendingEventList(response.data.pendingRequests);
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
    },[])


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
                            <CalanderDay key={currentDay} day={currentDay} pending={pendingEventOnDay}  accepted = {acceptedEventOnDay} rejected = {rejectedEventOnDay}/>
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
        </div>
    );
};

export default FrontPageCalander;