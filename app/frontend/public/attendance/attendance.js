function fetchAttendanceData(className) {
    const data = new URLSearchParams();

    // + Add className as URL-encoded form data
    data.append('className', className);

    // + Return the fetch promise so the caller can await the result
    return fetch('/fetch-attendance', {
        method: 'POST',
        body: data,
        credentials: 'include'
    })
    .then(response => {

        // + Check whether the HTTP request succeeded
        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }

        return response.json();
    })
    .then(result => {

        // + Get the data returned by Express
        const students = result.data;

        console.log(students);

        // + Return students to createTableFromAttendanceData()
        return students;
    })
    .catch(error => {
        console.error('Error:', error);

        // + Re-throw the error so the table function knows the request failed
        throw error;
    });
}

//
//
//

function createSubmitButton(className, students) {

    const container = document.getElementById('attendanceContainer');

    const button = document.createElement('button');

    button.type = 'button';
    button.textContent = 'Submit Attendance';
    button.className = 'submit-attendance-button';

    button.addEventListener('click', async () => {

        const attendance = students.map(student => {

            const selected = document.querySelector(
                `input[name="attendance_${CSS.escape(String(student.student_id))}"]:checked`
            );

            return {
                student_id: String(student.student_id),
                student_name: String(student.student_name),

                // + Convert "present" to 1 and "absent" to 0
                status: selected
                    ? (selected.value === 'present' ? 1 : 0)
                    : null
            };
        });

        // Check that every student has been marked.
        if (attendance.some(record => record.status === null)) {
            alert('Please mark attendance for every student.');
            return;
        }

        const body = {
            class_name: String(className),
            attendance: attendance
        };

        console.log('Sending attendance:', body);

        try {

            button.disabled = true;
            button.textContent = 'Submitting...';

            const response = await fetch('/mark-attendance', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(body)
            });

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }

            const result = await response.json();

            console.log('Attendance submitted:', result);

            button.textContent = 'Attendance Submitted';

        } catch (error) {

            console.error('Failed to submit attendance:', error);

            button.disabled = false;
            button.textContent = 'Submit Attendance';

            alert('Failed to submit attendance.');
        }
    });

    container.appendChild(button);
}


//
//
//


function createTableFromAttendanceData() {

    // + Get the class number entered by the teacher
    const className = document.getElementById('className').value;

    // + Get the container where the table will be created
    const container = document.getElementById('attendanceContainer');

    // + Make sure a class number was entered
    if (!className) {

        const message = document.createElement('div');
        message.className = 'status-message';
        message.textContent = 'Please enter a class number.';

        container.replaceChildren(message);

        return;
    }

    // + Show loading message while fetching students
    const loadingMessage = document.createElement('div');
    loadingMessage.className = 'status-message';
    loadingMessage.textContent = 'Loading students...';

    container.replaceChildren(loadingMessage);


    // + Fetch students for this class
    fetchAttendanceData(className)
        .then(students => {

            // + Convert the returned object into an array
            const studentList = Object.values(students);

            // + Clear the loading message
            container.replaceChildren();

            // + Make sure students were returned
            if (studentList.length === 0) {

                const message = document.createElement('div');
                message.className = 'status-message';

                // + Insert class name as text instead of HTML
                message.textContent =
                    `No students found for class ${className}.`;

                container.appendChild(message);

                return;
            }


            // + Create table header
            const header = document.createElement('div');
            header.className = 'table-header';

            const heading = document.createElement('h2');

            // + Insert class name safely as text
            heading.textContent = `Class ${className}`;

            header.appendChild(heading);
            container.appendChild(header);


            // + Create wrapper for responsive scrolling
            const tableWrapper = document.createElement('div');
            tableWrapper.className = 'table-wrapper';


            // + Create the table
            const table = document.createElement('table');


            // + Create table head
            const thead = document.createElement('thead');
            const headerRow = document.createElement('tr');

            const numberHeader = document.createElement('th');
            numberHeader.textContent = '#';

            const idHeader = document.createElement('th');
            idHeader.textContent = 'Student ID';

            const nameHeader = document.createElement('th');
            nameHeader.textContent = 'Student Name';

            const attendanceHeader = document.createElement('th');
            attendanceHeader.textContent = 'Attendance';

            headerRow.appendChild(numberHeader);
            headerRow.appendChild(idHeader);
            headerRow.appendChild(nameHeader);
            headerRow.appendChild(attendanceHeader);

            thead.appendChild(headerRow);
            table.appendChild(thead);


            // + Create table body
            const tbody = document.createElement('tbody');


            // + Loop through every student returned by the server
            studentList.forEach((student, index) => {

                // + Create a new table row
                const row = document.createElement('tr');


                // + Create number cell
                const numberCell = document.createElement('td');
                numberCell.textContent = String(index + 1);


                // + Create student ID cell
                const idCell = document.createElement('td');

                // + Treat student ID as plain text
                idCell.textContent = String(student.student_id);


                // + Create student name cell
                const nameCell = document.createElement('td');

                // + Treat student name as plain text to prevent XSS
                nameCell.textContent = String(student.student_name);


                // + Create attendance cell
                const attendanceCell = document.createElement('td');


                // + Create attendance options container
                const attendanceOptions = document.createElement('div');
                attendanceOptions.className = 'attendance-options';


                // + Create present label
                const presentLabel = document.createElement('label');

                const presentInput = document.createElement('input');

                presentInput.type = 'radio';
                presentInput.name =
                    `attendance_${String(student.student_id)}`;
                presentInput.value = 'present';

                presentLabel.appendChild(presentInput);
                presentLabel.appendChild(
                    document.createTextNode(' Present')
                );


                // + Create absent label
                const absentLabel = document.createElement('label');

                const absentInput = document.createElement('input');

                absentInput.type = 'radio';
                absentInput.name =
                    `attendance_${String(student.student_id)}`;
                absentInput.value = 'absent';

                absentLabel.appendChild(absentInput);
                absentLabel.appendChild(
                    document.createTextNode(' Absent')
                );


                // + Add attendance options to container
                attendanceOptions.appendChild(presentLabel);
                attendanceOptions.appendChild(absentLabel);

                attendanceCell.appendChild(attendanceOptions);


                // + Add cells to row
                row.appendChild(numberCell);
                row.appendChild(idCell);
                row.appendChild(nameCell);
                row.appendChild(attendanceCell);


                // + Add row to table body
                tbody.appendChild(row);
            });


            // + Add table body to table
            table.appendChild(tbody);

            // + Add table to wrapper
            tableWrapper.appendChild(table);

            // + Add wrapper to page
            container.appendChild(tableWrapper);


            // + Create submit button after table
            createSubmitButton(className, studentList);

        })
        .catch(error => {

            // + Show error message to teacher
            const message = document.createElement('div');
            message.className = 'status-message';
            message.textContent =
                'Failed to load students. Please try again.';

            container.replaceChildren(message);

            console.error(
                'Failed to create attendance table:',
                error
            );
        });
}