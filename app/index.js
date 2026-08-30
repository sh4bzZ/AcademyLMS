const express = require('express');
const app = express();
const login = ('backend/routes/login.js')

app.use(express.static('frontend/public'));




app.use('/login', login.routes)

// Authenticated routes below


app.all('*', (req, res) => {
  res.writeHead(404, { "Content-Type": "text/plain" });
  res.end("404");
});

app.listen(8081, () => {
  console.log("Server started on port 8081");
});
