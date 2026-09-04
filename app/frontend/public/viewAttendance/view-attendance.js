// + Add: Get the attendance form
const attendanceForm = document.getElementById('attendanceForm');


// + Add: Get the date input
const dateInput = document.getElementById('date');


// + Add: Get the class name input
const classInput = document.getElementById('class_name');


// + Add: Get the submit button
const viewAttendanceButton = document.getElementById(
    'viewAttendanceButton'
);


// + Add: Get the status message element
const statusMessage = document.getElementById(
    'statusMessage'
);


// + Add: Get the attendance results section
const attendanceSection = document.getElementById(
    'attendanceSection'
);


// + Add: Get the attendance table body
const attendanceTableBody = document.getElementById(
    'attendanceTableBody'
);


// + Add: Get the results title
const resultsTitle = document.getElementById(
    'resultsTitle'
);


// + Add: Get the record count element
const recordCount = document.getElementById(
    'recordCount'
);


// + Add: Set today's date as the default date
dateInput.value = new Date()
    .toISOString()
    .split('T')[0];


// + Add: Handle attendance form submission
attendanceForm.addEventListener(
    'submit',
    async (event) => {

        // + Add: Prevent normal browser form submission
        event.preventDefault();


        // + Add: Get selected date
        const date = dateInput.value;


        // + Add: Get class name
        const className = classInput.value.trim();


        // + Add: Validate the form values
        if (!date || !className) {

            showStatus(
                'Please enter a date and class name.'
            );

            return;
        }


        try {

            // + Add: Disable button while request is running
            viewAttendanceButton.disabled = true;

            viewAttendanceButton.textContent =
                'Loading...';


            // + Add: Hide previous results
            attendanceSection.hidden = true;


            // + Add: Create URL-encoded form data
            const formData = new URLSearchParams();


            // + Add: Add date parameter
            formData.append(
                'date',
                date
            );


            // + Add: Add class_name parameter
            formData.append(
                'class_name',
                className
            );


            // + Add: Send POST request
            const response = await fetch(
                '/view-attendance',
                {
                    method: 'POST',

                    // + Add: Tell Express this is URL-encoded data
                    headers: {
                        'Content-Type':
                            'application/x-www-form-urlencoded'
                    },

                    // + Add: Send cookies/session credentials
                    credentials: 'include',

                    // + Add: Send the URL-encoded body
                    body: formData.toString()
                }
            );


            // + Add: Check HTTP response status
            if (!response.ok) {

                throw new Error(
                    `HTTP ${response.status}`
                );
            }


            // + Add: Parse JSON response
            const result =
                await response.json();


            // + Add: Check backend success value
            if (!result.success) {

                throw new Error(
                    result.message ||
                    'Failed to fetch attendance.'
                );
            }


            // + Add: Make sure response data is an array
            const attendanceData =
                Array.isArray(result.data)
                    ? result.data
                    : [];


            // + Add: Create the attendance table
            createAttendanceTable(
                attendanceData
            );


            // + Add: Show backend message
            showStatus(
                result.message ||
                'Attendance data fetched successfully.'
            );


            // + Add: Show attendance results
            attendanceSection.hidden = false;

        } catch (error) {

            // + Add: Log error for debugging
            console.error(
                'Error fetching attendance:',
                error
            );


            // + Add: Show error message
            showStatus(
                error.message ||
                'Failed to fetch attendance.'
            );

        } finally {

            // + Add: Re-enable submit button
            viewAttendanceButton.disabled = false;

            viewAttendanceButton.textContent =
                'View Attendance';
        }
    }
);


// + Add: Create the attendance table
function createAttendanceTable(
    attendanceData
) {

    // + Add: Remove old table rows
    attendanceTableBody.replaceChildren();


    // + Add: Update results heading
    resultsTitle.textContent =
        `Attendance — ${dateInput.value}`;


    // + Add: Update number of records
    recordCount.textContent =
        `${attendanceData.length} ${
            attendanceData.length === 1
                ? 'Record'
                : 'Records'
        }`;


    // + Add: Handle no attendance records
    if (attendanceData.length === 0) {

        const row =
            document.createElement('tr');


        const cell =
            document.createElement('td');


        // + Add: Make the message span all table columns
        cell.colSpan = 6;


        cell.className =
            'empty-message';


        cell.textContent =
            'No attendance records found for this date and class.';


        row.appendChild(cell);

        attendanceTableBody.appendChild(row);

        return;
    }


    // + Add: Create one table row for each attendance record
    attendanceData.forEach(
        (record, index) => {

            // + Add: Create table row
            const row =
                document.createElement('tr');


            // + Add: Create row number cell
            const numberCell =
                document.createElement('td');

            numberCell.textContent =
                String(index + 1);


            // + Add: Create student ID cell
            const studentIdCell =
                document.createElement('td');

            studentIdCell.textContent =
                String(
                    record.student_id ?? ''
                );


            // + Add: Create student name cell
            const studentNameCell =
                document.createElement('td');

            studentNameCell.textContent =
                String(
                    record.student_name ?? ''
                );


            // + Add: Create attendance cell
            const attendanceCell =
                document.createElement('td');


            // + Add: Create attendance badge
            const attendanceBadge =
                document.createElement('span');


            // + Add: Add common badge class
            attendanceBadge.className =
                'attendance-badge';


            // + Add: Display 1 as Present
            if (record.attendance === 1) {

                attendanceBadge.classList.add(
                    'attendance-present'
                );

                attendanceBadge.textContent =
                    'Present';

            }

            // + Add: Display 0 as Absent
            else if (record.attendance === 0) {

                attendanceBadge.classList.add(
                    'attendance-absent'
                );

                attendanceBadge.textContent =
                    'Absent';

            }

            // + Add: Handle unexpected attendance values
            else {

                attendanceBadge.textContent =
                    'Unknown';
            }


            // + Add: Add attendance badge to cell
            attendanceCell.appendChild(
                attendanceBadge
            );


            // + Add: Create date cell
            const dateCell =
                document.createElement('td');


            // + Add: Convert ISO date to YYYY-MM-DD
            dateCell.textContent =
                formatDate(
                    record.date
                );


            // + Add: Create class cell
            const classCell =
                document.createElement('td');

            classCell.textContent =
                String(
                    record.class_name ?? ''
                );


            // + Add: Add cells to table row
            row.appendChild(numberCell);

            row.appendChild(studentIdCell);

            row.appendChild(studentNameCell);

            row.appendChild(attendanceCell);

            row.appendChild(dateCell);

            row.appendChild(classCell);


            // + Add: Add row to table body
            attendanceTableBody.appendChild(row);
        }
    );
}


// + Add: Convert backend date to YYYY-MM-DD
function formatDate(
    dateValue
) {

    // + Add: Handle missing date
    if (!dateValue) {
        return '';
    }


    // + Add: Create Date object
    const date =
        new Date(dateValue);


    // + Add: Handle invalid date
    if (Number.isNaN(date.getTime())) {
        return '';
    }


    // + Add: Return YYYY-MM-DD
    return date.toISOString()
        .split('T')[0];
}


// + Add: Display a status message
function showStatus(
    message
) {

    // + Add: Put message into status element
    statusMessage.textContent =
        message;


    // + Add: Show status element
    statusMessage.hidden = false;
}
