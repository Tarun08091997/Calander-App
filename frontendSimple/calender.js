var currentDate = new Date();

        function generateCalendar(year, month) {
            var firstDay = new Date(year, month, 1);
            var lastDay = new Date(year, month + 1, 0);
            var numberOfDays = lastDay.getDate();
            var startingDay = firstDay.getDay();

            var calendarBody = document.getElementById('calendar-body');
            calendarBody.innerHTML = ''; // Clear previous content

            var day = 1;
            for (var i = 0; i < 6; i++) {
                var row = document.createElement('tr');
                for (var j = 0; j < 7; j++) {
                    var cell = document.createElement('td');
                    if (i === 0 && j < startingDay) {
                        // Empty cells before the first day of the month
                        cell.innerHTML = '';
                    } else if (day > numberOfDays) {
                        // Empty cells after the last day of the month
                        cell.innerHTML = '';
                    } else {
                        // Cells with day numbers
                        cell.innerHTML = day;
                        day++;
                    }
                    row.appendChild(cell);
                }
                calendarBody.appendChild(row);
            }

            // Display the current month and year
            var monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September',
                'October', 'November', 'December'
            ];
            document.getElementById('currentMonthYear').innerHTML = monthNames[month] + ' ' + year;
            document.getElementById('calendar-body').classList.remove('fade-in');
            void document.getElementById('calendar-body').offsetWidth; // Trigger reflow
            document.getElementById('calendar-body').classList.add('fade-in');
        }

        function prevMonth() {
            currentDate.setMonth(currentDate.getMonth() - 1);
            generateCalendar(currentDate.getFullYear(), currentDate.getMonth());
        }

        function nextMonth() {
            currentDate.setMonth(currentDate.getMonth() + 1);
            generateCalendar(currentDate.getFullYear(), currentDate.getMonth());
        }

        // Initial setup
        generateCalendar(currentDate.getFullYear(), currentDate.getMonth());

       