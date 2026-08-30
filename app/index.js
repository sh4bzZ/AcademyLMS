const express = require('express');
const app = express();
const login = require('./backend/routes/login.js')
const sessionManager = require('./backend/auth/jwt.js')

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('frontend/public'));

app.use('/login', login.routes);

// Authenticated routes below
app.use(sessionManager.validateSession);

app.use((req, res) => {
    res.status(404).send('404 - Page Not Found');
});

app.listen(8081, () => {
  console.log("Server started on port 8081");
});