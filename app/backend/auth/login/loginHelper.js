const dbConnector = require("../sql/connectDb.js") 

function authenticateTeacher(name, password) {
    const connection = dbConnector.connectToDatabase();
    const query = `
        SELECT name, password
        FROM teachers
        WHERE name = ? AND password = ?
    `;
    const values = [name, password];
    return new Promise((resolve, reject) => {
        connection.query(query, values, function(err, result) {
            if (err) {
                console.error("Error fetching data:", err.message);
                reject(err);
            } else if (result.length === 1) {
                console.log("Teacher found:", result);
                resolve(true);
            } else {
                resolve(false);
            }
        });
    });
}

module.exports = {authenticateTeacher}