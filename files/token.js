
const jwt = require("jsonwebtoken");

function accessToken (user){
    
    return jwt.sign(
    user,
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "20h" }
  );
}
  function refreshToken (user){ 
    
    
    return jwt.sign(
    user,
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "500m" }
  );
    }


module.exports = { accessToken ,refreshToken};
