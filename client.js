//dependencies
const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");

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
  
  const pkgDefs = protoLoader.loadSync(PROTO_FILE, options);
  
  //load Definition into gRPC
  const TodoService = grpc.loadPackageDefinition(pkgDefs).TodoService;
  
  //create the Client
  const client = new TodoService(
    "127.0.0.1:5000",
    grpc.credentials.createInsecure()
  );
  


  client.list({},(error,todos) => {
    if(!error){
        console.log('successfullt fetched todo lists');
        console.log(todos.todo);
    }
    else{
        console.error(error);
    }
});