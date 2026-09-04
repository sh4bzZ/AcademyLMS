const express = require('express');
const app = express();
const login = require('./backend/routes/login.js');
const adminLogin = require('./backend/routes/admin-login.js');
const studentRegisteration = require('./backend/routes/register-students.js');
const teacherRegisteration = require('./backend/routes/register-teachers.js');
const fetchAttendance = require('./backend/routes/fetch-attendance.js');
const markAttendance = require('./backend/routes/mark-attendance.js');
const viewStudents = require('./backend/routes/view-students.js');
const viewTeachers = require('./backend/routes/view-teachers.js');

const sessionManager = require('./backend/auth/jwt.js');

const cookieParser = require('cookie-parser');


const path = require('path');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use(express.static(
    path.join(__dirname, 'frontend', 'public')
));

app.use(cookieParser());

// Unauthenticated routes below
app.use('/login', login.routes);
app.use('/admin-login', adminLogin.routes);

// Authenticated routes below
app.use('/register-students',
    sessionManager.validateSession,
    studentRegisteration.routes
);

app.use('/fetch-attendance',
    sessionManager.validateSession,
    fetchAttendance.routes
)

app.use('/mark-attendance',
    sessionManager.validateSession,
    markAttendance.routes
)

//  Admin authenticated routes below
app.use('/register-teachers', 
    sessionManager.validateAdminSession,
    teacherRegisteration.routes
);

app.use('/view-students', 
    sessionManager.validateAdminSession,
    viewStudents.routes
);

app.use('/view-teachers',
    sessionManager.validateAdminSession,
    viewTeachers.routes
)


app.use((req, res) => {
    console.log("404 Request:", req.path);  
    res.status(404).send('404 - Page Not Found');
});

app.listen(8081, '0.0.0.0', () => {
    console.log("Server started on port 8081");
});