const dbConnector = require("../../sql/connectDb.js") 

function viewRegisteredStudents(){
const connection = dbConnector.connectToDatabase();
    const query = `
        SELECT *
        FROM students
    `;
    return new Promise((resolve, reject) => {
        connection.query(query, function(err, result) {
            if (err) {
                console.error("Error fetching data:", err.message);
                connection.end();
                reject(err);
            } else if (result) {
                connection.end();
                resolve(result);
            } else {
                connection.end();
                resolve(false);
            }
        });
    });
}


function viewRegisteredTeachers(){
    const connection = dbConnector.connectToDatabase();
    const query = `
        SELECT name, id, email, PhoneNumber, Salary
        FROM teachers
    `;
    return new Promise((resolve, reject) => {
        connection.query(query, function(err, result) {
            if (err) {
                console.error("Error fetching data:", err.message);
                connection.end();
                reject(err);
            } else if (result) {
                console.log("Teacher found:", result);
                connection.end();
                resolve(result);
            } else {
                connection.end();
                resolve(false);
            }
        });
    });
}

function viewAttendance(date, class_name){
     const connection = dbConnector.connectToDatabase();
    const query = `
        SELECT *
        FROM attendance WHERE date = ? AND class_name = ?
    `;
    const values = [date, class_name];

    return new Promise((resolve, reject) => {
        connection.query(query, values, function(err, result) {
            if (err) {
                console.error("Error fetching data:", err.message);
                connection.end();
                reject(err);
            } else if (result) {
                console.log("Attendance fetched:", result);
                connection.end();
                resolve(result);
            } else {
                connection.end();
                resolve(false);
            }
        });
    });
}

module.exports = { viewRegisteredStudents, viewRegisteredTeachers, viewAttendance }; 