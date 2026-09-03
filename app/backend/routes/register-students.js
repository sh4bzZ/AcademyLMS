const express = require('express');
const routes = express.Router();
const registeration = require('../../backend/students/registeration/registerHelper.js')

routes.post('/', async (req, res)=> {
    // Student Details
    const name = req.body.name || "";
    const age = req.body.age || 0;
    const id = req.body.id || "";
    const classGrade = req.body.class || "";
    const math_fees = req.body.math_fees || 0;
    const physics_fees = req.body.physics_fees || 0;
    const english_fees = req.body.english_fees || 0;
    const bio_fees = req.body.bio_fees || 0;
    const chemistry_fees = req.body.chemistry_fees || 0;
    const urdu_fees = req.body.urdu_fees || 0;
    const quran_fees = req.body.quran_fees || 0;

    try {
        const result = await registeration.registerStudent(
            name, age,
            id, classGrade,
            math_fees, physics_fees,
            english_fees, bio_fees,
            chemistry_fees, urdu_fees,
            quran_fees 
        )
        if(result.affectedRows === 1){
            res.status(200).send(`
                <script>
                    alert("Registered Student Successfully");
                    window.location.href = "/registerStudents/register-students.html";
                </script>
            `);
        }
        else{
            res.status(500).send(`
                <script>
                    alert("Unknown Error Occured, Please contact the developer");
                    window.location.href = "/registerStudents/register-students.html";
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