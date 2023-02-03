//dependencies
const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const { Client } = require("pg")
const bcrypt = require("bcrypt")
const saltRounds = 10




//path to our proto file
const PROTO_FILE = "./proto/service_def.proto";
const PROTO_FILE_AUTH = "./proto/auth.proto";


//options needed for loading Proto file
const options = {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
};


const pkgDefs = protoLoader.loadSync(PROTO_FILE, options);
const pkgDefsAuth = protoLoader.loadSync(PROTO_FILE_AUTH, options);


const todoproto = grpc.loadPackageDefinition(pkgDefs);
const authProto = grpc.loadPackageDefinition(pkgDefsAuth);


//create gRPC server
const server = new grpc.Server();
let user = {};

const connectDb = async () => {
  try {
    const client = new Client({
      user: "postgres",
      host: "127.0.0.1",
      database: "marvin",
      password: "",
      port: 5432,
    });
    await client.connect();
    const res  = 
    

    
    await client.query('SELECT * FROM "todo"');

    
    await client.end();

    var data = { todo: res.rows };
   


   

    return data;
  } catch (error) {
    console.log(error);
  }
};


const registerUser = async () => {
  try {
    const client = new Client({
      user: "postgres",
      host: "127.0.0.1",
      database: "marvin",
      password: "",
      port: 5432,
    });
    await client.connect();

    // var name = user.name;
    // var password = user.password;
    // var phone = user.phone;
    // var age = user.age;
    

    // var name = 'aaaddd';
    // var password = "userpassword";
    // var phone = "userphone";
    // var age = "userage";

    let uuuuser;
    
    

    // await 
    // client.query(`INSERT INTO user (name, password,phone,age) VALUES(${name},${password},${phone},${age});`);

    // uuuuser = client.query(`INSERT INTO public."user" (
    //   name, age, password, phone) VALUES (
    //     `"${name }" `,${password},${phone},${age})
    //    returning id;`);

    const { name, password,phone,age } = user;

    
  

  
    
    await client.end();

   console.log(uuuuser);




  } catch (error) {
    console.log(error);
  }
};


server.addService(todoproto.TodoService.service,{

  
    list : async (_,callback) =>{

        callback(null,await connectDb())
    },
    insert : (call,callback) => {
        let todo = call.request;
        todo.id = uuid()
        todos.push(todo)

        callback(null,todo)
    },
    update : (call,callback) => {
        let todo = todos.find((t) => t.id === call.request.id);
        if(todo){

            todo.title = call.request.title
            todo.iscompleted = call.request.iscompleted

            callback(null,todo)
        }
        else{

            callback({
                code : grpc.status.NOT_FOUND,
                details : "Not Found"
            })

        }
    },
    delete : (call,callback) => {
        let todoDelete = todos.find((n) => n.id === call.request.id);
        if(todoDelete != -1){

            todos.splice(todoDelete,1)
            callback(null,{})

        }
        else{

            callback({
                code : grpc.status.NOT_FOUND,
                details : "Not Found"
            })
            
        }
    }

})

server.addService(authProto.AuthService.service,{

  
  
  register : (call,callback) => {
      let users = call.request;
      
      bcrypt
      .genSalt(saltRounds)
      .then(salt => {
        return bcrypt.hash(users.password, salt)
      })
      .then(hash => {

        users.password = hash;

        user = users;

      callback(null,registerUser())
      })
      .catch(err => console.error(err.message))
      
  },
 
  
  

})

server.bindAsync(
  //port to serve on
  "127.0.0.1:5000",
  //authentication settings
  grpc.ServerCredentials.createInsecure(),
  //server start callback
  (error, port) => {
    console.log(`listening on port ${port}`);
    server.start();
  }
);