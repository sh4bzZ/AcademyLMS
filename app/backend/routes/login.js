const express = require('express');
const routes = express.Router();
const auth = require('../auth/login/loginHelper.js')
const jwt = require('../auth/jwt.js')

routes.post('/', async (req, res)=>{
    const name = req.body.name;
    const password = req.body.password
    try {
        const authenticated = await auth.authenticateTeacher(name, password);
        if(authenticated){
            // Give JWT here
            const assignedJWT = jwt.assignJWT(name, false);
            jwt.setJWTCookie(res, assignedJWT);
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