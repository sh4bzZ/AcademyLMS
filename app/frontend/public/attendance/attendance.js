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


function createTableFromAttendanceData() {

    const className = document.getElementById('className').value;
    const container = document.getElementById('attendanceContainer');

    if (!className) {
        container.innerHTML = `
            <div class="status-message">
                Please enter a class number.
            </div>
        `;

        return;
    }

    container.innerHTML = `
        <div class="status-message">
            Loading students...
        </div>
    `;

    fetchAttendanceData(className)
        .then(students => {

            container.innerHTML = '';

            if (!students || students.length === 0) {

                container.innerHTML = `
                    <div class="status-message">
                        No students found for class ${className}.
                    </div>
                `;

                return;
            }

            const header = document.createElement('div');
            header.className = 'table-header';

            header.innerHTML = `
                <h2>Class ${className}</h2>
            `;

            container.appendChild(header);


            const tableWrapper = document.createElement('div');
            tableWrapper.className = 'table-wrapper';


            const table = document.createElement('table');


            const thead = document.createElement('thead');

            thead.innerHTML = `
                <tr>
                    <th>#</th>
                    <th>Student ID</th>
                    <th>Student Name</th>
                    <th>Attendance</th>
                </tr>
            `;

            table.appendChild(thead);


            const tbody = document.createElement('tbody');


            students.forEach((student, index) => {

                const row = document.createElement('tr');

                row.innerHTML = `
                    <td>${index + 1}</td>

                    <td>${student.student_id}</td>

                    <td>${student.student_name}</td>

                    <td>
                        <div class="attendance-options">

                            <label>
                                <input
                                    type="radio"
                                    name="attendance_${student.student_id}"
                                    value="present"
                                >
                                Present
                            </label>

                            <label>
                                <input
                                    type="radio"
                                    name="attendance_${student.student_id}"
                                    value="absent"
                                >
                                Absent
                            </label>

                        </div>
                    </td>
                `;

                tbody.appendChild(row);
            });


            table.appendChild(tbody);
            tableWrapper.appendChild(table);
            container.appendChild(tableWrapper);

        })
        .catch(error => {

            container.innerHTML = `
                <div class="status-message">
                    Failed to load students.
                </div>
            `;

            console.error(
                'Failed to create attendance table:',
                error
            );
        });
}