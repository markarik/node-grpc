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


// const connectDb = async () => {
  async function connectDb(call, callback) {

  try {
    const client = new Client({
      user: "postgres",
      host: "127.0.0.1",
      database: "marvin",
      password: "",
      port: 5432,
    });
    
    return client

    // return res.rows;
  } catch (error) {
    console.log(error);
  }
};

const pkgDefs = protoLoader.loadSync(PROTO_FILE, options);

const userProto = grpc.loadPackageDefinition(pkgDefs);

const server = new grpc.Server();

//implement UserService
server.addService(userProto.UserService.service, {
  //implment GetUser
  GetUser: (input, callback) => {
    console.log(input),
      callback(null, connectDb());
      
  }
});

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
