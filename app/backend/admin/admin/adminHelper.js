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
    const query = `
        SELECT *
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

function viewAttendanceByDate(date){

}

module.exports = { viewRegisteredStudents, viewRegisteredTeachers, viewAttendanceByDate }; 