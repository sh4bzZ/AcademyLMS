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

module.exports = { createTeacherAccount }