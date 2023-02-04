//dependencies
const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const { Client } = require("pg")
const bcrypt = require("bcrypt")
const dotenv = require("dotenv")
const lib = require("./bd");
const authentication = require("./files/auth");



const saltRounds = 10

dotenv.config();




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
    
    await lib.client.connect();
    const res  = 
    

    
    await lib.client.query('SELECT * FROM "todo"');

    
    await lib.client.end();

    var data = { todo: res.rows };
   


   

    return data;
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

  
  
  registerUser : (call,callback) => {
      let users = call.request;
      
      bcrypt
      .genSalt(saltRounds)
      .then(salt => {
        return bcrypt.hash(users.password, salt)
      })
      .then(async hash => {

        users.password = hash;

        user = users;

      callback(null,await authentication.registerUser(user))
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