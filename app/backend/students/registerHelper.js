const dbConnector = require("../sql/connectDb.js") 

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
                    reject(err);
                } else {
                    console.log("Insertion successful:", result);
                    resolve(result);
                }
            }
        );
    });
}

module.exports = registerStudent;