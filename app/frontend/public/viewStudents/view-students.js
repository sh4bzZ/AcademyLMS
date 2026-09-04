// + Add: Fetch students from the backend
async function fetchStudents() {

    // + Get the status message element
    const statusMessage = document.getElementById('statusMessage');

    // + Get the table container
    const tableContainer = document.getElementById('studentsTableContainer');

    try {

        // + Show loading message
        statusMessage.textContent = 'Loading students...';

        // + Remove previous status classes
        statusMessage.className = 'status-message';

        // + Send POST request to the backend
        const response = await fetch('/view-students', {
            method: 'POST',

            // + Tell Express that the request contains JSON
            headers: {
                'Content-Type': 'application/json'
            },

            // + Send cookies/session information
            credentials: 'include'
        });


        // + Check whether the HTTP request succeeded
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }


        // + Convert the response to JSON
        const result = await response.json();


        // + Check whether the backend reported success
        if (!result.success) {
            throw new Error(
                result.message || 'Failed to fetch students.'
            );
        }


        // + Get the student array from the response
        const students = result.data;


        // + Make sure data is an array
        if (!Array.isArray(students)) {
            throw new Error('Invalid student data received from server.');
        }


        // + Remove loading message
        statusMessage.textContent = '';


        // + Handle the case where there are no students
        if (students.length === 0) {

            statusMessage.textContent = 'No students found.';

            // + Add empty-state class
            statusMessage.className = 'status-message empty';

            return;
        }


        // + Remove the status message when students exist
        statusMessage.style.display = 'none';


        // + Create the students table
        createStudentsTable(students, tableContainer);


    } catch (error) {

        // + Log the actual error for debugging
        console.error('Failed to fetch students:', error);


        // + Show a user-friendly error message
        statusMessage.textContent =
            'Failed to load students. Please try again.';

        // + Add error styling
        statusMessage.className = 'status-message error';

    }
}


// + Add: Create the students table
function createStudentsTable(students, container) {

    // + Clear any existing table
    container.replaceChildren();


    // + Create the table
    const table = document.createElement('table');

    // + Add table CSS class
    table.className = 'students-table';


    // + Create table header
    const thead = document.createElement('thead');


    // + Create header row
    const headerRow = document.createElement('tr');


    // + Define table columns
    const columns = [
        '#',
        'Name',
        'Age',
        'Student ID',
        'Class',
        'Math Fees',
        'Physics Fees',
        'Biology Fees',
        'Chemistry Fees',
        'Urdu Fees',
        'Quran Fees',
        'English Fees',
        'Total Fees'
    ];


    // + Create each header cell
    columns.forEach(columnName => {

        const th = document.createElement('th');

        // + Safely add column name
        th.textContent = columnName;

        // + Add header cell to header row
        headerRow.appendChild(th);
    });


    // + Add header row to table head
    thead.appendChild(headerRow);


    // + Add table head to table
    table.appendChild(thead);


    // + Create table body
    const tbody = document.createElement('tbody');


    // + Create one row for every student
    students.forEach((student, index) => {

        // + Create student row
        const row = document.createElement('tr');


        // + Add row number
        const numberCell = document.createElement('td');

        // + Set row number safely
        numberCell.textContent = String(index + 1);

        // + Add cell to row
        row.appendChild(numberCell);


        // + Add student name
        const nameCell = document.createElement('td');

        // + Set student name safely
        nameCell.textContent = String(student.name ?? '');

        // + Add name styling
        nameCell.className = 'student-name';

        // + Add cell to row
        row.appendChild(nameCell);


        // + Add age
        const ageCell = document.createElement('td');

        // + Set age safely
        ageCell.textContent = String(student.age ?? '');

        // + Add cell to row
        row.appendChild(ageCell);


        // + Add student ID
        const idCell = document.createElement('td');

        // + Set student ID safely
        idCell.textContent = String(student.id ?? '');

        // + Add ID styling
        idCell.className = 'student-id';

        // + Add cell to row
        row.appendChild(idCell);


        // + Add class
        const classCell = document.createElement('td');

        // + Create class badge
        const classBadge = document.createElement('span');

        // + Safely add class name
        classBadge.textContent = String(student.class ?? '');

        // + Add badge styling
        classBadge.className = 'class-badge';

        // + Add badge to cell
        classCell.appendChild(classBadge);

        // + Add cell to row
        row.appendChild(classCell);


        // + Add Math fees
        row.appendChild(
            createFeeCell(student.Mathfees)
        );


        // + Add Physics fees
        row.appendChild(
            createFeeCell(student.Phyfees)
        );


        // + Add Biology fees
        row.appendChild(
            createFeeCell(student.Biofees)
        );


        // + Add Chemistry fees
        row.appendChild(
            createFeeCell(student.Chemfees)
        );


        // + Add Urdu fees
        row.appendChild(
            createFeeCell(student.Urdufees)
        );


        // + Add Quran fees
        row.appendChild(
            createFeeCell(student.Quranfees)
        );


        // + Add English fees
        row.appendChild(
            createFeeCell(student.Engfees)
        );


        // + Calculate total fees
        const total =
            Number(student.Mathfees ?? 0) +
            Number(student.Phyfees ?? 0) +
            Number(student.Biofees ?? 0) +
            Number(student.Chemfees ?? 0) +
            Number(student.Urdufees ?? 0) +
            Number(student.Quranfees ?? 0) +
            Number(student.Engfees ?? 0);


        // + Create total fee cell
        const totalCell = document.createElement('td');

        // + Safely display total
        totalCell.textContent = String(total);

        // + Add total styling
        totalCell.className = 'total-fee';

        // + Add total cell to row
        row.appendChild(totalCell);


        // + Add completed row to table body
        tbody.appendChild(row);
    });


    // + Add table body to table
    table.appendChild(tbody);


    // + Add completed table to the page
    container.appendChild(table);
}


// + Add: Create a fee table cell
function createFeeCell(value) {

    // + Create table cell
    const cell = document.createElement('td');

    // + Convert missing values to zero
    const fee = Number(value ?? 0);

    // + Safely display fee
    cell.textContent = String(fee);

    // + Add fee styling
    cell.className = 'fee';

    // + Return the completed cell
    return cell;
}


// + Add: Load students when the page opens
document.addEventListener('DOMContentLoaded', () => {

    // + Fetch and display students
    fetchStudents();

});