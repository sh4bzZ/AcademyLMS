const express = require('express');
const routes = express.Router();
const registeration = require('../../backend/students/registeration/registerHelper.js')

routes.post('/', async (req, res)=> {
    // Student ID
    const id = req.body.id || "";
    try {
        const result = await registeration.deleteStudent(
            id
        )
        if (result.affectedRows === 1){
            res.status(200).send(`
                <script>
                    alert("Student Deleted Successfully");
                    window.location.href = "/registerStudents/delete-students.html";
                </script>
            `);
        } else {
            res.status(500).send(`
                <script>
                    alert("Unknown Error Occured, Please contact the developer");
                    window.location.href = "/registerStudents/delete-students.html";
                </script>
                `);
        }
    }
    catch(error){
        console.error(error);
        res.status(500).send('Server error')
    }
})

module.exports={routes}