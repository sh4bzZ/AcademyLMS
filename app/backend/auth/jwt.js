const fs = require('fs');
const jwt = require('jsonwebtoken');

function authenticateUser(email, admin=false) {
   console.log('creating the JWT token now')
   const secretKey = fs.readFileSync('./env/jwtKey.txt','utf8')
   const payload={email, admin}
   const token = jwt.sign(payload, secretKey, {
   expiresIn: '1h'
   });
   console.log(token);
   return token;
};

function checkIntegrity(token){
   const secretKey = fs.readFileSync('./env/jwtKey.txt','utf8')
   try {
      const decoded = jwt.verify(token, secretKey);
      console.log("Token is valid. Decoded payload:", decoded);
      return true
  } catch (err) {
      console.error("Invalid token or signature:", err.message);
      return false
  }
}

function checkIntegrityAdmin(token) {
   const secretKey = fs.readFileSync('./env/jwtKey.txt', 'utf8');
   try {
      const decoded = jwt.verify(token, secretKey);
      if (!decoded.admin) {
         return false;
      }
      console.log("Valid admin token:", decoded);
      return true;
   } catch (err) {
      console.error("Invalid token or signature:", err.message);
      return false;
   }
}


module.exports = {
   authenticateUser, checkIntegrity
};
