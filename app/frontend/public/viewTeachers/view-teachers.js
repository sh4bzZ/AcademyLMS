// + Add: Fetch teachers from the backend
async function fetchTeachers() {

    // + Get the status message element
    const statusMessage =
        document.getElementById('statusMessage');

    // + Get the table container
    const tableContainer =
        document.getElementById('teachersTableContainer');

    try {

        // + Show loading message
        statusMessage.textContent =
            'Loading teachers...';

        // + Reset status styling
        statusMessage.className =
            'status-message';


        // + Send POST request to backend
        const response = await fetch('/view-teachers', {
            method: 'POST',

            // + Tell Express that the request contains JSON
            headers: {
                'Content-Type': 'application/json'
            },

            // + Send cookies/session information
            credentials: 'include'
        });


        // + Check HTTP response
        if (!response.ok) {
            throw new Error(
                `HTTP ${response.status}`
            );
        }


        // + Convert response to JSON
        const result = await response.json();


        // + Check backend success status
        if (!result.success) {
            throw new Error(
                result.message ||
                'Failed to fetch teachers.'
            );
        }


        // + Get teacher data
        const teachers = result.data;


        // + Make sure the response contains an array
        if (!Array.isArray(teachers)) {
            throw new Error(
                'Invalid teacher data received from server.'
            );
        }


        // + Handle no teachers
        if (teachers.length === 0) {

            statusMessage.textContent =
                'No teachers found.';

            // + Add empty-state styling
            statusMessage.className =
                'status-message empty';

            return;
        }


        // + Hide loading message
        statusMessage.style.display = 'none';


        // + Create teacher table
        createTeachersTable(
            teachers,
            tableContainer
        );


    } catch (error) {

        // + Log detailed error for debugging
        console.error(
            'Failed to fetch teachers:',
            error
        );


        // + Show error to user
        statusMessage.textContent =
            'Failed to load teachers. Please try again.';

        // + Add error styling
        statusMessage.className =
            'status-message error';

    }
}


// + Add: Create teachers table
function createTeachersTable(
    teachers,
    container
) {

    // + Remove existing table
    container.replaceChildren();


    // + Create table
    const table =
        document.createElement('table');

    // + Add table class
    table.className =
        'teachers-table';


    // + Create table head
    const thead =
        document.createElement('thead');


    // + Create header row
    const headerRow =
        document.createElement('tr');


    // + Define visible columns
    const columns = [
        '#',
        'Name',
        'Teacher ID',
        'Email',
        'Phone Number',
        'Salary'
    ];


    // + Create each header cell
    columns.forEach(columnName => {

        const th =
            document.createElement('th');

        // + Safely add column name
        th.textContent =
            columnName;

        // + Add header cell
        headerRow.appendChild(th);
    });


    // + Add header row
    thead.appendChild(headerRow);


    // + Add table head
    table.appendChild(thead);


    // + Create table body
    const tbody =
        document.createElement('tbody');


    // + Create one row per teacher
    teachers.forEach((teacher, index) => {

        // + Create teacher row
        const row =
            document.createElement('tr');


        // + Add row number
        const numberCell =
            document.createElement('td');

        // + Safely display row number
        numberCell.textContent =
            String(index + 1);

        // + Add cell to row
        row.appendChild(numberCell);


        // + Add teacher name
        const nameCell =
            document.createElement('td');

        // + Safely display teacher name
        nameCell.textContent =
            String(teacher.name ?? '');

        // + Add name styling
        nameCell.className =
            'teacher-name';

        // + Add cell to row
        row.appendChild(nameCell);


        // + Add teacher ID
        const idCell =
            document.createElement('td');

        // + Safely display teacher ID
        idCell.textContent =
            String(teacher.id ?? '');

        // + Add ID styling
        idCell.className =
            'teacher-id';

        // + Add cell to row
        row.appendChild(idCell);


        // + Add email
        const emailCell =
            document.createElement('td');

        // + Safely display email
        emailCell.textContent =
            String(teacher.email ?? '');

        // + Add email styling
        emailCell.className =
            'teacher-email';

        // + Add cell to row
        row.appendChild(emailCell);


        // + Add phone number
        const phoneCell =
            document.createElement('td');

        // + Safely display phone number
        phoneCell.textContent =
            String(teacher.PhoneNumber ?? '');

        // + Add phone styling
        phoneCell.className =
            'teacher-phone';

        // + Add cell to row
        row.appendChild(phoneCell);


        // + Add salary
        const salaryCell =
            document.createElement('td');

        // + Convert salary to number
        const salary =
            Number(teacher.Salary ?? 0);

        // + Safely display salary
        salaryCell.textContent =
            String(salary);

        // + Add salary styling
        salaryCell.className =
            'teacher-salary';

        // + Add cell to row
        row.appendChild(salaryCell);


        // + Add completed row to table body
        tbody.appendChild(row);
    });


    // + Add table body
    table.appendChild(tbody);


    // + Add completed table to page
    container.appendChild(table);
}


// + Add: Fetch teachers when page loads
document.addEventListener(
    'DOMContentLoaded',
    () => {

        // + Fetch teacher records
        fetchTeachers();

    }
);
