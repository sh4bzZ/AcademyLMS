const express = require('express');
const routes = express.Router();
const teacher = require('../admin/teacher/teacherHelper.js')

routes.post('/', async (req, res)=>{
    const email = req.body.email;
    const password = req.body.password
    try {
        const updated = await teacher.updateTeacherPassword(email, password);
        if(updated){
            res.status(200).send(`
                <script>
                    alert("Password Updated!");
                    window.location.href = "/updateTPassword/update-tpassword.html";
                </script>
                `);
        } else {
            res.status(400).send(`
                <script>
                    alert("Failed");
                    window.location.href = "/adminLogin/admin-login.html";
                </script>
                `);
        }
    }
    catch (err){
        console.error(err);
        res.status(500).send('Server error')
    }
});

module.exports={routes};