const dbConnector = require("../../sql/connectDb.js")

function fetchAttendanceData(class_name) {
    const connection = dbConnector.connectToDatabase();

    return new Promise((resolve, reject) => {
        connection.query(
            `SELECT DISTINCT student_id, student_name FROM attendance WHERE class_name = ?`,
            [class_name],
            function (err, result) {
                if (err) {
                    console.error("Error fetching data:", err.message);
                    connection.end();
                    reject(err);
                    return;
                } else {
                console.log("Extraction successful:", result);
                connection.end();
                resolve(result);
                }
            }
        );
    });
}

function markAttendance(
    student_id,
    student_name,
    attendance,
    date, // 2026-08-30 should be this format YYYY-MM-DD
    class_name
){
    const connection = dbConnector.connectToDatabase();
    return new Promise((resolve, reject) => {
        connection.query(
            `INSERT INTO attendance
            (student_id, student_name, attendance, date, class_name)
            VALUES (?, ?, ?, ?, ?)`,
            [
                student_id,
                student_name,
                attendance,
                date,
                class_name
            ],
            function(err, result) {
                if (err) {
                    console.error("Error inserting data:", err.message);
                    connection.end();
                    reject(err);
                } else {
                    console.log("Insertion successful:", result);
                    connection.end();
                    resolve(result);
                }
            }
        );
    });
}

module.exports = { fetchAttendanceData, markAttendance }