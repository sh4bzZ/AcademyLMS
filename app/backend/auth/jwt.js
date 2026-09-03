const fs = require('fs');
const jwt = require('jsonwebtoken');


//read the secret key once
const secretKey = fs.readFileSync('./env/jwtKey.txt', 'utf8');

// It doesn't have to be email, it can be name or anything...
function assignJWT(email, admin=false) {
   console.log('creating the JWT token now')
   const payload={email, admin}
   const token = jwt.sign(payload, secretKey, {
   expiresIn: '1h'
   });
   console.log(`Debug: JWT token created for ${email} and admin is ${admin}`)
   return token;
};


// MIDDLE WARE FUNCTION
function validateSession(req, res, next){
   const token = req.cookies?.token;
   if(!token){
      return res.redirect('/login/login.html')
   }
   
   if(checkIntegrity(token)){
      next();
   }
   else{
      return res.redirect('/login/login.html')
   }
}

function validateAdminSession(req, res, next){
   if(!token){
      return res.redirect('/login/admin-login.html')
   }
   if(checkIntegrityAdmin(token)){
      next();
   }
   else{
      return res.redirect('/login/admin-login.html')
   }
}

//--------------------


function checkIntegrity(token){
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

function setJWTCookie(res, token) {
    res.cookie('token', token, {
        httpOnly: true,
        sameSite: 'strict'
    });
    console.log(`Debug: setting cookie ${token}`)
}


module.exports = {
   assignJWT,
   checkIntegrity,
   checkIntegrityAdmin,
   validateSession,
   validateAdminSession,
   setJWTCookie
};
