const express = require('express');
const routes = express.Router();
const auth = require('../auth/login/loginHelper.js')

routes.post('/', (req, res)=>{
    const name = req.body.name;
    const password = req.body.password

    try {
        const authenticated = await auth.authenticateTeacher(name, password);
        if(authenticated){
            res.send('Login successful!')
            res.redirect('/dashboard.html')
        } else {
            res.status(401).send(`
                <script>
                    alert("Invalid username or password");
                    window.location.href = "/login.html";
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