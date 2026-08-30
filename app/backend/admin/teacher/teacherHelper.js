const dbConnector = require("../../sql/connectDb.js") 

function createTeacherAccount(
    name, 
    password, 
    id,
    email,
    PhoneNumber,
    Salary
){
    const connection = dbConnector.connectToDatabase();
    return new Promise((resolve, reject) => {
        connection.query(
            `INSERT INTO teachers
            (name, password, id, email, PhoneNumber, Salary)
            VALUES (?, ?, ?, ?, ?, ?)`,
            [
                name,
                password,
                id,
                email,
                PhoneNumber,
                Salary
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


function updateTeacherPassword(
    email,
    newPassword
) {
    const connection = dbConnector.connectToDatabase();

    return new Promise((resolve, reject) => {
        connection.query(
            `UPDATE teachers
             SET password = ?
             WHERE email = ?`,
            [
                newPassword,
                email
            ],
            function(err, result) {
                if (err) {
                    console.error("Error updating password:", err.message);
                    reject(err);
                } else {
                    console.log("Password updated successfully:", result);
                    resolve(result);
                }
            }
        );
    });
}

module.exports = { createTeacherAccount. updateTeacherPassword }