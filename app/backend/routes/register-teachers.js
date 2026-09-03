const express = require('express');
const routes = express.Router();
const registeration = require('../../backend/admin/teacher/teacherHelper.js')

routes.post('/', async (req, res) => {
    // Teacher Details
    const name = req.body.name || "emptyName123##";
    const password = req.body.name || "emptyPassword123##"
    const id = req.body.id || 0
    const email = req.body.email || "empty@empty.com"
    const phone = req.body.phone || "123456"
    const salary = req.body.salary || 123456
    
    try {
        const result = await registeration.createTeacherAccount(
            name, password,
            id, email,
            phone, salary
        )
        if (result.affectedRows === 1){
            res.status(200).send(`
                <script>
                    alert("Registered Teacher Successfully");
                    window.location.href = "/registerTeachers/register-teachers.html";
                </script>
            `);
        } else {
            res.status(500).send(`
                <script>
                    alert("Unknown Error Occured, Please contact the developer");
                    window.location.href = "/registerTeachers/register-teachers.html";
                </script>
                `);
        }
    }

    catch (error){
        console.error(error);
        res.status(500).send('Server error')
    }
})

module.exports={routes}

    // name VARCHAR(255),
    // password VARCHAR(255),
    // id VARCHAR(50),
    // email VARCHAR(50),
    // PhoneNumber VARCHAR(50),
    // Salary INT