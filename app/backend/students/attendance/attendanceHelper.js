const dbConnector = require("../../sql/connectDb.js") 
function markAttendance(
    student_id,
    student_name,
    attendance,
    date // 2026-08-30 should be this format YYYY-MM-DD
){
    const connection = dbConnector.connectToDatabase();
    return new Promise((resolve, reject) => {
        connection.query(
            `INSERT INTO attendance
            (student_id, student_name, attendance, date)
            VALUES (?, ?, ?, ?)`,
            [
                student_id,
                student_name,
                attendance,
                date
            ],
            function(err, result) {
                if (err) {
                    console.error("Error inserting data:", err.message);
                    reject(err);
                } else {
                    console.log("Insertion successful:", result);
                    resolve(result);
                }
            }
        );
    });
}