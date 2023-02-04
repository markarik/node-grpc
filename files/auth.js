const lib = require("../bd");
const token = require("./token");


async function registerUser(user) {
  try {
    var name = user.name;
    var password = user.password;
    var phone = user.phone;
    var age = user.age;
    var email = user.email;


    let uuser;

    uuser = await lib.client.query(
      `INSERT INTO "user" ("name", "password","phone","age","email")  
         VALUES ($1, $2,$3,$4,$5) RETURNING id,name,phone,age,email`,
      [name, password, phone, age,email]
    )

    await lib.client.end();

  

    return {
      AccessToken: token.accessToken(uuser.rows[0]),
      RefreshToken: token.refreshToken(uuser.rows[0]),
      user: uuser.rows[0],
    };
  } catch (error) {

    return error;
  
  }
}


async function registerUser(user) {
    try {
      var name = user.name;
      var password = user.password;
      var phone = user.phone;
      var age = user.age;
      var email = user.email;
  
  
      let uuser;
  
      uuser = await lib.client.query(
        `INSERT INTO "user" ("name", "password","phone","age","email")  
           VALUES ($1, $2,$3,$4,$5) RETURNING id,name,phone,age,email`,
        [name, password, phone, age,email]
      )
  
      await lib.client.end();
  
    
  
      return {
        AccessToken: token.accessToken(uuser.rows[0]),
        RefreshToken: token.refreshToken(uuser.rows[0]),
        user: uuser.rows[0],
      };
    } catch (error) {
  
      return error;
    
    }
  }

module.exports = { registerUser };
