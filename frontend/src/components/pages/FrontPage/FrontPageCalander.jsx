import React, { useState } from 'react';
import './frontpagecalander.css'
const FrontPageCalander = () => {
    const [currentDate, setCurrentDate] = useState(new Date());

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
        for (let i = 0; i < Math.ceil((startingDay+ days)/7); i++) {
            const week = [];
            for (let j = 0; j < 7; j++) {
                if ((i === 0 && j < startingDay) || day > days) {
                    week.push(<td key={`${i}-${j}`}></td>);
                } else {
                    week.push(<td key={`${i}-${j}`}>{day}</td>);
                    day++;
                }
            }
            calendar.push(<tr key={i}>{week}</tr>);
        }
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
