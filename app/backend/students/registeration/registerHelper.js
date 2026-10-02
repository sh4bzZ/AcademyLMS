const dbConnector = require("../../sql/connectDb.js") 

function registerStudent(
    name, age, id, className,
    math_fees,
    physics_fees,
    english_fees,
    bio_fees,
    chemistry_fees,
    urdu_fees,
    quran_fees
) {
    const connection = dbConnector.connectToDatabase();

    return new Promise((resolve, reject) => {
        connection.query(
            `INSERT INTO students
            (name, age, id, class, Mathfees, Phyfees, Biofees,
             Chemfees, Urdufees, Quranfees, Engfees)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                name,
                age,
                id,
                className,
                math_fees,
                physics_fees,
                bio_fees,
                chemistry_fees,
                urdu_fees,
                quran_fees,
                english_fees
            ],
            function(err, result) {
                if (err) {
                    console.error("Error inserting data:", err.message);
                    connection.end()
                    reject(err);
                } else {
                    console.log("Insertion successful:", result);
                    connection.end()
                    resolve(result);
                }
            }
        );
    });
}

function updateStudent(
    name, age, id, className,
    math_fees,
    physics_fees,
    english_fees,
    bio_fees,
    chemistry_fees,
    urdu_fees,
    quran_fees
) {
    const connection = dbConnector.connectToDatabase();

    return new Promise((resolve, reject) => {
        connection.query(
            `UPDATE students
             SET name = ?,
                 age = ?,
                 class = ?,
                 Mathfees = ?,
                 Phyfees = ?,
                 Biofees = ?,
                 Chemfees = ?,
                 Urdufees = ?,
                 Quranfees = ?,
                 Engfees = ?
             WHERE id = ?`,
            [
                name,
                age,
                className,
                math_fees,
                physics_fees,
                bio_fees,
                chemistry_fees,
                urdu_fees,
                quran_fees,
                english_fees,
                id
            ],
            function(err, result) {
                if (err) {
                    console.error("Error Updating data:", err.message);
                    connection.end();
                    reject(err);
                } else {
                    console.log("Updation successful:", result);
                    connection.end();
                    resolve(result);
                }
            }
        );
    });
}

function deleteStudent(id) {
    const connection = dbConnector.connectToDatabase();
    return new Promise((resolve, reject) => {
        connection.query(
            `DELETE FROM students WHERE id = ?`,
            [id],
            function(err, result) {
                connection.end();

                if (err) {
                    console.error("Error deleting data:", err.message);
                    reject(err);
                } else {
                    console.log("Successfully deleted:", result);
                    resolve(result);
                }
            }
        );
    });
}

module.exports = { registerStudent, updateStudent, deleteStudent};