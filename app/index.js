const express = require('express');
const app = express();
const login = require('./backend/routes/login.js');
const studentRegisteration = require('./backend/routes/register-students.js');
const sessionManager = require('./backend/auth/jwt.js');

const cookieParser = require('cookie-parser');


const path = require('path');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(
    path.join(__dirname, 'frontend', 'public')
));

app.use(cookieParser());

app.use('/login', login.routes);

// Authenticated routes below
app.use(sessionManager.validateSession);

app.use('/register-students', studentRegisteration.routes);

app.use((req, res) => {
    console.log("404 Request:", req.path);  
    res.status(404).send('404 - Page Not Found');
});

app.listen(8081, '172.19.8.219', () => {
    console.log("Server started on port 8081");
});