//dependencies
const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
// const pg = require("pg");
const { Client } = require("pg")

//path to our proto file
const PROTO_FILE = "./service_def.proto";

//options needed for loading Proto file
const options = {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
};

// const pool = new pg.Pool({
//   user: 'postgres',
//   host: '127.0.0.1',
//   database: 'marvin',
//   password: '',
//   port: 5432,
// });

// const connectDb = async () => {
//   try {
//     const client = new Client({
//       user: "postgres",
//       host: "127.0.0.1",
//       database: "marvin",
//       password: "",
//       port: 5432,
//     });
//     await client.connect();
//     const res = await client.query('SELECT * FROM "user"');

    
//     await client.end();
//     // console.log(res.rows);

//     // var name = res.rows[0]['name'];
//     // var id = res.rows[0]['id'];
//     // var age = res.rows[0]['age'];

//     // console.log(id);
//     // console.log(name);
//     // console.log(age);


   

//     return res.rows;
//   } catch (error) {
//     console.log(error);
//   }
// };

// const pkgDefs = protoLoader.loadSync(PROTO_FILE, options);

// //load Definition into gRPC
// const userProto = grpc.loadPackageDefinition(pkgDefs);

// //create gRPC server
// const server = new grpc.Server();

// //implement UserService

// server.addService(userProto.UserService.service, {
 
    
            

      
  

//   // GetUser: (_, callback) => {
//   //   callback(null, data)
//   // },
// });


let todos = [
  { id : '1',title : 'Todo 1',iscompleted : false }
]

server.addService(todoproto.TodoService.service,{
  list : (_,callback) =>{
      callback(null,todos)
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


//start the Server
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
